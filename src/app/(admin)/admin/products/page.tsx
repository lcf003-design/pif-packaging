"use client";

import {
  useEffect,
  useState,
  useCallback,
  useMemo,
  useLayoutEffect,
} from "react";
import {
  fetchProducts,
  deleteProduct,
  bulkDeleteProducts,
  bulkUpdateProducts,
} from "@/services/productService";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, Plus, Search, ExternalLink, Wand2, Globe } from "lucide-react";
import BulkEditModal from "@/components/admin/BulkEditModal";
import ActionModal from "@/components/admin/ActionModal";
import { generateSmartSKU, generateProductMetadata } from "@/lib/productUtils";
import dynamic from "next/dynamic";

const StandardCatalogDownloadButton = dynamic(
  () => import("@/components/admin/StandardCatalogDownloadButton"),
  { ssr: false },
);

import { CATEGORIES, INDUSTRIES } from "@/data/constants";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(() => 
    typeof window !== "undefined" ? sessionStorage.getItem("adminProducts_searchTerm") || "" : ""
  );
  const [searchInput, setSearchInput] = useState(() => 
    typeof window !== "undefined" ? sessionStorage.getItem("adminProducts_searchInput") || "" : ""
  );
  const [selectedCategory, setSelectedCategory] = useState(() => 
    typeof window !== "undefined" ? sessionStorage.getItem("adminProducts_category") || "" : ""
  );
  const [selectedIndustry, setSelectedIndustry] = useState(() => 
    typeof window !== "undefined" ? sessionStorage.getItem("adminProducts_industry") || "" : ""
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem("adminProducts_searchTerm", searchTerm);
      sessionStorage.setItem("adminProducts_searchInput", searchInput);
      sessionStorage.setItem("adminProducts_category", selectedCategory);
      sessionStorage.setItem("adminProducts_industry", selectedIndustry);
    }
  }, [searchTerm, searchInput, selectedCategory, selectedIndustry]);

  useLayoutEffect(() => {
    if (!loading && products.length > 0 && typeof window !== "undefined") {
      const savedScrollY = sessionStorage.getItem("adminProducts_scrollY");
      if (savedScrollY) {
        window.scrollTo({ top: parseInt(savedScrollY, 10), behavior: "auto" });
        sessionStorage.removeItem("adminProducts_scrollY");
      }
    }
  }, [loading, products.length]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isBulkEditOpen, setIsBulkEditOpen] = useState(false);
  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    type: "danger" | "warning" | "magic";
    title: string;
    message: string;
    confirmText: string;
    action: () => Promise<void>;
  }>({
    isOpen: false,
    type: "warning",
    title: "",
    message: "",
    confirmText: "",
    action: async () => {},
  });

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch products with filters
      const data = await fetchProducts({
        search: searchTerm || undefined,
        category: selectedCategory !== "" ? selectedCategory : undefined, // Assuming categoryFilter refers to selectedCategory
        industry: selectedIndustry || undefined, // Keeping industry filter as it was in the original code
      });
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedCategory, selectedIndustry]); // Added selectedIndustry to dependencies

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts();
    }, 300); // Debounce search & filters
    return () => clearTimeout(timer);
  }, [searchTerm, selectedCategory, selectedIndustry]); // loadProducts removed to prevent infinite fetch loop

  useEffect(() => {
    const timer = setTimeout(() => setSearchTerm(searchInput), 250);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleDelete = async (id: string) => {
    setModalConfig({
      isOpen: true,
      type: "danger",
      title: "Delete Product",
      message: "Are you sure you want to delete this product? This cannot be undone.",
      confirmText: "Delete Product",
      action: async () => {
        try {
          setLoading(true);
          await deleteProduct(id);
          // Optimistic update or reload
          setProducts((prev) => prev.filter((p) => p.id !== id));
          // Also remove from selection if present
          const newSet = new Set(selectedIds);
          if (newSet.has(id)) {
            newSet.delete(id);
            setSelectedIds(newSet);
          }
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
        } catch (error) {
          console.error("Delete failed:", error);
          alert("Failed to delete product");
        } finally {
          setLoading(false);
        }
      },
    });
  };

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
    if (selectedIds.size === products.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(products.map((p) => p.id)));
    }
  };

  // Export Logic: If selection exists, export those. Else, export all.
  const productsToExport = useMemo(() => {
    return selectedIds.size > 0
      ? products.filter((p) => selectedIds.has(p.id))
      : products;
  }, [selectedIds, products]);

  const handleBulkDelete = async () => {
    setModalConfig({
      isOpen: true,
      type: "danger",
      title: "Delete Products",
      message: `Are you sure you want to delete ${selectedIds.size} products? This cannot be undone.`,
      confirmText: "Delete Products",
      action: async () => {
        try {
          setLoading(true);
          await bulkDeleteProducts(Array.from(selectedIds));
          setProducts((prev) => prev.filter((p) => !selectedIds.has(p.id)));
          setSelectedIds(new Set());
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
        } catch (error) {
          console.error("Bulk delete failed:", error);
          alert("Failed to delete some products");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleBulkGenerateSKUs = async () => {
    const targetProducts = productsToExport;
    const targetCount = targetProducts.length;

    if (targetCount === 0) {
      alert("No products available to generate SKUs for.");
      return;
    }

    setModalConfig({
      isOpen: true,
      type: "magic",
      title: "Auto-Generate SKUs",
      message: `Are you sure you want to auto-generate SKUs for ${targetCount} product(s)? This will overwrite their current SKU if a smarter one can be generated based on their specifications.`,
      confirmText: "Generate SKUs",
      action: async () => {
        setLoading(true);
        let updatedCount = 0;

        try {
          // 1. Calculate new SKUs locally to see what actually changes
          const updatesToPush: { id: string; newSku: string }[] = [];

          targetProducts.forEach((p) => {
            const newSku = generateSmartSKU(p);
            if (newSku && newSku !== "" && newSku !== p.sku) {
              updatesToPush.push({ id: p.id, newSku });
            }
          });

          if (updatesToPush.length === 0) {
            alert(
              "No SKUs needed updating. All selected products already have the correct smart SKU or are missing required specifications.",
            );
            setModalConfig((prev) => ({ ...prev, isOpen: false }));
            setLoading(false);
            return;
          }

          const { updateProduct } = await import("@/services/productService");
          
          const updatePromises = updatesToPush.map((update) => 
             updateProduct(update.id, { sku: update.newSku })
          );
          
          await Promise.all(updatePromises);
          updatedCount = updatesToPush.length;

          // 3. Update UI locally so we don't have to refetch
          setProducts((prev) =>
            prev.map((p) => {
              const matchedUpdate = updatesToPush.find((u) => u.id === p.id);
              if (matchedUpdate) {
                return { ...p, sku: matchedUpdate.newSku };
              }
              return p;
            }),
          );

          // 4. Success state
          setSelectedIds(new Set()); // Optionally clear
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
          alert(`Successfully generated and applied new SKUs to ${updatedCount} products.`);
        } catch (error) {
          console.error("Bulk SKU generation failed:", error);
          alert("An error occurred while generating SKUs. Not all may have saved.");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const handleBulkGenerateSlugs = async () => {
    const targetProducts = productsToExport;
    const targetCount = targetProducts.length;

    if (targetCount === 0) {
      alert("No products available to generate slugs for.");
      return;
    }

    setModalConfig({
      isOpen: true,
      type: "magic",
      title: "Auto-Generate Slugs (URLs)",
      message: `Are you sure you want to auto-generate SEO-friendly URL slugs for ${targetCount} product(s)? This will derive their routing URLs directly from their current Product Names.`,
      confirmText: "Generate Slugs",
      action: async () => {
        setLoading(true);
        let updatedCount = 0;

        try {
          const updatesToPush: { id: string; newSlug: string }[] = [];

          targetProducts.forEach((p) => {
            if (!p.name) return; // Skip if no name

            let slug = p.name
              .toLowerCase()
              .replace(/\s+/g, "-")
              .replace(/[^\w-]+/g, "")
              .replace(/--+/g, "-")
              .replace(/^-+|-+$/g, "");

            if (slug && slug !== "" && slug !== p.slug) {
              updatesToPush.push({ id: p.id, newSlug: slug });
            }
          });

          if (updatesToPush.length === 0) {
            alert(
              "No URLs needed updating. All selected products already have the correct slug or are missing required specifications.",
            );
            setModalConfig((prev) => ({ ...prev, isOpen: false }));
            setLoading(false);
            return;
          }

          const { updateProduct } = await import("@/services/productService");
          
          const updatePromises = updatesToPush.map((update) => 
             updateProduct(update.id, { slug: update.newSlug })
          );
          
          await Promise.all(updatePromises);
          updatedCount = updatesToPush.length;

          setProducts((prev) =>
            prev.map((p) => {
              const matchedUpdate = updatesToPush.find((u) => u.id === p.id);
              if (matchedUpdate) {
                return { ...p, slug: matchedUpdate.newSlug };
              }
              return p;
            }),
          );

          setSelectedIds(new Set()); 
          setModalConfig((prev) => ({ ...prev, isOpen: false }));
          alert(`Successfully generated and applied new URLs to ${updatedCount} products.`);
        } catch (error) {
          console.error("Bulk Slug generation failed:", error);
          alert("An error occurred while generating Slugs. Not all may have saved.");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <ActionModal
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onConfirm={modalConfig.action}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        type={modalConfig.type}
        isLoading={loading}
      />

      {isBulkEditOpen && (
        <BulkEditModal
          selectedIds={selectedIds}
          onClose={() => setIsBulkEditOpen(false)}
          onSuccess={() => {
            loadProducts(); // Reload to see changes
            setSelectedIds(new Set()); // Clear selection
          }}
        />
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-500">Manage your catalog inventory</p>
        </div>
        <div className="flex gap-2">
          {/* BULK ACTIONS */}
          {selectedIds.size > 0 && (
            <>
              <button
                onClick={() => setIsBulkEditOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg font-bold hover:bg-blue-100 transition-colors border border-blue-200"
              >
                <Edit className="w-4 h-4" />
                Edit ({selectedIds.size})
              </button>
              <button
                onClick={handleBulkDelete}
                className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg font-bold hover:bg-red-100 transition-colors border border-red-200"
              >
                <Trash2 className="w-4 h-4" />
                Delete ({selectedIds.size})
              </button>
            </>
          )}

          {/* EXPORT BUTTON - Now accepts products prop */}
          <StandardCatalogDownloadButton products={productsToExport} />
          
          {/* AUTO-GENERATE SLUG BUTTON */}
          <button
            onClick={handleBulkGenerateSlugs}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-md font-bold hover:bg-indigo-100 transition-colors border border-indigo-200 shadow-sm"
            title={selectedIds.size > 0 ? "Generate Slugs for selected" : "Generate Slugs for all visible"}
          >
            <Globe className="w-5 h-5" />
            Auto-Generate Slugs
          </button>

          {/* AUTO-GENERATE SKU BUTTON */}
          <button
            onClick={handleBulkGenerateSKUs}
            className="flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-md font-bold hover:bg-purple-100 transition-colors border border-purple-200 shadow-sm"
            title={selectedIds.size > 0 ? "Generate SKUs for selected" : "Generate SKUs for all visible"}
          >
            <Wand2 className="w-5 h-5" />
            Auto-Generate SKUs
          </button>

          <Link
            href="/admin/products/new"
            onClick={() => sessionStorage.setItem("adminProducts_scrollY", window.scrollY.toString())}
            className="bg-berlin-blue text-white px-4 py-2 rounded-md font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-blue-900/10"
          >
            <Plus className="w-5 h-5" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Filters Bar... (No change needed) */}
      <div className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, SKU..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-berlin-blue focus:border-transparent transition-all"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="w-full md:w-48">
          <select
            className="w-full h-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-berlin-blue bg-white"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Industry Filter */}
        <div className="w-full md:w-48">
          <select
            className="w-full h-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-berlin-blue bg-white"
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
          >
            <option value="">All Industries</option>
            {INDUSTRIES.map((ind) => (
              <option key={ind} value={ind}>
                {ind}
              </option>
            ))}
          </select>
        </div>

        {/* Reset Button (Only show if filters active) */}
        {(searchTerm || selectedCategory || selectedIndustry) && (
          <button
            onClick={() => {
              setSearchTerm("");
              setSearchInput("");
              setSelectedCategory("");
              setSelectedIndustry("");
            }}
            className="text-sm font-bold text-red-500 hover:text-red-700 px-2"
          >
            Reset
          </button>
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-berlin-blue"></div>
            <p>Loading products...</p>
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center text-gray-500 flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <p className="font-medium text-lg text-slate-900">
                No products found
              </p>
              <p className="text-sm">
                Try adjusting your search or add a new product.
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  {/* CHECKBOX HEADER */}
                  <th className="px-6 py-4 w-10">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-300 text-berlin-blue focus:ring-berlin-blue cursor-pointer"
                      checked={
                        products.length > 0 &&
                        selectedIds.size === products.length
                      }
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Specs
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((product) => {
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
                          className="w-4 h-4 rounded border-gray-300 text-berlin-blue focus:ring-berlin-blue cursor-pointer"
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
                            <div className="font-bold text-slate-900 group-hover:text-berlin-blue transition-colors leading-tight">
                              {product.name}
                            </div>
                            <div className="text-xs font-mono text-gray-500 bg-gray-100 flex items-center gap-2 px-1.5 py-0.5 rounded w-fit mt-1">
                              <span>{product.sku}</span>
                            </div>
                            <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-1 group-hover:text-blue-500 transition-colors truncate max-w-[200px]" title={product.slug || product.id}>
                              <Globe className="w-3 h-3 flex-shrink-0" />
                              <span className="truncate">/{product.slug || product.id}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 align-top">
                        <div className="flex flex-wrap gap-1">
                          {product.categories?.map((cat, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {cat}
                            </span>
                          ))}
                        </div>
                        <div className="mt-2 flex flex-wrap gap-1">
                          {(product.industry || [])
                            .slice(0, 2)
                            .map((ind, i) => (
                              <span
                                key={i}
                                className="text-[10px] uppercase tracking-wide text-gray-500 border border-gray-200 px-1.5 rounded"
                              >
                                {ind}
                              </span>
                            ))}
                          {(product.industry || []).length > 2 && (
                            <span className="text-[10px] text-gray-400 ml-1">
                              +{(product.industry || []).length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 align-top">
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                          <div>
                            <span className="text-gray-400 text-xs">Mat:</span>{" "}
                            {product.material}
                          </div>
                          <div>
                            <span className="text-gray-400 text-xs">Col:</span>{" "}
                            {product.color}
                          </div>
                          <div>
                            <span className="text-gray-400 text-xs">Vol:</span>{" "}
                            {product.capacity?.value} {product.capacity?.unit}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/products/${product.id}`}
                            onClick={() => sessionStorage.setItem("adminProducts_scrollY", window.scrollY.toString())}
                            className="p-2 text-gray-400 hover:text-berlin-blue hover:bg-blue-50 rounded-full transition-all"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </Link>
                          <Link
                            href={`/product/${product.slug || product.id}`}
                            target="_blank"
                            className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-full transition-all"
                            title="View Live"
                          >
                            <ExternalLink className="w-5 h-5" />
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
