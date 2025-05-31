import { auth } from "@clerk/nextjs/server";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import CategoryForm from "../components/CategoryForm";
import CategoryTable from "../components/CategoryTable";
import { getAllCategories } from "@/lib/actions/category.actions";

const Page = async () => {
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;

  const categories = await getAllCategories();

  return (
    <>
      <section className=" py-2 md:py-5">
        <Sheet>
          <div className="wrapper flex flex-wrap justify-between items-center gap-4 mx-auto">
            <h3 className="h3-bold text-center sm:text-left">All Categories</h3>
            <SheetTrigger className="w-full md:w-max">
              <Button size="lg" className="rounded-full w-full">
                Create Category
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle>Create New Category</SheetTitle>
              <SheetDescription>
                Use this form to create a new category within the system. Fill
                out all required fields accurately to ensure the category is set
                up correctly and displayed appropriately.
              </SheetDescription>
            </SheetHeader>
            <div className="py-5">
              <CategoryForm userId={userId} type="Create" />
            </div>
          </SheetContent>
        </Sheet>
      </section>

      <div className="wrapper my-8">
        <CategoryTable categories={categories} />
      </div>
    </>
  );
};

export default Page;
