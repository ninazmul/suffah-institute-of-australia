"use client";

import { useState, useEffect, useRef } from "react";
import { getAllQna, likeQuestion, likeAnswer } from "@/lib/actions/qna.actions";
import { Heart } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import QnaForm from "@/app/dashboard/components/QnaForm";
import { getUserByClerkId, getUserEmailById } from "@/lib/actions/user.actions";
import QuranClass from "@/components/shared/QuranClass";

interface QnaItem {
  _id: string;
  question: string;
  answer: string;
  questionLikes: {
    count: number;
    likedBy: string[];
  };
  answerLikes: {
    count: number;
    likedBy: string[];
  };
}

const QnAPage = () => {
  const { user } = useUser();
  const userId = user?.id || "";
  const [email, setEmail] = useState<string>("");
  const [qnaData, setQnaData] = useState<QnaItem[]>([]);
  const [search, setSearch] = useState("");
  const [likeAnimating, setLikeAnimating] = useState<string | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);
  const sheetRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchEmail = async () => {
      if (userId) {
        const userID = await getUserByClerkId(userId);
        const result = await getUserEmailById(userID);
        setEmail(result || "");
      }
    };
    fetchEmail();
  }, [userId]);

  console.log("Email", email, "userId", userId);

  const refreshQnaData = async () => {
    try {
      const data = await getAllQna();
      setQnaData(data.reverse());
    } catch (error) {
      console.error("Failed to fetch QnA data:", error);
    }
  };

  useEffect(() => {
    refreshQnaData();
  }, []);

  const filteredQnA = qnaData.filter((item) =>
    `${item.question} ${item.answer}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const animateLike = (id: string) => {
    setLikeAnimating(id);
    setTimeout(() => setLikeAnimating(null), 300);
  };

  const handleLikeQuestion = async (id: string) => {
    const target = qnaData.find((item) => item._id === id);
    if (!userId || !target || target.questionLikes.likedBy.includes(userId))
      return;

    try {
      await likeQuestion(id, userId);
      setQnaData((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                questionLikes: {
                  count: item.questionLikes.count + 1,
                  likedBy: [...item.questionLikes.likedBy, userId],
                },
              }
            : item
        )
      );
      animateLike(id + "-q");
    } catch (error) {
      console.error("Failed to like question:", error);
    }
  };

  const handleLikeAnswer = async (id: string) => {
    const target = qnaData.find((item) => item._id === id);
    if (!userId || !target || target.answerLikes.likedBy.includes(userId))
      return;

    try {
      await likeAnswer(id, userId);
      setQnaData((prev) =>
        prev.map((item) =>
          item._id === id
            ? {
                ...item,
                answerLikes: {
                  count: item.answerLikes.count + 1,
                  likedBy: [...item.answerLikes.likedBy, userId],
                },
              }
            : item
        )
      );
      animateLike(id + "-a");
    } catch (error) {
      console.error("Failed to like answer:", error);
    }
  };

  return (
    <main className="wrapper my-8 flex flex-wrap gap-8 md:gap-12">
      <QuranClass />
      <section className="">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-orange-500">
          Ask Islamic Questions
        </h1>
        <div className="mb-10 text-center">
          <h3 className="text-xl font-semibold text-gray-500 mb-3">
            Have a question about Islam?
          </h3>
          <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button
                ref={sheetRef}
                size="lg"
                className="rounded-full bg-orange-500 hover:bg-orange-600 text-white shadow-lg hover:brightness-110 transition-all"
              >
                Ask a Scholar
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-white">
              <SheetHeader>
                <SheetTitle>Submit Your Question</SheetTitle>
                <SheetDescription>
                  Ask your Islamic question clearly and respectfully. Our
                  scholars will respond with guidance based on authentic
                  sources.
                </SheetDescription>
              </SheetHeader>
              <div className="py-5">
                <QnaForm
                  type="Create"
                  refreshQnaData={refreshQnaData}
                  closeSheet={() => sheetRef.current?.click()}
                  email={email}
                />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        <input
          type="search"
          placeholder="Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mb-12 px-4 py-2 border border-gray-300 rounded-xl text-lg
                   focus:outline-none focus:ring-4 focus:ring-orange-400 transition"
        />

        <div className="flex flex-col gap-10">
          {filteredQnA.length === 0 && (
            <p className="text-center text-gray-500 italic text-lg">
              No Islamic questions found.
            </p>
          )}

          {filteredQnA.map((item) => {
            const questionLiked = item.questionLikes.likedBy.includes(userId);
            const answerLiked = item.answerLikes.likedBy.includes(userId);

            return (
              <article
                key={item._id}
                className="border border-gray-200 rounded-2xl p-8 bg-[#fff5f0] shadow-md
                         hover:shadow-xl transition-shadow duration-300"
              >
                <header className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl font-semibold text-gray-800 leading-snug">
                    {item.question}
                  </h3>

                  <button
                    onClick={() => handleLikeQuestion(item._id)}
                    aria-label="Like question"
                    disabled={!userId || questionLiked}
                    className={`
                    flex items-center gap-2
                    text-lg font-semibold
                    select-none
                    transition-colors duration-200 ease-in-out
                    ${
                      questionLiked
                        ? "text-orange-600 cursor-default"
                        : "text-gray-400 hover:text-orange-600 cursor-pointer"
                    }
                    ${
                      likeAnimating === item._id + "-q"
                        ? "scale-110"
                        : "scale-100"
                    }
                  `}
                    style={{ willChange: "transform, color" }}
                  >
                    <Heart
                      size={24}
                      className={
                        questionLiked ? "fill-orange-600 text-orange-600" : ""
                      }
                    />
                    <span>{item.questionLikes.count}</span>
                  </button>
                </header>

                <section className="pl-6 border-l-4 border-orange-100">
                  <p className="mb-5 text-gray-700 whitespace-pre-line min-h-[60px]">
                    {item.answer || (
                      <em className="text-gray-400 italic">
                        This question has not been answered by a scholar yet.
                      </em>
                    )}
                  </p>

                  {item.answer && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleLikeAnswer(item._id)}
                        aria-label="Like answer"
                        disabled={!userId || answerLiked}
                        className={`
        flex items-center gap-2
        text-lg font-semibold
        select-none
        transition-colors duration-200 ease-in-out
        ${
          answerLiked
            ? "text-orange-600 cursor-default"
            : "text-gray-400 hover:text-orange-600 cursor-pointer"
        }
        ${likeAnimating === item._id + "-a" ? "scale-110" : "scale-100"}
      `}
                        style={{ willChange: "transform, color" }}
                      >
                        <Heart
                          size={24}
                          className={
                            answerLiked ? "fill-orange-600 text-orange-600" : ""
                          }
                        />
                        <span>{item.answerLikes.count}</span>
                      </button>
                    </div>
                  )}
                </section>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default QnAPage;
