import React from "react";
import AdminSidebar from "./AdminSidebar";
import { Metadata } from "next";

interface adminProps {
  children: React.ReactNode;
}
export const metadata: Metadata = {
  title: {
    default: "admin dashboard",
    template: "%s | admin dashboard",
  },
  description: "cloud hosting next js",
};
export default function layout({ children }: adminProps) {
  return (
    <div className="overflow-height flex items-start justify-between overflow-hidden">
      <div className="overflow-height w-15 lg:w-1/5 bg-purple-600 text-white p-1 lg:p-5">
        <AdminSidebar />
      </div>
      <div className="overflow-height w-full lg:w-4/5 overflow-y-scroll">
        {children}
      </div>
    </div>
  );
}
