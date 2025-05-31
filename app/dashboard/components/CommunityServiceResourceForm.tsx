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
  createCommunityServiceResource,
  updateCommunityServiceResource,
} from "@/lib/actions/communityServiceResource";
import { ICommunityServiceResource } from "@/lib/database/models/communityServiceResource.model";
import { communityServiceResourceDefaultValues } from "@/constants";

export const communityServiceResourceFormSchema = z.object({
  category: z.string().min(3, "Category must be at least 3 characters."),
  name: z.string().min(3, "Name must be at least 3 characters."),
  address: z.string().min(10, "Address must be at least 10 characters."),
  city: z.string().min(2, "City must be at least 2 characters."),
  state: z.string().min(2, "State must be at least 2 characters."),
  website: z.string(),
  contact: z.string(),
});

type CommunityServiceResourceFormProps = {
  type: "Create" | "Update";
  communityServiceResource?: ICommunityServiceResource | undefined;
  communityServiceResourceId?: string;
};

const CommunityServiceResourceForm = ({
  type,
  communityServiceResource,
  communityServiceResourceId,
}: CommunityServiceResourceFormProps) => {
  const router = useRouter();

  const initialValues =
    type === "Update" && communityServiceResource
      ? {
          category: communityServiceResource.category || "",
          name: communityServiceResource.name || "",
          address: communityServiceResource.address || "",
          city: communityServiceResource.city || "",
          state: communityServiceResource.state || "",
          website: communityServiceResource.website || "",
          contact: communityServiceResource.contact || "",
        }
      : communityServiceResourceDefaultValues;

  const form = useForm<z.infer<typeof communityServiceResourceFormSchema>>({
    resolver: zodResolver(communityServiceResourceFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(
    values: z.infer<typeof communityServiceResourceFormSchema>
  ) {
    try {
      if (type === "Create") {
        const newResource = await createCommunityServiceResource({
          ...values,
        });

        if (newResource) {
          form.reset();
          router.push(`/dashboard/resources`);
        }
      } else if (type === "Update" && communityServiceResourceId) {
        const updatedStory = await updateCommunityServiceResource(
          communityServiceResourceId,
          {
            ...values,
          }
        );

        if (updatedStory) {
          router.push(`/dashboard/resources`);
        }
      }
    } catch (error) {
      console.error("Resource operation failed:", error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
        {[
          "category",
          "name",
          "address",
          "city",
          "state",
          "website",
          "contact",
        ].map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={
              field as keyof z.infer<typeof communityServiceResourceFormSchema>
            }
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder={
                      field.name[0].toUpperCase() + field.name.slice(1)
                    }
                    {...field}
                    value={field.value ?? ""}
                    className="input-field"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

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

export default CommunityServiceResourceForm;
