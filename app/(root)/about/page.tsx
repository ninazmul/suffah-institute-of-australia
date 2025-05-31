export default function AboutPage() {
  return (
    <>
      <section className="py-2 md:py-5">
        <div className="wrapper ">
          <h3 className="h1-bold text-center sm:text-left">About Us</h3>
        </div>
      </section>
      <section className="py-2 md:py-5">
        <div className="wrapper gap-5 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h2-bold">Who We Are</h1>
            <p className="p-regular-20 md:p-regular-24">
              The Suffah Institute of Australia (SIA) is a registered charity
              based in Hornsby, New South Wales. Established in September 2023,
              it operates under the Australian Business Number (ABN){" "}
              <i className="text-blue-900 font-semibold font-serif">
                90 667 219 580
              </i>{" "}
              and is recognised by the Australian Charities and Not-for-profits
              Commission (ACNC). SIA was founded by a group of enthusiastic
              Australian with the sole intention of helping those in need. All
              administrative staff at SIA are volunteers.
            </p>
          </div>
        </div>
      </section>
      <section className="py-2 md:py-5">
        <div className="wrapper gap-5 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h2-bold">Our Mission</h1>
            <p className="p-regular-20 md:p-regular-24">
              To advance health, education, religion, and social welfare by
              providing essential services and support to underserved
              communities in Australia and overseas. We are committed to
              offering medical assistance, educational opportunities, religious
              guidance, and social welfare programs to improve the quality of
              life for those in need.
            </p>
          </div>
        </div>
      </section>
      <section className="py-2 md:py-5">
        <div className="wrapper gap-5 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h2-bold">Our Vision</h1>
            <p className="p-regular-20 md:p-regular-24">
              To create a world where every individual has access to quality
              healthcare, education, and social support, fostering a community
              of mutual respect and understanding. We envision a future where
              our efforts lead to healthier, more educated, and spiritually
              enriched societies, free from poverty and inequality.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
