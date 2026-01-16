"use client";

import React from "react";
import { useInquiry } from "@/context/InquiryContext";
import { X, Trash2, ArrowRight } from "lucide-react";
import Link from "next/link";

export function InquirySidebar() {
  const { items, removeItem, isSidebarOpen, closeSidebar, totalItems } =
    useInquiry();

  if (!isSidebarOpen) return null;

  return (
    <>
      {/* Backdrop - darker and smoother */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity duration-300"
        onClick={closeSidebar}
      />

      {/* Sidebar - Slide-out from right */}
      <div className="fixed inset-y-0 right-0 w-full max-w-[480px] bg-white shadow-2xl z-50 transform transition-transform duration-300 flex flex-col border-l border-gray-100">
        {/* 1. Header: Command Center Style */}
        <div className="px-8 py-6 border-b-2 border-slate-900 bg-white flex items-center justify-between sticky top-0 z-10">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-widest text-berlin-blue font-bold mb-1">
              Command Center
            </span>
            <h2 className="font-black text-2xl text-slate-900 tracking-tighter uppercase leading-none">
              Quote Request
            </h2>
          </div>
          <button
            onClick={closeSidebar}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors group"
          >
            <X className="w-6 h-6 text-slate-400 group-hover:text-berlin-red transition-colors" />
          </button>
        </div>

        {/* 2. Content: Clean List */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 opacity-60">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-2">
                <span className="text-4xl">📦</span>
              </div>
              <p className="text-xl font-bold text-gray-900">
                Your Quote is Empty
              </p>
              <button
                onClick={closeSidebar}
                className="text-berlin-blue font-bold uppercase tracking-widest text-xs border-b-2 border-berlin-blue pb-1 hover:text-berlin-red hover:border-berlin-red transition-all"
              >
                Return to Catalog
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="py-6 flex gap-6 group transition-colors"
                >
                  {/* Image: Mixed Blend for Premium Look */}
                  <div className="w-24 h-24 bg-gray-50 flex-shrink-0 flex items-center justify-center rounded-lg overflow-hidden border border-gray-100 group-hover:border-berlin-blue/30 transition-all">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-full h-full object-contain mix-blend-multiply p-2"
                    />
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <p className="text-[10px] text-berlin-blue uppercase font-bold tracking-widest mb-1">
                        {item.product.category}
                      </p>
                      <h4 className="font-bold text-slate-900 text-base leading-tight">
                        {item.product.name}
                      </h4>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3 text-xs font-medium text-gray-500 bg-gray-50 px-3 py-1.5 rounded-md">
                        <span className="text-slate-900 font-bold">
                          Qty: {item.quantity}
                        </span>
                        <span className="w-px h-3 bg-gray-300"></span>
                        <span>{item.product.material}</span>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-gray-300 hover:text-berlin-red transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 3. Footer: Conversion Action */}
        <div className="p-8 border-t border-gray-100 bg-gray-50/50 space-y-4">
          <div className="flex items-center justify-between text-sm font-bold text-slate-900">
            <span className="uppercase tracking-widest text-gray-500">
              Total Items
            </span>
            <span className="text-xl">{totalItems}</span>
          </div>

          <Link
            href="/inquiry"
            onClick={closeSidebar}
            className={`flex items-center justify-center w-full py-5 rounded-xl font-bold text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-xl ${
              items.length === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none"
                : "bg-berlin-red hover:bg-red-700 text-white shadow-red-900/10 hover:shadow-red-900/20 hover:-translate-y-1"
            }`}
          >
            Review Quote <ArrowRight className="w-5 h-5 ml-3" />
          </Link>

          <div className="text-center">
            <p className="text-[10px] text-gray-400 font-medium flex items-center justify-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
              Secure SSL Encrypted
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
