"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useState } from "react";
import { useUploadThing } from "@/lib/uploadthing";
import { FileUploader } from "@/components/shared/FileUploader";
import {
  createRegistration,
  updateRegistration,
} from "@/lib/actions/registration.actions";
import { IRegistration } from "@/lib/database/models/registration.model";
import { registrationDefaultValues } from "@/constants";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const registrationFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  address: z.string().min(5, "Address must be at least 5 characters."),
  number: z.string().min(10, "Phone number must be valid."),
  email: z.string().email("Invalid email address."),
  emergencyContactName: z
    .string()
    .min(2, "Contact name must be at least 2 characters."),
  emergencyContactNumber: z.string().min(10, "Phone number must be valid."),
  emergencyContactRelation: z
    .string()
    .min(2, "Relation must be at least 2 characters."),
  signature: z.string().optional(),
  date: z.date(),
  status: z.string().min(3, "Status must be valid."),
});

type RegistrationFormProps = {
  type: "Create" | "Update";
  registration?: IRegistration;
  registrationId?: string;
};
const RegistrationFrom = ({
  type,
  registration,
  registrationId,
}: RegistrationFormProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [isChecked, setIsChecked] = useState(false);
  const router = useRouter();

  const initialValues =
    registration && type === "Update"
      ? {
          ...registration,
          date: new Date(registration.date),
        }
      : registrationDefaultValues;

  const { startUpload } = useUploadThing("imageUploader");

  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof registrationFormSchema>) {
    let uploadedImageUrl = values.signature;

    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!isChecked) {
        alert("You must agree to the declaration before submitting.");
        return;
      }

      if (uploadedImages && uploadedImages.length > 0) {
        uploadedImageUrl = uploadedImages[0].url;
      }
    }

    try {
      if (type === "Create") {
        const newRegistration = await createRegistration({
          ...values,
          signature: uploadedImageUrl || "",
        });

        if (newRegistration) {
          form.reset();
          toast.success(
            "Registration successful! Your account is pending approval!"
          );
          router.push(`/profile`);
        }
      } else if (type === "Update" && registrationId) {
        const updatedRegistration = await updateRegistration(registrationId, {
          ...values,
          signature: uploadedImageUrl,
        });

        if (updatedRegistration) {
          form.reset();
          toast.success("Updated Successfully!");
        }
      }
    } catch (error) {
      console.error("Volunteer Registration failed", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        {/* First Name Field */}
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="First Name"
                  {...field}
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Last Name Field */}
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Last Name"
                  {...field}
                  className="input-field"
                />
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

        {/* Emergency Contact Name Field */}
        <FormField
          control={form.control}
          name="emergencyContactName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Emergency Contact Name"
                  {...field}
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Emergency Contact Number Field */}
        <FormField
          control={form.control}
          name="emergencyContactNumber"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Emergency Contact Number"
                  {...field}
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Emergency Contact Relation Field */}
        <FormField
          control={form.control}
          name="emergencyContactRelation"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Relation to Emergency Contact"
                  {...field}
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Signature Field */}
        <FormField
          control={form.control}
          name="signature"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel htmlFor={field.name}>Upload your Signature</FormLabel>
              <FormControl className="h-72">
                <FileUploader
                  onFieldChange={field.onChange}
                  imageUrl={field.value || ""}
                  setFiles={setFiles}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col items-center gap-2 justify-center my-6">
          <p className="font-semibold text-sm">
            (Please read, understand and agree to the following terms and
            conditions)
          </p>

          <ul className="flex flex-col mr-5 gap-2 text-xs">
            <li>
              • I am applying to become a volunteer willingly and without any
              type of direct or indirect pressure.
            </li>
            <li>
              • Once accepted, my volunteerism entitlements are not
              transferrable or transmittable to another person.
            </li>
            <li>
              • OSMCI authority preserves the right to accept or decline my
              application without showing reason.
            </li>
            <li>
              • A volunteer is a general supporter of the organization. He /she
              does not have any liability to the organization or voting power in
              AGM. Volunteer can donate any amount they wish to contribure for
              the sake of Allah to run current and future projects of the
              organisation
            </li>
          </ul>

          <div className="flex flex-row items-center justify-around w-full gap-4 my-4">
            <input
              type="checkbox"
              id="declaration"
              checked={isChecked}
              onChange={(e) => setIsChecked(e.target.checked)}
              className="w-4 h-4"
            />
            <div className="flex flex-wrap items-center gap-2 w-full">
              I bear witness that there is no God but Allah and Muhammad صلى
              الله عليه وسلم is His slave and (Last) Prophet.
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting || !isChecked}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Uploading..." : "Submit Form"}
        </Button>
      </form>
    </Form>
  );
};

export default RegistrationFrom;
