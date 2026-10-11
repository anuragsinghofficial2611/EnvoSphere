
import type { ReactNode } from "react";
import Sidebar from "@/component/user/sidebar";

export default function ProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#F8FAF9]">

      <Sidebar />
      <main className="min-h-screen min-w-0 md:ml-[260px]">
        {children} 
      </main>
    </div>
  );
}