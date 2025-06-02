"use client";

import { useMemo, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash, SortAsc, SortDesc, Clock, Check } from "lucide-react";
import { deleteBooking, updateBooking } from "@/lib/actions/booking.actions";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import BookingForm from "./BookingForm";
import { IBooking } from "@/lib/database/models/booking.model";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const BookingTable = ({
  bookings,
  teachers,
}: {
  bookings: IBooking[];
  teachers: { _id: string; name: string }[];
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<"name" | "teacher" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filteredBookings = useMemo(() => {
    const filtered = bookings?.filter(
      (booking) =>
        booking.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        booking.teacher?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortKey) {
      filtered.sort((a, b) => {
        const valueA = a[sortKey]?.toLowerCase?.() ?? "";
        const valueB = b[sortKey]?.toLowerCase?.() ?? "";

        if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [bookings, searchQuery, sortKey, sortOrder]);

  const paginatedBookings = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredBookings?.slice(start, start + itemsPerPage);
  }, [filteredBookings, currentPage, itemsPerPage]);

  const handleSort = (key: "name" | "teacher") => {
    if (sortKey === key) {
      setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  const handleToggleBookingStatus = async (
    bookingId: string,
    currentStatus: string
  ) => {
    try {
      const newStatus = currentStatus === "Pending" ? "Confirmed" : "Pending";

      const response = await updateBooking(bookingId, {
        status: newStatus,
      });

      if (response) {
        toast.success(`Booking status updated to ${newStatus}`);
      }
      router.refresh();
    } catch (error) {
      alert("Failed to update booking status");
      console.log(error);
    }
  };

  const handleTogglePaymentStatus = async (
    paymentId: string,
    currentStatus: string
  ) => {
    try {
      const newStatus = currentStatus === "Unpaid" ? "Paid" : "Unpaid";

      const response = await updateBooking(paymentId, {
        payment: newStatus,
      });

      if (response) {
        toast.success(`Payment status updated to ${newStatus}`);
      }
      router.refresh();
    } catch (error) {
      alert("Failed to update payment status");
      console.log(error);
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    try {
      const response = await deleteBooking(bookingId);
      if (response) toast.success(response.message);
      router.refresh();
    } catch (error) {
      toast.error("Failed to delete booking.");
      console.error(error);
    } finally {
      setConfirmDeleteId(null);
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by name or teacher"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 w-full md:w-1/2 lg:w-1/3"
      />
      <Table className="border border-gray-200 rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead
              onClick={() => handleSort("name")}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2">
                Name
                {sortKey === "name" &&
                  (sortOrder === "asc" ? <SortAsc /> : <SortDesc />)}
              </div>
            </TableHead>
            <TableHead
              onClick={() => handleSort("teacher")}
              className="cursor-pointer"
            >
              <div className="flex items-center gap-2">
                Teacher
                {sortKey === "teacher" &&
                  (sortOrder === "asc" ? <SortAsc /> : <SortDesc />)}
              </div>
            </TableHead>
            <TableHead>Schedule</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedBookings?.map((booking, index) => (
            <TableRow key={booking._id} className="hover:bg-gray-100">
              <TableCell>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell>
                <Link
                  href={`/dashboard/bookings/${booking._id}`}
                  className="line-clamp-1 w-40 md:w-auto hover:underline"
                >
                  {booking.name}
                </Link>
              </TableCell>
              <TableCell>{booking.teacher}</TableCell>
              <TableCell>
                <TableCell>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-64 p-2">
                      <table className="text-sm text-left w-full border border-gray-200">
                        <thead>
                          <tr className="bg-gray-100 text-muted-foreground">
                            <th className="px-2 py-1 border-b">Day</th>
                            <th className="px-2 py-1 border-b">Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {booking.schedule?.map((s, idx) => (
                            <tr key={idx}>
                              <td className="px-2 py-1 border-b">{s.day}</td>
                              <td className="px-2 py-1 border-b">
                                {s.timeSlot}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableCell>
              <TableCell>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm">
                      {booking.progress || "Set"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56">
                    <form
                      className="flex flex-col gap-2"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const newProgress =
                          formData.get("progress")?.toString() || "";
                        try {
                          const response = await updateBooking(booking._id, {
                            progress: newProgress,
                          });
                          if (response) {
                            toast.success("Progress updated");
                            router.refresh();
                          }
                        } catch (error) {
                          toast.error("Failed to update progress");
                          console.error(error);
                        }
                      }}
                    >
                      <label className="text-sm font-medium">
                        Update Progress
                      </label>
                      <select
                        name="progress"
                        defaultValue={booking.progress || ""}
                        className="border px-2 py-1 rounded text-sm"
                      >
                        <option value="" disabled>
                          Select progress
                        </option>
                        <option value="Not Started">Not Started</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Completed">Completed</option>
                      </select>
                      <Button type="submit" size="sm">
                        Save
                      </Button>
                    </form>
                  </PopoverContent>
                </Popover>
              </TableCell>

              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() =>
                    handleTogglePaymentStatus(booking._id, booking.payment)
                  }
                >
                  {booking.payment === "Unpaid" ? (
                    <Clock className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <Check className="w-4 h-4 text-green-500" />
                  )}
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  onClick={() =>
                    handleToggleBookingStatus(booking._id, booking.status)
                  }
                >
                  {booking.status === "Pending" ? (
                    <Clock className="w-4 h-4 text-yellow-500" />
                  ) : (
                    <Check className="w-4 h-4 text-green-500" />
                  )}
                </Button>
              </TableCell>
              <TableCell>
                {booking.note && booking.note.trim() !== "" ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-56 whitespace-pre-wrap text-sm text-muted-foreground">
                      <p className="font-semibold mb-1">Note:</p>
                      {booking.note}
                    </PopoverContent>
                  </Popover>
                ) : (
                  <span className="text-muted-foreground text-sm">N/A</span>
                )}
              </TableCell>
              <TableCell className="flex items-center space-x-2">
                <Sheet>
                  <SheetTrigger>
                    <Button variant="outline" className="text-blue-500">
                      <Image
                        src="/assets/icons/edit.svg"
                        alt="edit"
                        width={20}
                        height={20}
                      />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="bg-white">
                    <SheetHeader>
                      <SheetTitle>Update Booking</SheetTitle>
                      <SheetDescription>
                        Update the booking details including schedule.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-5">
                      <BookingForm
                        booking={booking}
                        bookingId={booking._id}
                        type="Update"
                        teachers={teachers}
                        bookings={bookings}
                      />
                    </div>
                  </SheetContent>
                </Sheet>
                <Button
                  onClick={() => setConfirmDeleteId(booking._id)}
                  variant="outline"
                  className="text-red-500"
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-between items-center mt-4 w-full">
        <span className="text-sm text-muted-foreground">
          Showing{" "}
          {Math.min(currentPage * itemsPerPage, filteredBookings?.length)} of{" "}
          {filteredBookings?.length} bookings
        </span>
        <div className="flex items-center space-x-2">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            size="sm"
          >
            Previous
          </Button>
          <Button
            disabled={
              currentPage === Math.ceil(filteredBookings?.length / itemsPerPage)
            }
            onClick={() => setCurrentPage((prev) => prev + 1)}
            size="sm"
          >
            Next
          </Button>
        </div>
      </div>

      {confirmDeleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-md space-y-4">
            <p>Are you sure you want to delete this booking?</p>
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => setConfirmDeleteId(null)}
                variant="outline"
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteBooking(confirmDeleteId)}
                variant="destructive"
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingTable;
