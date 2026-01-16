"use client";

import Link from "next/link";
import { Product } from "@/types";
import { Plus, ArrowUpRight, Copy } from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useInquiry();
  const [isHovered, setIsHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  // Derive specs for display
  const material = product.material || "Standard";
  const capacity = product.capacity
    ? `${product.capacity.value}${product.capacity.unit}`
    : "N/A";

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleCopySku = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(product.sku || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <Link
      href={`/product/${product.slug || product.id}`}
      className="group relative flex flex-col bg-white overflow-hidden transition-all duration-300 hover:z-20 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 rounded-sm border border-transparent hover:border-berlin-blue/20"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 1. Technical Header (SKU & Status) */}
      <div className="px-4 py-3 flex items-center justify-between border-b border-gray-50 bg-white z-10">
        <div
          className="flex items-center gap-2 cursor-copy"
          onClick={handleCopySku}
          title="Click to Copy SKU"
        >
          <span
            className={`text-[10px] font-mono font-bold tracking-widest uppercase transition-colors ${
              copied
                ? "text-green-600"
                : "text-gray-400 group-hover:text-berlin-blue"
            }`}
          >
            {copied ? "COPIED" : product.sku || "NO-SKU"}
          </span>
          {isHovered && !copied && <Copy className="w-3 h-3 text-gray-300" />}
        </div>

        {/* Live Stock Pulse */}
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">
            Live
          </span>
        </div>
      </div>

      {/* 2. Specimen Image Area */}
      <div className="relative aspect-square w-full bg-white p-6 flex items-center justify-center">
        {/* Grid Background Effect on Hover */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:1rem_1rem] opacity-0 group-hover:opacity-10 transition-opacity duration-500"></div>

        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-contain w-full h-full mix-blend-multiply relative z-10 group-hover:scale-110 transition-transform duration-500 ease-out"
        />

        {/* Quick Add Overlay */}
        <div
          className={`absolute bottom-4 left-4 right-4 z-20 transition-all duration-300 transform ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className="w-full bg-berlin-blue text-white font-bold text-xs uppercase tracking-widest py-3 shadow-lg shadow-blue-900/20 hover:bg-blue-700 flex items-center justify-center gap-2 rounded-sm"
          >
            <Plus className="w-4 h-4" />
            Quick Quote
          </button>
        </div>
      </div>

      {/* 3. Data & Specs */}
      <div className="p-4 flex-grow flex flex-col justify-between bg-white relative">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-sm group-hover:bg-blue-50 group-hover:text-berlin-blue transition-colors">
              {material}
            </span>
            <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-sm">
              {capacity}
            </span>
          </div>

          <h3 className="text-gray-900 font-black text-sm leading-tight uppercase tracking-tight group-hover:text-berlin-blue transition-colors mb-1">
            {product.name}
          </h3>
        </div>

        {/* Action Hint */}
        <div className="mt-4 flex items-center justify-end opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
            View Spec <ArrowUpRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
