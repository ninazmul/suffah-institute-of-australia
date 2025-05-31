import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { getAllQna } from "@/lib/actions/qna.actions";
import QnaTable from "../components/QnaTable";
import QnaForm from "../components/QnaForm";
import { auth } from "@clerk/nextjs/server";
import { getUserEmailById } from "@/lib/actions/user.actions";

const Page = async () => {
  const { sessionClaims } = await auth();
  const userId = sessionClaims?.userId as string;
  const email = await getUserEmailById(userId);

  const qna = await getAllQna();

  return (
    <>
      <section className=" py-2 md:py-5">
        <Sheet>
          <div className="wrapper flex flex-wrap justify-between items-center">
            <h3 className="h3-bold text-center sm:text-left">All QNA&apos;s</h3>
            <SheetTrigger>
              <Button size="lg" className="rounded-full">
                Create Question
              </Button>
            </SheetTrigger>
          </div>

          <SheetContent className="bg-white">
            <SheetHeader>
              <SheetTitle>Ask New Question</SheetTitle>
              <SheetDescription>
                Use this form to ask a new question. Make sure your question is
                clear and specific so others can provide helpful answers.
              </SheetDescription>
            </SheetHeader>
            <div className="py-5">
              <QnaForm type="Create" email={email} />
            </div>
          </SheetContent>
        </Sheet>
      </section>

      <div className="wrapper my-8">
        <QnaTable qna={qna} />
      </div>
    </>
  );
};

export default Page;
