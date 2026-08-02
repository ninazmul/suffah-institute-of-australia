"use client";

import React, { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { HandHeartIcon } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutDonation } from "@/lib/actions/donation.actions";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

const Donation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      alert("Donation successful! Thank you for your support.");
    }
    if (query.get("canceled")) {
      alert("Donation canceled. Feel free to try again.");
    }
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
      if (!stripe) {
        throw new Error("Stripe initialization failed.");
      }

      await checkoutDonation({ amount: donationAmount });
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("An error occurred during the donation process. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger>
          <Button className="rounded-full bg-[#FFD700] text-[#003f3e] font-bold px-6 py-2 hover:bg-yellow-400 flex items-center gap-2">
            <HandHeartIcon className="hidden md:flex"/> <span>Donate</span>
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-white">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-gray-800">
              Support Us with a Donation
            </SheetTitle>
            <SheetDescription className="text-gray-600">
              Your generous contributions help us continue our mission to make a
              positive impact. You can donate directly via Stripe below.
            </SheetDescription>
          </SheetHeader>
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
          <div className="py-5 border-t border-gray-300 mt-3">
            <h1 className="text-lg font-semibold text-gray-800 mb-2 text-center">
              Or
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
                className={`bg-primary-500 text-white px-4 py-2 rounded-md ${
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
    </>
  );
};

export default Donation;
