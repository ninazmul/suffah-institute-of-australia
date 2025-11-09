"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutDonation } from "@/lib/actions/donation.actions";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success"))
      alert("Donation successful! Thank you for your support.");
    if (query.get("canceled"))
      alert("Donation canceled. Feel free to try again.");
  }, []);

  const onCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    const donationAmount = parseFloat(amount);
    if (isNaN(donationAmount) || donationAmount <= 0) {
      alert("Please enter a valid donation amount.");
      return;
    }

    setIsLoading(true);
    try {
      const stripe = await stripePromise;
      if (!stripe) throw new Error("Stripe initialization failed.");
      await checkoutDonation({ amount: donationAmount });
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during the donation process. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white overflow-hidden">
      {/* Background with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/assets/images/homeless.jpeg"
          alt="SIA Purpose Background"
          fill
          priority
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-24 md:py-32">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Strengthen Society Through Generosity
        </h1>
        <p className="max-w-3xl text-lg md:text-xl text-gray-200 mb-10">
          Together, we can empower communities and transform lives through
          compassion, service, and shared humanity.
        </p>
        <Button
          onClick={() =>
            document
              .getElementById("mission-vision")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="mt-6 bg-white/20 backdrop-blur-md text-white border border-white/40 px-6 py-3 rounded-full text-sm md:text-base font-medium hover:bg-white/30 transition-all"
        >
          Learn More ↓
        </Button>
      </div>

      {/* Mission & Vision Section */}
      <div
        id="mission-vision"
        className="relative z-10 bg-white text-gray-800 rounded-t-[3rem] shadow-xl py-16 px-6 md:px-16 -mt-10"
      >
        <div className="max-w-5xl mx-auto text-center space-y-8">
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-gray-900">
              Our Mission
            </h2>
            <p className="text-lg text-gray-700 text-justify">
              To advance health, education, religion, and social welfare by
              providing essential services and support to underserved
              communities in Australia and overseas. We are committed to
              offering medical assistance, educational opportunities, religious
              guidance, and social welfare programs to improve the quality of
              life for those in need.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-semibold mb-4 text-gray-900">
              Our Vision
            </h2>
            <p className="text-lg text-gray-700 text-justify">
              To create a world where every individual has access to quality
              healthcare, education, and social support, fostering a community
              of mutual respect and understanding. We envision a future where
              our efforts lead to healthier, more educated, and spiritually
              enriched societies, free from poverty and inequality.
            </p>
          </div>
        </div>

        {/* Call-to-Action Tiles */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Link
            href="/contact"
            className="group flex flex-col text-center justify-center items-center bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold text-xl py-10 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            <span>I want to be part of SIA’s Journey!</span>
            <div className="mt-2 text-sm opacity-80 group-hover:opacity-100">
              Get in touch →
            </div>
          </Link>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="group flex flex-col text-center justify-center items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white font-semibold text-xl py-10 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all">
                <span>I will donate</span>
                <div className="mt-2 text-sm opacity-80 group-hover:opacity-100">
                  Make an impact →
                </div>
              </button>
            </SheetTrigger>

            <SheetContent className="bg-white">
              <SheetHeader>
                <SheetTitle className="text-xl font-bold text-gray-800">
                  Support Us with a Donation
                </SheetTitle>
                <SheetDescription className="text-gray-600">
                  Your contributions help us continue our mission to make a
                  positive impact. You can donate via bank transfer or Stripe.
                </SheetDescription>
              </SheetHeader>

              {/* Bank Info */}
              <div className="py-5 border-t border-gray-300 mt-3">
                <h1 className="text-lg font-semibold text-gray-800 mb-2">
                  Bank Account Information
                </h1>
                <div className="text-gray-700 space-y-1">
                  <p>
                    Account Name:{" "}
                    <span className="font-semibold">
                      Suffah Institute of Australia Inc.
                    </span>
                  </p>
                  <p>
                    BSB: <span className="font-semibold">082-356</span>
                  </p>
                  <p>
                    Account: <span className="font-semibold">43 764 2145</span>
                  </p>
                </div>
              </div>

              {/* Stripe Donation */}
              <div className="py-5 border-t border-gray-300 mt-3">
                <h1 className="text-lg font-semibold text-gray-800 mb-2 text-center">
                  Or Donate via Stripe
                </h1>
                <form
                  onSubmit={onCheckout}
                  className="flex flex-col justify-center w-full space-y-4"
                >
                  <label
                    htmlFor="amount"
                    className="text-sm font-medium text-gray-700"
                  >
                    Donation Amount (AUD)
                  </label>
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter amount"
                    className="p-2 border border-gray-300 rounded-md focus:ring focus:ring-yellow-500"
                    required
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    className={`bg-[#003f3e] text-white px-4 py-2 rounded-md hover:bg-[#00504f] ${
                      isLoading && "opacity-50 cursor-not-allowed"
                    }`}
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Donate via Stripe"}
                  </Button>
                </form>
              </div>
            </SheetContent>
          </Sheet>

          <div className="flex flex-col text-center justify-center items-center bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold text-xl py-10 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all">
            <span>Volunteer with Us</span>
            <div className="mt-2 text-sm opacity-80">Coming soon</div>
          </div>

          <Link
            href={"/achievements"}
            className="flex flex-col justify-center text-center items-center bg-gradient-to-r from-pink-400 to-pink-500 text-gray-900 font-semibold text-xl py-10 rounded-2xl shadow-md hover:shadow-lg hover:scale-105 transition-all"
          >
            <span>Read Our Stories</span>
            <div className="mt-2 text-sm opacity-80">Inspiration & impact</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
