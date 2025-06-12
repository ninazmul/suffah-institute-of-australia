import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import { ContactUs } from "@/components/shared/ContactUs";
import QnaCarousel from "@/components/shared/QnaCarousel";
import QuranClass from "@/components/shared/QuranClass";
import Search from "@/components/shared/Search";
import Services from "@/components/shared/Services";
import { getAllEvents } from "@/lib/actions/event.actions";
import { getAllQna } from "@/lib/actions/qna.actions";
import { SearchParamProps } from "@/types";

export default async function Home({ searchParams }: SearchParamProps) {
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

  const qnaList = (await getAllQna())?.reverse();

  return (
    <>
      <section id="services" className="">
        <Services />
      </section>

      <section id="quranClass" className="">
        <QuranClass />
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <h2 className="h2-bold">Upcoming Events</h2>

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

      <section id="qna-carousel" className="wrapper my-8 flex flex-col gap-6">
        <h2 className="h2-bold">Community Q&A</h2>
        <QnaCarousel qnas={qnaList?.slice(0, 10).reverse()} />
      </section>

      <section
        id="contacts"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12"
      >
        <div className="">
          <ContactUs />
        </div>
      </section>
    </>
  );
}
