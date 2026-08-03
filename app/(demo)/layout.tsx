import Footer from "@/components/sharedNew/Footer";
import Header from "@/components/sharedNew/Header";
import ScrollHeaderWrapper from "@/components/sharedNew/ScrollHeaderWrapper";
// @ts-expect-error - CSS import type declaration is missing in this workspace
import "../globalsNew.css";
import { Toaster } from "react-hot-toast";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Toaster />
      <ScrollHeaderWrapper>
        <Header />
      </ScrollHeaderWrapper>
      <main className="flex-1 pt-28 __main">{children}</main>
      <Footer />
    </div>
  );
}
