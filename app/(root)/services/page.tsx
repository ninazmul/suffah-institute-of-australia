"use client";

import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import Image from "next/image";

const carouselItems = [
  {
    src: "/assets/1.jpeg",
    alt: "Image 1",
    legend: "Legend 1",
    description: "This is the detailed text for Legend 1",
  },
  {
    src: "/assets/2.jpeg",
    alt: "Image 2",
    legend: "Legend 2",
    description: "This is the detailed text for Legend 2",
  },
  {
    src: "/assets/3.jpeg",
    alt: "Image 3",
    legend: "Legend 3",
    description: "This is the detailed text for Legend 3",
  },
];

export default function AboutPage() {
  const [modalData, setModalData] = useState<null | typeof carouselItems[0]>(
    null
  );

  const closeModal = () => setModalData(null);

  return (
    <>
      <Carousel showThumbs={false}>
        {carouselItems.map((item, index) => (
          <div key={index}>
            <Image
              src={item.src}
              alt={item.alt}
              height={400}
              width={600}
              onClick={() => setModalData(item)}
              className="cursor-pointer object-cover mx-auto"
            />
            <p
              className="legend cursor-pointer"
              onClick={() => setModalData(item)}
            >
              {item.legend}
            </p>
          </div>
        ))}
      </Carousel>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full text-center relative">
            <button
              className="absolute top-2 right-4 text-xl font-bold"
              onClick={closeModal}
            >
              &times;
            </button>
            <Image
              src={modalData.src}
              alt={modalData.alt}
              width={500}
              height={300}
              className="mx-auto rounded mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{modalData.legend}</h2>
            <p>{modalData.description}</p>
          </div>
        </div>
      )}
    </>
  );
}
