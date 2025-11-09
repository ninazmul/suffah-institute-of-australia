import Image from "next/image";

const teamMembers = [
  {
    name: "Mr. Md Atikul Islam",
    role: "Co-Founder and Public Officer",
    image: "/assets/images/user.png",
    description: `To advance health, education, religion, and social welfare by
    providing essential services and support to underserved communities in
    Australia and overseas. We are committed to offering medical assistance,
    educational opportunities, religious guidance, and social welfare
    programs to improve the quality of life for those in need.`,
  },
  {
    name: "Mrs. Nasrin Akter",
    role: "Treasurer (Co-Founder)",
    image: "/assets/images/user.png",
    description: `Nasrin Akter is the Co-Founder of the Suffah Institute of Australia (SIA) 
    and a passionate advocate for social welfare. With a strong academic foundation in Science 
    and Business Administration, she has also completed several diplomas and professional 
    development courses.
    Currently working in the Primary Education sector, Nasrin is dedicated to supporting individuals 
    and families through education, community engagement, and practical aid. Her experience in education 
    has deepened her understanding of the challenges faced by underprivileged communities.
    At SIA, Nasrin plays a key role in guiding program development and outreach. Her compassionate nature 
    and strong sense of purpose continue to inspire both the team and the broader community.
    Her leadership supports SIA’s mission to uplift vulnerable populations and ensure meaningful 
    assistance reaches those most in need.`,
  },
  {
    name: "Abdullah Al Mamun",
    role: "Volunteer Coordinator (Co-Founder)",
    image: "/assets/images/user.png",
    description: `Abdullah Al Mamun is a committed community advocate and co-founder of the Suffah Institute 
    of Australia (SIA). With a strong passion for social equity, he has contributed to numerous charitable 
    initiatives in Australia and overseas, focusing on education, homelessness, and healthcare.
    Raised in a rural village and now living in Australia for over a decade, Abdullah brings valuable insight 
    into the struggles faced by disadvantaged communities. He has led and supported several welfare programs, 
    and volunteered at the Australian National Maritime Museum in Western Australia. His ongoing involvement 
    with multiple nonprofit organisations reflects his dedication to service.
    Professionally, Abdullah works for Endeavour Energy in NSW and holds an engineering degree from overseas, 
    along with further studies at the University of Western Australia.
    Through SIA, he helps bridge gaps in education, healthcare, and interfaith understanding. He is currently 
    pursuing Islamic studies at Darul Ilm Birmingham under Mufti Tosir Miah, and continues to shape SIA’s 
    compassionate, community-led mission.
    `,
  },
  {
    name: "Mr. Mohammadanal Muntaka",
    role: "Healthcare Coordinator (Volunteer)",
    image: "/assets/images/user.png",
    description: `Mr. Mohammadanal Muntaka is a dedicated volunteer at the Suffah
    Institute of Australia (SIA), coordinating healthcare-related activities.
    He plays a vital role in supporting programs that improve access to basic
    healthcare and medical aid for underserved communities.`,
  },
  {
    name: "Engineer Md Kamrul Hasan Suven",
    role: "Education Support Coordinator (Volunteer)",
    image: "/assets/images/user.png",
    description: `Engr. Md. Kamrul Hasan Suven is a committed volunteer at the Suffah 
    Institute of Australia (SIA), leading educational and social development efforts 
    in Bangladesh. With a strong academic background—holding a Bachelor’s in Engineering 
    and a Master’s in Environmental Economics—he brings a strategic and sustainability-focused 
    approach to community upliftment.
    Driven by a passion for accessible education, Kamrul focuses on empowering underserved 
    populations, particularly those who face financial and social barriers to learning. His 
    work supports the vision of “Education for All,” advocating for inclusive programs that 
    promote lifelong learning, skill development, and self-reliance among marginalized groups.
    At SIA, Kamrul plays a vital role in the implementation of overseas initiatives. He collaborates 
    with educators, grassroots organisers, and development professionals to design and deliver 
    impactful educational projects that address both immediate needs and long-term development 
    goals. His efforts are instrumental in ensuring SIA’s support reaches the communities that 
    need it most.
    Kamrul’s unwavering dedication to educational equity and social progress aligns deeply with 
    SIA’s mission to empower individuals through education, healthcare, and community development. 
    His leadership and insight continue to drive meaningful change, helping to break the cycle 
    of poverty through sustainable, education-based solutions.
    `,
  },
];

export default function AboutPage() {
  return (
    <>
      {/* About Section */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="wrapper max-w-5xl mx-auto text-center space-y-6">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Who We Are
          </h1>
          <p className="text-gray-600 leading-relaxed">
            The Suffah Institute of Australia (SIA) is a not-for-profit,
            ACNC-registered charity organisation based in New South Wales.
            Founded with a deep commitment to compassion and service, SIA is
            dedicated to improving the lives of vulnerable individuals through
            education, healthcare, and community support—both in Australia and
            overseas. In Australia, we focus on assisting individuals facing
            difficult circumstances, such as those at risk of homelessness, the
            unemployed, and victims of natural disasters or personal hardship.
            We also actively engage with culturally and linguistically diverse
            (CALD) communities, promoting inclusivity, mutual understanding, and
            social cohesion through various outreach and support programs.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Globally, our mission extends to helping disadvantaged populations
            in underserved regions. We offer scholarships to students who cannot
            afford an education and fund medical aid—including life-changing eye
            treatments—for those who lack access to basic healthcare.
          </p>
          <p className="text-gray-600 leading-relaxed">
            At SIA, we believe that every individual deserves the opportunity to
            live with dignity, hope, and purpose. Our programs are
            community-driven, sustainable, and focused on long-term impact. With
            your support, we continue to build pathways that uplift lives,
            foster resilience, and empower communities across borders.
          </p>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10 md:py-16 bg-gray-50">
        <div className="wrapper max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Meet the Team
          </h1>
          <div className="grid gap-8 grid-cols-1">
            {teamMembers.map((member, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row items-center gap-6 bg-white p-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="w-36 h-36 rounded-full object-cover border-4 border-gray-100"
                />
                <div className="space-y-2 text-center md:text-left">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {member.name}
                  </h2>
                  <p className="text-sm text-indigo-600 font-medium">
                    {member.role}
                  </p>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {member.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
