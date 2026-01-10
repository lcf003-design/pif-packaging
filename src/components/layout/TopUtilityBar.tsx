"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import { Search, Phone, User, ShoppingCart, MessageSquare } from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";

export default function TopUtilityBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const { totalItems, openSidebar } = useInquiry();

  // Sync state with URL param on load
  useEffect(() => {
    const search = searchParams.get("search");
    if (search) setQuery(search);
  }, [searchParams]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div className="bg-white border-b border-industrial-200 py-4">
      <div className="w-full px-8 flex flex-col md:flex-row items-center gap-4 md:gap-8">
        {/* Search Bar (Fills remaining space) */}
        <div className="flex-grow w-full md:w-auto relative">
          <form onSubmit={handleSearch} className="flex">
            <button
              type="submit"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-berlin-blue"
            >
              <Search className="w-5 h-5" />
            </button>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Plastic Bottles, Glass Jars & More..."
              className="w-full pl-10 pr-4 py-2.5 border border-industrial-300 rounded-sm text-sm focus:outline-none focus:border-berlin-blue focus:ring-1 focus:ring-berlin-blue"
            />
          </form>
        </div>

        {/* Utility Actions */}
        <div className="flex items-center gap-6 flex-shrink-0 text-industrial-700 text-sm font-medium">
          <div className="flex items-center gap-2 text-berlin-blue cursor-pointer hover:underline">
            <div className="w-6 h-4 border border-industrial-300 rounded-sm overflow-hidden relative">
              {/* Crude US Flag representation for "Region" selector */}
              <div className="absolute inset-0 bg-red-100 flex flex-col">
                <div className="h-1/2 bg-blue-900 w-1/2"></div>
                <div className="h-[2px] bg-red-600 mt-[2px]"></div>
              </div>
            </div>
          </div>

          <Link
            href="/quote"
            className="flex items-center gap-2 hover:text-berlin-blue transition-colors"
          >
            <MessageSquare className="w-5 h-5 text-berlin-blue" />
            <span>Request Quote</span>
          </Link>

          <a
            href="tel:+18005550199"
            className="hover:text-berlin-blue transition-colors hidden lg:flex"
          >
            <Phone className="w-5 h-5" />
          </a>

          <Link
            href="/account"
            className="hover:text-berlin-blue transition-colors"
          >
            <User className="w-5 h-5" />
          </Link>

          <button
            onClick={openSidebar}
            className="hover:text-berlin-blue transition-colors relative"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-berlin-blue text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
