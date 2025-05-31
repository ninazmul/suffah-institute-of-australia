/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { getAllIslamicResources } from "@/lib/actions/islamicResource.actions";
import { getAllCommunityServiceResources } from "@/lib/actions/communityServiceResource";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLinkIcon } from "lucide-react";

const Page = () => {
  const [activeTab, setActiveTab] = useState("communityServiceResource");
  const [islamicResources, setIslamicResources] = useState<any[]>([]);
  const [communityServiceResources, setCommunityServiceResources] = useState<
    any[]
  >([]);
  const [islamicSearch, setIslamicSearch] = useState("");
  const [communitySearch, setCommunitySearch] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const islamicData = await getAllIslamicResources();
        const communityData = await getAllCommunityServiceResources();
        setIslamicResources(islamicData);
        setCommunityServiceResources(communityData);
      } catch (error) {
        console.error("Failed to fetch resources:", error);
      }
    };
    fetchResources();
  }, []);

  const filteredIslamicResources = islamicResources.filter((resource) =>
    `${resource.fileName} ${resource.category}`
      .toLowerCase()
      .includes(islamicSearch.toLowerCase())
  );

  const filteredCommunityServiceResources = communityServiceResources.filter(
    (resource) => {
      const matchesSearch = `${resource.name} ${resource.category}`
        .toLowerCase()
        .includes(communitySearch.toLowerCase());
      const matchesCity = cityFilter
        ? resource.city.toLowerCase().includes(cityFilter.toLowerCase())
        : true;
      const matchesState = stateFilter
        ? resource.state.toLowerCase().includes(stateFilter.toLowerCase())
        : true;
      return matchesSearch && matchesCity && matchesState;
    }
  );

  return (
    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold">Resources and Information for Community.</h2>
      <p className="p-regular-20 md:p-regular-24">
        Please explore key resources and information for the community,
        including but not limited to Mosques, Islamic Institutions, Halal Shops,
        Local Community Contacts, and Services. If you want to add a resource,
        please fill out this form:{" "}
        <a
          href="https://forms.gle/kkr1A1XdUxxed6cL6"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-700 underline"
        >
          Submit a Resource
        </a>
        .
      </p>

      <div className="flex flex-col md:flex-row items-center justify-center gap-4 pb-2">
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-lg focus:outline-none ${
            activeTab === "communityServiceResource"
              ? "bg-primary-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("communityServiceResource")}
        >
          Community Resources (Mosque, School, Halal Food, Burials, etc.)
        </button>
        <button
          className={`px-4 py-2 text-sm font-semibold rounded-lg focus:outline-none ${
            activeTab === "islamicResource"
              ? "bg-primary-500 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
          onClick={() => setActiveTab("islamicResource")}
        >
          Islamic Resources (Document, Guide, Data, Books, etc)
        </button>
      </div>
      {activeTab === "communityServiceResource" && (
        <div>
          <div className="mb-4 flex flex-col gap-4 md:flex-row">
            <input
              type="text"
              placeholder="Filter by Name or Category"
              className="input-field w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={communitySearch}
              onChange={(e) => setCommunitySearch(e.target.value)}
            />
            <input
              type="text"
              placeholder="Filter by City"
              className="input-field w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
            />
            <input
              type="text"
              placeholder="Filter by State"
              className="input-field w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
            />
          </div>
          {filteredCommunityServiceResources.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>State</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Website</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCommunityServiceResources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell>{resource.name}</TableCell>
                    <TableCell>{resource.category}</TableCell>
                    <TableCell>{resource.address}</TableCell>
                    <TableCell>{resource.city}</TableCell>
                    <TableCell>{resource.state}</TableCell>
                    <TableCell>{resource.contact}</TableCell>
                    <TableCell>
                      <a
                        href={resource.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        Visit Website <ExternalLinkIcon className="size-4" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500">
              No community service resources found.
            </p>
          )}
        </div>
      )}

      {activeTab === "islamicResource" && (
        <div>
          <input
            type="text"
            placeholder="Filter by Category or File Name"
            className="input-field mb-4 w-full p-2 border rounded-md focus:ring-2 focus:ring-blue-500"
            value={islamicSearch}
            onChange={(e) => setIslamicSearch(e.target.value)}
          />
          {filteredIslamicResources.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>File Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIslamicResources.map((resource) => (
                  <TableRow key={resource.id}>
                    <TableCell>{resource.fileName}</TableCell>
                    <TableCell>{resource.category}</TableCell>
                    <TableCell>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        Open Resource <ExternalLinkIcon className="size-4" />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <p className="text-gray-500">No Islamic resources found.</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Page;
