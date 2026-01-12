"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product, Category, Industry, Material } from "@/types";
import { addProduct, updateProduct } from "@/services/productService";
import ImageUpload from "@/components/admin/ImageUpload";
import { Loader2, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";

const CATEGORIES: Category[] = [
  "Bottles",
  "Jars",
  "Jugs",
  "Vials",
  "Tubes",
  "Closures",
];
const INDUSTRIES: Industry[] = [
  "Automotive",
  "Beverage",
  "Food",
  "Personal Care",
  "Pharmaceutical",
  "Home Care",
  "Industrial",
];
const MATERIALS: Material[] = [
  "Glass",
  "HDPE",
  "PET",
  "PP",
  "Aluminum",
  "Tinplate",
];

interface ProductFormProps {
  initialData?: Product;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<Product>>(
    initialData || {
      name: "",
      sku: "",
      brand: "Berlin Standard",
      category: "Bottles",
      industry: [],
      material: "Glass",
      shape: "",
      color: "Clear",
      capacity: { value: 0, unit: "oz" },
      dimensions: { height: "", diameter: "" },
      neckFinish: "",
      weight: "",
      caseQty: 0,
      imageUrl: "",
      description: "",
      isClosure: false,
    }
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (initialData?.id) {
        await updateProduct(initialData.id, formData);
      } else {
        // Cast to Omit<Product, "id"> because formData is Partial but we know required fields are filled if validation passes
        await addProduct(formData as any);
      }
      router.push("/admin/products");
    } catch (error) {
      console.error(error);
      alert("Error saving product");
    } finally {
      setLoading(false);
    }
  };

  const handleIndustryChange = (ind: Industry) => {
    const current = formData.industry || [];
    if (current.includes(ind)) {
      setFormData({ ...formData, industry: current.filter((i) => i !== ind) });
    } else {
      setFormData({ ...formData, industry: [...current, ind] });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-6xl mx-auto space-y-8 pb-20">
      {/* Actions Bar */}
      <div className="flex items-center justify-between sticky top-0 bg-gray-50/95 backdrop-blur z-20 pt-4 pb-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/products"
            className="p-2 -ml-2 text-gray-500 hover:text-gray-900 hover:bg-white rounded-full transition-all"
            title="Cancel"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-xl font-bold text-slate-900">
            {initialData ? "Edit Product" : "New Product"}
          </h1>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="bg-berlin-blue text-white px-6 py-2 rounded-md font-bold flex items-center gap-2 hover:bg-slate-800 disabled:opacity-50 shadow-lg shadow-blue-900/10 active:scale-95 transition-all"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <Save className="w-5 h-5" />
          )}
          Save Product
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-bold text-lg text-slate-800 pb-2 border-b border-gray-100">
              Basic Info
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <input
                  required
                  type="text"
                  className="block w-full rounded-md border-gray-300 border p-2 focus:ring-2 focus:ring-berlin-blue focus:border-transparent transition-all outline-none"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="e.g. 12oz Amber Glass Bottle"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU
                </label>
                <input
                  required
                  type="text"
                  className="block w-full rounded-md border-gray-300 border p-2 focus:ring-2 focus:ring-berlin-blue focus:border-transparent transition-all outline-none"
                  value={formData.sku}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                  placeholder="e.g. GLS-001"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand
                </label>
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 border p-2 focus:ring-2 focus:ring-berlin-blue focus:border-transparent transition-all outline-none"
                  value={formData.brand}
                  onChange={(e) =>
                    setFormData({ ...formData, brand: e.target.value })
                  }
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                rows={4}
                className="block w-full rounded-md border-gray-300 border p-2 focus:ring-2 focus:ring-berlin-blue focus:border-transparent transition-all outline-none"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>

          {/* Specs */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-bold text-lg text-slate-800 pb-2 border-b border-gray-100">
              Specifications
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Material
                </label>
                <select
                  className="block w-full rounded-md border-gray-300 border p-2"
                  value={formData.material}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      material: e.target.value as Material,
                    })
                  }
                >
                  {MATERIALS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Color
                </label>
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 border p-2"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                />
              </div>

              {/* Capacity */}
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vol
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    className="block w-full rounded-md border-gray-300 border p-2"
                    value={formData.capacity?.value}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacity: {
                          ...formData.capacity!,
                          value: parseFloat(e.target.value),
                        },
                      })
                    }
                  />
                </div>
                <div className="w-16">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit
                  </label>
                  <select
                    className="block w-full rounded-md border-gray-300 border p-2"
                    value={formData.capacity?.unit}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        capacity: {
                          ...formData.capacity!,
                          unit: e.target.value as any,
                        },
                      })
                    }
                  >
                    <option value="oz">oz</option>
                    <option value="ml">ml</option>
                    <option value="gal">gal</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Neck Finish
                </label>
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 border p-2"
                  value={formData.neckFinish}
                  onChange={(e) =>
                    setFormData({ ...formData, neckFinish: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Shape
                </label>
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 border p-2"
                  value={formData.shape}
                  onChange={(e) =>
                    setFormData({ ...formData, shape: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight
                </label>
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 border p-2"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                />
              </div>

              {/* Dimensions */}
              <div className="flex gap-2 col-span-2 md:col-span-1">
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Height
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 border p-2"
                    value={formData.dimensions?.height}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dimensions: {
                          ...formData.dimensions!,
                          height: e.target.value,
                        },
                      })
                    }
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Diameter
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 border p-2"
                    value={formData.dimensions?.diameter}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dimensions: {
                          ...formData.dimensions!,
                          diameter: e.target.value,
                        },
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar / Meta */}
        <div className="space-y-6">
          {/* Media */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 border-b border-gray-100 pb-4 mb-4">
              Product Image
            </h3>
            <ImageUpload
              currentImage={formData.imageUrl}
              onUploadComplete={(url) =>
                setFormData({ ...formData, imageUrl: url })
              }
            />
          </div>

          {/* Organization */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 border-b border-gray-100 pb-4 mb-4">
              Organization
            </h3>

            <div className="mb-6">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Category
              </label>
              <select
                className="w-full rounded-md border-gray-300 border p-2.5 bg-gray-50 focus:bg-white transition-colors"
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value as Category,
                  })
                }
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Industries
              </label>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {INDUSTRIES.map((ind) => (
                  <label
                    key={ind}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-berlin-blue cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.industry?.includes(ind)}
                      onChange={() => handleIndustryChange(ind)}
                      className="rounded text-berlin-blue focus:ring-berlin-blue w-4 h-4 border-gray-300"
                    />
                    {ind}
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={formData.isClosure}
                  onChange={(e) =>
                    setFormData({ ...formData, isClosure: e.target.checked })
                  }
                  className="rounded text-berlin-blue focus:ring-berlin-blue w-4 h-4 border-gray-300"
                />
                <span className="text-sm font-medium text-gray-700 group-hover:text-berlin-blue">
                  Is this a Closure?
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
