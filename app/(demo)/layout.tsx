import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { isAdmin } from "@/lib/actions/admin.actions";
import { getUserEmailById } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import AdminSidebar from "./components/AdminSidebar";
import { cookies } from "next/headers";
import { SignedIn, UserButton } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";

import './demo.css';

export default async function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const defaultOpen = cookieStore.get("sidebar:state")?.value === "true";

  const { sessionClaims } = await auth();

  const userId = sessionClaims?.userId as string;
  const email = await getUserEmailById(userId);
  const adminStatus = await isAdmin(email);

  if (!adminStatus) {
    redirect("/");
  }
  
  return (
    <SidebarProvider defaultOpen={defaultOpen}>
      <AdminSidebar />
      <Toaster />
      <main className="demo-layout">
        <div className="flex justify-between items-center p-4 w-full border-b text-white bg-gradient-to-r from-primary-900 to-primary-500">
          <SidebarTrigger />
          <SignedIn>
            <UserButton afterSwitchSessionUrl="/" />
          </SignedIn>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
