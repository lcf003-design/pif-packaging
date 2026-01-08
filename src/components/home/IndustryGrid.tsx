"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const INDUSTRIES = [
  { name: "Food", image: "/grid_food.png" },
  { name: "Beverage", image: "/grid_beverage.png" },
  { name: "Spirits", image: "/grid_spirits.png" },
  { name: "Wine", image: "/grid_wine.png" },
  { name: "Beer", image: "/grid_beer.png" },
  { name: "Beauty & Personal Care", image: "/grid_beauty.png" },
  { name: "Pharmaceutical", image: "/grid_pharma.png" },
  { name: "Home Care", image: "/grid_homecare.png" },
  { name: "Pet Care", image: "/grid_petcare.png" },
  { name: "Industrial Chemical", image: "/grid_industrial.png" },
  { name: "Automotive", image: "/grid_automotive.png" },
  { name: "Cannabis & CBD", image: "/grid_cannabis.png" },
];

export default function IndustryGrid() {
  return (
    <section className="py-24 bg-white border-t border-industrial-100">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <span className="text-berlin-blue font-bold text-xs tracking-[0.2em] uppercase mb-4 block">
            Markets We Serve
          </span>
          <h2 className="text-4xl font-extrabold text-industrial-900 mb-6">
            Comprehensive Industry Solutions
          </h2>
          <p className="text-industrial-500 text-lg leading-relaxed">
            From regulated pharmaceuticals to artisanal spirits, we provide
            specialized packaging solutions for every sector.
          </p>
        </div>

        {/* The Clean Collection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.name}
              href={`/products?industry=${encodeURIComponent(industry.name)}`}
              className="group relative block aspect-[4/5] overflow-hidden rounded-sm bg-industrial-50"
            >
              {/* Image Container */}
              <div className="absolute inset-0">
                <div
                  className="w-full h-full bg-cover bg-center transition-all duration-700 ease-out group-hover:scale-110 grayscale group-hover:grayscale-0 contrast-[1.1] brightness-[0.95] group-hover:brightness-100"
                  style={{ backgroundImage: `url('${industry.image}')` }}
                />
              </div>

              {/* Gradient Overlay (Always visible but subtle, darker on bottom) */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 w-full p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-xl font-bold text-white mb-2 leading-tight">
                  {industry.name}
                </h3>
                <div className="flex items-center gap-2 text-white/80 text-xs font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  Shop Collection <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/products"
            className="inline-block border border-industrial-200 text-industrial-600 hover:border-berlin-blue hover:text-berlin-blue font-bold py-4 px-12 rounded-sm transition-all uppercase tracking-widest text-xs"
          >
            View Full Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
