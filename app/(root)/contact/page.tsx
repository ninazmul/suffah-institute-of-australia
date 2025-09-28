import { ContactUs } from "@/components/shared/ContactUs";
import Link from "next/link";

export default async function ContactPage() {
  return (
    <>
      <section className="wrapper flex flex-col gap-4">
        <h2 className="h2-bold">Contact Us</h2>
        <ContactUs />
        <p className="p-regular-20 md:p-regular-24">
          If you have a question about the religion of Islam,
          please visit the{" "}
          <Link
            href={"/qna"}
            className="hover:underline text-primary-500 font-semibold"
          >
            Ask Question
          </Link>{" "}
          page.
        </p>
      </section>
    </>
  );
}
