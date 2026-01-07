"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useInquiry } from "@/context/InquiryContext";
import { Check, Plus, PackageOpen } from "lucide-react";
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

  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb Placeholder */}
      <div className="border-b border-industrial-100 bg-industrial-50">
        <div className="container mx-auto px-4 py-3 text-xs text-industrial-500">
          Home / Products / {product.category} /{" "}
          <span className="text-industrial-800 font-medium">
            {product.name}
          </span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Section */}
          <div className="bg-industrial-50 border border-industrial-100 p-8 flex items-center justify-center">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="max-w-full max-h-[500px] object-contain mix-blend-multiply"
            />
          </div>

          {/* Details Section */}
          <div>
            <span className="text-sm font-bold text-action tracking-widest uppercase mb-2 block">
              {product.brand}
            </span>
            <h1 className="text-3xl lg:text-4xl font-bold text-industrial-900 mb-4">
              {product.name}
            </h1>
            <p className="text-industrial-600 mb-8 leading-relaxed max-w-lg">
              {product.description}
            </p>

            {/* Technical Specs Table */}
            <div className="bg-white border border-industrial-200 rounded-sm overflow-hidden mb-8">
              <div className="bg-industrial-50 px-4 py-2 border-b border-industrial-200 font-bold text-xs uppercase tracking-wider text-industrial-700">
                Technical Specifications
              </div>
              <div className="grid grid-cols-2 divide-x divide-industrial-100">
                <div className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-industrial-500">Material</span>
                    <span className="font-medium text-industrial-900">
                      {product.material}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-industrial-500">Neck Finish</span>
                    <span className="font-medium text-industrial-900">
                      {product.neckFinish || "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-industrial-500">Shape</span>
                    <span className="font-medium text-industrial-900">
                      {product.shape || "N/A"}
                    </span>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-industrial-500">Capacity</span>
                    <span className="font-medium text-industrial-900">
                      {product.capacity
                        ? `${product.capacity.value} ${product.capacity.unit}`
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-industrial-500">Height</span>
                    <span className="font-medium text-industrial-900">
                      {product.dimensions?.height || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-industrial-500">Diameter</span>
                    <span className="font-medium text-industrial-900">
                      {product.dimensions?.diameter || "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Inquiry Action */}
            <div className="bg-industrial-900 text-white p-6 rounded-sm">
              <h3 className="font-bold mb-4 flex items-center">
                <PackageOpen className="mr-2 w-5 h-5 text-action" />
                Project Inquiry
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-industrial-800 rounded border border-industrial-700">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="px-3 py-2 text-industrial-400 hover:text-white"
                  >
                    -
                  </button>
                  <span className="w-12 text-center font-mono text-sm">
                    {qty}
                  </span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="px-3 py-2 text-industrial-400 hover:text-white"
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={handleAddToInquiry}
                  className={`flex-1 flex items-center justify-center px-6 py-3 font-bold uppercase tracking-wider text-sm transition-all ${
                    added ? "bg-green-600" : "bg-action hover:bg-action-hover"
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="mr-2 w-4 h-4" /> Added to Bundle
                    </>
                  ) : (
                    <>
                      <Plus className="mr-2 w-4 h-4" /> Add to Inquiry Bundle
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-industrial-400 mt-4 text-center">
                Minimum Order Quantities (MOQ) apply. Adds to quote request.
              </p>
            </div>
          </div>
        </div>

        {/* Recommended Closures */}
        {recommendedClosures.length > 0 && (
          <div className="mt-24 border-t border-industrial-200 pt-12">
            <h2 className="text-2xl font-bold text-industrial-900 mb-8">
              Compatible Closures & Accessories
            </h2>
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
