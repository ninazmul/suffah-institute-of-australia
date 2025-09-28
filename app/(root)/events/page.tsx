import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import QuranClass from "@/components/shared/QuranClass";
import Search from "@/components/shared/Search";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";

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
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Explore All Events</h2>
        <p className="p-regular-20 md:p-regular-24">
          Explore events that bring the Muslim community together—
          <br />
          prayers, gatherings, celebrations, and more.
        </p>

        <QuranClass />

        <h2 className="h2-bold">Other Events</h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <Search />
          <CategoryFilter />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={currentPage}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
};

export default page;
