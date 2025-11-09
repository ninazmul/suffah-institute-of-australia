import Image from "next/image";
import Link from "next/link";
import { ImFacebook } from "react-icons/im";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-primary-900 to-primary-500 text-white dark:text-green-200 py-8">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-6 items-center">
          <div>
            <Link href="/" className="flex flex-col items-center gap-1">
              <Image
                src={"/assets/images/logo.png"}
                width={200}
                height={200}
                alt="SIA Logo"
                className=""
                priority
              />
              <h1 className="text-xl lg:text-2xl font-serif font-bold">
                Suffah Institute of Australia (SIA)
              </h1>
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {/* Organization Links */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Organization</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/" className="hover:underline">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="hover:underline">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Follow Us Links */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Follow us</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="https://www.facebook.com/SuffahOfAus"
                    target="_blank"
                    className="hover:underline flex items-center gap-2"
                  >
                    <ImFacebook className="h-4 w-4" />
                    Facebook page
                  </Link>
                </li>
                {/* <li>
                  <Link
                    href="https://chat.whatsapp.com/D2Vieg8QIrLFuk1pOzB9wo"
                    target="_blank"
                    className="hover:underline flex items-center gap-2"
                  >
                    <ImWhatsapp className="h-4 w-4" />
                    WhatsApp Group
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.youtube.com/@sIAmuslim"
                    target="_blank"
                    className="hover:underline flex items-center gap-2"
                  >
                    <ImYoutube className="h-4 w-4" />
                    YouTube
                  </Link>
                </li> */}
              </ul>
              
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/https://www.fairtrading.nsw.gov.au/associations-and-co-operatives/associations"
                    target="_blank"
                    className="hover:underline"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/https://www.fairtrading.nsw.gov.au/associations-and-co-operatives/associations"
                    target="_blank"
                    className="hover:underline"
                  >
                    Terms &amp; Conditions
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-t border-white" />
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-2 w-full">
          <p className="text-xs">
            Copyright © 2025{" "}
            <Link href="/" className="hover:underline">
              Suffah Institute of Australia
            </Link>{" "}
            | ABN 90667219580 - All rights reserved
          </p>
          <p className="text-xs flex items-center gap-2">
            Developed by{" "}
            <Link
              href="https://www.artistycode.studio"
              target="_blank"
              className="underline hover:text-green-300"
            >
              ArtistyCode Studio
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
