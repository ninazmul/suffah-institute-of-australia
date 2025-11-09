"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import BookingForm from "@/app/dashboard/components/BookingForm";
import { getAllBookings } from "@/lib/actions/booking.actions";
import { getAllTeachers } from "@/lib/actions/teacher.actions";
import { IBooking } from "@/lib/database/models/booking.model";
import { ITeacher } from "@/lib/database/models/teacher.model";

const QuranClass = () => {
  const [bookings, setBookings] = useState<IBooking[]>([]);
  const [teachers, setTeachers] = useState<ITeacher[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const bookingsData = await getAllBookings();
        const teachersData = await getAllTeachers();
        setBookings(bookingsData);
        setTeachers(teachersData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className="bg-white flex flex-col-reverse items-center justify-center gap-10">
      {/* Left Side - Image */}
      <div className="flex-1 mb-10">
        <div className="rounded-xl p-4 bg-[#fff5f0]">
          <Image
            src="/assets/images/quranClass.jpeg"
            alt="Quran Class"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
      </div>

      {/* Right Side - Content */}
      <div className="flex-1">
        <p className="text-sm text-red-500 font-semibold mb-2">
          Learn Qur&apos;an @ your home
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 leading-tight italic">
          “Read the Qur’an, for it will come as an intercessor for its reciters
          on the Day of Resurrection.”
          <br />
          <span className="relative inline-block">
            <span className="relative z-10 text-lg"> - Sahih Muslim</span>
            <span className="absolute left-0 bottom-1 w-full h-1 bg-orange-400 -z-10 transform rotate-2"></span>
          </span>
        </h2>
        <p className="text-gray-500 mt-4 text-sm leading-relaxed">
          At the{" "}
          <span className="font-semibold">Suffah Institute of Australia</span>,
          we provide{" "}
          <span className="font-semibold">
            accessible, flexible, and high-quality Qur&apos;an lessons
          </span>{" "}
          tailored to individual needs. Our{" "}
          <span className="font-semibold">non-profit initiative</span> ensures
          you only pay for your tutor&apos;s time—no hidden costs or profit.
        </p>

        {/* What we offer */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-orange-600 mb-4">
            What we offer
          </h3>
          <ul className="space-y-3">
            {[
              "Affordable fees (AU $4 / 45 minutes session)",
              "Flexible timing",
              "Qualified & dedicated teachers (All teachers are Hafiz & A'lim)",
              "Basic & advanced Islamic studies",
              "Classes available in English, Arabic, Urdu, Bengali",
              "Ongoing progress monitoring",
              "One-on-one sessions",
              "Suitable for all age groups",
            ].map((item, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-gray-700 text-sm md:text-base"
              >
                <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Call to Action */}
        <div className="mt-6">
          <Sheet>
            <SheetTrigger className="w-full md:w-max">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-full shadow transition-all duration-300"
              >
                Book Now <span className="text-sm">(AU $4)</span>
              </Button>
            </SheetTrigger>

            <SheetContent className="bg-white">
              <SheetHeader>
                <SheetTitle>Book Your Class</SheetTitle>
                <p className="text-gray-500 text-sm mb-2">
                  Fill out the form below to book your Qur&apos;an class.
                </p>
              </SheetHeader>
              <div className="py-5">
                {loading ? (
                  <p>Loading...</p>
                ) : (
                  <BookingForm
                    type="Create"
                    teachers={teachers}
                    bookings={bookings}
                  />
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </section>
  );
};

export default QuranClass;
