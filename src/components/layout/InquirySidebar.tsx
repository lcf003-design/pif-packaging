"use client";

import React from "react";
import { useInquiry } from "@/context/InquiryContext";
import { X, Trash2, ChevronRight, PackageOpen } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types";

export function InquirySidebar() {
  const { items, removeItem, isSidebarOpen, closeSidebar, totalItems } =
    useInquiry();

  if (!isSidebarOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity"
        onClick={closeSidebar}
      />

      {/* Sidebar - Slide-out from right */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 transform transition-transform flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-industrial-50">
          <div className="flex items-center gap-2">
            <PackageOpen className="w-5 h-5 text-berlin-blue" />
            <h2 className="font-bold text-lg text-gray-900">Inquiry Bundle</h2>
            <span className="bg-berlin-blue text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          </div>
          <button
            onClick={closeSidebar}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-gray-500">
              <PackageOpen className="w-16 h-16 text-gray-300" />
              <p>Your bundle is empty.</p>
              <button
                onClick={closeSidebar}
                className="text-berlin-blue font-medium hover:underline"
              >
                Browse Catalog
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 border border-gray-100 rounded-lg p-3 hover:border-blue-100 transition-colors"
              >
                <div className="w-20 h-24 bg-gray-50 flex-shrink-0 flex items-center justify-center rounded-sm overflow-hidden">
                  <img
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full object-contain mix-blend-multiply"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-gray-500 uppercase font-bold">
                    {item.product.category}
                  </p>
                  <h4 className="font-medium text-gray-900 text-sm line-clamp-2 leading-tight mb-1">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center text-xs text-gray-500 gap-3">
                    <span>Qty: {item.quantity}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span>{item.product.material}</span>
                  </div>
                </div>
                <button
                  onClick={() => removeItem(item.product.id)}
                  className="p-1.5 h-fit hover:bg-red-50 hover:text-red-500 rounded text-gray-400 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <Link
            href="/inquiry"
            onClick={closeSidebar}
            className={`flex items-center justify-center w-full py-3.5 px-4 rounded font-bold text-sm tracking-wide uppercase transition-all ${
              items.length === 0
                ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                : "bg-action hover:bg-action-hover text-white shadow-md hover:shadow-lg"
            }`}
          >
            Request Quote <ChevronRight className="w-4 h-4 ml-2" />
          </Link>
          <p className="text-[10px] text-center text-gray-400 mt-2">
            No payment required. We will respond within 24 hours.
          </p>
        </div>
      </div>
    </>
  );
}
