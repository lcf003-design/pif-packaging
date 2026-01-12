"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useInquiry } from "@/context/InquiryContext";
import {
  Check,
  Plus,
  PackageOpen,
  ArrowRight,
  ShieldCheck,
  Truck,
  Layers,
} from "lucide-react";
import ProductCard from "@/components/catalog/ProductCard";

export default function ProductDetailClient({
  product,
  recommendedClosures,
}: {
  product: Product;
  recommendedClosures: Product[];
}) {
  const { addItem } = useInquiry();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAddToInquiry = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // Safe formatting for specs
  const capacityDisplay = product.capacity
    ? `${product.capacity.value} ${product.capacity.unit}`
    : "N/A";

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Breadcrumb - Industrial Utility Bar */}
      <div className="border-b border-industrial-200 bg-industrial-50 sticky top-16 z-30">
        <div className="container mx-auto px-4 py-2 text-[10px] uppercase tracking-widest text-industrial-500 font-bold flex items-center gap-2">
          <span>Catalog</span>
          <span className="text-industrial-300">/</span>
          <span>{product.category}</span>
          <span className="text-industrial-300">/</span>
          <span className="text-industrial-900">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: Product Gallery (Sticky) */}
          <div className="lg:col-span-7">
            <div className="sticky top-32 space-y-4">
              <div className="bg-industrial-50 border border-industrial-100 rounded-lg overflow-hidden aspect-square flex items-center justify-center p-12 relative group">
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  {product.material && (
                    <span className="bg-white/90 backdrop-blur text-industrial-900 border border-industrial-200 text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider shadow-sm">
                      {product.material}
                    </span>
                  )}
                </div>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              {/* Thumbnails (Mock) */}
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="aspect-square bg-industrial-50 border border-industrial-100 rounded-md cursor-pointer hover:border-berlin-blue transition-colors flex items-center justify-center"
                  >
                    <div className="w-8 h-8 bg-industrial-200 rounded-full opacity-20" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Spec Sheet & Purchase */}
          <div className="lg:col-span-5 space-y-8">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-berlin-blue font-bold text-xs uppercase tracking-widest bg-blue-50 px-2 py-1 rounded-sm">
                  In Stock
                </span>
                <span className="text-industrial-500 font-bold text-xs uppercase tracking-widest">
                  SKU: {product.sku || "N/A"}
                </span>
              </div>
              <h1 className="text-3xl lg:text-4xl font-black text-industrial-900 leading-tight mb-4">
                {product.name}
              </h1>
              <p className="text-industrial-600 text-sm leading-relaxed border-l-2 border-berlin-red pl-4">
                {product.description}
              </p>
            </div>

            {/* Spec Table */}
            <div className="border border-industrial-200 rounded-lg overflow-hidden">
              <div className="bg-industrial-900 text-white px-4 py-2 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4" /> Technical Specifications
              </div>
              <table className="w-full text-sm item-spec-table">
                <tbody className="divide-y divide-industrial-100">
                  <tr className="bg-industrial-50/50">
                    <td className="px-4 py-3 text-industrial-500 font-medium w-1/3">
                      Capacity
                    </td>
                    <td className="px-4 py-3 text-industrial-900 font-bold">
                      {capacityDisplay}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-industrial-500 font-medium">
                      Material
                    </td>
                    <td className="px-4 py-3 text-industrial-900 font-bold">
                      {product.material}
                    </td>
                  </tr>
                  {product.color && (
                    <tr className="bg-industrial-50/50">
                      <td className="px-4 py-3 text-industrial-500 font-medium">
                        Color
                      </td>
                      <td className="px-4 py-3 text-industrial-900 font-bold">
                        {product.color}
                      </td>
                    </tr>
                  )}
                  {product.shape && (
                    <tr>
                      <td className="px-4 py-3 text-industrial-500 font-medium">
                        Shape
                      </td>
                      <td className="px-4 py-3 text-industrial-900 font-bold">
                        {product.shape}
                      </td>
                    </tr>
                  )}
                  <tr className="bg-industrial-50/50">
                    <td className="px-4 py-3 text-industrial-500 font-medium">
                      Neck Finish
                    </td>
                    <td className="px-4 py-3 text-industrial-900 font-bold">
                      {product.neckFinish || "-"}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 text-industrial-500 font-medium">
                      Dimensions
                    </td>
                    <td className="px-4 py-3 text-industrial-900 font-bold">
                      {product.dimensions
                        ? `${product.dimensions.height}H x ${product.dimensions.diameter}D`
                        : "-"}
                    </td>
                  </tr>
                  <tr className="bg-industrial-50/50">
                    <td className="px-4 py-3 text-industrial-500 font-medium">
                      Case Qty
                    </td>
                    <td className="px-4 py-3 text-industrial-900 font-bold">
                      {product.caseQty || "Bulk"}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Volume Discounts */}
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <h4 className="text-berlin-blue font-bold text-xs uppercase tracking-wider mb-3">
                Volume Pricing Tiers
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm items-center">
                  <span className="text-industrial-600">1 - 4 Cases</span>
                  <span className="font-bold text-industrial-900">
                    Standard Price
                  </span>
                </div>
                <div className="flex justify-between text-sm items-center">
                  <span className="text-industrial-600">5 - 9 Cases</span>
                  <span className="font-bold text-green-700">-5% Discount</span>
                </div>
                <div className="flex justify-between text-sm items-center border-t border-blue-200 pt-2 mt-2">
                  <span className="text-industrial-600 font-bold">
                    10+ Cases
                  </span>
                  <span className="font-bold text-green-700">
                    -10% (Best Value)
                  </span>
                </div>
              </div>
            </div>

            {/* Purchase Action Card */}
            <div className="bg-industrial-950 text-white p-6 rounded-lg shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-industrial-400 text-sm font-medium">
                    Configure Order
                  </span>
                  <div className="flex items-center gap-1 text-green-400 text-xs font-bold uppercase tracking-wider">
                    <Truck className="w-3 h-3" /> Ready to Ship
                  </div>
                </div>

                <div className="flex gap-4 mb-6">
                  <div className="flex bg-industrial-800 rounded border border-industrial-700 p-1">
                    <button
                      onClick={() => setQty(Math.max(1, qty - 1))}
                      className="w-10 flex items-center justify-center hover:bg-industrial-700 rounded text-industrial-400 hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      value={qty}
                      readOnly
                      className="w-12 bg-transparent text-center font-mono font-bold focus:outline-none"
                    />
                    <button
                      onClick={() => setQty(qty + 1)}
                      className="w-10 flex items-center justify-center hover:bg-industrial-700 rounded text-industrial-400 hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToInquiry}
                    className={`flex-1 flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-sm rounded shadow-lg transition-all ${
                      added
                        ? "bg-green-600 hover:bg-green-700 text-white transform scale-95"
                        : "bg-action hover:bg-action-hover text-white hover:brightness-110"
                    } py-3`}
                  >
                    {added ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                    {added ? "Added" : "Add to Quote"}
                  </button>
                </div>

                <div className="flex items-center justify-center gap-2 text-[10px] text-industrial-500">
                  <ShieldCheck className="w-3 h-3" /> Secure Inquiry • No
                  Payment Required
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Closures */}
        {recommendedClosures.length > 0 && (
          <div className="mt-24 border-t border-industrial-200 pt-12">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-industrial-900">
                Complete Your Package
              </h2>
              <a
                href="/products"
                className="text-action font-bold text-sm flex items-center gap-1 hover:underline"
              >
                View Catalog <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {recommendedClosures.map((closure) => (
                <ProductCard key={closure.id} product={closure} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
