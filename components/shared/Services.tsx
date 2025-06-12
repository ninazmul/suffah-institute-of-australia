"use client";

import { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const carouselItems = [
  {
    src: "/assets/images/homeless.jpeg",
    alt: "Empower the Homeless",
    legend: "Empower the Homeless",
    description:
      "In Australia, SIA assists people at risk of homelessness by providing essential aid such as food, shelter, and pathways to employment. We collaborate with local organizations to help individuals transition to stable housing and long-term security.\nOverseas, we support displaced families affected by poverty and disasters, helping them access shelter, basic necessities, and community-driven aid programs.",
  },
  {
    src: "/assets/images/edu.jpeg",
    alt: "Advance Education",
    legend: "Advance Education",
    description:
      "SIA offers scholarships and educational assistance in both Australia and overseas to those who cannot afford schooling.\nIn Australia, we support students from disadvantaged backgrounds, ensuring they have access to quality education and learning resources.\nOverseas, we focus on underserved communities by funding education, providing learning materials, and enabling youth to pursue academic and vocational training.",
  },
  {
    src: "/assets/images/health.jpeg",
    alt: "Support Healthcare",
    legend: "Support Healthcare",
    description:
      "Access to healthcare is a challenge for many individuals in both regions.\nIn Australia, SIA supports people struggling with medical care costs by funding treatments and promoting well-being initiatives.\nOverseas, we provide eye treatments for individuals who lack access to medical services, ensuring that they receive the care they need to lead healthier lives.",
  },
  {
    src: "/assets/images/elevate.jpeg",
    alt: "Elevate Communities",
    legend: "Elevate Communities",
    description:
      "At the Suffah Institute of Australia (SIA), we believe that building stronger communities goes beyond providing aid—it requires fostering understanding, reducing misconceptions, and bridging gaps between diverse perspectives.\nIn Australia, we actively support culturally and linguistically diverse communities, ensuring inclusivity and mutual respect among individuals of different backgrounds. By promoting interfaith dialogue and education, we help reduce misconceptions and encourage meaningful conversations that strengthen societal unity.\nOverseas, we uplift impoverished communities through direct aid and educational programs to promote awareness and unity.",
  },
  {
    src: "/assets/images/knowledge.jpeg",
    alt: "Expand Knowledge",
    legend: "Expand Knowledge",
    description:
      "Education is more than academics—it’s about empowering minds.\nIn Australia, we organize learning initiatives, mentorship programs, and workshops to help individuals gain skills that improve their prospects.\nWe provide knowledge-building opportunities through educational programs, helping people overcome religious, social and economic challenges.",
  },
];

const Services = () => {
  const [modalData, setModalData] = useState<null | (typeof carouselItems)[0]>(
    null
  );

  const closeModal = () => setModalData(null);

  return (
    <>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        autoPlay
        interval={5000}
        swipeable
        emulateTouch
      >
        {carouselItems.map((item, index) => (
          <div
            key={index}
            className="relative h-[60vh] md:h-[70vh] w-full bg-center bg-cover flex items-center justify-center text-white cursor-pointer"
            style={{ backgroundImage: `url(${item.src})` }}
            onClick={() => setModalData(item)}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 max-w-3xl px-6 text-center">
              <h2 className="text-2xl md:text-4xl font-bold mb-4">
                {item.legend}
              </h2>
              <p className="text-sm md:text-base whitespace-pre-line">
                {item.description.length > 200
                  ? item.description.substring(0, 200) + "..."
                  : item.description}
              </p>
            </div>
          </div>
        ))}
      </Carousel>

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 px-4">
          <div className="bg-white rounded-xl shadow-xl p-6 max-w-2xl w-full relative text-gray-800 overflow-y-auto max-h-[90vh]">
            <button
              className="absolute top-3 right-4 text-2xl font-bold text-white hover:text-black bg-red-500 rounded-full px-2"
              onClick={closeModal}
            >
              &times;
            </button>
            <div
              className="h-48 md:h-96 w-full rounded-lg bg-center bg-cover mb-4"
              style={{ backgroundImage: `url(${modalData.src})` }}
            ></div>
            <h2 className="text-2xl font-semibold mb-3">{modalData.legend}</h2>
            <p className="whitespace-pre-line text-sm md:text-base text-justify">
              {modalData.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
