"use client";

import { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Settings,
  Filter,
  Package,
  ShieldCheck,
  AlertOctagon,
  MoreVertical,
  Loader2,
  Trash2,
  ChevronRight,
  Upload,
  Edit,
  ShieldAlert,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { deletePPEProduct, fetchPPEProducts } from "@/services/ppeService";
import { PPEProduct } from "@/types/ppe";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

const CatalogDownloadButton = dynamic(
  () => import("@/components/admin/CatalogDownloadButton"),
  { ssr: false }
);

export default function PPEAdminPage() {
  const router = useRouter();
  const [products, setProducts] = useState<PPEProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); // Renamed searchTerm to search
  const [categoryFilter, setCategoryFilter] = useState("All"); // Added categoryFilter state
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    // Changed to async function syntax
    setLoading(true);
    const data = await fetchPPEProducts();
    setProducts(data);
    setLoading(false);
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return; // Changed confirmation message
    await deletePPEProduct(id);
    loadProducts(); // Reload products after deletion
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()); // Updated search logic to match original
    const matchesCategory =
      categoryFilter === "All" || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const toggleSelect = (id: string) => {
    const newSet = new Set(selectedIds);
    if (newSet.has(id)) {
      newSet.delete(id);
    } else {
      newSet.add(id);
    }
    setSelectedIds(newSet);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === filteredProducts.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredProducts.map((p) => p.id)));
    }
  };

  const handleBulkDelete = async () => {
    if (
      !window.confirm(
        `Are you sure you want to delete ${selectedIds.size} PPE Items? This cannot be undone.`
      )
    )
      return;

    try {
      setLoading(true);
      await Promise.all(
        Array.from(selectedIds).map((id) => deletePPEProduct(id))
      );

      // Reload
      await loadProducts();
      setSelectedIds(new Set());
      alert("PPE Items deleted successfully");
    } catch (error) {
      console.error("Bulk delete failed:", error);
      alert("Failed to delete some items");
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            PPE Product Manager
          </h1>
          <p className="text-slate-500 mt-1">
            Manage your medical inventory and specifications.
          </p>
        </div>
        <div className="flex gap-3">
          {/* BULK ACTIONS */}
          {selectedIds.size > 0 && (
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-bold hover:bg-red-100 transition-colors border border-red-200"
            >
              <Trash2 className="w-4 h-4" />
              Delete ({selectedIds.size})
            </button>
          )}

          <CatalogDownloadButton />
          <Link
            href="/admin/ppe/bulk"
            className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 border border-slate-300 rounded-lg font-bold hover:bg-slate-50 transition-colors shadow-sm"
          >
            <Upload className="w-4 h-4" />
            Bulk Upload
          </Link>
          <Link
            href="/admin/ppe/new"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30"
          >
            <Plus className="w-4 h-4" />
            Add New Item
          </Link>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search PPE inventory..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p>Loading catalog...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center text-blue-400">
              <ShieldAlert className="w-8 h-8" />
            </div>
            <div>
              <p className="font-medium text-lg text-slate-900">
                No PPE items found
              </p>
              <p className="text-sm">
                Add your first medical product to get started.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50 border-b border-gray-200">
                <tr>
                  {/* CHECKBOX HEADER */}
                  <th className="px-6 py-4 w-10">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                      checked={
                        filteredProducts.length > 0 &&
                        selectedIds.size === filteredProducts.length
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Classification
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Certifications
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredProducts.map((product) => {
                  const isSelected = selectedIds.has(product.id);
                  return (
                    <tr
                      key={product.id}
                      className={`group transition-colors ${
                        isSelected
                          ? "bg-blue-50/80 hover:bg-blue-50"
                          : "hover:bg-blue-50/30"
                      }`}
                    >
                      {/* CHECKBOX CELL */}
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                          checked={isSelected}
                          onChange={() => toggleSelect(product.id)}
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-white border border-gray-200 shadow-sm">
                            {product.imageUrl ? (
                              <Image
                                src={product.imageUrl}
                                alt={product.name}
                                fill
                                className="object-contain"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-gray-50 text-gray-300">
                                <span className="text-xs">No Img</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                              {product.name}
                            </div>
                            <div className="text-xs font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded w-fit mt-1">
                              {product.sku}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wide bg-blue-100 text-blue-800">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-xs font-bold px-2 py-1 rounded border ${
                            product.sterility === "Sterile"
                              ? "bg-green-50 text-green-700 border-green-200"
                              : "bg-gray-50 text-gray-600 border-gray-200"
                          }`}
                        >
                          {product.sterility}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {product.certifications
                            ?.slice(0, 2)
                            .map((cert, i) => (
                              <span
                                key={i}
                                className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded border border-slate-200 font-mono"
                              >
                                {cert}
                              </span>
                            ))}
                          {product.certifications &&
                            product.certifications.length > 2 && (
                              <span className="text-[10px] text-gray-400 pl-1">
                                +{product.certifications.length - 2}
                              </span>
                            )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/ppe/products/${product.id}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all"
                            title="View Live"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </Link>
                          <Link
                            href={`/admin/ppe/${product.id}`}
                            className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-all"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-all"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
