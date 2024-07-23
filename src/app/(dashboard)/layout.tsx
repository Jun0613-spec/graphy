import React from "react";

import Sidebar from "@/components/dashboard/sidebar/sidebar";
import Navbar from "@/components/dashboard/navbar/navbar";

import { protectServer } from "@/lib/utils";
const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  await protectServer();

  return (
    <div className="bg-muted h-full">
      <Sidebar />

      <div className="lg:pl-[300px] flex flex-col h-full">
        <Navbar />

        <main className="bg-white dark:bg-slate-700 flex-1 overflow-auto p-8 lg:rounded-tl-2xl">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
