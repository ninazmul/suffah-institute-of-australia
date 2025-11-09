import Image from "next/image";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      title: "Empower the Homeless",
      img: "/assets/images/homeless.jpeg",
      content: [
        "In Australia, SIA assists people at risk of homelessness by providing essential aid such as food, shelter, and pathways to employment. We collaborate with local organizations to help individuals transition to stable housing and long-term security.",
        "Overseas, we support displaced families affected by poverty and disasters, helping them access shelter, basic necessities, and community-driven aid programs.",
      ],
    },
    {
      title: "Advance Education",
      img: "/assets/images/edu.jpeg",
      content: [
        "SIA offers scholarships and educational assistance in both Australia and overseas to those who cannot afford schooling.",
        "In Australia, we support students from disadvantaged backgrounds, ensuring they have access to quality education and learning resources.",
        "Overseas, we focus on underserved communities by funding education, providing learning materials, and enabling youth to pursue academic and vocational training.",
      ],
    },
    {
      title: "Support Healthcare",
      img: "/assets/images/health.jpeg",
      content: [
        "Access to healthcare is a challenge for many individuals in both regions.",
        "In Australia, SIA supports people struggling with medical care costs by funding treatments and promoting well-being initiatives.",
        "Overseas, we provide eye treatments for individuals who lack access to medical services, ensuring they receive the care they need to lead healthier lives.",
      ],
    },
    {
      title: "Elevate Communities",
      img: "/assets/images/elevate.jpeg",
      content: [
        "At the Suffah Institute of Australia (SIA), we believe that building stronger communities goes beyond providing aid—it requires fostering understanding, reducing misconceptions, and bridging gaps between diverse perspectives.",
        "In Australia, we actively support culturally and linguistically diverse communities, ensuring inclusivity and mutual respect among individuals of different backgrounds. By promoting interfaith dialogue and education, we help reduce misconceptions and encourage meaningful conversations that strengthen societal unity.",
        "We collaborate with local charities to uplift impoverished communities through both direct aid and educational programs designed to promote greater awareness and understanding of religious and cultural diversity.",
        "Through these efforts, we aim to bridge knowledge gaps, dispel misinformation, and foster harmony among communities while ensuring long-term sustainability.",
      ],
    },
    {
      title: "Expand Knowledge",
      img: "/assets/images/knowledge.jpeg",
      content: [
        "Education is more than academics—it’s about empowering minds.",
        "In Australia, we organize learning initiatives, mentorship programs, and workshops to help individuals gain skills that improve their prospects.",
        "We provide knowledge-building opportunities through educational programs, ensuring people have access to tools that help them overcome religious, social, and economic challenges.",
      ],
    },
  ];

  return (
    <section className="wrapper flex flex-col gap-10 py-10">
      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 py-4">
        Our Services
      </h2>

      {/* Services */}
      {services.map((service, index) => (
        <div
          key={service.title}
          className={`flex flex-col-reverse lg:flex-row items-center gap-8 lg:gap-12 ${
            index % 2 !== 0 ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Text */}
          <div className="w-full lg:w-1/2 flex flex-col gap-4 text-gray-700">
            <h3 className="text-2xl font-semibold text-primary">
              {service.title}
            </h3>
            {service.content.map((para, i) => (
              <p key={i} className="text-base md:text-lg leading-relaxed">
                {para}
              </p>
            ))}
          </div>

          {/* Image */}
          <div className="w-full lg:w-1/2 relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden shadow-lg">
            <Image
              src={service.img}
              alt={service.title}
              fill
              priority
              className="object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      ))}

      {/* Learn about Islam */}
      <div className="flex flex-col-reverse lg:flex-row-reverse items-center gap-8 lg:gap-12 border-t border-gray-200 py-12">
        {/* <div className="w-full lg:w-1/2">
          <Image
            src="/assets/images/quranClass.jpeg"
            alt="Quran Class"
            width={500}
            height={500}
            className="rounded-lg w-full"
          />
        </div> */}
        <div className="w-full flex flex-col gap-4 text-gray-700">
          <h3 className="text-2xl font-semibold text-primary">
            Learn about the Religion of Islam
          </h3>
          <p className="text-base md:text-lg leading-relaxed">
            Join the{" "}
            <strong>SIA Knowledge Program (Qur’an & Islamic Studies)</strong> to
            explore Islamic teachings and gain authentic understanding. Click
            below to learn more or book your session.
          </p>
          <Link
            href="/bookings"
            className="inline-block bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-300 w-fit"
          >
            Join Knowledge Program
          </Link>
        </div>
      </div>
    </section>
  );
}
