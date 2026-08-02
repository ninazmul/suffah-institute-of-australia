import Footer from "@/components/sharedNew2026/Footer";
import Header from "@/components/sharedNew2026/Header";
import ScrollHeaderWrapper from "@/components/shared/ScrollHeaderWrapper";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
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
      <main className="flex-1 pt-28">{children}</main>
      <Footer />
    </div>
  );
}
