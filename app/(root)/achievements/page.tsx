"use client";

import { getAllAchievement } from "@/lib/actions/achievement.actions";
import Image from "next/image";
import { IAchievement } from "@/lib/database/models/achievement.model";
import { useState, useEffect } from "react";

const Page = () => {
  const [achievements, setAchievements] = useState<IAchievement[]>([]);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllAchievement();
      if (data) setAchievements(data);
    };
    fetchData();
  }, []);

  if (!achievements || achievements.length === 0) {
    return (
      <section className="wrapper my-8 text-center">
        <h2 className="h2-bold">No Achievements Found</h2>
        <p className="p-regular-20">Please check back later.</p>
      </section>
    );
  }

  // Extract unique categories
  const categories: string[] = [
    "All",
    ...Array.from(new Set(achievements.map((a) => a.category as string))),
  ];

  return (
    <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
      <h2 className="h2-bold text-center">Our Achievements</h2>
      <p className="p-regular-20 md:p-regular-24 text-center">
        Discover milestones and accomplishments that reflect our journey— from
        community events and celebrations to meaningful contributions.
      </p>

      <div className="flex flex-col lg:flex-row gap-6 w-full">
        {/* Custom Vertical Tabs */}
        <div className="flex flex-col md:flex-row lg:flex-col gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`w-full px-4 py-2 rounded-lg text-left transition font-medium
                ${
                  activeTab === cat
                    ? "bg-primary text-white shadow-md"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1">
          <div className="grid grid-cols-1 gap-4 mt-2">
            {achievements
              .filter((a) =>
                activeTab === "All" ? true : a.category === activeTab
              )
              .map((a) => (
                <div
                  key={a._id}
                  className="rounded-2xl shadow-md hover:shadow-lg transition flex flex-col md:flex-row bg-white"
                >
                  {a.image && (
                    <div className="relative md:w-1/3 lg:w-1/4 min-h-72 md:min-h-[200px] lg:min-h-[250px]">
                      <Image
                        src={a.image}
                        alt={a.title}
                        fill
                        className="object-contain bg-gray-100 w-full border rounded-t-2xl md:rounded-tr-none md:rounded-l-2xl"
                      />
                    </div>
                  )}
                  <div className="p-4 flex flex-col flex-1">
                    <div className="mb-2">
                      <h3 className="text-lg font-bold">{a.title}</h3>
                      <p className="text-sm text-muted-foreground font-semibold">
                        {a.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm">{a.description}</p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
