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
    : "N/A";
  const neck = product.neckFinish || "N/A";

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <Link
      href={`/product/${product.id}`}
      className="group block bg-white rounded-lg shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out border border-industrial-100 overflow-hidden relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating Badge */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-white/90 backdrop-blur-sm text-industrial-900 text-[10px] font-bold px-2 py-1 rounded-full border border-industrial-100 shadow-sm uppercase tracking-wider">
          {material}
        </span>
      </div>

      <div className="relative aspect-[4/5] bg-industrial-50 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full mix-blend-multiply opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-500"
        />

        {/* Quick Add Overlay */}
        <div
          className={`absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent transition-opacity duration-300 flex justify-center ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          <button
            onClick={handleQuickAdd}
            className="w-full bg-white text-industrial-900 hover:bg-berlin-blue hover:text-white font-bold text-xs py-2.5 rounded shadow-lg flex items-center justify-center gap-2 transition-all transform translate-y-2 group-hover:translate-y-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Add to Quote
          </button>
        </div>
      </div>

      <div className="p-4 bg-white">
        <h3 className="text-industrial-900 font-bold text-sm mb-1 line-clamp-2 min-h-[2.5rem] group-hover:text-berlin-blue transition-colors">
          {product.name}
        </h3>

        {/* Specs Row */}
        <div className="flex items-center gap-2 mt-3 text-[10px] sm:text-xs text-industrial-500 font-medium">
          <span className="px-1.5 py-0.5 bg-industrial-50 rounded border border-industrial-100">
            {capacity}
          </span>
          <span className="w-px h-3 bg-industrial-200"></span>
          <span className="px-1.5 py-0.5 bg-industrial-50 rounded border border-industrial-100">
            {neck}
          </span>
        </div>

        <div className="mt-4 pt-3 border-t border-industrial-50 flex items-center justify-between">
          <span className="text-xs text-industrial-400 font-medium group-hover:text-industrial-600 transition-colors">
            {product.brand}
          </span>
          <div className="w-6 h-6 rounded-full bg-industrial-50 flex items-center justify-center group-hover:bg-berlin-red group-hover:text-white transition-colors">
            <ArrowRight className="w-3 h-3" />
          </div>
        </div>
      </div>
    </Link>
  );
}
