import { ContactUs } from "@/components/shared/ContactUs";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div>
      <section className="wrapper flex flex-col gap-4">
        <h2 className="h2-bold py-4">Contact Us</h2>
        <ContactUs />
      </section>
      <section className="section-links">
        <p className="p-regular-20 md:p-regular-24 py-4">
          if you want to ask a question about the religion Islam please navigate
          to{" "}
          <Link
            href={"/bookings"}
            className="hover:underline text-primary-500 font-semibold"
          >
            &lsquo;Ask the Sheikh&rsquo;
          </Link>{" "}
          page.
        </p>
      </section>
    </div>
  );
}
