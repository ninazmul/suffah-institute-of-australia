"use client";

import { useState, useMemo } from "react";
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
import { Trash, SortAsc, SortDesc } from "lucide-react";
import { deleteFreeOrder } from "@/lib/actions/freeorder.actions";

const FreeOrderTable = ({
  freeOrders,
}: {
  freeOrders: Array<{
    _id: string;
    name: string;
    address: string;
    number: string;
    email: string;
    timezone: string;
    media: string;
    group: string;
    event: {
      _id: string;
      title: string;
    };
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
    const filtered = freeOrders.filter(
      (order) =>
        order.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        order.event.title.toLowerCase().includes(searchQuery.toLowerCase())
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
  }, [freeOrders, searchQuery, sortKey, sortOrder]);

  const paginatedOrders = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredOrders.slice(start, start + itemsPerPage);
  }, [filteredOrders, currentPage, itemsPerPage]);

  const handleDeleteOrder = async (freeOrderId: string) => {
    try {
      const response = await deleteFreeOrder(freeOrderId);
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
    <div className="space-y-4 overflow-x-auto">
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
            <TableHead>Timezone</TableHead>
            <TableHead>Preferred Media</TableHead>
            <TableHead>Preferred Group</TableHead>
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
              <TableCell className="min-w-[300px]">{order.event.title}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>
                <a
                  href={`mailto:${order.email}`}
                  className="text-blue-800 font-semibold underline"
                  target="_blank"
                >
                  {order.email}
                </a>
              </TableCell>
              <TableCell>{order.number}</TableCell>
              <TableCell>{order.timezone}</TableCell>
              <TableCell>{order.media}</TableCell>
              <TableCell>{order.group}</TableCell>
              <TableCell>
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

export default FreeOrderTable;
