"use client";

import { useEffect, useState } from "react";
import { Users, MessageSquare, Package, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllInquiries } from "@/services/inquiryService";
import { getAllUsers } from "@/services/userService";
import { fetchProducts } from "@/services/productService";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    inquiries: 0,
    users: 0,
    products: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [inquiries, users, products] = await Promise.all([
          getAllInquiries(),
          getAllUsers(),
          fetchProducts({}),
        ]);

        setStats({
          inquiries: inquiries.length,
          users: users.length,
          products: products.length,
        });
      } catch (error) {
        console.error("Failed to load admin stats", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="p-12 text-center text-gray-500">
        Loading Command Center...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Command Center
        </h1>
        <p className="text-slate-500">
          Overview of platform performance and activity.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <StatsCard
          title="Total Inquiries"
          value={stats.inquiries}
          icon={MessageSquare}
          color="blue"
          href="/admin/inquiries"
        />
        <StatsCard
          title="Active Users"
          value={stats.users}
          icon={Users}
          color="purple"
          href="/admin/users"
        />
        <StatsCard
          title="Products Listing"
          value={stats.products}
          icon={Package}
          color="emerald"
          href="/admin/products"
        />
      </div>

      {/* Quick Actions / Recent Activity Placeholder */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">System Status</h2>
          <div className="flex items-center gap-2 text-sm text-green-600 font-medium px-3 py-1 bg-green-50 rounded-full">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Operational
          </div>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
              Quick Actions
            </h3>
            <div className="space-y-3">
              <Link
                href="/admin/products/new"
                className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group"
              >
                <span className="font-medium text-slate-700">
                  Add New Product
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
              </Link>
              <Link
                href="/admin/inquiries"
                className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors group"
              >
                <span className="font-medium text-slate-700">
                  Review Pending Quotes
                </span>
                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900" />
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">
              Recent Activity
            </h3>
            <div className="text-sm text-slate-500 italic">
              Activity logging coming soon...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatsCard({ title, value, icon: Icon, color, href }: any) {
  const colorMap: any = {
    blue: "bg-blue-50 text-blue-600",
    purple: "bg-purple-50 text-purple-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <Link href={href} className="block group">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
        <div className="flex items-center justify-between mb-4">
          <div
            className={`w-12 h-12 rounded-lg flex items-center justify-center ${colorMap[color]}`}
          >
            <Icon className="w-6 h-6" />
          </div>
          <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-slate-500 transition-colors" />
        </div>
        <div className="text-4xl font-black text-slate-900 mb-1 tracking-tight">
          {value}
        </div>
        <div className="text-sm font-medium text-slate-500">{title}</div>
      </div>
    </Link>
  );
}
