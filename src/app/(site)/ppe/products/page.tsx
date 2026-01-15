"use client";

import { useEffect, useState } from "react";
import { fetchPPEProducts } from "@/services/ppeService";
import { PPEProduct } from "@/types/ppe";
import Link from "next/link";
import Image from "next/image";
import {
  Shield,
  CheckCircle2,
  ChevronRight,
  Activity,
  AlertOctagon,
} from "lucide-react";

export default function PPEProductsPage() {
  const [products, setProducts] = useState<PPEProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");

  useEffect(() => {
    // In a real implementation this would use searchParams for server-side filter,
    // but for now we fetch all and filter client side or via simple service call
    fetchPPEProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const categories = [
    "All",
    "Gloves",
    "Masks & Respirators",
    "Gowns & Apparel",
    "Sanitization",
  ];

  const filtered =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-800 pt-32 pb-16 px-6">
        <div className="container mx-auto">
          <div className="flex items-center text-xs uppercase tracking-widest text-slate-400 font-bold mb-6 gap-2">
            <Link href="/" className="hover:text-blue-400">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link href="/ppe" className="hover:text-blue-400">
              PPE Division
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white">Catalog</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Medical Support <span className="text-blue-500">Inventory</span>
          </h1>
          <p className="text-slate-400 max-w-2xl text-lg">
            Direct-to-manufacturer access for FDA-approved protective equipment.
            Optimized for healthcare systems and emergency stockpiles.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 flex flex-col md:flex-row gap-12">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div>
            <h3 className="font-bold text-slate-900 mb-4 uppercase text-sm tracking-wide">
              Category
            </h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeCategory === cat
                      ? "bg-blue-100 text-blue-700 font-bold"
                      : "text-slate-500 hover:bg-slate-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 bg-blue-50 rounded-2xl border border-blue-100">
            <div className="flex items-center gap-2 text-blue-800 font-bold mb-2">
              <Shield className="w-5 h-5" />
              <span>Bulk Orders?</span>
            </div>
            <p className="text-sm text-blue-700 mb-4 leading-relaxed">
              Need container-load pricing or custom manufacturing runs?
            </p>
            <Link
              href="/contact"
              className="block w-full py-2 bg-blue-600 text-white text-center rounded-lg font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/20"
            >
              Contact Procurement
            </Link>
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-[3/4] bg-slate-200 rounded-2xl animate-pulse"
                ></div>
              ))}
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
              <AlertOctagon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-900">
                No Inventory Found
              </h3>
              <p className="text-slate-500 mt-2">
                Check back later for stock updates.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filtered.map((product) => (
                <Link
                  href={`/ppe/products/${product.id}`}
                  key={product.id}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:shadow-blue-900/5 hover:border-blue-200 transition-all duration-300 hover:-translate-y-1 block h-full flex flex-col"
                >
                  <div className="relative aspect-square p-8 bg-slate-50">
                    {product.imageUrl ? (
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-contain p-4 group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-300">
                        <Activity className="w-12 h-12 opacity-50" />
                      </div>
                    )}
                    <div className="absolute top-4 left-4">
                      <span
                        className={`text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded border ${
                          product.sterility === "Sterile"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-slate-100 text-slate-500 border-slate-200"
                        }`}
                      >
                        {product.sterility}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-xs font-bold text-blue-500 uppercase tracking-wide mb-2">
                      {product.category}
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2 leading-tight group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {product.certifications?.slice(0, 3).map((cert, i) => (
                        <span
                          key={i}
                          className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 font-mono"
                        >
                          {cert}
                        </span>
                      ))}
                    </div>
                    <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-slate-400 font-mono">
                        {product.sku}
                      </span>
                      <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
