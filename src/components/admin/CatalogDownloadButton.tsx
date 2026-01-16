"use client";

import { useState } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import CatalogPDF from "./CatalogPDF";
import { fetchPPEProducts } from "@/services/ppeService";
import { PPEProduct } from "@/types/ppe";
import { FileDown, Loader2 } from "lucide-react";

export default function CatalogDownloadButton() {
  const [products, setProducts] = useState<PPEProduct[]>([]);
  const [loading, setLoading] = useState(false);
  const [ready, setReady] = useState(false);

  const handlePrepare = async () => {
    try {
      setLoading(true);
      const data = await fetchPPEProducts({ limit: 1000 }); // Fetch all
      setProducts(data as unknown as PPEProduct[]);
      setReady(true);
    } catch (error) {
      console.error("Failed to generate catalog:", error);
      alert("Failed to load catalog data.");
    } finally {
      setLoading(false);
    }
  };

  if (!ready) {
    return (
      <button
        onClick={handlePrepare}
        disabled={loading}
        className="flex items-center gap-2 px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors font-bold text-sm shadow-sm"
      >
        {loading ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : (
          <FileDown className="w-4 h-4" />
        )}
        {loading ? "Generating..." : "Export Catalog PDF"}
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={<CatalogPDF products={products} />}
      fileName={`pif-medical-catalog-${new Date()
        .toISOString()
        .slice(0, 10)}.pdf`}
      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-bold text-sm shadow-sm"
    >
      {/* 
        // @ts-ignore - react-pdf types can be tricky with children function
      */}
      {({ blob, url, loading, error }) =>
        loading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" /> Preparing...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <FileDown className="w-4 h-4" /> Download PDF
          </span>
        )
      }
    </PDFDownloadLink>
  );
}
