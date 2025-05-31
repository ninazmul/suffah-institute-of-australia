"use client";

import { useState, useMemo } from "react";
import { deleteOrder } from "@/lib/actions/order.actions";
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
import { Trash, SortAsc, SortDesc, Notebook } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const OrderTable = ({
  orders,
}: {
  orders: Array<{
    _id: string;
    eventTitle: string;
    totalAmount: number;
    buyerName: string;
    buyerEmail: string;
    buyerNumber: string;
    adults: number;
    kids: number;
    infants: number;
    note: string;
    createdAt: string;
  }>;
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<
    "name" | "email" | "eventTitle" | "createdAt" | null
  >(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filteredOrders = useMemo(() => {
    const filtered = orders.filter(
      (order) =>
        order.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.buyerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortKey) {
      filtered.sort((a, b) => {
        const valueA =
          typeof a[sortKey as keyof typeof a] === "string"
            ? (a[sortKey as keyof typeof a] as string).toLowerCase()
            : a[sortKey as keyof typeof a];
        const valueB =
          typeof b[sortKey as keyof typeof b] === "string"
            ? (b[sortKey as keyof typeof b] as string).toLowerCase()
            : b[sortKey as keyof typeof b];
        if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [orders, searchQuery, sortKey, sortOrder]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const handleDeleteOrder = async (orderId: string) => {
    try {
      const response = await deleteOrder(orderId);
      if (response) {
        alert(response.message);
      }
    } catch (error) {
      alert("Failed to delete order");
      console.log(error);
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const handleSort = (key: "name" | "email" | "eventTitle" | "createdAt") => {
    if (sortKey === key) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortKey(key);
      setSortOrder("asc");
    }
  };

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by name, email, or event title"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="mb-4 w-full md:w-1/2 lg:w-1/3"
      />
      <Table className="border border-gray-200 rounded-md">
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>
              <div
                onClick={() => handleSort("createdAt")}
                className="flex items-center gap-2"
              >
                Date
                {sortKey === "createdAt" &&
                  (sortOrder === "asc" ? <SortAsc /> : <SortDesc />)}
              </div>
            </TableHead>
            <TableHead>
              <div
                onClick={() => handleSort("eventTitle")}
                className="flex items-center gap-2"
              >
                Event Title
                {sortKey === "eventTitle" &&
                  (sortOrder === "asc" ? <SortAsc /> : <SortDesc />)}
              </div>
            </TableHead>
            <TableHead>
              <div
                onClick={() => handleSort("name")}
                className="flex items-center gap-2"
              >
                Name
                {sortKey === "name" &&
                  (sortOrder === "asc" ? <SortAsc /> : <SortDesc />)}
              </div>
            </TableHead>
            <TableHead>
              <div
                onClick={() => handleSort("email")}
                className="flex items-center gap-2"
              >
                Email
                {sortKey === "email" &&
                  (sortOrder === "asc" ? <SortAsc /> : <SortDesc />)}
              </div>
            </TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Adults</TableHead>
            <TableHead>Kids</TableHead>
            <TableHead>Infants</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedOrders.map((order, index) => (
            <TableRow key={order._id} className="hover:bg-gray-100">
              <TableCell>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell>
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
              </TableCell>
              <TableCell className="min-w-[300px]">
                {order.eventTitle}
              </TableCell>
              <TableCell>{order.buyerName}</TableCell>
              <TableCell>
                <a
                  href={`mailto:${order.buyerEmail}`}
                  className="text-blue-800 font-semibold underline"
                  target="_blank"
                >
                  {order.buyerEmail}
                </a>
              </TableCell>
              <TableCell>{order.buyerNumber}</TableCell>
              <TableCell>{order.totalAmount}</TableCell>
              <TableCell>{order.adults}</TableCell>
              <TableCell>{order.kids}</TableCell>
              <TableCell>{order.infants}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Popover>
                  <PopoverTrigger>
                    <Notebook className="size-4 text-purple-500" />
                  </PopoverTrigger>
                  <PopoverContent className="text-black">
                    {order.note}
                  </PopoverContent>
                </Popover>
                <Button
                  onClick={() => setConfirmDeleteId(order._id)}
                  variant={"outline"}
                  className="text-red-500"
                >
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <span className="text-sm text-muted-foreground line-clamp-1">
          Showing {Math.min(itemsPerPage * currentPage, filteredOrders.length)}{" "}
          of {filteredOrders.length} orders
        </span>
        <div className="flex items-center space-x-2">
          <Button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            size={"sm"}
          >
            Previous
          </Button>
          <Button
            disabled={
              currentPage === Math.ceil(filteredOrders.length / itemsPerPage)
            }
            onClick={() => setCurrentPage((prev) => prev + 1)}
            size={"sm"}
          >
            Next
          </Button>
        </div>
      </div>
      {confirmDeleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md space-y-4">
            <p>Are you sure you want to delete this order?</p>
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => setConfirmDeleteId(null)}
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteOrder(confirmDeleteId)}
                variant={"destructive"}
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

export default OrderTable;
