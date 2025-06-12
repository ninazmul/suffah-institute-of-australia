import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import QnaCarousel from "@/components/shared/QnaCarousel";
import QuranClass from "@/components/shared/QuranClass";
import Search from "@/components/shared/Search";
import Services from "@/components/shared/Services";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { getAllQna } from "@/lib/actions/qna.actions";
import { SearchParamProps } from "@/types";
import Link from "next/link";

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

      <section id="events" className="my-8 bg-[#fff5f0]">
        <div className="flex flex-col gap-8 md:gap-12 wrapper">
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
        </div>
      </section>

      <section id="qna-carousel" className="wrapper my-16 flex flex-col gap-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h2 className="h2-bold">Islamic Questions</h2>
          <Link href="/qna">
            <Button
              size="lg"
              className="rounded-full bg-orange-500 text-white shadow-md hover:shadow-lg transition-all"
            >
              View All
            </Button>
          </Link>
        </div>

        <div className="mt-6">
          <QnaCarousel qnas={qnaList?.slice(0, 10).reverse()} />
        </div>
      </section>
    </>
  );
}
