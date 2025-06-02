"use client";

import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { createBooking, updateBooking } from "@/lib/actions/booking.actions";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Schema
const bookingFormSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().email("Invalid email."),
  age: z.string().min(1, "Age is required."),
  language: z.string().min(1, "Language is required."),
  course: z.string().min(1, "Course is required."),
  teacher: z.string().min(1, "Teacher is required."),
  schedule: z
    .array(
      z.object({
        day: z.string(),
        timeSlot: z.string().min(1, "Time slot is required."),
      })
    )
    .refine((s) => s.length === 4, {
      message: "You must select exactly 4 day/time slots.",
    }),
  progress: z.string().optional(),
  payment: z.string().optional(),
  note: z.string().optional(),
  date: z.date().optional(),
  status: z.string().min(3, "Status must be valid."),
});

type BookingFormSchema = z.infer<typeof bookingFormSchema> & { id?: string };

type BookingFormProps = {
  type: "Create" | "Update";
  booking?: BookingFormSchema;
  bookingId?: string;
  teachers: { _id: string; name: string }[];
  bookings: BookingFormSchema[];
};

const allDays = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeSlots = ["18:00-18:30", "18:30-19:00", "19:00-19:30", "19:30-20:00"];

export default function BookingForm({
  type,
  booking,
  bookingId,
  teachers,
  bookings,
}: BookingFormProps) {
  const router = useRouter();

  const form = useForm<BookingFormSchema>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: booking
      ? {
          ...booking,
          date: booking.date ? new Date(booking.date) : new Date(),
        }
      : {
          name: "",
          email: "",
          age: "",
          language: "",
          course: "Learn the Qur’an and Islamic Studies",
          teacher: "",
          schedule: [],
          progress: "Not started",
          payment: "Unpaid",
          note: "",
          date: new Date(),
          status: "Pending",
        },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = form;

  const schedule = watch("schedule");
  const selectedTeacher = watch("teacher");

  // Helper: Check if a day/timeSlot is booked for the selected teacher by others (exclude current booking if updating)
  function isSlotBooked(day: string, timeSlot: string) {
    return bookings.some((b) => {
      // Exclude current booking if updating
      if (type === "Update" && bookingId && b.id === bookingId) {
        return false;
      }
      if (b.teacher !== selectedTeacher) return false;
      // Check if this booking has the day/timeSlot reserved
      return b.schedule.some((s) => s.day === day && s.timeSlot === timeSlot);
    });
  }

  // Toggle day selection
  const toggleDay = (day: string) => {
    const exists = schedule.find((s) => s.day === day);
    if (exists) {
      setValue(
        "schedule",
        schedule.filter((s) => s.day !== day)
      );
    } else {
      if (schedule.length >= 4) return;
      setValue("schedule", [...schedule, { day, timeSlot: "" }]);
    }
  };

  // Change timeSlot for a selected day
  const onTimeChange = (day: string, timeSlot: string) => {
    setValue(
      "schedule",
      schedule.map((s) => (s.day === day ? { ...s, timeSlot } : s))
    );
  };

  async function onSubmit(values: BookingFormSchema) {
    try {
      if (type === "Create") {
        const newBooking = await createBooking({
          ...values,
          course: "Learn the Qur’an and Islamic Studies",
          payment: "Unpaid",
          progress: "Not started",
          status: "Pending",
          date: values.date ?? new Date(),
        });

        if (newBooking) {
          reset();
          toast.success("Booking successful! Pending approval.");
          router.push("/");
        }
      } else if (type === "Update" && bookingId) {
        const updatedBooking = await updateBooking(bookingId, values);
        if (updatedBooking) {
          reset();
          toast.success("Booking updated successfully!");
        }
      }
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Something went wrong.");
    }
  }

  return (
    <FormProvider {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-xl mx-auto p-4 border rounded space-y-4"
      >
        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Student Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Student Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Age */}
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Student Age" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Language */}
        <FormItem>
          <select {...register("language")} className="border p-2 w-full">
            <option value="">Select Language</option>
            <option value="English">English</option>
            <option value="Bengali">Bengali</option>
            <option value="Arabic">Arabic</option>
            <option value="Urdu">Urdu</option>
          </select>
          <FormMessage>{errors.language?.message}</FormMessage>
        </FormItem>

        {/* Teacher */}
        <FormItem>
          <select {...register("teacher")} className="border p-2 w-full">
            <option value="">Select Teacher</option>
            {teachers.map((t) => (
              <option key={t.name} value={t.name}>
                {t.name}
              </option>
            ))}
          </select>
          <FormMessage>{errors.teacher?.message}</FormMessage>
        </FormItem>

        {/* Schedule Selection */}
        <div className="space-y-2">
          <p className="font-semibold">
            Select exactly 4 days and assign time:
          </p>
          {allDays.map((day) => {
            // For this day, find if selected
            const selectedDay = schedule.find((s) => s.day === day);

            // We disable day checkbox if:
            // - not selected
            // - already 4 days selected
            // - OR all timeSlots for this day are booked for teacher, so no available slot to select

            // Check if all time slots are booked for this day for selected teacher
            const allTimeSlotsBooked = timeSlots.every((slot) =>
              isSlotBooked(day, slot)
            );

            const isDisabled =
              (!selectedDay && schedule.length >= 4) || allTimeSlotsBooked;

            return (
              <div key={day} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={!!selectedDay}
                  onChange={() => toggleDay(day)}
                  disabled={isDisabled}
                />
                <label className="w-24">{day}</label>

                {selectedDay && (
                  <select
                    value={selectedDay.timeSlot}
                    onChange={(e) => onTimeChange(day, e.target.value)}
                    className="border p-1 flex-1"
                  >
                    <option value="">Select time</option>
                    {timeSlots.map((slot) => {
                      const booked = isSlotBooked(day, slot);
                      return (
                        <option
                          key={slot}
                          value={slot}
                          disabled={booked}
                        >
                          {booked ? `${slot} (Booked)` : slot}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>
            );
          })}
          <p className="text-sm text-gray-500">
            Selected: {schedule.length} / 4
          </p>
          {errors.schedule && (
            <p className="text-red-600">{errors.schedule.message}</p>
          )}
        </div>

        {/* Note */}
        <FormItem>
          <textarea
            {...register("note")}
            placeholder="Note (optional)"
            className="border p-2 w-full"
          />
          <FormMessage>{errors.note?.message}</FormMessage>
        </FormItem>

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting
            ? "Submitting..."
            : type === "Create"
            ? "Create Booking"
            : "Update Booking"}
        </Button>
      </form>
    </FormProvider>
  );
}
