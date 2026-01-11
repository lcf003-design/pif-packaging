"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  Search,
  Phone,
  User,
  ShoppingCart,
  MessageSquare,
  Menu,
  ChevronDown,
} from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";
import ContactModal from "./ContactModal";
import AccountModal from "./AccountModal";

import SignUpModal from "@/components/layout/SignUpModal";

export default function TopUtilityBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const { totalItems, openSidebar, toggleMobileMenu } = useInquiry();

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
    <>
      <div className="bg-white md:border-b border-industrial-200 py-3 md:py-4 sticky top-0 z-[60]">
        <div className="w-full px-4 md:px-8 flex items-center justify-between gap-4 md:gap-8">
          {/* Mobile Red Brand Box (Left) */}
          <Link
            href="/"
            className="md:hidden flex-shrink-0 bg-berlin-red text-white flex flex-col items-center justify-center -my-3 -ml-4 z-40 h-[68px] w-24 px-1"
          >
            <span className="font-black text-4xl leading-none tracking-tighter">
              PIF
            </span>
            <span className="text-[0.55rem] font-bold tracking-[0.2em] uppercase mt-0.5 border-t border-white/20 pt-0.5 w-full text-center">
              PACKAGING
            </span>
          </Link>

          {/* Spacer to push utility to right */}
          <div className="flex-grow md:hidden" />

          {/* Search Bar (Desktop Only - Logic maintained) */}
          <div className="hidden md:flex flex-grow justify-end md:justify-start">
            <form onSubmit={handleSearch} className="w-full max-w-xl relative">
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
          <div className="flex items-center gap-5 flex-shrink-0 text-industrial-700 text-sm font-medium">
            {/* 1. Flag / Region (Visible on Mobile) */}
            <div className="flex items-center gap-1 text-industrial-600 cursor-pointer">
              <div className="w-6 h-6 rounded-full overflow-hidden relative border border-gray-200">
                {/* US Flag SVG Replacement */}
                <svg viewBox="0 0 60 30" className="w-full h-full object-cover">
                  <rect width="60" height="30" fill="#bf0a30" />
                  <rect width="60" height="3.8" y="3.8" fill="#ffffff" />
                  <rect width="60" height="3.8" y="11.4" fill="#ffffff" />
                  <rect width="60" height="3.8" y="19" fill="#ffffff" />
                  <rect width="60" height="3.8" y="26.6" fill="#ffffff" />
                  <rect width="25" height="16" fill="#002868" />
                </svg>
              </div>
              <ChevronDown className="w-3 h-3 opacity-50" />
            </div>

            {/* 2. Search Icon (Mobile Only - Desktop has input) */}
            <button className="md:hidden text-industrial-700">
              <Search className="w-6 h-6" />
            </button>

            {/* Quote (Desktop Only) */}
            <Link
              href="/quote"
              className="hidden lg:flex items-center gap-2 hover:text-berlin-blue transition-colors"
            >
              <MessageSquare className="w-5 h-5 text-berlin-blue" />
              <span>Request Quote</span>
            </Link>

            {/* Phone (Desktop Only) */}
            <button
              onClick={() => setIsContactOpen(true)}
              className="hover:text-berlin-blue transition-colors hidden lg:flex"
            >
              <Phone className="w-5 h-5" />
            </button>

            {/* User (Desktop Only) */}
            <button
              onClick={() => setIsAccountOpen(true)}
              className="hover:text-berlin-blue transition-colors hidden md:block"
            >
              <User className="w-5 h-5" />
            </button>

            {/* 3. Cart (Visible Mobile & Desktop) */}
            <button
              onClick={openSidebar}
              className="hover:text-berlin-blue transition-colors relative"
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-berlin-blue text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </button>

            {/* 4. Menu (Mobile Only - Last item) */}
            <button
              className="md:hidden text-industrial-700 ml-1"
              onClick={toggleMobileMenu}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>

      <ContactModal
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
        onSwitchToSignUp={() => {
          setIsAccountOpen(false);
          setIsSignUpOpen(true);
        }}
      />
      <SignUpModal
        isOpen={isSignUpOpen}
        onClose={() => setIsSignUpOpen(false)}
        onSwitchToLogin={() => {
          setIsSignUpOpen(false);
          setIsAccountOpen(true);
        }}
      />
    </>
  );
}
