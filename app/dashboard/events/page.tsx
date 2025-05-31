import CategoryFilter from "@/components/shared/CategoryFilter";
import Search from "@/components/shared/Search";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import Link from "next/link";
import EventTable from "../components/EventTable";

const page = async ({ searchParams }: SearchParamProps) => {
  const { query, category, page } = await searchParams;

  const currentPage = Number(page) || 1;
  const searchText = (query as string) || "";
  const selectedCategory = (category as string) || "";

  const events = await getAllEvents({
    query: searchText,
    category: selectedCategory,
    page: currentPage,
    limit: 6,
  });

  return (
    <>
      <section className=" py-2 md:py-5">
        <div className="wrapper flex flex-wrap justify-between items-center">
          <h3 className="h3-bold text-center sm:text-left">All Events</h3>
          <Button asChild size="lg" className="rounded-full">
            <Link href="/dashboard/events/create">Create Events</Link>
          </Button>
        </div>
      </section>

      <div className="wrapper my-8">
        <div className="flex w-full flex-col gap-5 md:flex-row my-6 mx-auto">
          <Search />
          <CategoryFilter />
        </div>
        <EventTable
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={currentPage}
          totalPages={events?.totalPages}
        />
      </div>
    </>
  );
};

export default page;
