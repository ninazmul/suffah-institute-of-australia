"use client";

import { IEvent } from "@/lib/database/models/event.model";
import React, { useState, useEffect, useRef } from "react";
import { Button } from "../ui/button";
import Checkout from "./Checkout";
import FreeOrderForm from "@/app/dashboard/components/FreeOrderForm";
import { CircleX } from "lucide-react";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const hasEventFinished = new Date(event.endDateTime) < new Date();
  const freeEvent = event.isFree;

  // State to manage the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Ref for modal container to detect clicks outside
  const modalRef = useRef<HTMLDivElement>(null);

  // Function to open the modal
  const openModal = () => setIsModalOpen(true);

  // Function to close the modal
  const closeModal = () => setIsModalOpen(false);

  // Close modal if clicking outside of it
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        closeModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isModalOpen]);

  return (
    <div className="flex items-center gap-3">
      {hasEventFinished ? (
        <p className="p-2 text-red-400">
          Sorry, tickets are no longer available.
        </p>
      ) : (
        <>
          {freeEvent && (
            <Button
              className="button rounded-full"
              size={"lg"}
              onClick={openModal}
            >
              Book Now
            </Button>
          )}

          {/* Modal for Free Event Registration */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 w-full overflow-y-auto">
              <div
                ref={modalRef}
                className="bg-white p-6 rounded-lg max-w-2xl w-full"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">
                    Register for Our Event
                  </h2>
                  <div className="flex justify-end w-auto">
                    <Button
                      variant="outline"
                      className="rounded-full"
                      onClick={closeModal}
                    >
                      <CircleX className="w-10 h-10" />
                    </Button>
                  </div>
                </div>
                <p className="mb-4 text-sm sm:text-base">
                  Fill out this form to secure your spot at the event. Ensure
                  all information is accurate and complete. We will contact you
                  via the email address provided for further updates and
                  details.
                </p>
                <FreeOrderForm event={event} closeModal={closeModal} />
              </div>
            </div>
          )}

          {!freeEvent && (
            <>
              <Checkout event={event} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default CheckoutButton;
