"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  X,
  Loader2,
  ChevronRight,
  Package,
  ArrowRight,
} from "lucide-react";
import { fetchProducts } from "@/services/productService";
import { Product } from "@/types";

export default function PredictiveSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Debounce Logic
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        try {
          // Limit to 6 results for the dropdown
          const products = await fetchProducts({ search: query });
          setResults(products.slice(0, 6));
          setIsOpen(true);
        } catch (error) {
          console.error("Search error:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setResults([]);
        setIsOpen(false);
      }
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query]);

  // Close on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/products?search=${encodeURIComponent(query.trim())}`);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div ref={wrapperRef} className="relative w-full max-w-2xl group z-50">
      {/* Search Input Field */}
      <form onSubmit={handleSubmit} className="relative z-20">
        <div className="relative group/input">
          {/* Animated Glow Border (Subtle) */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg blur opacity-0 group-hover/input:opacity-40 transition duration-500 will-change-transform" />

          <div className="relative flex items-center bg-white border border-industrial-200 rounded-lg shadow-sm focus-within:shadow-md focus-within:border-berlin-blue transition-all duration-300 overflow-hidden">
            {/* Search Icon */}
            <div className="pl-3.5 text-gray-400 group-focus-within/input:text-berlin-blue transition-colors duration-300">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Search className="w-5 h-5" />
              )}
            </div>

            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => {
                if (query.length >= 2 && results.length > 0) setIsOpen(true);
              }}
              placeholder="Search by Product Name, SKU, or Material..."
              className="w-full py-3.5 px-3 text-sm font-medium text-industrial-900 placeholder:text-gray-400 focus:outline-none bg-transparent"
              autoComplete="off"
            />

            {/* Clear Button */}
            {query && (
              <button
                type="button"
                onClick={clearSearch}
                className="pr-3 text-gray-400 hover:text-berlin-red transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Submit Arrow (only appears when typing) */}
            <button
              type="submit"
              className={`
                pr-3.5 pl-2 text-berlin-blue hover:text-berlin-dark-blue transition-all duration-300
                ${
                  query
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-4 pointer-events-none"
                }
              `}
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </form>

      {/* Results Dropdown */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl border border-industrial-200 shadow-2xl rounded-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200 origin-top">
          {/* Header */}
          <div className="px-4 py-3 bg-gray-50/50 border-b border-gray-100 flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
              {results.length > 0 ? "Top Suggestions" : "No Results"}
            </span>
            {results.length > 0 && (
              <span className="text-[10px] text-gray-400 font-medium">
                Use &uarr;&darr; to navigate
              </span>
            )}
          </div>

          {results.length > 0 ? (
            <div className="py-2">
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/product/${product.slug}`}
                  onClick={() => setIsOpen(false)}
                  className="group flex items-center gap-4 px-4 py-3 hover:bg-berlin-blue/5 transition-colors border-l-4 border-transparent hover:border-berlin-blue relative"
                >
                  {/* Thumbnail */}
                  <div className="relative w-12 h-12 flex-shrink-0 bg-white rounded-md border border-gray-100 p-1 overflow-hidden shadow-sm group-hover:scale-105 transition-transform duration-300">
                    {product.images && product.images.length > 0 ? (
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        className="object-contain p-0.5"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                        <Package className="w-6 h-6" />
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-gray-900 truncate group-hover:text-berlin-blue transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex items-center gap-2 mt-0.5">
                      {product.sku && (
                        <span className="text-[10px] font-mono bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded border border-gray-200">
                          {product.sku}
                        </span>
                      )}
                      <span className="text-xs text-gray-500 truncate">
                        {product.capacity?.value}
                        {product.capacity?.unit} {product.material}
                      </span>
                    </div>
                  </div>

                  {/* Arrow Action */}
                  <div className="opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-200">
                    <ChevronRight className="w-4 h-4 text-berlin-blue" />
                  </div>
                </Link>
              ))}

              {/* View All */}
              <button
                onClick={handleSubmit}
                className="w-full block text-center py-3 text-xs font-bold text-berlin-blue hover:text-berlin-dark-blue hover:bg-blue-50/50 transition-colors border-t border-gray-100 mt-1 uppercase tracking-wider"
              >
                View All {results.length}+ Results
              </button>
            </div>
          ) : (
            <div className="p-8 text-center flex flex-col items-center justify-center text-gray-500">
              <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                <Search className="w-5 h-5 opacity-40" />
              </div>
              <p className="text-sm font-medium">
                No products found for "{query}"
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Try searching for generic terms like "Glass" or "Bottle".
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
