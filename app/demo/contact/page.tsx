import { ContactUs } from "@/components/sharedNew/ContactUs";
import Link from "next/link";
import Image from "next/image";
import BannerSecondary from "@/components/sharedNew/BannerSecondary";

export default function ContactPage() {
  return (
    <div>
      <BannerSecondary title="Contact Us" img="/assets/images/banner-2.png" />
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
