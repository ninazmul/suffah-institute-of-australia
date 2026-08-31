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
import HeaderWrapper from "./HeaderWrapper";

export default async function Header() {
  const { sessionClaims } = await auth();

  const userId = sessionClaims?.userId as string;
  const email = await getUserEmailById(userId);
  const adminStatus = await isAdmin(email);

  return (
    <HeaderWrapper>
      <div className="wrapper flex items-center justify-center">
        <Link href="/" className="flex items-center gap-2">
          <h1 className="brand-title font-normal text-white md:flex">
            Suffah Institute of Australia
          </h1>
        </Link>

      </div>

      <div className="wrapper flex items-center justify-between gap-2">
        <Link href="/" className="navbar-brand-wrapper flex items-center gap-2">
          <Image
            src="/assets/images/logo.png"
            width={100}
            height={100}
            className="w-10 h-10 brand-logo"
            priority
            quality={100}
            alt="Suffah Institute of Australia logo"
          />{" "}
        </Link>
        <div className="navbar--capsule">
          <div>
            <nav className="nav-container lg:flex-between hidden w-full">
              <NavItems />
            </nav>
            <MobileNav />
          </div>
          <Donation />
        </div>
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
    </HeaderWrapper>
  );
}
