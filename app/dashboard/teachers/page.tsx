import { auth } from "@clerk/nextjs/server";
import { getAllTeachers } from "@/lib/actions/teacher.actions";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import TeacherForm from "../components/TeacherForm";
import TeacherTable from "../components/TeacherTable";
import { Button } from "@/components/ui/button";

const Page = async () => {
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;

  const teachers = await getAllTeachers();

  return (
    <>
      <section className=" py-2 md:py-5">
        <Sheet>
          <div className="wrapper flex flex-wrap justify-between items-center">
            <h3 className="h3-bold text-center sm:text-left">All Teachers</h3>
            <SheetTrigger>
              <Button size="lg" className="rounded-full">
                Create Teacher
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle>Create New Teacher</SheetTitle>
              <SheetDescription>
                Use this form to create a new teacher account within the system.
                Fill out all required fields accurately to ensure proper setup
                and access permissions for the new teacher.
              </SheetDescription>
            </SheetHeader>
            <div className="py-5">
              <TeacherForm userId={userId} type="Create" />
            </div>
          </SheetContent>
        </Sheet>
      </section>

      <div className="wrapper my-8">
        <TeacherTable teachers={teachers} />
      </div>
    </>
  );
};

export default Page;
