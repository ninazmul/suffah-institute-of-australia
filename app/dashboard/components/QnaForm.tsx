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
import { createQna } from "@/lib/actions/qna.actions";

export const qnaFormSchema = z.object({
  question: z.string().min(10, "Question must be at least 10 characters."),
  answer: z.string().optional(),
});

const QnaForm = ({ type }: { type: "Create" }) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof qnaFormSchema>>({
    resolver: zodResolver(qnaFormSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  async function onSubmit(values: z.infer<typeof qnaFormSchema>) {
    try {
      if (type === "Create") {
        const newQna = await createQna({
          Question: values.question,
          Answer: values.answer || "",
          QuestionLikes: { count: 0, likedBy: [] },
          AnswerLikes: { count: 0, likedBy: [] },
        });

        if (newQna) {
          form.reset();
          router.push("/qna");
        }
      }
    } catch (error) {
      console.error("QnA creation failed", error);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Enter your question"
                  {...field}
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Uncomment below if you want answer input in the form */}
        {/* <FormField
          control={form.control}
          name="answer"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="Answer (optional)"
                  {...field}
                  className="input-field"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}

        <Button
          type="submit"
          size="lg"
          disabled={form.formState.isSubmitting}
          className="button col-span-2 w-full"
        >
          {form.formState.isSubmitting ? "Submitting..." : "Submit Question"}
        </Button>
      </form>
    </Form>
  );
};

export default QnaForm;
