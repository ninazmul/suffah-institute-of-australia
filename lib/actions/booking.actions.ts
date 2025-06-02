"use server";

import { handleError } from "../utils";
import Booking, { IBooking } from "../database/models/booking.model";
import { connectToDatabase } from "../database";

interface CreateBookingParams {
  name: string;
  email: string;
  age: string;
  language: string;
  course: string;
  teacher: string;
  schedule: {
    day: string;
    timeSlot: string;
  }[];
  progress?: string;
  payment?: string;
  note?: string;
  date: Date;
  status?: string;
}

// ====== CREATE BOOKING
export const createBooking = async (
  params: CreateBookingParams
): Promise<IBooking | void> => {
  try {
    await connectToDatabase();

    // Step 1: Fetch all existing bookings for this teacher on the same date
    const existingBookings = await Booking.find({
      teacher: params.teacher,
      date: params.date,
      status: { $ne: "Cancelled" },
    });

    // Step 2: Flatten all booked slots
    const bookedSlots = existingBookings.flatMap((booking) =>
      booking.schedule.map((s: { day: string; timeSlot: string }) => ({
        day: s.day,
        timeSlot: s.timeSlot,
      }))
    );

    // Step 3: Check for any conflict
    for (const entry of params.schedule) {
      const conflict = bookedSlots.find(
        (slot) => slot.day === entry.day && slot.timeSlot === entry.timeSlot
      );

      if (conflict) {
        throw new Error(
          `Time slot ${entry.timeSlot} on ${
            entry.day
          } is already booked for this teacher on ${params.date.toDateString()}`
        );
      }
    }

    // Step 4: Create booking
    const booking = await Booking.create({
      ...params,
      status: params.status || "Pending",
      progress: params.progress || "Not started",
      payment: params.payment || "Unpaid",
    });

    return JSON.parse(JSON.stringify(booking));
  } catch (error) {
    handleError(error);
  }
};

// ====== GET ALL BOOKINGS
export const getAllBookings = async () => {
  try {
    await connectToDatabase();

    const bookings = await Booking.find();
    return JSON.parse(JSON.stringify(bookings));
  } catch (error) {
    handleError(error);
  }
};

// ====== GET BOOKINGS BY USER EMAIL
export const getBookingsByUser = async (email: string) => {
  try {
    await connectToDatabase();

    const bookings = await Booking.find({ email });

    if (!bookings || bookings.length === 0) {
      console.log(`No bookings found for email: ${email}`);
      return null;
    }

    return JSON.parse(JSON.stringify(bookings));
  } catch (error) {
    console.error("Error fetching bookings by email:", error);
    handleError(error);
  }
};

// ====== UPDATE BOOKING
export const updateBooking = async (
  bookingId: string,
  updateData: Partial<IBooking>
) => {
  try {
    await connectToDatabase();

    const updated = await Booking.findByIdAndUpdate(bookingId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      throw new Error("Booking not found");
    }

    return JSON.parse(JSON.stringify(updated));
  } catch (error) {
    handleError(error);
  }
};

// ====== DELETE BOOKING
export const deleteBooking = async (bookingId: string) => {
  try {
    await connectToDatabase();

    const deleted = await Booking.findByIdAndDelete(bookingId);

    if (!deleted) {
      throw new Error("Booking not found");
    }

    return { message: "Booking deleted" };
  } catch (error) {
    handleError(error);
  }
};

// ====== CHECK BOOKING EXISTENCE BY EMAIL
export const isBookedByEmail = async (email: string): Promise<boolean> => {
  try {
    await connectToDatabase();

    const booking = await Booking.findOne({
      email,
      status: { $ne: "Cancelled" },
    });

    return !!booking;
  } catch (error) {
    console.error("Error checking booking by email:", error);
    handleError(error);
    return false;
  }
};

// ====== CHECK SUBMISSION EXISTENCE BY EMAIL
export const isBookingSubmitted = async (email: string): Promise<boolean> => {
  try {
    await connectToDatabase();

    const booking = await Booking.findOne({ email });

    return !!booking;
  } catch (error) {
    console.error("Error checking booking submission by email:", error);
    handleError(error);
    return false;
  }
};

// ====== GET BOOKING BY ID
export const getBookingById = async (bookingId: string) => {
  try {
    await connectToDatabase();

    const booking = await Booking.findById(bookingId);

    if (!booking) {
      throw new Error("Booking not found");
    }

    return JSON.parse(JSON.stringify(booking));
  } catch (error) {
    handleError(error);
  }
};

// ====== GET ALL BOOKED SLOTS (OPTIONAL BY TEACHER)
export const getBookedSlotsByTeacher = async (teacher?: string) => {
  try {
    await connectToDatabase();

    const filter = teacher
      ? { teacher, status: { $ne: "Cancelled" } }
      : { status: { $ne: "Cancelled" } };

    const bookings = await Booking.find(filter);

    const groupedSlots: Record<string, { day: string; timeSlot: string }[]> = {};

    for (const booking of bookings) {
      const teacherId = booking.teacher;
      const slots = booking.schedule.map((slot: { day: string; timeSlot: string }) => ({
        day: slot.day,
        timeSlot: slot.timeSlot,
      }));

      if (!groupedSlots[teacherId]) {
        groupedSlots[teacherId] = [];
      }

      groupedSlots[teacherId].push(...slots);
    }

    return JSON.parse(JSON.stringify(groupedSlots));
  } catch (error) {
    handleError(error);
  }
};

