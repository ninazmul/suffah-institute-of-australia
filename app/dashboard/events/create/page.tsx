import EventForm from "@/app/dashboard/components/EventForm";
import { auth } from "@clerk/nextjs/server";

const CreateEvent = async () => {
  const { sessionClaims } = await auth();

  const userId = sessionClaims?.userId as string;

  return (
    <>
      <section className=" py-2 md:py-5">
        <h3 className="wrapper h3-bold text-center sm:text-left">
          Create Event
        </h3>
      </section>

      <div className="wrapper my-8">
        <EventForm userId={userId} type="Create" />
      </div>
    </>
  );
};

export default CreateEvent;
