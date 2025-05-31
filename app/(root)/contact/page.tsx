import { ContactUs } from "@/components/shared/ContactUs";

export default async function ContactPage() {
  return (
    <>
      <section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
        <h2 className="h2-bold">Contact Us</h2>
        <p className="p-regular-20 md:p-regular-24">
          Have questions or ideas to share? We&apos;re here to listen—
          <br />
          connect with us and let’s bring your vision to life.
        </p>
        <ContactUs />
      </section>
    </>
  );
}
