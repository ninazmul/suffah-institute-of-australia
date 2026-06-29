import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Suffah Institute of Australia | Empowering the Ummah",
  description:
    "Suffah Institute of Australia (SIA) is dedicated to uplifting the Muslim community through education, events, and social initiatives.",
  keywords: [
    "Muslim Community",
    "Islamic Events",
    "SIA",
    "Suffah Institute of Australia",
    "Islamic Education",
    "Community Welfare",
    "Healthcare Support",
    "Scholarships",
    "Humanitarian Aid",
    "Nonprofit Organization",
    "Charity Australia",
    "Community Development",
    "Relief Programs",
    "Social Services",
    "Volunteer Opportunities",
    "Islamic Community Support",
    "Education Programs",
    "Healthcare Initiatives",
    "Scholarship Programs",
    "Community Outreach",
    "Humanitarian Projects",
    "Charitable Organization",
    "Nonprofit Charity",
  ],
  icons: {
    icon: "/assets/images/favicon.ico",
    shortcut: "/assets/images/favicon.ico",
    apple: "/assets/images/placeholder.png",
  },
  alternates: {
    canonical: "https://www.suffahaustralia.org.au/",
  },
  openGraph: {
    title: "Suffah Institute of Australia | Empowering the Ummah",
    description:
      "Join Suffah Institute of Australia (SIA) is dedicated to uplifting the Muslim community through education, events, and social initiatives.",
    url: "https://www.suffahaustralia.org.au/",
    siteName: "SIA",
    images: [
      {
        url: "https://www.suffahaustralia.org.au/assets/images/sia.webp",
        width: 1200,
        height: 630,
        alt: "Suffah Institute of Australia",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suffah Institute of Australia | Empowering the Ummah",
    description:
      "Join Suffah Institute of Australia (SIA) is dedicated to uplifting the Muslim community through education, events, and social initiatives.",
    images: ["/assets/images/sia.webp"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={poppins.variable}>
          {children}
          <SpeedInsights />
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
