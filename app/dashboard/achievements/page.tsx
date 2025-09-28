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
import { getAllAchievement } from "@/lib/actions/achievement.actions";
import AchievementsTable from "../components/AchievementTable";
import AchievementForm from "../components/AchievementForm";

const Page = async () => {
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;

  const achievements = await getAllAchievement();

  return (
    <>
      <section className=" py-2 md:py-5">
        <Sheet>
          <div className="wrapper flex flex-wrap justify-between items-center">
            <h3 className="h3-bold text-center sm:text-left">All Achievements</h3>
            <SheetTrigger>
              <Button size="lg" className="rounded-full">
                Add Achievement
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle>Add Achievement to Gallery</SheetTitle>
              <SheetDescription>
                Use this form to upload a achievement to the gallery. Ensure the image
                is high-quality and follows the system&apos;s guidelines for
                proper display and organization within the gallery.
              </SheetDescription>
            </SheetHeader>
            <div className="py-5">
              <AchievementForm userId={userId} type="Create" />
            </div>
          </SheetContent>
        </Sheet>
      </section>

      <div className="wrapper my-8">
        <AchievementsTable achievements={achievements} />
      </div>
    </>
  );
};

export default Page;
