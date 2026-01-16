"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { SHOP_NAVIGATION } from "@/config/shop-navigation";

export default function ShopNowMegaMenu({ onClose }: { onClose: () => void }) {
  const [activeTab, setActiveTab] = useState("market");

  const activeSection =
    SHOP_NAVIGATION.find((s) => s.id === activeTab) || SHOP_NAVIGATION[0];

  return (
    <div className="absolute top-full left-0 w-[900px] bg-white shadow-2xl rounded-sm border border-industrial-200 flex overflow-hidden animate-in fade-in slide-in-from-top-1 duration-200 z-50">
      {/* Left Sidebar */}
      <div className="w-64 bg-industrial-50 border-r border-industrial-100 flex-shrink-0">
        <div className="py-2">
          {SHOP_NAVIGATION.map((section) => (
            <button
              key={section.id}
              onMouseEnter={() => setActiveTab(section.id)}
              className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors flex items-center justify-between ${
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
          ))}
          {/* Sale Link */}
          <div className="mt-2 border-t border-industrial-200 pt-2">
            <Link
              href="/sale"
              onClick={onClose}
              className="block w-full text-left px-4 py-2.5 text-sm font-bold text-berlin-red hover:bg-red-50 transition-colors"
            >
              Sale
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-8 bg-white min-h-[500px] max-h-[600px] overflow-y-auto">
        <h3 className="text-xl font-bold text-industrial-900 mb-6 pb-2 border-b border-industrial-100">
          {activeSection.label}
        </h3>

        <div className="space-y-8">
          {/* 1. Flat Items (if any) */}
          {activeSection.flatItems && activeSection.flatItems.length > 0 && (
            <div className="grid grid-cols-3 gap-6">
              {activeSection.flatItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className="group flex flex-col gap-2"
                >
                  <div className="aspect-[4/3] bg-industrial-50 rounded-sm border border-industrial-100 overflow-hidden group-hover:border-berlin-blue transition-colors relative">
                    <div className="absolute inset-0 flex items-center justify-center text-industrial-300">
                      <div className="w-10 h-10 bg-industrial-200 rounded-full opacity-50" />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-industrial-900 group-hover:text-berlin-blue transition-colors text-center">
                    {item.label}
                  </span>
                </Link>
              ))}
            </div>
          )}

          {/* 2. Sub Sections (if any) */}
          {activeSection.subSections?.map((subSection) => (
            <div key={subSection.label}>
              <h4 className="font-bold text-industrial-800 text-sm mb-3 uppercase tracking-wider flex items-center gap-2">
                <span className="w-1 h-4 bg-berlin-red rounded-full" />
                {subSection.label}
              </h4>
              <div className="grid grid-cols-3 gap-4">
                {subSection.items.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center gap-2 p-2 rounded-md hover:bg-industrial-50 transition-colors group"
                  >
                    <div className="w-1 h-1 bg-industrial-300 rounded-full group-hover:bg-berlin-blue transition-colors" />
                    <span className="text-sm text-industrial-600 group-hover:text-industrial-900 font-medium">
                      {item.label}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ))}

          {/* Fallback for empty */}
          {!activeSection.flatItems && !activeSection.subSections && (
            <div className="flex items-center justify-center h-64 text-industrial-400 text-sm italic">
              No items available in this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
