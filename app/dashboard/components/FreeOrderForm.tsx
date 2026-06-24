"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { createFreeOrder } from "@/lib/actions/freeorder.actions";
import { IEvent } from "@/lib/database/models/event.model";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const timezones = [
  "America/New_York",
  "Europe/London",
  "Asia/Dhaka",
  "Asia/Tokyo",
  "UTC",
  "Australia/Sydney",
  "Australia/Melbourne",
  "Australia/Brisbane",
  "Australia/Perth",
  "Australia/Adelaide",
  "Pacific/Auckland",
];

const medias = ["Bengali", "English", "Either (Bengali/English)", "Urdu", "Arabic"];

const groups = ["Male", "Female", "Kids"];

export const freeOrderSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  address: z.string().min(5, "Address must be at least 5 characters."),
  number: z.string().min(10, "Phone number must be valid."),
  email: z.string().email("Invalid email address."),
  timezone: z.string().refine((val) => timezones.includes(val), {
    message: "Invalid timezone selected.",
  }),
  media: z.string().refine((val) => medias.includes(val), {
    message: "Invalid media selected.",
  }),
  group: z.string().refine((val) => groups.includes(val), {
    message: "Invalid group selected.",
  }),
  eventId: z.string(),
  eventTitle: z.string().min(2, "Event title must be at least 2 characters."),
});

type FreeOrderProps = {
  event: IEvent;
  closeModal: () => void;
};

const FreeOrderForm = ({ event, closeModal }: FreeOrderProps) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof freeOrderSchema>>({
    resolver: zodResolver(freeOrderSchema),
    defaultValues: {
      name: "",
      address: "",
      number: "",
      email: "",
      timezone: "",
      media: "",
      group: "",
      eventId: event._id.toString(),
      eventTitle: event.title,
    },
  });

  async function onSubmit(values: z.infer<typeof freeOrderSchema>) {
    try {
      const newOrder = await createFreeOrder({
        ...values,
        eventId: event._id.toString(),
        eventTitle: event.title,
      });

      if (newOrder) {
        form.reset();
        toast.success("Thanks for your registration, we will be in touch!");
        router.push(`/events/${event._id}`);
        closeModal();
      }
    } catch (error) {
      console.error("Free Order creation failed", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Name" {...field} className="input-field" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Phone Number Field */}
        <FormField
          control={form.control}
          name="number"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Phone Number"
                  {...field}
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Email" {...field} className="input-field" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Field */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Address"
                  {...field}
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Timezone Field */}
        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <select {...field} className="input-field">
                  <option value="" disabled>
                    Select a timezone
                  </option>
                  {timezones.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Media Field */}
        <FormField
          control={form.control}
          name="media"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <select {...field} className="input-field">
                  <option value="" disabled>
                    Select a media
                  </option>
                  {medias.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Group Field */}
        <FormField
          control={form.control}
          name="group"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <select {...field} className="input-field">
                  <option value="" disabled>
                    Select a group
                  </option>
                  {groups.map((tz) => (
                    <option key={tz} value={tz}>
                      {tz}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Register Event"}
        </Button>
      </form>
    </Form>
  );
};

export default FreeOrderForm;
