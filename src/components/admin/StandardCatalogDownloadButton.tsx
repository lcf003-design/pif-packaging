"use client";

import { PDFDownloadLink } from "@react-pdf/renderer";
import StandardCatalogPDF from "./StandardCatalogPDF";
import { Product } from "@/types";
import { FileDown, Loader2 } from "lucide-react";

export interface StandardCatalogDownloadButtonProps {
  products: Product[];
  disabled?: boolean;
}

export default function StandardCatalogDownloadButton({
  products,
  disabled,
}: StandardCatalogDownloadButtonProps) {
  // If no products, disable or show tooltip
  const count = products.length;

  if (count === 0 || disabled) {
    return (
      <button
        disabled
        className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-400 rounded-lg font-bold text-sm shadow-sm cursor-not-allowed border border-slate-200"
      >
        <FileDown className="w-4 h-4" />
        Export PDF
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<StandardCatalogPDF products={products} />}
      fileName={`pif-packaging-catalog-${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`}
      className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-bold text-sm shadow-sm"
    >
      {/* 
        // @ts-ignore - react-pdf types
      */}
      {({ blob, url, loading, error }) =>
        loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Preparing ({count})...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <FileDown className="w-4 h-4" /> Export PDF ({count})
          </span>
        )
      }
    </PDFDownloadLink>
  );
}
