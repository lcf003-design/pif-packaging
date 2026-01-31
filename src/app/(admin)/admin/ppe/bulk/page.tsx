"use client";

import { useState } from "react";
import Papa from "papaparse";
import {
  ArrowLeft,
  Loader2,
  AlertCircle,
  CheckCircle,
  FileUp,
  Save,
} from "lucide-react";
import Link from "next/link";
import { PPEProduct } from "@/types/ppe";
import { batchAddPPEProducts } from "@/services/ppeService";
import { useRouter } from "next/navigation";

interface PPECSVRow {
  sku: string;
  name: string;
  category?: string;
  brand?: string;
  description?: string;
  upc?: string;
  mpn?: string;
  material?: string;
  thickness?: string;
  sterility?: string;
  certifications?: string;
  imageUrl?: string;
  caseQty?: string;
  palletQty?: string;
}

export default function BulkUploadPage() {
  const router = useRouter();
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [parsedData, setParsedData] = useState<PPECSVRow[]>([]);
  const [previewItems, setPreviewItems] = useState<Partial<PPEProduct>[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [successCount, setSuccessCount] = useState<number | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setCsvFile(e.target.files[0]);
      setError(null);
      setSuccessCount(null);
      parseCSV(e.target.files[0]);
    }
  };

  const parseCSV = (file: File) => {
    Papa.parse<PPECSVRow>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError(`CSV Parsing Error: ${results.errors[0].message}`);
          return;
        }
        setParsedData(results.data);
        mapToPPEProducts(results.data);
      },
      error: (err) => {
        setError(`Error reading file: ${err.message}`);
      },
    });
  };

  const mapToPPEProducts = (data: PPECSVRow[]) => {
    try {
      const items: Partial<PPEProduct>[] = data.map((row, index) => {
        // Basic validation of required fields
        if (!row.sku || !row.name) {
          throw new Error(`Row ${index + 1} missing SKU or Name`);
        }

        return {
          sku: row.sku,
          name: row.name,
          category: row.category || "Other",
          brand: row.brand || "Berlin Health",
          description: row.description || "",
          upc: row.upc || "",
          mpn: row.mpn || "",
          material: row.material || "",
          thickness: row.thickness || "",
          sterility: row.sterility === "Sterile" ? "Sterile" : "Non-Sterile",
          certifications: row.certifications
            ? row.certifications.split("|").map((c: string) => c.trim())
            : [],
          imageUrl: row.imageUrl || "",
          stockStatus: "In Stock",
          caseQty: row.caseQty ? parseInt(row.caseQty) : 0,
          palletQty: row.palletQty ? parseInt(row.palletQty) : 0,
        } as Partial<PPEProduct>;
      });
      setPreviewItems(items);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred during mapping");
      }
      setPreviewItems([]);
    }
  };

  const handleCommit = async () => {
    if (previewItems.length === 0) return;
    setLoading(true);
    try {
      await batchAddPPEProducts(previewItems as any); // Service expects Omit<PPEProduct, "id">, Partial might be unsafe but logic holds
      setSuccessCount(previewItems.length);
      setCsvFile(null);
      setParsedData([]);
      setPreviewItems([]);
    } catch (err) {
      console.error(err);
      setError("Failed to save to database. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const downloadTemplate = () => {
    const headers = [
      "sku",
      "name",
      "category",
      "material",
      "thickness",
      "sterility",
      "certifications",
      "caseQty",
      "description",
      "upc",
      "mpn",
      "imageUrl",
    ];
    const dummy = [
      "PPE-GLV-NIT-4MIL",
      "Nitrile Glove",
      "Gloves",
      "Nitrile",
      "4 mil",
      "Non-Sterile",
      "FDA|ASTM",
      "1000",
      "High quality glove",
      "123456789",
      "REF123",
      "https://example.com/img.jpg",
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," +
      headers.join(",") +
      "\n" +
      dummy.join(",");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "ppe_import_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/admin/ppe"
              className="p-2 hover:bg-gray-100 rounded-full text-slate-500"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Bulk Inventory Upload
              </h1>
              <p className="text-xs text-slate-500">Import products via CSV</p>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={downloadTemplate}
              className="px-4 py-2 text-xs font-bold text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors"
            >
              Download Template
            </button>
            <button
              onClick={() => {
                const CLINICAL_PRODUCTS = [
                  {
                    sku: "SYR-L3-STR",
                    name: "Luer-Lock Hypodermic Syringe (3ml)",
                    category: "Syringes & Sharps",
                    material: "Medical Grade Plastic",
                    sterility: "Sterile",
                    caseQty: "2400",
                    description:
                      "Precision-engineered 3ml syringe with secure Luer-Lock tip.",
                    imageUrl:
                      "https://placehold.co/600x600/e2e8f0/475569?text=Syringe",
                  },
                  {
                    sku: "WND-GP4-STR",
                    name: "Sterile Absorbent Cotton Gauze Pads",
                    category: "Wound Care",
                    material: "Cotton",
                    sterility: "Sterile",
                    caseQty: "1200",
                    description: "High-absorbency 12-ply cotton gauze pads.",
                    imageUrl:
                      "https://placehold.co/600x600/e2e8f0/475569?text=Gauze",
                  },
                  {
                    sku: "SPC-BAG-69",
                    name: "Biohazard Specimen Transport Bag",
                    category: "Specimen Collection",
                    material: "Medical Grade Plastic",
                    sterility: "Non-Sterile",
                    caseQty: "1000",
                    description: "Leak-proof LDPE specimen transport bags.",
                    imageUrl:
                      "https://placehold.co/600x600/e2e8f0/475569?text=Specimen+Bag",
                  },
                ];
                setPreviewItems(CLINICAL_PRODUCTS as any);
              }}
              className="px-4 py-2 text-xs font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-lg border border-emerald-200 transition-colors"
            >
              Load Clinical Defaults
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-12 space-y-8">
        {/* Upload Zone */}
        {!successCount && (
          <div className="bg-white rounded-xl border border-dashed border-gray-300 p-12 text-center hover:bg-gray-50 transition-colors relative">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="pointer-events-none">
              <FileUp className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-slate-700">
                Drop CSV file here or click to upload
              </p>
              <p className="text-sm text-slate-400 mt-2">
                Max 500 rows per batch
              </p>
            </div>
          </div>
        )}

        {/* Status Messages */}
        {error && (
          <div className="p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg flex items-center gap-3">
            <AlertCircle className="w-5 h-5" />
            {error}
          </div>
        )}

        {successCount && (
          <div className="p-8 bg-green-50 text-green-800 border-b border-green-200 rounded-lg text-center space-y-4">
            <CheckCircle className="w-16 h-16 mx-auto text-green-600" />
            <h2 className="text-2xl font-bold">Success!</h2>
            <p>Imported {successCount} products successfully.</p>
            <button
              onClick={() => router.push("/admin/ppe")}
              className="mt-4 px-6 py-2 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-colors"
            >
              Return to Dashboard
            </button>
            <div className="pt-2">
              <button
                onClick={() => {
                  setSuccessCount(null);
                  setCsvFile(null);
                }}
                className="text-sm text-green-700 font-bold underline"
              >
                Upload Another Batch
              </button>
            </div>
          </div>
        )}

        {/* Preview Table */}
        {previewItems.length > 0 && !successCount && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-900">
                Preview ({previewItems.length} Items)
              </h3>
              <button
                onClick={handleCommit}
                disabled={loading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {loading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Commit to Database
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3">SKU</th>
                      <th className="px-6 py-3">Name</th>
                      <th className="px-6 py-3">Category</th>
                      <th className="px-6 py-3">Material</th>
                      <th className="px-6 py-3">Sterility</th>
                      <th className="px-6 py-3">Qty</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {previewItems.slice(0, 10).map((item, i) => (
                      <tr key={i} className="hover:bg-slate-50">
                        <td className="px-6 py-3 font-mono text-xs">
                          {item.sku}
                        </td>
                        <td className="px-6 py-3 font-medium">{item.name}</td>
                        <td className="px-6 py-3">{item.category}</td>
                        <td className="px-6 py-3">{item.material}</td>
                        <td className="px-6 py-3">
                          <span
                            className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                              item.sterility === "Sterile"
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-500"
                            }`}
                          >
                            {item.sterility}
                          </span>
                        </td>
                        <td className="px-6 py-3">{item.caseQty}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {previewItems.length > 10 && (
                <div className="px-6 py-3 text-xs text-slate-500 bg-slate-50 border-t border-gray-100 text-center">
                  ...and {previewItems.length - 10} more items
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
