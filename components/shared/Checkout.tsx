import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { IEvent } from "@/lib/database/models/event.model";
import { Button } from "../ui/button";
import { createOrder } from "@/lib/actions/order.actions";
import toast from "react-hot-toast";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Checkout = ({ event }: { event: IEvent }) => {
  const [adults, setAdults] = useState(0);
  const [kids, setKids] = useState(0);
  const [infants, setInfants] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [note, setNote] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");
  const [buyerNumber, setBuyerNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const adultPrice = (Number(event.price.adult) || 0) * adults;
    const kidsPrice = (Number(event.price.kids) || 0) * kids;
    const infantPrice = (Number(event.price.infant) || 0) * infants;
    setTotalPrice(adultPrice + kidsPrice + infantPrice);
  }, [adults, kids, infants, event.price]);

  const onCheckout = async () => {
    if (!buyerName || !buyerEmail || !buyerNumber) {
      alert("Please fill out all required fields.");
      return;
    }

    setLoading(true);
    try {
      const order = {
        eventTitle: event.title,
        eventId: event._id,
        price: totalPrice.toFixed(2),
        isFree: event.isFree,
        buyerName,
        buyerEmail,
        buyerNumber,
        adults,
        kids,
        infants,
        note,
        totalAmount: totalPrice,
        createdAt: new Date(), 
      };

      await createOrder(order);
      toast.success("Order placed successfully!");
      setIsOpen(false);
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button size="lg" className="button">
            Book Event
          </Button>
        </SheetTrigger>
        <SheetContent className="bg-white">
          <SheetHeader>
            <SheetTitle className="text-xl font-bold text-gray-800">
              {event.title}
            </SheetTitle>
            <SheetDescription className="text-gray-600">
              Secure your spot for an unforgettable experience! Book your event
              tickets seamlessly through Stripe below.
            </SheetDescription>
          </SheetHeader>
          <div className="form-group">
            <label htmlFor="buyerName">Name:</label>
            <input
              type="text"
              id="buyerName"
              value={buyerName}
              onChange={(e) => setBuyerName(e.target.value)}
              className="input-field"
              placeholder="Your Full Name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="buyerEmail">Email:</label>
            <input
              type="email"
              id="buyerEmail"
              value={buyerEmail}
              onChange={(e) => setBuyerEmail(e.target.value)}
              className="input-field"
              placeholder="Your Email Address"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="buyerNumber">Phone Number:</label>
            <input
              type="tel"
              id="buyerNumber"
              value={buyerNumber}
              onChange={(e) => setBuyerNumber(e.target.value)}
              className="input-field"
              placeholder="Your Contact Number"
              required
            />
          </div>
          {!event.isFree && (
            <>
              <div className="form-group">
                <label htmlFor="adults">Adults:</label>
                <input
                  type="number"
                  id="adults"
                  min="0"
                  value={adults}
                  onChange={(e) => setAdults(Number(e.target.value))}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label htmlFor="kids">Kids:</label>
                <input
                  type="number"
                  id="kids"
                  min="0"
                  value={kids}
                  onChange={(e) => setKids(Number(e.target.value))}
                  className="input-field"
                />
              </div>
              <div className="form-group">
                <label htmlFor="infants">Infants:</label>
                <input
                  type="number"
                  id="infants"
                  min="0"
                  value={infants}
                  onChange={(e) => setInfants(Number(e.target.value))}
                  className="input-field"
                />
              </div>
              <p className="text-md font-medium mt-2">
                Total Price: ${totalPrice.toFixed(2)}
              </p>
            </>
          )}
          {/* <div className="form-group mt-4">
              <label htmlFor="note">Note:</label>
              <textarea
                id="note"
                value={note}
                onChange={(e) => setNote(e.target.value)}
                className="input-field w-full resize-none h-20"
                placeholder="Any Note for Food/Allergy..."
              />
            </div> */}
          <div className="form-group mt-4">
            <label htmlFor="note">Reference:</label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="input-field w-full resize-none h-20"
              placeholder="Bank payer's name..."
            />
            <div>
              <p className="text-xs text-gray-600 mt-2">
                Please provide the full name of the individual who made the bank
                payment in the reference field. This is necessary for
                transaction verification.
              </p>
            </div>
          </div>
          <div className="modal-actions flex justify-between mt-4">
            <Button
              type="button"
              onClick={onCheckout}
              size="lg"
              className="button"
              disabled={loading}
            >
              {loading
                ? "Processing..."
                : !event.isFree
                ? "Register"
                : "Register"}
            </Button>
            <Button
              type="button"
              onClick={() => setIsOpen(false)}
              size="lg"
              className="button bg-gray-300 text-black"
              disabled={loading}
            >
              Close
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default Checkout;
