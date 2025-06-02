import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import JsonToExcel from "../components/JsonToExcel";
import BookingForm from "../components/BookingForm";
import { getAllBookings } from "@/lib/actions/booking.actions";
import { getAllTeachers } from "@/lib/actions/teacher.actions";
import BookingTable from "../components/BookingTable";

const Page = async () => {
  const bookings = await getAllBookings();
  const teachers = await getAllTeachers();

  return (
    <>
      <section className="py-2 md:py-5">
        <Sheet>
          <div className="wrapper flex flex-wrap justify-between items-center gap-4 mx-auto">
            <div className="flex items-center gap-2">
              <h3 className="h3-bold text-center sm:text-left">
                Qur&apos;an Class Bookings
              </h3>
              <JsonToExcel data={bookings} fileName="bookings.xlsx" />
            </div>
            <SheetTrigger className="w-full md:w-max">
              <Button size="lg" className="rounded-full w-full">
                Add Booking
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle>Add a Qur&apos;an Class Booking</SheetTitle>
              <SheetDescription>
                Use this form to add a new Qur&apos;an class booking. Please
                ensure the student, teacher, and schedule details are accurate
                to maintain proper records and class organization.
              </SheetDescription>
            </SheetHeader>
            <div className="py-5">
              <BookingForm type="Create" teachers={teachers} bookings={bookings} />
            </div>
          </SheetContent>
        </Sheet>
      </section>

      <div className="wrapper my-8">
        <BookingTable bookings={bookings} teachers={teachers} />
      </div>
    </>
  );
};

export default Page;
