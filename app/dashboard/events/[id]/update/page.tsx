import EventForm from "@/app/dashboard/components/EventForm";
import { getEventById } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs/server";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const UpdateEvent = async ({ params }: PageProps) => {
  const { sessionClaims } = await auth();

  const userId = sessionClaims?.userId as string;
  const resolvedParams = await params;
  const event = await getEventById(resolvedParams.id);

  return (
    <>
      <section className=" py-2 md:py-5">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Update Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm
          type="Update"
          event={event}
          eventId={event._id}
          userId={userId}
        />
      </div>
    </>
  );
};

export default UpdateEvent;
