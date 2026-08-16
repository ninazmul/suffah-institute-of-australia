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
import { useEffect, useState } from "react";

export default async function Header() {
  const { sessionClaims } = await auth();

  const userId = sessionClaims?.userId as string;
  const email = await getUserEmailById(userId);
  const adminStatus = await isAdmin(email);

  const [ isSticky, setIsSticky ] = useState(false);
  const [ hasInitAnimation, setHasInitAnimation ] = useState(false);

  useEffect(() => {
    setHasInitAnimation(true);
  });

  useEffect(() => {
    if (window.scrollY > 30) {
      setIsSticky(true);
    } else {
      setIsSticky(false);
    }
  });
  
  return (
    <header className={`header w-full text-white ${isSticky ? "sticky" : ""} ${hasInitAnimation ? "init-animation" : ""}`}>
      <div className="wrapper flex items-center justify-center">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="brand-title font-normal text-white hidden md:flex">
            Suffah Institute of Australia
          </h1>
          <div className="flex md:hidden flex-col items-start justify-center">
            <h1 className="text-xl font-serif font-nrmal text-white">
              Suffah Institute
            </h1>
            <h3 className="font-serif font-semibold text-white text-xs">
              of Australia
            </h3>
          </div>
        </Link>
        
      </div>

      <div className="wrapper navbar--capsule flex items-center justify-between gap-2">
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
        </Link>
        <div>
          <nav className="nav-container lg:flex-between hidden w-full">
            <NavItems />
          </nav>
          <MobileNav />
        </div>
        <div className="header-links">
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
          <Donation />
        </div>
      </div>
    </header>
  );
}
