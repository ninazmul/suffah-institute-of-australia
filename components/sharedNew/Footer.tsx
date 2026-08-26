import Image from "next/image";
import Link from "next/link";
import { ImFacebook, ImLinkedin2 } from "react-icons/im";

const Footer = () => {
  return (
    <footer className="footer footer-bg text-white dark:text-green-200 py-8">
      <div className="container mx-auto px-4">
        <div className="footer-wrapper">
          <div className="footer-logo">
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
          <div className="footer-links">
            {/* Organization Links */}
            <div>
              <h4 className="font-semibold mb-4 text-lg">Links</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/events" className="hover:underline">
                    Events
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:underline">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/achievements" className="hover:underline">
                    Achievements
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:underline">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:underline">
                    Contact Us
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
                    href="https://www.facebook.com/profile.php?id=61590304006625"
                    target="_blank"
                    className="hover:underline flex items-center gap-2"
                  >
                    <ImFacebook className="h-4 w-4" />
                    Facebook
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/suffah-institute-of-australia-a-5a1aa4404/"
                    target="_blank"
                    className="hover:underline flex items-center gap-2"
                  >
                    <ImLinkedin2 className="h-4 w-4" />
                    LinkedIn
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <hr className="my-6 border-t border-white" />
        <div className="flex flex-col items-center justify-center w-full">
          <p className="text-xs">
            Copyright © {new Date().getFullYear()} {" "}
            <Link href="/" className="hover:underline">
              Suffah Institute of Australia
            </Link>{" "}
            | ABN 90667219580 - All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
