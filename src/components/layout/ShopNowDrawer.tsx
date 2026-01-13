"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, X, ArrowRight } from "lucide-react";
import { SHOP_NAVIGATION } from "@/config/shop-navigation";

interface ShopNowDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShopNowDrawer({ isOpen, onClose }: ShopNowDrawerProps) {
  const [activeTab, setActiveTab] = useState("market");

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const activeSection =
    SHOP_NAVIGATION.find((s) => s.id === activeTab) || SHOP_NAVIGATION[0];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-[140px] z-[40] isolate">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="absolute inset-y-0 left-0 w-[1100px] bg-white shadow-2xl flex animate-in slide-in-from-left duration-300">
        {/* Left Sidebar (Categories) */}
        <div className="w-72 bg-industrial-50 border-r border-industrial-100 flex flex-col">
          <div className="p-6 border-b border-industrial-100 flex items-center justify-between">
            <h2 className="text-xl font-black text-industrial-900 tracking-tight">
              SHOP <span className="text-berlin-red">CATALOG</span>
            </h2>
          </div>

          <div className="flex-1 py-4 overflow-y-auto">
            {SHOP_NAVIGATION.map((section) => (
              <button
                key={section.id}
                onMouseEnter={() => setActiveTab(section.id)}
                className={`w-full text-left px-6 py-4 text-sm font-bold transition-all flex items-center justify-between group ${
                  activeTab === section.id
                    ? "bg-white text-industrial-900 border-r-2 border-berlin-red shadow-sm transform scale-x-105 origin-left"
                    : "text-industrial-500 hover:text-industrial-900 hover:bg-white/50"
                }`}
              >
                {section.label}
                <ChevronRight
                  className={`w-4 h-4 transition-all duration-300 ${
                    activeTab === section.id
                      ? "text-berlin-red translate-x-1 opacity-100"
                      : "opacity-0 -translate-x-2 group-hover:opacity-50"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="p-6 bg-industrial-100/50 mt-auto">
            <Link
              href="/shop-all"
              onClick={onClose}
              className="flex items-center justify-between w-full px-4 py-3 bg-industrial-900 text-white text-sm font-bold rounded shadow-lg shadow-industrial-900/20 hover:bg-industrial-800 transition-all active:scale-95 mb-4"
            >
              <span>Shop All Categories</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/sale"
              onClick={onClose}
              className="flex items-center justify-between w-full px-4 py-3 bg-berlin-red text-white text-sm font-bold rounded shadow-lg shadow-red-900/20 hover:bg-red-700 transition-all active:scale-95"
            >
              <span>View On Sale</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="p-6 border-b border-industrial-100 flex items-center justify-between">
            {/* Left: Title */}
            <div>
              <h3 className="text-2xl font-black text-industrial-900 uppercase tracking-tight">
                {activeSection.label}
              </h3>
            </div>

            {/* Right: View All + Close */}
            <div className="flex items-center gap-6">
              <Link
                href={
                  activeSection.id === "market"
                    ? "/markets"
                    : activeSection.id === "function"
                    ? "/products"
                    : `/products/${activeSection.id}`
                }
                onClick={onClose}
                className="text-berlin-blue hover:text-berlin-dark-blue font-bold text-sm flex items-center gap-1 group"
              >
                View All
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <div className="w-px h-6 bg-industrial-200" /> {/* Divider */}
              <button
                onClick={onClose}
                className="p-2 text-industrial-400 hover:text-industrial-900 hover:bg-industrial-50 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300 key={activeSection.id}">
              <div className="space-y-10">
                {/* 1. Flat Items (Thumbnail Grid) */}
                {activeSection.flatItems &&
                  activeSection.flatItems.length > 0 && (
                    <div className="grid grid-cols-3 gap-6">
                      {activeSection.flatItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={onClose}
                          className="group flex flex-col gap-3"
                        >
                          <div className="aspect-[4/3] bg-industrial-50 rounded-xl border border-industrial-100 overflow-hidden group-hover:border-berlin-blue/50 group-hover:shadow-lg transition-all duration-300 relative">
                            {item.image ? (
                              <Image
                                src={item.image}
                                alt={item.label}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center text-industrial-300 group-hover:scale-105 transition-transform duration-500">
                                {/* Placeholder Icon */}
                                <div className="w-12 h-12 bg-industrial-200 rounded-full opacity-50" />
                              </div>
                            )}
                            {/* Overlay */}
                            <div className="absolute inset-0 bg-berlin-blue/0 group-hover:bg-berlin-blue/5 transition-colors duration-300" />
                          </div>
                          <div className="text-center">
                            <span className="text-sm font-bold text-industrial-700 group-hover:text-berlin-blue transition-colors block">
                              {item.label}
                            </span>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                {/* 2. Sub Sections */}
                {activeSection.subSections?.map((subSection) => (
                  <div key={subSection.label}>
                    <h4 className="font-bold text-industrial-900 text-sm mb-4 uppercase tracking-wider flex items-center gap-3">
                      <span className="w-8 h-1 bg-berlin-red/20 rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-berlin-red" />
                      </span>
                      {subSection.label}
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      {subSection.items.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={onClose}
                          className="flex items-center gap-3 p-3 rounded-lg hover:bg-industrial-50 border border-transparent hover:border-industrial-100 transition-all group"
                        >
                          <div className="w-1.5 h-1.5 bg-industrial-300 rounded-full group-hover:bg-berlin-blue transition-colors group-hover:scale-125" />
                          <span className="text-sm text-industrial-600 group-hover:text-industrial-900 font-medium">
                            {item.label}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Fallback */}
                {!activeSection.flatItems && !activeSection.subSections && (
                  <div className="flex items-center justify-center h-64 text-industrial-400 text-sm italic bg-industrial-50 rounded-xl border border-dashed border-industrial-200">
                    Coming Soon
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
