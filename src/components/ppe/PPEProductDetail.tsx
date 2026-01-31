"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { PPEProduct } from "@/types/ppe";
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  FileText,
  ArrowLeft,
  Download,
} from "lucide-react";

// Dynamically import PDF components to avoid SSR issues
import dynamic from "next/dynamic";
import SpecSheetPDF from "./SpecSheetPDF";

// Wrapper for the PDF Link to ensure it only renders on client
const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => (
      <button className="flex-1 py-4 bg-white text-slate-400 font-bold rounded-xl border-2 border-slate-200 cursor-wait">
        Loading PDF...
      </button>
    ),
  },
);

interface PPEProductDetailProps {
  product: PPEProduct;
}

// Mapped codes for SKU generation
const SIZE_MAP: Record<string, string> = {
  Small: "SM",
  Medium: "MD",
  Large: "LG",
  XL: "XL",
  XXL: "2XL",
  "3XL": "3XL",
  "4XL": "4XL",
};

export default function PPEProductDetail({ product }: PPEProductDetailProps) {
  const [activeImage, setActiveImage] = useState(
    product.images?.[0] || product.imageUrl || "/placeholder.png",
  );

  const [activeSize, setActiveSize] = useState<string | null>(
    product.sizes?.[0] || null,
  );

  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  // Compute Dynamic SKU based on selection
  const getDisplaySku = () => {
    if (!product.sku) return "";
    if (!activeSize) return product.sku;

    // Get code or fallback to first 3 chars
    const code =
      SIZE_MAP[activeSize] || activeSize.substring(0, 3).toUpperCase();

    // Replace VAR token if present (Master SKU pattern)
    if (product.sku.includes("-VAR-")) {
      return product.sku.replace("-VAR-", `-${code}-`);
    }

    // Fallback: Append if not master pattern
    return `${product.sku}-${code}`;
  };

  return (
    <div className="bg-white min-h-screen pb-24">
      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <Link href="/medical" className="hover:text-blue-600">
              Medical Division
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/medical/products" className="hover:text-blue-600">
              Catalog
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-slate-900 font-medium truncate max-w-[200px]">
              {product.name}
            </span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
          {/* LEFT: Image Gallery */}
          <div className="space-y-6">
            <div className="relative aspect-square bg-slate-100 rounded-2xl overflow-hidden border border-gray-100">
              <Image
                src={activeImage}
                alt={product.name}
                fill
                className="object-contain p-8"
              />
              {/* Badges Overlay */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                {product.sterility === "Sterile" && (
                  <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wider rounded-full border border-green-200 shadow-sm">
                    Sterile
                  </span>
                )}
                {product.certifications?.includes("FDA 510(k)") && (
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-200 shadow-sm">
                    FDA 510(k)
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-lg border-2 overflow-hidden transition-all ${
                      activeImage === img
                        ? "border-blue-600 ring-2 ring-blue-100"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <Image src={img} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Details & Specs */}
          <div className="space-y-8">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-6">
                {product.sku && (
                  <span className="font-mono bg-slate-100 px-2 py-1 rounded transition-all duration-300">
                    SKU: {getDisplaySku()}
                  </span>
                )}
                {product.upc && (
                  <span className="font-mono bg-slate-100 px-2 py-1 rounded">
                    UPC: {product.upc}
                  </span>
                )}
              </div>
              <p className="text-lg text-slate-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Key Attributes Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                  Material
                </p>
                <p className="font-semibold text-slate-900">
                  {product.material || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                  Thickness
                </p>
                <p className="font-semibold text-slate-900">
                  {product.thickness || "N/A"}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                  Sterility
                </p>
                <p className="font-semibold text-slate-900">
                  {product.sterility}
                </p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">
                  Certs
                </p>
                <div className="flex flex-wrap gap-1">
                  {product.certifications && product.certifications.length > 0
                    ? product.certifications.slice(0, 2).map((c) => (
                        <span
                          key={c}
                          className="text-xs bg-white border border-slate-200 px-1 py-0.5 rounded"
                        >
                          {c}
                        </span>
                      ))
                    : "Standard"}
                  {product.certifications &&
                    product.certifications.length > 2 && (
                      <span className="text-xs text-slate-400">
                        +{product.certifications.length - 2}
                      </span>
                    )}
                </div>
              </div>
            </div>

            {/* Dynamic Technical Specs */}
            {product.specifications &&
              Object.keys(product.specifications).length > 0 && (
                <div className="mt-8 bg-slate-50 rounded-xl p-6 border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-slate-500" />
                    Technical Specifications
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 text-sm">
                    {Object.entries(product.specifications).map(
                      ([key, value]) =>
                        // Filter out internal keys if any leak through
                        !["color", "texture", "style"].includes(key) && (
                          <div
                            key={key}
                            className="flex justify-between border-b border-gray-200 pb-2"
                          >
                            <span className="text-slate-500 font-medium">
                              {key}
                            </span>
                            <span className="text-slate-900 font-bold">
                              {value}
                            </span>
                          </div>
                        ),
                    )}
                  </div>
                </div>
              )}

            {/* SIZE SELECTOR */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-3">
                <p className="font-bold text-slate-900">Select Size</p>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setActiveSize(size)}
                      className={`min-w-[3rem] px-4 py-2 rounded-lg font-medium transition-all ${
                        activeSize === size
                          ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                          : "bg-white border border-gray-200 text-slate-600 hover:border-blue-300 hover:text-blue-600"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Logistics Card */}
            <div className="bg-blue-50/50 rounded-xl p-6 border border-blue-100">
              <h3 className="flex items-center gap-2 font-bold text-blue-900 mb-4">
                <Truck className="w-5 h-5 text-blue-600" />
                Logistics Data
              </h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-blue-600/80 mb-1">Case Quantity</p>
                  <p className="text-xl font-bold text-blue-900">
                    {product.caseQty
                      ? product.caseQty.toLocaleString()
                      : "Contact"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-blue-600/80 mb-1">
                    Pallet Quantity
                  </p>
                  <p className="text-xl font-bold text-blue-900">
                    {product.palletQty
                      ? product.palletQty.toLocaleString()
                      : "Contact"}
                  </p>
                </div>
              </div>
            </div>

            {/* Certifications List */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="pt-6 border-t border-gray-100">
                <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-4">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  Certifications & Standards
                </h3>
                <ul className="space-y-2">
                  {product.certifications.map((cert) => (
                    <li
                      key={cert}
                      className="flex items-start gap-2 text-slate-600 text-sm"
                    >
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-500 shrink-0" />
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA's */}
            <div className="pt-8 flex flex-col sm:flex-row gap-4">
              <button
                // Simulate adding to quote with specific size
                onClick={() =>
                  alert(
                    `Added ${activeSize ? activeSize + " - " : ""}${
                      product.name
                    } to Quote`,
                  )
                }
                className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-900/20 transition-all active:scale-[0.98]"
              >
                Request Quote {activeSize ? `(${activeSize})` : ""}
              </button>

              {isClient && (
                <PDFDownloadLink
                  document={<SpecSheetPDF product={product} />}
                  fileName={`${
                    product.sku || "Berlin-Health-PPE"
                  }-Spec-Sheet.pdf`}
                  className="flex-1 py-4 bg-white hover:bg-slate-50 text-slate-900 font-bold rounded-xl border-2 border-slate-200 transition-all flex items-center justify-center gap-2"
                >
                  {({ blob, url, loading, error }: any) =>
                    loading ? (
                      "Generating PDF..."
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download Spec Sheet
                      </>
                    )
                  }
                </PDFDownloadLink>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
