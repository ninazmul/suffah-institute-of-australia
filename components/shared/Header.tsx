import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "./NavItems";
import { LogIn, Shield } from "lucide-react";
import MobileNav from "./MobileNav";
import Donation from "./Donation";
import { auth } from "@clerk/nextjs/server";
import { getUserEmailById } from "@/lib/actions/user.actions";
import { isAdmin } from "@/lib/actions/admin.actions";

export default async function Header() {
  const { sessionClaims } = await auth();

  const userId = sessionClaims?.userId as string;
  const email = await getUserEmailById(userId);
  const adminStatus = await isAdmin(email);
  return (
    <header className="w-full text-white bg-gradient-to-r from-primary-900 to-primary-500">
      <div className="wrapper flex items-center justify-between gap-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/assets/images/logo.png"
            width={100}
            height={100}
            className="w-10 h-10 md:w-8 md:h-8 lg:w-12 lg:h-12"
            priority
            quality={100}
            alt="Suffah Institute of Australia logo"
          />{" "}
          <h1 className="md:text-3xl lg:text-5xl font-serif font-bold text-white hidden md:flex">
            Suffah Institute of Australia
          </h1>
          <div className="flex md:hidden flex-col items-start justify-start">
            <h1 className="text-xl font-serif font-bold text-white">
              Suffah Institute
            </h1>
            <h3 className="font-serif font-semibold text-white text-xs">
              of Australia
            </h3>
          </div>
        </Link>

        <Donation />
      </div>

      <hr className=" border-t border-white" />

      <div className="wrapper flex items-center justify-between">
        <div>
          <nav className="lg:flex-between hidden w-full max-w-xs">
            <NavItems />
          </nav>
          <MobileNav />
        </div>

        <div className="flex items-center gap-x-2">
          <div className="flex items-center gap-3">
            <SignedIn>
              {adminStatus && (
                <Button
                  asChild
                  variant={"outline"}
                  size={"sm"}
                  className="rounded-full border-white"
                >
                  <Link href="/dashboard">
                    <Shield />
                    Admin
                  </Link>
                </Button>
              )}
              <UserButton afterSwitchSessionUrl="/" />
            </SignedIn>
            <SignedOut>
              <Button asChild variant={"outline"} className="rounded-full">
                <Link href="/sign-in">
                  <LogIn />
                  <span className="">Login</span>
                </Link>
              </Button>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
}
