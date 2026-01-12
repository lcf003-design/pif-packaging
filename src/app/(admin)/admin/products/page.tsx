"use client";

import { useEffect, useState } from "react";
import { fetchProducts, deleteProduct } from "@/services/productService";
import { Product } from "@/types";
import Link from "next/link";
import Image from "next/image";
import { Edit, Trash2, Plus, Search } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  const loadProducts = async () => {
    setLoading(true);
    // Fetch products with search filter if exists
    const data = await fetchProducts({ search: searchTerm });
    setProducts(data);
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadProducts();
    }, 300); // Debounce search
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;
    try {
      await deleteProduct(id);
      // Optimistic update or reload
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      alert("Failed to delete product");
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Products</h1>
          <p className="text-slate-500">Manage your catalog inventory</p>
        </div>
        <Link
          href="/admin/products/new"
          className="bg-berlin-blue text-white px-4 py-2 rounded-md font-bold flex items-center gap-2 hover:bg-slate-800 transition-colors shadow-lg shadow-blue-900/10"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, SKU, or category..."
          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-berlin-blue focus:border-transparent transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className="group hover:bg-blue-50/50 transition-colors"
                  >
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
                              <Image className="w-6 h-6" />
                            </div>
                          )}
                        </div>
                        <div>
                          <div className="font-bold text-slate-900 group-hover:text-berlin-blue transition-colors">
                            {product.name}
                          </div>
                          <div className="text-xs font-mono text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded w-fit mt-1">
                            {product.sku}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 align-top">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {product.category}
                      </span>
                      <div className="mt-2 flex flex-wrap gap-1">
                        {product.industry.slice(0, 2).map((ind, i) => (
                          <span
                            key={i}
                            className="text-[10px] uppercase tracking-wide text-gray-500 border border-gray-200 px-1.5 rounded"
                          >
                            {ind}
                          </span>
                        ))}
                        {product.industry.length > 2 && (
                          <span className="text-[10px] text-gray-400 ml-1">
                            +{product.industry.length - 2}
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
                          className="p-2 text-gray-400 hover:text-berlin-blue hover:bg-blue-50 rounded-full transition-all"
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
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
