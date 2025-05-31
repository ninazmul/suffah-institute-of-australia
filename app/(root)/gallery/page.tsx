/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { getAllPhoto } from "@/lib/actions/gallery.actions";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageProps {
  src: string;
  caption: string;
  category: string;
}

const Page = () => {
  const [images, setImages] = useState<ImageProps[]>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(-1);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const photos = await getAllPhoto();
        if (photos.length > 0) {
          setImages(
            photos.map((photo: any) => ({
              src: photo.image,
              caption: photo.title,
              category: photo.category,
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, []);

  const openModal = (index: number) => {
    setCurrentIndex(index);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setCurrentIndex(-1);
  };

  const currentImage = images[currentIndex];

  const renderGallery = () => {
    return images.length > 0 ? (
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-primary-50 bg-dotted-pattern bg-contain p-5 md:p-10 mx-auto gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {images.map((image, index) => (
          <motion.div
            key={index}
            className="relative h-max cursor-pointer"
            whileHover={{ scale: 1.05 }}
            onClick={() => openModal(index)}
          >
            <Image
              src={image.src}
              alt={image.caption}
              width={500}
              height={500}
              className="w-full rounded-lg shadow-md"
            />
            <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white text-sm p-1 rounded-b-lg w-full text-center">
              {image.caption}
            </div>
          </motion.div>
        ))}
      </motion.div>
    ) : (
      <div className="flex items-center justify-center min-h-[50vh] bg-primary-50 bg-dotted-pattern bg-contain p-5 md:p-10">
        <p className="text-center text-gray-500">No images available.</p>
      </div>
    );
  };

  return (
    <>
      <section className="wrapper py-8 md:py-12">
        <div className="flex flex-col gap-8 md:gap-12">
          <h2 className="h2-bold">Discover the Gallery</h2>
          <p className="p-regular-20 md:p-regular-24">
            Browse through a collection of images showcasing events that unite
            the Muslim community—
            <br />
            prayers, gatherings, celebrations, and cherished moments.
          </p>
        </div>

        <div className="mt-8">{renderGallery()}</div>

        {/* Modal */}
        <AnimatePresence>
          {modalOpen && currentImage && (
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              aria-hidden={!modalOpen}
            >
              <motion.div
                className="relative w-11/12 max-w-2xl max-h-11/12 mx-auto rounded-lg shadow-lg"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={currentImage.src}
                  alt={currentImage.caption}
                  width={500}
                  height={500}
                  className="w-full h-max rounded-lg"
                />
                <Button
                  size={"sm"}
                  className="absolute top-2 right-2 text-white bg-rose-500"
                  onClick={closeModal}
                  aria-label="Close modal"
                >
                  ✕
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default Page;
