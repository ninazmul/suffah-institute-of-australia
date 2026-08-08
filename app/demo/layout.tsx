import Footer from "@/components/shared/Footer";
import Header from "@/components/shared/Header";
import ScrollHeaderWrapper from "@/components/shared/ScrollHeaderWrapper";
import { Toaster } from "react-hot-toast";

import './demo-theme.css';



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
      <main className="main-container">{children}</main>
      <Footer />
    </div>
  );
}
