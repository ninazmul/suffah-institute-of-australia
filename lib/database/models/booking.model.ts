import mongoose, { Document, Schema } from "mongoose";

export interface IBooking extends Document {
  _id: string;
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
  progress: string;
  payment: string;
  note?: string;
  date: Date;
  status: string;
}

const BookingSchema = new Schema<IBooking>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  age: { type: String, required: true },
  language: { type: String, required: true },
  course: { type: String, required: true },
  teacher: { type: String, required: true },
  schedule: [
    {
      day: { type: String, required: true },
      timeSlot: { type: String, required: true },
    },
  ],
  progress: { type: String, required: true, default: "Not started" },
  payment: { type: String, required: true, default: "Unpaid" },
  note: { type: String, required: false },
  date: { type: Date, required: true },
  status: { type: String, required: true, default: "Pending" },
});

// ✅ Corrected safe model instantiation
const Booking =
  mongoose.models?.Booking ||
  mongoose.model<IBooking>("Booking", BookingSchema);

export default Booking;
