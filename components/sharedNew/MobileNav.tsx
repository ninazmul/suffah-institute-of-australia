"use client";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import NavItems from "./NavItems";
import { Menu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <nav className="lg:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="align-middle">
          <Menu />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 bg-white lg:hidden w-11/12">
          <Link
            href={"/"}
            className="flex items-center gap-2"
            onClick={handleClose}
          >
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              width={50}
              height={50}
            />
            <h1 className="text-2xl md:text-3xl font-serif font-bold">
              Suffah Institute of Australia.
            </h1>
          </Link>
          <Separator className="border border-primary-500" />
          <NavItems onItemSelected={handleClose} />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
