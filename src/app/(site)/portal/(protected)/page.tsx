"use client";

import { useAuth } from "@/services/authService";
import { getProjects, getRecentlyViewed } from "@/services/userService";
import { getUserInquiries as fetchUserInquiries } from "@/services/inquiryService";
import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  MessageSquare,
  Folder,
  Clock,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export default function PortalDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    inquiries: 0,
    projects: 0,
    history: 0,
  });
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Partner");

  useEffect(() => {
    if (user) {
      setUserName(user.displayName?.split(" ")[0] || "Partner");
      loadStats();
    }
  }, [user]);

  async function loadStats() {
    if (!user) return;
    try {
      // Parallel fetch for speed
      const [inquiries, projects, history] = await Promise.all([
        fetchUserInquiries(user.email || ""),
        getProjects(user.uid),
        getRecentlyViewed(user.uid),
      ]);

      setStats({
        inquiries: inquiries.length,
        projects: projects.length,
        history: history.length,
      });
    } catch (err) {
      console.error("Failed to load dashboard stats", err);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-8 text-center text-gray-400 animate-pulse">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Welcome Hero */}
      <div className="bg-black text-white p-8 rounded-2xl relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2">Welcome back, {userName}.</h1>
          <p className="text-gray-400 max-w-lg">
            Manage your sourcing projects, track quote requests, and jump back
            into where you left off.
          </p>
        </div>
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-600 rounded-full blur-[80px] opacity-20 transform translate-x-1/3 -translate-y-1/3" />
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Inquiries */}
        <Link
          href="/portal/inquiries"
          className="group bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="bg-blue-50 p-3 rounded-lg group-hover:bg-blue-100 transition-colors">
              <MessageSquare className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {stats.inquiries}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
            Active Inquiries
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Track status and view quotes.
          </p>
        </Link>

        {/* Card 2: Projects */}
        <Link
          href="/portal/projects"
          className="group bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="bg-emerald-50 p-3 rounded-lg group-hover:bg-emerald-100 transition-colors">
              <Folder className="w-6 h-6 text-emerald-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {stats.projects}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
            My Projects
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Manage wishlists and seasonal lines.
          </p>
        </Link>

        {/* Card 3: History */}
        <Link
          href="/portal/history"
          className="group bg-white border border-gray-200 p-6 rounded-xl hover:shadow-lg transition-all"
        >
          <div className="flex justify-between items-start mb-4">
            <div className="bg-amber-50 p-3 rounded-lg group-hover:bg-amber-100 transition-colors">
              <Clock className="w-6 h-6 text-amber-600" />
            </div>
            <span className="text-2xl font-bold text-gray-900">
              {stats.history}
            </span>
          </div>
          <h3 className="font-semibold text-gray-900 group-hover:text-amber-600 transition-colors">
            Recently Viewed
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Jump back to items you saw.
          </p>
        </Link>
      </div>

      {/* Quick Action / Promotional Area (Optional) */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white p-3 rounded-full shadow-sm">
            <TrendingUp className="w-5 h-5 text-gray-900" />
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">
              Ready to start something new?
            </h4>
            <p className="text-sm text-gray-500">
              Explore our latest sustainable glass collection.
            </p>
          </div>
        </div>
        <Link
          href="/shop-all"
          className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
        >
          Browse Catalog
        </Link>
      </div>
    </div>
  );
}
