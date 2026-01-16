"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Package,
  Star,
  Clock,
  Search,
  Settings,
  FileText,
} from "lucide-react";

export default function PortalSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <div className="w-full lg:w-72 bg-white border-r border-industrial-200 flex-shrink-0 min-h-[calc(100vh-80px)]">
      {/* User Profile Header */}
      <div className="p-8 border-b border-industrial-100">
        <h2 className="text-xl font-bold text-industrial-900 mb-1">
          Larry Fields
        </h2>
        <p className="text-xs text-industrial-500 font-medium uppercase tracking-wider">
          Valued Customer Since 2026
        </p>
      </div>

      {/* Navigation Groups */}
      <div className="py-6">
        {/* DASHBOARD */}
        <div className="mb-2">
          <div className="px-8 py-2 text-xs font-bold text-industrial-400 uppercase tracking-widest mb-1">
            Dashboard
          </div>
          <Link
            href="/portal/dashboard"
            className={`flex items-center gap-3 px-8 py-3 transition-colors ${
              isActive("/portal/dashboard")
                ? "bg-industrial-900 text-white"
                : "text-industrial-600 hover:bg-industrial-50 hover:text-berlin-red"
            }`}
          >
            <LayoutDashboard className="w-4 h-4" />
            <span className="text-sm font-bold">Home</span>
          </Link>
        </div>

        {/* INQUIRY LOG */}
        <div className="mb-2 mt-6">
          <div className="px-8 py-2 text-xs font-bold text-industrial-400 uppercase tracking-widest mb-1">
            Inquiries & Quotes
          </div>
          <Link
            href="/portal/inquiries"
            className={`flex items-center gap-3 px-8 py-3 transition-colors ${
              isActive("/portal/inquiries")
                ? "bg-industrial-900 text-white"
                : "text-industrial-600 hover:bg-industrial-50 hover:text-berlin-red"
            }`}
          >
            <FileText className="w-4 h-4" />
            <span className="text-sm font-bold">Inquiry Log</span>
          </Link>
        </div>

        {/* SPECIFICATION LIBRARY */}
        <div className="mb-2 mt-6">
          <div className="px-8 py-2 text-xs font-bold text-industrial-400 uppercase tracking-widest mb-1">
            Specification Library
          </div>
          <nav className="space-y-1">
            <Link
              href="/portal/wishlists"
              className="flex items-center gap-3 px-8 py-2 text-industrial-600 hover:text-berlin-red hover:bg-industrial-50 transition-colors"
            >
              <Star className="w-4 h-4" />
              <span className="text-sm font-medium">My Projects</span>
            </Link>
            <Link
              href="/portal/previously-purchased"
              className="flex items-center gap-3 px-8 py-2 text-industrial-600 hover:text-berlin-red hover:bg-industrial-50 transition-colors"
            >
              <Clock className="w-4 h-4" />
              <span className="text-sm font-medium">Past Productions</span>
            </Link>
            <Link
              href="/portal/recently-viewed"
              className="flex items-center gap-3 px-8 py-2 text-industrial-600 hover:text-berlin-red hover:bg-industrial-50 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span className="text-sm font-medium">Recently Viewed</span>
            </Link>
          </nav>
        </div>

        {/* ACCOUNT MANAGEMENT */}
        <div className="mb-2 mt-6">
          <div className="px-8 py-2 text-xs font-bold text-industrial-400 uppercase tracking-widest mb-1">
            Account Management
          </div>
          <nav className="space-y-1">
            <Link
              href="/portal/profile"
              className="flex items-center gap-3 px-8 py-2 text-industrial-600 hover:text-berlin-red hover:bg-industrial-50 transition-colors"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm font-medium">Account Information</span>
            </Link>
          </nav>
        </div>

        {/* HELP */}
      </div>
    </div>
  );
}
