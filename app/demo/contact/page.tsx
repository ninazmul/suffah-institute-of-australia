import { ContactUs } from "@/components/sharedNew/ContactUs";
import Link from "next/link";
import Image from "next/image";
import HeaderWrapper from "@/components/sharedNew/HeaderWrapper";

export default function ContactPage() {
  return (
    <div>
      <HeaderWrapper>
        <section className="wrapper flex flex-col gap-4">
          <div className="absolute inset-0">
            <Image
              src="/assets/images/banner-3.jpg"
              alt="SIA Purpose Background"
              fill
              priority
              className="object-cover opacity-60"
            />
          </div>
          <h2 className="h2-bold py-4">Contact Us</h2>
        </section>
      </HeaderWrapper>

      <ContactUs />
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
