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
  columns?: 4 | 5;
}

export default function MarketCategoryGrid({
  items,
  title = "Shop by Category",
  columns = 4,
}: MarketCategoryGridProps) {
  const gridClass =
    columns === 5
      ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-6"
      : "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6";
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
        <div className={gridClass}>
          {items.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              className="group flex flex-col bg-white border border-neutral-100 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden h-[420px]"
            >
              <div className="flex-1 relative p-8">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Label Area (Red Outlined Button Style exactly like reference) */}
              <div className="px-6 pb-6 w-full">
                <div className="w-full text-center py-2.5 border border-red-600 bg-white group-hover:bg-red-50 transition-colors duration-300">
                  <h3 className="text-[13px] font-bold text-red-600 tracking-wide capitalize">
                    {item.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
