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
import { deleteCommunityServiceResource } from "@/lib/actions/communityServiceResource";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import CommunityServiceResourceForm from "./CommunityServiceResourceForm";
import { ICommunityServiceResource } from "@/lib/database/models/communityServiceResource.model";
import { useRouter } from "next/navigation";

const CommunityServiceResourceTable = ({
  resources,
}: {
  resources: Array<ICommunityServiceResource>;
}) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortKey, setSortKey] = useState<
    | "category"
    | "name"
    | "address"
    | "city"
    | "state"
    | "website"
    | "contact"
    | null
  >(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filteredResources = useMemo(() => {
    const filtered = resources.filter(
      (resource) =>
        (resource.category?.toLowerCase() || "").includes(
          searchQuery.toLowerCase()
        ) ||
        (resource.name?.toLowerCase() || "").includes(
          searchQuery.toLowerCase()
        ) ||
        (resource.address?.toLowerCase() || "").includes(
          searchQuery.toLowerCase()
        ) ||
        (resource.city?.toLowerCase() || "").includes(
          searchQuery.toLowerCase()
        ) ||
        (resource.state?.toLowerCase() || "").includes(
          searchQuery.toLowerCase()
        ) ||
        (resource.website?.toLowerCase() || "").includes(
          searchQuery.toLowerCase()
        ) ||
        (resource.contact?.toLowerCase() || "").includes(
          searchQuery.toLowerCase()
        )
    );

    if (sortKey) {
      filtered.sort((a, b) => {
        const valueA = a[sortKey]?.toLowerCase() || "";
        const valueB = b[sortKey]?.toLowerCase() || "";
        if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
        if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [resources, searchQuery, sortKey, sortOrder]);

  const paginatedResources = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredResources.slice(start, start + itemsPerPage);
  }, [filteredResources, currentPage, itemsPerPage]);

  const handleDeleteResource = async (resourceId: string) => {
    try {
      const response = await deleteCommunityServiceResource(resourceId);
      if (response) {
        alert(response.message);
      }
      router.push(`/dashboard/resources`);
    } catch (error) {
      alert("Failed to delete resource");
      console.error(error);
    } finally {
      setConfirmDeleteId(null);
    }
  };

  const handleSort = (
    key:
      | "category"
      | "name"
      | "address"
      | "city"
      | "state"
      | "website"
      | "contact"
  ) => {
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
        placeholder="Search by category, name, address, state, website, or contact"
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
                onClick={() => handleSort("category")}
                className="flex items-center gap-2 cursor-pointer"
              >
                Category
                {sortKey === "category" &&
                  (sortOrder === "asc" ? <SortAsc /> : <SortDesc />)}
              </div>
            </TableHead>
            <TableHead>
              <div
                onClick={() => handleSort("name")}
                className="flex items-center gap-2 cursor-pointer"
              >
                Name
                {sortKey === "name" &&
                  (sortOrder === "asc" ? <SortAsc /> : <SortDesc />)}
              </div>
            </TableHead>
            <TableHead>
              <div
                onClick={() => handleSort("address")}
                className="flex items-center gap-2 cursor-pointer"
              >
                Address
                {sortKey === "address" &&
                  (sortOrder === "asc" ? <SortAsc /> : <SortDesc />)}
              </div>
            </TableHead>
            <TableHead>
              <div
                onClick={() => handleSort("city")}
                className="flex items-center gap-2 cursor-pointer"
              >
                City
                {sortKey === "city" &&
                  (sortOrder === "asc" ? <SortAsc /> : <SortDesc />)}
              </div>
            </TableHead>
            <TableHead>
              <div
                onClick={() => handleSort("state")}
                className="flex items-center gap-2 cursor-pointer"
              >
                State
                {sortKey === "state" &&
                  (sortOrder === "asc" ? <SortAsc /> : <SortDesc />)}
              </div>
            </TableHead>
            <TableHead>
              <div
                onClick={() => handleSort("website")}
                className="flex items-center gap-2 cursor-pointer"
              >
                Website
                {sortKey === "website" &&
                  (sortOrder === "asc" ? <SortAsc /> : <SortDesc />)}
              </div>
            </TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedResources.map((resource, index) => (
            <TableRow key={resource._id} className="hover:bg-gray-100">
              <TableCell>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </TableCell>
              <TableCell>{resource.category}</TableCell>
              <TableCell>{resource.name}</TableCell>
              <TableCell>{resource.address}</TableCell>
              <TableCell>{resource.city}</TableCell>
              <TableCell>{resource.state}</TableCell>
              <TableCell>
                <a
                  href={resource.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500"
                >
                  {resource.website}
                </a>
              </TableCell>
              <TableCell>{resource.contact}</TableCell>
              <TableCell className="flex items-center space-x-2">
                <Sheet>
                  <SheetTrigger>
                    <Button variant={"outline"} className="text-red-500">
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
                      <SheetTitle>Update Community Service Resource</SheetTitle>
                      <SheetDescription>
                        Update information to ensure our records are accurate
                        and up to date. Please review and modify details as
                        needed, adhering to the system&apos;s requirements for
                        proper record management and organization.
                      </SheetDescription>
                    </SheetHeader>
                    <div className="py-5">
                      <CommunityServiceResourceForm
                        communityServiceResource={resource}
                        communityServiceResourceId={resource?._id}
                        type="Update"
                      />
                    </div>
                  </SheetContent>
                </Sheet>
                <Button
                  onClick={() => setConfirmDeleteId(resource._id)}
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
        <span className="text-sm text-muted-foreground">
          Showing{" "}
          {Math.min(itemsPerPage * currentPage, filteredResources.length)} of{" "}
          {filteredResources.length} resources
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
              currentPage === Math.ceil(filteredResources.length / itemsPerPage)
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
            <p>Are you sure you want to delete this resource?</p>
            <div className="flex justify-end space-x-2">
              <Button
                onClick={() => setConfirmDeleteId(null)}
                variant={"outline"}
              >
                Cancel
              </Button>
              <Button
                onClick={() => handleDeleteResource(confirmDeleteId)}
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

export default CommunityServiceResourceTable;
