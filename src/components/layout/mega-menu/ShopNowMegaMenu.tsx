"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

// Mock Data Structure
type CategoryItem = {
  name: string;
  image: string; // Placeholder or actual image path
  href: string;
};

type MegaMenuSection = {
  label: string;
  id: string;
  items: CategoryItem[];
};

const MENU_DATA: MegaMenuSection[] = [
  {
    label: "Shop by Market",
    id: "market",
    items: [
      {
        name: "Automotive",
        image: "/placeholder",
        href: "/products?market=automotive",
      },
      { name: "Food", image: "/placeholder", href: "/products?market=food" },
      {
        name: "Pet Care & Veterinary",
        image: "/placeholder",
        href: "/products?market=pet-care",
      },
      { name: "Beer", image: "/placeholder", href: "/products?market=beer" },
      {
        name: "Home Care",
        image: "/placeholder",
        href: "/products?market=home-care",
      },
      {
        name: "Pharma, Nutraceutical & Healthcare",
        image: "/placeholder",
        href: "/products?market=pharma",
      },
      {
        name: "Beverage",
        image: "/placeholder",
        href: "/products?market=beverage",
      },
      {
        name: "Industrial Chemical",
        image: "/placeholder",
        href: "/products?market=chemical",
      },
      {
        name: "Spirits",
        image: "/placeholder",
        href: "/products?market=spirits",
      },
      {
        name: "Cannabis & CBD",
        image: "/placeholder",
        href: "/products?market=cannabis",
      },
      {
        name: "Personal Health & Beauty",
        image: "/placeholder",
        href: "/products?market=beauty",
      },
      { name: "Wine", image: "/placeholder", href: "/products?market=wine" },
    ],
  },
  {
    label: "Shop by Function",
    id: "function",
    items: [
      {
        name: "Dispensing",
        image: "/placeholder",
        href: "/products?function=dispensing",
      },
      {
        name: "Storing",
        image: "/placeholder",
        href: "/products?function=storing",
      },
      {
        name: "Shipping",
        image: "/placeholder",
        href: "/products?function=shipping",
      },
    ],
  },
  {
    label: "New Arrivals & Custom Labels",
    id: "new",
    items: [],
  },
  {
    label: "Bottles",
    id: "bottles",
    items: [
      {
        name: "Glass Bottles",
        image: "/placeholder",
        href: "/products?cat=glass-bottles",
      },
      {
        name: "Plastic Bottles",
        image: "/placeholder",
        href: "/products?cat=plastic-bottles",
      },
    ],
  },
  {
    label: "Jars",
    id: "jars",
    items: [
      {
        name: "Glass Jars",
        image: "/placeholder",
        href: "/products?cat=glass-jars",
      },
      {
        name: "Plastic Jars",
        image: "/placeholder",
        href: "/products?cat=plastic-jars",
      },
    ],
  },
  { label: "Jugs", id: "jugs", items: [] },
  { label: "Vials", id: "vials", items: [] },
  { label: "Cans & Tins", id: "cans", items: [] },
  { label: "Tubs", id: "tubs", items: [] },
  { label: "Buckets & Drums", id: "drums", items: [] },
  { label: "Tubes", id: "tubes", items: [] },
  { label: "Caps & Closures", id: "caps", items: [] },
  { label: "Bottling Tools", id: "tools", items: [] },
  { label: "Boxes, Bags & Supplies", id: "supplies", items: [] },
  { label: "Hazmat Packaging", id: "hazmat", items: [] },
];

export default function ShopNowMegaMenu() {
  const [activeTab, setActiveTab] = useState("market");

  const activeSection =
    MENU_DATA.find((s) => s.id === activeTab) || MENU_DATA[0];

  return (
    <div className="absolute top-full left-0 w-[800px] bg-white shadow-2xl rounded-sm border border-industrial-200 flex overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200 z-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-industrial-50 border-r border-industrial-100 flex-shrink-0">
        <ul>
          {MENU_DATA.map((section) => (
            <li key={section.id}>
              <button
                onMouseEnter={() => setActiveTab(section.id)}
                className={`w-full text-left px-4 py-3 text-sm font-medium transition-colors flex items-center justify-between ${
                  activeTab === section.id
                    ? "bg-white text-industrial-900 font-bold border-l-4 border-berlin-red shadow-sm"
                    : "text-industrial-600 hover:text-industrial-900 hover:bg-industrial-100"
                }`}
              >
                {section.label}
                {activeTab === section.id && (
                  <ChevronRight className="w-4 h-4 text-industrial-400" />
                )}
              </button>
            </li>
          ))}
          {/* Sale Link */}
          <li className="mt-2 border-t border-industrial-200 pt-2">
            <Link
              href="/sale"
              className="block w-full text-left px-4 py-3 text-sm font-bold text-berlin-red hover:bg-red-50 transition-colors"
            >
              Sale
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 bg-white min-h-[500px]">
        <h3 className="text-lg font-bold text-industrial-900 mb-6 pb-2 border-b border-industrial-100">
          {activeSection.label}
        </h3>

        {activeSection.items.length > 0 ? (
          <div className="grid grid-cols-3 gap-6">
            {activeSection.items.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="group flex flex-col gap-2"
              >
                {/* Image Placeholder */}
                <div className="aspect-[4/3] bg-industrial-50 rounded-sm border border-industrial-100 overflow-hidden group-hover:border-berlin-blue transition-colors relative">
                  {/* In a real app, use next/image here */}
                  <div className="absolute inset-0 flex items-center justify-center text-industrial-300">
                    {/* Placeholder Icon */}
                    <div className="w-12 h-12 bg-industrial-200 rounded-full opacity-50" />
                  </div>
                </div>
                <span className="text-xs font-bold text-industrial-900 group-hover:text-berlin-blue transition-colors">
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center h-64 text-industrial-400 text-sm italic">
            No items available in this category.
          </div>
        )}
      </div>
    </div>
  );
}
