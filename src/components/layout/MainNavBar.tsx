"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

const NAV_LINKS = [
  { label: "Why PIF", href: "/why-us" },
  { label: "Results", href: "/results" },
  { label: "Services", href: "/services" },
  { label: "Markets Served", href: "/markets" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
];

export default function MainNavBar() {
  return (
    <div className="bg-white border-b border-industrial-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center h-14">
          {/* Shop Now Dropdown Button */}
          <button className="bg-berlin-blue hover:bg-berlin-dark-blue text-white px-6 h-10 rounded-sm font-bold text-sm flex items-center gap-2 transition-colors mr-8">
            Shop Now
            <ChevronDown className="w-4 h-4" />
          </button>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 overflow-x-auto no-scrollbar">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm font-bold text-industrial-800 hover:text-berlin-blue whitespace-nowrap transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
