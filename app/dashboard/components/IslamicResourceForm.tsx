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
import { useRouter } from "next/navigation";
import {
  createIslamicResource,
  updateIslamicResource,
} from "@/lib/actions/islamicResource.actions";
import { islamicResourceDefaultValues } from "@/constants";
import { IIslamicResource } from "@/lib/database/models/islamicResource.model";

export const islamicResourceFormSchema = z.object({
  category: z.string().min(3, "Category must be at least 3 characters."),
  fileName: z.string().min(3, "File name must be at least 3 characters."),
  link: z.string().url("Invalid link URL."),
});

type IslamicResourceFormProps = {
  type: "Create" | "Update";
  islamicResource?: IIslamicResource | undefined;
  islamicResourceId?: string;
};

const IslamicResourceForm = ({
  type,
  islamicResource,
  islamicResourceId,
}: IslamicResourceFormProps) => {
  const router = useRouter();

  const initialValues =
    type === "Update" && islamicResource
      ? {
          category: islamicResource.category || "",
          fileName: islamicResource.fileName || "",
          link: islamicResource.link || "",
        }
      : islamicResourceDefaultValues;

  const form = useForm<z.infer<typeof islamicResourceFormSchema>>({
    resolver: zodResolver(islamicResourceFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof islamicResourceFormSchema>) {
    try {
      if (type === "Create") {
        const newResource = await createIslamicResource({
          ...values,
        });

        if (newResource) {
          form.reset();
          router.push(`/dashboard/resources`);
        }
      } else if (type === "Update" && islamicResourceId) {
        const updatedStory = await updateIslamicResource(islamicResourceId, {
          ...values,
        });

        if (updatedStory) {
          router.push(`/dashboard/resources`);
        }
      }
    } catch (error) {
      console.error("Islamic Resource creation failed", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        {/* Category Field */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Category"
                  {...field}
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* File Name Field */}
        <FormField
          control={form.control}
          name="fileName"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="File Name"
                  {...field}
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Link Field */}
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input placeholder="Link" {...field} className="input-field" />
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
          {form.formState.isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default IslamicResourceForm;
