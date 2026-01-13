"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useInquiry } from "@/context/InquiryContext";
import {
  Check,
  Plus,
  ArrowRight,
  ShieldCheck,
  Truck,
  Layers,
  FileText,
  Download,
  Box,
  Info,
} from "lucide-react";
import ProductCard from "@/components/catalog/ProductCard";
import Link from "next/link";
import Image from "next/image";

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

  // Gallery Logic
  const allImages = Array.from(
    new Set([product.imageUrl, ...(product.images || [])])
  ).filter(Boolean);
  const [selectedImage, setSelectedImage] = useState(
    allImages[0] || product.imageUrl
  );

  const handleAddToInquiry = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // formatting
  const capacityDisplay = product.capacity
    ? `${product.capacity.value} ${product.capacity.unit}`
    : "N/A";

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Breadcrumb - Industrial Utility Bar */}
      <div className="border-b border-industrial-200 bg-industrial-50 sticky top-16 z-30">
        <div className="container mx-auto px-4 py-2 text-[10px] uppercase tracking-widest text-industrial-500 font-bold flex items-center gap-2">
          <Link href="/shop-all" className="hover:text-berlin-blue">
            Catalog
          </Link>
          <span className="text-industrial-300">/</span>
          <Link
            href={`/products/${product.category.toLowerCase()}`}
            className="hover:text-berlin-blue"
          >
            {product.category}
          </Link>
          <span className="text-industrial-300">/</span>
          <span className="text-industrial-900">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* LEFT: Product Gallery (Sticky) */}
          <div className="lg:col-span-5">
            <div className="sticky top-32 space-y-4">
              <div className="bg-white border border-industrial-200 rounded-lg overflow-hidden aspect-square flex items-center justify-center p-8 relative group shadow-sm">
                <div className="absolute top-4 left-4 z-10 flex gap-2">
                  {product.material && (
                    <span className="bg-industrial-100 text-industrial-900 border border-industrial-200 text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                      {product.material}
                    </span>
                  )}
                </div>
                <div className="relative w-full h-full">
                  <Image
                    src={selectedImage}
                    alt={product.name}
                    fill
                    className="object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
              {/* Thumbnails */}
              {allImages.length > 1 && (
                <div className="grid grid-cols-5 gap-3">
                  {allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(img)}
                      className={`aspect-square bg-white border rounded-md cursor-pointer hover:border-berlin-blue transition-all flex items-center justify-center relative overflow-hidden ${
                        selectedImage === img
                          ? "border-berlin-blue ring-1 ring-berlin-blue"
                          : "border-industrial-100"
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${i + 1}`}
                        fill
                        className="object-contain p-2"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: Spec Sheet & Purchase */}
          <div className="lg:col-span-7 space-y-8">
            {/* Header & Badges */}
            <div className="border-b border-industrial-100 pb-6">
              <div className="mb-4">{/* Badges Removed */}</div>

              <h1 className="text-3xl lg:text-4xl font-black text-slate-900 leading-tight mb-2">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-industrial-500">
                <span className="font-bold">Item # {product.sku || "N/A"}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Specs & Features (Col 1) */}
              <div className="space-y-8">
                {/* About Section */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    About This Product
                  </h3>
                  <p className="text-industrial-600 text-sm leading-relaxed">
                    {product.description ||
                      "High-quality packaging solution designed for commercial applications. Features durable construction and industry-standard finish."}
                  </p>
                </div>

                {/* Key Features */}
                {product.features && product.features.length > 0 && (
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-3">
                      Key Features:
                    </h3>
                    <ul className="space-y-2">
                      {product.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-industrial-700"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-berlin-red flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Quote Board (Col 2 - Sticky Desktop) */}
              <div className="relative">
                <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-6 space-y-6 sticky top-32">
                  <div className="text-center pb-4 border-b border-gray-100">
                    <p className="text-industrial-500 text-xs uppercase tracking-widest font-bold mb-1">
                      Volume Pricing
                    </p>
                    <div className="text-3xl font-black text-berlin-blue">
                      Request Quote
                    </div>
                    <p className="text-xs text-industrial-400 mt-1">
                      Sign in for wholesale pricing
                    </p>
                  </div>

                  {/* Pricing Tiers Table */}
                  <div className="text-sm">
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-600">1 - 4 Cases</span>
                      <span className="font-bold text-gray-900">Standard</span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-600">5 - 49 Cases</span>
                      <span className="font-bold text-berlin-blue">
                        tier 1 disc.
                      </span>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-50">
                      <span className="text-gray-600">50+ Cases</span>
                      <span className="font-bold text-green-700">
                        Bulk Quote
                      </span>
                    </div>
                  </div>

                  {/* Quantity Input */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                      Quantity (Cases)
                    </label>
                    <div className="flex border border-gray-300 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-berlin-blue transition-all">
                      <input
                        type="number"
                        min="1"
                        value={qty}
                        onChange={(e) =>
                          setQty(Math.max(1, parseInt(e.target.value) || 1))
                        }
                        className="flex-1 px-4 py-2 font-mono font-bold text-gray-900 focus:outline-none"
                      />
                      <div className="bg-gray-50 border-l border-gray-300 px-3 flex items-center text-sm font-medium text-gray-500">
                        {product.caseQty ? `${product.caseQty} pcs/case` : "ea"}
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={handleAddToInquiry}
                    className={`w-full py-4 rounded-lg font-bold text-sm uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 ${
                      added
                        ? "bg-green-600 text-white shadow-green-900/20"
                        : "bg-berlin-red hover:bg-red-700 text-white shadow-lg shadow-red-900/20 hover:shadow-xl hover:-translate-y-0.5"
                    }`}
                  >
                    {added ? (
                      <>
                        <Check className="w-5 h-5" /> Added to Quote
                      </>
                    ) : (
                      <>
                        Request Quote <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-medium">
                    <ShieldCheck className="w-3 h-3" /> Secure Inquiry • No
                    Payment Required
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Specs Table */}
            <div className="pt-8">
              <div className="bg-industrial-900 text-white px-4 py-3 rounded-t-lg text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                <Layers className="w-4 h-4" /> Technical Specifications
              </div>
              <div className="border border-industrial-200 border-t-0 rounded-b-lg overflow-hidden">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-industrial-100">
                    {[
                      {
                        label: "Capacity",
                        value: capacityDisplay,
                        bg: true,
                        help: "Fill volume",
                      },
                      { label: "Material", value: product.material, bg: false },
                      {
                        label: "Color",
                        value: product.color,
                        bg: true,
                        hide: !product.color,
                      },
                      {
                        label: "Shape",
                        value: product.shape,
                        bg: false,
                        hide: !product.shape,
                      },
                      {
                        label: "Neck Finish",
                        value: product.neckFinish || "-",
                        bg: true,
                      },
                      {
                        label: "Cap Size",
                        value: product.capSize,
                        bg: false,
                        hide: !product.capSize,
                      },
                      {
                        label: "Weight",
                        value: product.weight,
                        bg: true,
                        hide: !product.weight,
                      },
                      {
                        label: "Dimensions",
                        value: product.dimensions
                          ? `${product.dimensions.height}H x ${product.dimensions.diameter}D`
                          : "-",
                        bg: false,
                      },
                      {
                        label: "Case Qty",
                        value: product.caseQty || "Bulk",
                        bg: true,
                      },
                      {
                        label: "Pallet Qty",
                        value: product.palletQty || "Contact for details",
                        bg: false,
                      },
                      // Render dynamic specifications
                      ...(product.specifications
                        ? Object.entries(product.specifications).map(
                            ([key, val], i) => ({
                              label: key,
                              value: val,
                              bg: (i + 8) % 2 === 0, // offset checks
                            })
                          )
                        : []),
                    ].map((row, i) =>
                      row.hide ? null : (
                        <tr
                          key={i}
                          className={row.bg ? "bg-industrial-50/50" : ""}
                        >
                          <td className="px-6 py-3 text-industrial-500 font-medium w-1/3 flex items-center gap-1">
                            {row.label}
                            {row.help && (
                              <Info className="w-3 h-3 text-industrial-300" />
                            )}
                          </td>
                          <td className="px-6 py-3 text-industrial-900 font-bold">
                            {row.value}
                          </td>
                        </tr>
                      )
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Downloads Section */}
            {product.downloads && product.downloads.length > 0 && (
              <div className="pt-6">
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-berlin-blue" />
                  Downloads & Documentation
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.downloads.map((doc, i) => (
                    <a
                      key={i}
                      href={doc.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-4 border border-industrial-200 rounded-lg hover:border-berlin-blue hover:bg-blue-50/50 transition-all font-medium text-sm text-industrial-700"
                    >
                      <span className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-industrial-400 group-hover:text-berlin-blue" />
                        {doc.label}
                      </span>
                      <Download className="w-4 h-4 text-industrial-300 group-hover:text-berlin-blue" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recommended Closures - Removed */}
      </div>
    </div>
  );
}
