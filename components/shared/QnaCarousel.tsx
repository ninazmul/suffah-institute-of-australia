"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEffect } from "react";
import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";

interface Qna {
  _id: string;
  question: string;
  answer?: string;
}

interface Props {
  qnas: Qna[];
}

const QnaCarousel = ({ qnas }: Props) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000, stopOnInteraction: false }),
  ]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit();
  }, [emblaApi, qnas]);

  return (
    <div className="overflow-hidden" ref={emblaRef}>
      <div className="flex">
        {qnas.map((qna) => (
          <Link
            href={`/qna`}
            key={qna._id}
            className="min-w-full px-4 py-6 border rounded-xl bg-[#fff5f0] dark:bg-gray-900 mx-2 hover:shadow-lg transition-all duration-300"
          >
            <h3 className="text-lg font-semibold line-clamp-2 mb-2">
              {qna.question}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {qna.answer || "No answer yet"}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QnaCarousel;
