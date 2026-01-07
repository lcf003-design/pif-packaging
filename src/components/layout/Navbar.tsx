"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Archive,
  ChevronDown,
  Menu,
  Search,
  ShoppingBag,
  X,
} from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";

export default function Navbar() {
  const { totalItems } = useInquiry();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-industrial-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Branding */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-industrial-900 rounded-sm flex items-center justify-center">
            <Archive className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-industrial-900">
            CATALOG<span className="font-light">PRIME</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <div className="group relative">
            <button className="flex items-center space-x-1 text-sm font-medium text-industrial-600 hover:text-industrial-900">
              <span>Shop by Market</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {/* Mega Menu Dropdown */}
            <div className="absolute top-full left-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
              <div className="bg-white border border-industrial-100 shadow-xl rounded-md p-4 grid gap-2">
                {[
                  "Food",
                  "Beverage",
                  "Personal Care",
                  "Pharmaceutical",
                  "Home Care",
                  "Industrial",
                ].map((item) => (
                  <Link
                    key={item}
                    href={`/products?industry=${item}`}
                    className="block text-sm text-industrial-600 hover:text-action hover:bg-industrial-50 p-2 rounded"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <div className="group relative">
            <button className="flex items-center space-x-1 text-sm font-medium text-industrial-600 hover:text-industrial-900">
              <span>Shop by Container</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            {/* Mega Menu Dropdown */}
            <div className="absolute top-full left-0 w-64 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-in-out">
              <div className="bg-white border border-industrial-100 shadow-xl rounded-md p-4 grid gap-2">
                {["Bottles", "Jars", "Jugs", "Vials", "Tubes", "Closures"].map(
                  (item) => (
                    <Link
                      key={item}
                      href={`/products?category=${item}`}
                      className="block text-sm text-industrial-600 hover:text-action hover:bg-industrial-50 p-2 rounded"
                    >
                      {item}
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>

          <Link
            href="/services"
            className="text-sm font-medium text-industrial-600 hover:text-industrial-900"
          >
            Services
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button className="p-2 text-industrial-500 hover:text-industrial-900">
            <Search className="w-5 h-5" />
          </button>

          <Link
            href="/inquiry"
            className="relative p-2 text-industrial-500 hover:text-action transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-action rounded-full">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-industrial-100 bg-white p-4 space-y-4">
          {["Shop by Market", "Shop by Container", "Services"].map((item) => (
            <div
              key={item}
              className="block py-2 text-base font-medium text-industrial-900 border-b border-industrial-50"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
