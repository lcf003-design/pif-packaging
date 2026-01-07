"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

interface NavItem {
  label: string;
  href: string;
  subItems?: { label: string; href: string }[];
}

const NAV_LINKS: NavItem[] = [
  {
    label: "Why PIF",
    href: "/why-us",
    subItems: [
      { label: "Our Mission", href: "/why-us/mission" },
      { label: "Our Model", href: "/why-us/model" },
      { label: "Our Global Reach", href: "/why-us/global-reach" },
      { label: "Our Divisions", href: "/why-us/divisions" },
      { label: "Our Operations", href: "/why-us/operations" },
      { label: "Our Story", href: "/why-us/story" },
      { label: "Our Community", href: "/why-us/community" },
    ],
  },
  {
    label: "Results",
    href: "/results",
    subItems: [
      { label: "Quantified Value", href: "/results/value" },
      { label: "On-Time Delivery", href: "/results/delivery" },
      { label: "Testimonials", href: "/results/testimonials" },
    ],
  },
  { label: "Services", href: "/services" },
  { label: "Markets Served", href: "/markets" },
  {
    label: "Sustainability",
    href: "/sustainability",
    subItems: [
      { label: "Our Sustainability Purpose", href: "/sustainability/purpose" },
      {
        label: "Our Sustainability Framework",
        href: "/sustainability/framework",
      },
      {
        label: "Our Sustainability Solutions",
        href: "/sustainability/solutions",
      },
      {
        label: "Sustainability Legislations",
        href: "/sustainability/legislations",
      },
    ],
  },
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
          <nav className="hidden md:flex items-center gap-8 h-full">
            {NAV_LINKS.map((link) => (
              <div
                key={link.label}
                className="relative group h-full flex items-center"
              >
                {link.subItems ? (
                  // Locked Parent Item (Button)
                  <button className="text-sm font-bold text-industrial-800 group-hover:text-berlin-blue group-hover:bg-industrial-50 px-3 py-1.5 rounded-sm transition-all flex items-center gap-1 cursor-default outline-none relative overflow-hidden">
                    {link.label}
                    <ChevronDown className="w-3 h-3 ml-0.5 opacity-50 group-hover:rotate-180 transition-transform duration-200" />
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
                  </button>
                ) : (
                  // Standard Link Item
                  <Link
                    href={link.href}
                    className="text-sm font-bold text-industrial-800 hover:text-berlin-blue hover:bg-industrial-50 px-3 py-1.5 rounded-sm transition-all whitespace-nowrap flex items-center gap-1 relative overflow-hidden"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-red-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out origin-left" />
                  </Link>
                )}

                {/* Mega Menu Dropdown */}
                {link.subItems && (
                  <div className="absolute top-full left-0 pt-2 w-56 hidden group-hover:block z-50">
                    <div className="bg-white border border-industrial-200 shadow-xl rounded-sm py-2 animate-in fade-in slide-in-from-top-1 duration-200">
                      {link.subItems.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          className="block px-4 py-2 text-sm text-industrial-600 hover:text-berlin-blue hover:bg-industrial-50 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
