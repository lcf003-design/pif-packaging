"use client";

import Link from "next/link";
import { Product } from "@/types";
import { ArrowRight, Plus } from "lucide-react";
import { useInquiry } from "@/context/InquiryContext";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useInquiry();
  const [isHovered, setIsHovered] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation
    e.stopPropagation();
    addItem(product, 1);
  };

  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-white border border-industrial-100 hover:border-industrial-300 transition-all duration-300 ease-in-out relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[3/4] bg-industrial-50 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-500"
        />
        {product.isClosure && (
          <span className="absolute top-2 right-2 bg-industrial-900 text-white text-[10px] uppercase font-bold px-2 py-1 tracking-wider">
            Closure
          </span>
        )}

        {/* Quick Add Button - Visible on Hover (Desktop) or Always (Mobile - TODO) */}
        <button
          onClick={handleQuickAdd}
          className={`absolute bottom-2 right-2 bg-white/90 hover:bg-action text-industrial-800 hover:text-white p-2 rounded-full shadow-md transition-all duration-300 transform ${
            isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          title="Quick add to quote"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
      <div className="p-4 border-t border-industrial-100">
        <p className="text-xs text-industrial-500 uppercase tracking-wider mb-1 font-medium">
          {product.brand}
        </p>
        <h3 className="text-industrial-900 font-semibold mb-2 group-hover:text-action transition-colors line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>
        <div className="flex items-center justify-between text-xs text-industrial-600 border-t border-industrial-50 pt-3 mt-3">
          <span>{product.material}</span>
          <span className="flex items-center group-hover:translate-x-1 transition-transform">
            Details <ArrowRight className="w-3 h-3 ml-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
