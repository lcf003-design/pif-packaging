"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface GridItem {
  title: string;
  image: string;
  href: string;
}

interface MarketCategoryGridProps {
  items: GridItem[];
  title?: string;
}

export default function MarketCategoryGrid({
  items,
  title = "Shop by Category",
}: MarketCategoryGridProps) {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 uppercase tracking-tight">
            {title}
          </h2>
          <div className="h-1 w-12 bg-red-600 mt-2" />
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group block bg-white border border-gray-100 hover:border-red-600 hover:shadow-lg transition-all duration-300 rounded-sm overflow-hidden"
            >
              <div className="aspect-[4/5] relative p-6 flex flex-col items-center justify-between">
                {/* Image Area */}
                <div className="relative w-full h-48 sm:h-56">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Label Area */}
                <div className="w-full text-center mt-4 pt-4 border-t border-gray-100 group-hover:border-red-100 transition-colors">
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-red-600 uppercase tracking-wide transition-colors">
                    {item.title}
                  </h3>
                  <div className="mt-2 text-xs font-bold text-red-600 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                    View Products <ArrowRight className="w-3 h-3" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
