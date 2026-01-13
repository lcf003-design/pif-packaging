"use client";

import Link from "next/link";
import { Product } from "@/types";
import { ArrowRight, Plus } from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useInquiry();
  const [isHovered, setIsHovered] = useState(false);

  // Derive specs for display
  const material = product.material || "Plastic";
  const capacity = product.capacity
    ? `${product.capacity.value}${product.capacity.unit}`
    : null;
  const neck = product.neckFinish || null;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <Link
      href={`/product/${product.slug || product.id}`}
      className="group flex flex-col h-full bg-white rounded-lg border border-transparent hover:border-industrial-200 hover:shadow-lg transition-all duration-300 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Area */}
      <div className="relative aspect-[4/5] p-6 flex items-center justify-center bg-white rounded-t-lg">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-contain w-full h-full mix-blend-multiply opacity-95 group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quick View / Add Button (appears on hover) */}
        <div
          className={`absolute bottom-4 left-0 right-0 px-4 transition-all duration-300 transform ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className="w-full bg-white/90 backdrop-blur-sm border border-industrial-200 text-industrial-900 font-bold text-xs py-3 rounded shadow-md hover:bg-berlin-blue hover:text-white hover:border-berlin-blue transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add to Quote
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-4 pt-0 flex flex-col flex-grow">
        {/* Specs Summary */}
        <div className="text-[11px] font-medium text-industrial-500 mb-2 flex items-center gap-2">
          {capacity && (
            <>
              <span>{capacity}</span>
              <span className="text-industrial-300">|</span>
            </>
          )}
          {neck && (
            <>
              <span>{neck}</span>
              <span className="text-industrial-300">|</span>
            </>
          )}
          <span>{material}</span>
        </div>

        {/* Title */}
        <h3 className="text-industrial-900 font-bold text-sm leading-snug line-clamp-3 mb-2 group-hover:text-berlin-blue transition-colors">
          {product.name}
        </h3>

        {/* SKU Display */}
        <div className="mt-auto pt-4 flex items-center justify-between">
          <span className="text-[10px] text-industrial-400 font-mono">
            SKU: {product.sku}
          </span>
          <span className="text-xs font-bold text-action opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1">
            View Details <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}
