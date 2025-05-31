import CheckoutButton from "@/components/shared/CheckoutButton";
import Collection from "@/components/shared/Collection";
import ShareButton from "@/components/shared/ShareButton";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import { formatDateTime } from "@/lib/utils";
import Image from "next/image";
import { FaCalendar, FaGlobe, FaLocationPin } from "react-icons/fa6";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    [key: string]: string | string[] | undefined;
  }>;
};

export async function generateMetadata({ params }: PageProps) {
  const resolvedParams = await params;
  const event = await getEventById(resolvedParams.id);

  if (!event) {
    return {
      title: "Event Not Found",
      description: "The requested event could not be found.",
    };
  }

  const eventTitle = `${event.title} | Event`;
  const eventDescription =
    event.description ||
    "Join this exciting event and explore amazing opportunities!";
  const eventImage = event.imageUrl || "/assets/images/logo.png";
  const eventUrl = `https://www.osmci.org/events/${event._id}`;

  return {
    title: eventTitle,
    description: eventDescription,
    alternates: {
      canonical: eventUrl,
    },
    openGraph: {
      title: eventTitle,
      description: eventDescription,
      url: eventUrl,
      images: [{ url: eventImage, width: 1200, height: 630, alt: event.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: eventTitle,
      description: eventDescription,
      images: [eventImage],
    },
    other: {
      "og:site_name": "Suffah Institute of Australia Incorporation",
      "og:locale": "en_US",
    },
    structuredData: {
      "@context": "https://schema.org",
      "@type": "Event",
      name: event.title,
      description: eventDescription,
      startDate: event.startDateTime,
      endDate: event.endDateTime,
      location: {
        "@type": "Place",
        name: event.location,
      },
      image: eventImage,
      url: eventUrl,
      offers: {
        "@type": "Offer",
        price: event.isFree ? "0" : event.price.adult,
        priceCurrency: "AUD",
        availability: "https://schema.org/InStock",
      },
    },
  };
}

const EventDetails = async ({ params, searchParams }: PageProps) => {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;

  const event = await getEventById(resolvedParams.id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: resolvedSearchParams.page as string,
  });

  return (
    <>
      <section className="flex justify-center bg-primary-50 bg-dotted-pattern bg-contain">
        <div className="grid grid-cols-1 2xl:max-w-7xl">
          <Image
            src={event.imageUrl}
            alt="hero image"
            width={1920}
            height={1000}
            className="lg:w-3/4 object-cover object-center mx-auto p-4"
          />

          <div className="flex w-full flex-col gap-8 p-5 md:p-10">
            <div className="flex flex-col gap-6">
              <h2 className="h2-bold">{event.title}</h2>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <div className="flex gap-3">
                  <p className="p-bold-20 rounded-full bg-green-500/10 px-5 py-2 text-green-700">
                    {event.isFree
                      ? "FREE"
                      : `$${event.price.infant}-${event.price.adult}`}
                  </p>
                  <p className="p-medium-16 rounded-full bg-grey-500/10 px-4 py-2.5 text-grey-500">
                    {event.category.name}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <CheckoutButton event={event} />
              <ShareButton eventId={event?._id} eventName={event?.title} />
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex md:items-center gap-2 md:gap-3">
                <FaCalendar className="text-red-400 size-5" />
                <div className="p-medium-16 lg:p-regular-20 flex flex-wrap items-center gap-x-4">
                  <p>
                    {formatDateTime(event.startDateTime).dateOnly} -{" "}
                    {formatDateTime(event.startDateTime).timeOnly}
                  </p>
                  <p>
                    {formatDateTime(event.endDateTime).dateOnly} -{" "}
                    {formatDateTime(event.endDateTime).timeOnly}
                  </p>
                </div>
              </div>
              <div className="p-regular-20 flex items-center gap-3">
                <FaGlobe className="text-red-400 size-5" />
                <p className="p-medium-16 lg:p-regular-20">
                  timeZone: (Australia/Sydney)
                </p>
              </div>
              <div className="p-regular-20 flex items-center gap-3">
                <FaLocationPin className="text-red-400 size-5" />
                <p className="p-medium-16 lg:p-regular-20">{event.location}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <p className="p-bold-20 text-grey-600">Event Overview:</p>
              <p className="p-medium-16 lg:p-regular-18">{event.description}</p>
              <p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
                {event.url}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* EVENTS with the same category */}
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Related Events</h2>

        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Events Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={3}
          page={resolvedSearchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default EventDetails;
