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
import { createCategory } from "@/lib/actions/category.actions";

export const categoryFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters."),
});

const CategoryForm = ({ userId, type }: { userId: string; type: "Create" }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof categoryFormSchema>>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit(values: z.infer<typeof categoryFormSchema>) {
    if (!userId) {
      console.error("User ID is missing");
      return;
    }

    try {
      if (type === "Create") {
        const newCategory = await createCategory({
          categoryName: values.name,
        });

        if (newCategory) {
          form.reset();
          router.push(`/dashboard/categories`);
        }
      }
    } catch (error) {
      console.error("Category creation failed:", error);
      form.setError("name", {
        type: "server",
        message: "Failed to create category. Try again later.",
      });
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
                <Input placeholder="Category name" {...field} className="input-field" />
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
          {form.formState.isSubmitting ? "Submitting..." : `${type} Category`}
        </Button>
      </form>
    </Form>
  );
};

export default CategoryForm;
