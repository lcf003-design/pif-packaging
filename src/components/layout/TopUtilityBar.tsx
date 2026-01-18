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
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { logOut } from "@/services/authService";
import { useAuth } from "@/context/AuthContext";
import { getUserProfile } from "@/services/userService";
import { useInquiry } from "@/context/InquiryContext";
import ContactModal from "./ContactModal";
import AccountModal from "./AccountModal";

import SignUpModal from "@/components/layout/SignUpModal";
import PredictiveSearch from "@/components/search/PredictiveSearch";

export default function TopUtilityBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const { totalItems, openSidebar, toggleMobileMenu } = useInquiry();

  const { user } = useAuth();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  useEffect(() => {
    if (user) {
      getUserProfile(user.uid).then((p) => {
        if (p?.role === "admin") setIsAdmin(true);
      });
    } else {
      setIsAdmin(false);
    }
  }, [user]);

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
            <span className="relative font-black text-4xl leading-none tracking-tighter">
              PIF
              <span className="absolute top-0 -right-3 text-[0.4rem] font-bold tracking-normal opacity-80">
                TM
              </span>
            </span>
            <span className="text-[0.55rem] font-bold tracking-[0.2em] uppercase mt-0.5 border-t border-white/20 pt-0.5 w-full text-center">
              PACKAGING
            </span>
          </Link>

          {/* Spacer to push utility to right */}
          <div className="flex-grow md:hidden" />

          {/* Search Bar (Predictive) - Desktop */}
          <div className="hidden md:flex flex-grow justify-end md:justify-start">
            <PredictiveSearch />
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
            <button
              className={`md:hidden transition-colors ${
                isMobileSearchOpen ? "text-berlin-red" : "text-industrial-700"
              }`}
              onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
            >
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
            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="hover:text-berlin-blue transition-colors flex items-center gap-1"
                >
                  <div className="w-8 h-8 rounded-full bg-industrial-100 flex items-center justify-center border border-industrial-200">
                    <User className="w-5 h-5 text-industrial-600" />
                  </div>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-industrial-200 rounded-lg shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
                    <div className="px-4 py-2 border-b border-industrial-100 mb-2">
                      <p className="text-xs font-medium text-industrial-500">
                        Signed in as
                      </p>
                      <p className="text-sm font-bold text-industrial-900 truncate">
                        {user.email}
                      </p>
                    </div>

                    {isAdmin && (
                      <Link
                        href="/admin/products"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-sm text-industrial-700 hover:bg-industrial-50 hover:text-berlin-blue transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Admin Dashboard
                      </Link>
                    )}

                    <Link
                      href="/portal"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2 text-sm text-industrial-700 hover:bg-industrial-50 hover:text-berlin-blue transition-colors"
                    >
                      <User className="w-4 h-4" />
                      My Portal
                    </Link>

                    <button
                      onClick={() => {
                        logOut();
                        setIsUserMenuOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors text-left"
                    >
                      <LogOut className="w-4 h-4" />
                      Log Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAccountOpen(true)}
                className="hover:text-berlin-blue transition-colors hidden md:block"
              >
                <User className="w-5 h-5" />
              </button>
            )}

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

        {/* MOBILE SEARCH BAR EXPANSION */}
        {isMobileSearchOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-industrial-200 p-4 shadow-xl z-50 animate-in slide-in-from-top-2 duration-200">
            <PredictiveSearch />
          </div>
        )}
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
