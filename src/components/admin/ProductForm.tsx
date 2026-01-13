"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product, Category, Industry, Material } from "@/types";
import { addProduct, updateProduct } from "@/services/productService";
import { generateProductMetadata } from "@/lib/productUtils";
import ImageUpload from "@/components/admin/ImageUpload";
import FileUpload from "@/components/admin/FileUpload";
import {
  Loader2,
  Save,
  ArrowLeft,
  Trash2,
  Plus,
  X,
  ListPlus,
  FileText,
} from "lucide-react";
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
  "Nutraceuticals",
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
      // Ensure slug exists
      let finalData = { ...formData };
      if (!finalData.slug && finalData.name) {
        // Fallback generation if they didn't click Auto-Name
        const specs = {
          capacity_value: formData.capacity?.value,
          capacity_unit: formData.capacity?.unit,
          material_type: formData.material,
          shape: formData.shape,
          color: formData.color,
          neck_finish: formData.neckFinish,
        };
        const { slug } = generateProductMetadata(
          specs,
          formData.category || "Container"
        );
        finalData.slug = slug;
      }

      if (initialData?.id) {
        await updateProduct(initialData.id, finalData);
      } else {
        await addProduct(finalData as any);
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

  const generateStandardName = () => {
    const specs = {
      capacity_value: formData.capacity?.value,
      capacity_unit: formData.capacity?.unit,
      material_type: formData.material,
      shape: formData.shape,
      color: formData.color,
      neck_finish: formData.neckFinish, // or capSize? logic implied neck_finish
    };

    // Use 'Bottles' -> 'Bottle' etc.
    const { title, slug } = generateProductMetadata(
      specs,
      formData.category || "Container"
    );

    setFormData({ ...formData, name: title, slug: slug });
  };

  // Media Helpers
  const handleImageUpload = (url: string) => {
    // If it's the first image, set as Main logic effectively handled by array order
    const currentImages = formData.images || [];
    const newImages = [...currentImages, url];

    setFormData({
      ...formData,
      images: newImages,
      imageUrl: newImages[0], // Always ensure [0] is Main
    });
  };

  const removeGalleryImage = (index: number) => {
    const currentImages = formData.images || [];
    const newImages = currentImages.filter((_, i) => i !== index);

    setFormData({
      ...formData,
      images: newImages,
      imageUrl: newImages.length > 0 ? newImages[0] : "", // Fallback
    });
  };

  const setPrimaryImage = (index: number) => {
    const currentImages = [...(formData.images || [])];
    if (index === 0 || index >= currentImages.length) return;

    // Move to front
    const item = currentImages.splice(index, 1)[0];
    currentImages.unshift(item);

    setFormData({
      ...formData,
      images: currentImages,
      imageUrl: currentImages[0],
    });
  };

  const addDownload = (url: string, fileName: string) => {
    const current = formData.downloads || [];
    // Auto-formatting name: remove extension and underscores
    const label = fileName.replace(/\.[^/.]+$/, "").replace(/_/g, " ");
    setFormData({ ...formData, downloads: [...current, { label, url }] });
  };

  const removeDownload = (index: number) => {
    const current = formData.downloads || [];
    setFormData({
      ...formData,
      downloads: current.filter((_, i) => i !== index),
    });
  };

  // Specs are a Record<string, string>. We convert to array for editing if needed,
  // but editing straight on the object is tricky if keys change.
  // Easiest: Maintain a local array for editing, then sync?
  // Or just simple Add/Remove helpers on the object.
  // But changing a Key requires deleting old key and adding new.
  // Let's stick to: "Add Spec" opens a small 2-input form?
  // Or render list of keys.
  const updateSpecKey = (oldKey: string, newKey: string, value: string) => {
    const specs = { ...(formData.specifications || {}) };
    delete specs[oldKey];
    specs[newKey] = value;
    setFormData({ ...formData, specifications: specs });
  };

  const updateSpecValue = (key: string, value: string) => {
    const specs = { ...(formData.specifications || {}) };
    specs[key] = value;
    setFormData({ ...formData, specifications: specs });
  };

  const removeSpec = (key: string) => {
    const specs = { ...(formData.specifications || {}) };
    delete specs[key];
    setFormData({ ...formData, specifications: specs });
  };

  const addEmptySpec = () => {
    const specs = { ...(formData.specifications || {}) };
    // Find unique key
    let count = 1;
    while (specs[`New Spec ${count}`]) count++;
    specs[`New Spec ${count}`] = "Value";
    setFormData({ ...formData, specifications: specs });
  };

  const generateSmartSKU = () => {
    const parts: string[] = [];

    // 1. Material
    const matMap: Record<string, string> = {
      Aluminum: "AL",
      Glass: "GLS",
      Plastic: "PLA",
      PET: "PET",
      HDPE: "HDPE",
    };
    if (formData.material) {
      parts.push(
        matMap[formData.material] ||
          formData.material.substring(0, 3).toUpperCase()
      );
    }

    // 2. PCR Check (Features or Name)
    const isPCR =
      (formData.name || "").toUpperCase().includes("PCR") ||
      formData.features?.some((f) => f.toUpperCase().includes("PCR"));
    if (isPCR) parts.push("PCR");

    // 3. Capacity
    if (formData.capacity?.value) {
      parts.push(formData.capacity.value.toString());
    }

    // 4. Neck Finish / Cap Size
    // Prefer Cap Size for the numeric part (e.g. 38400)
    if (formData.capSize) {
      const cleanCap = formData.capSize.replace(/[^0-9]/g, "");
      parts.push(cleanCap);
    } else if (formData.neckFinish) {
      const cleanNeck = formData.neckFinish.replace(/[^0-9]/g, "");
      parts.push(cleanNeck);
    }

    // 5. Color
    const colMap: Record<string, string> = {
      Silver: "SLV",
      Amber: "AMB",
      Clear: "CLR",
      White: "WHT",
      Black: "BLK",
      Cobalt: "CBL",
      Green: "GRN",
    };
    if (formData.color) {
      // Direct map or try to find a match
      let colCode = colMap[formData.color];
      if (!colCode) {
        // Try substring match on keys
        const match = Object.keys(colMap).find((k) =>
          formData.color?.includes(k)
        );
        colCode = match
          ? colMap[match]
          : formData.color.substring(0, 3).toUpperCase();
      }
      parts.push(colCode);
    }

    if (parts.length > 0) {
      setFormData({ ...formData, sku: parts.join("-") });
    } else {
      alert("Please fill in Material, Capacity, Neck Finish, and Color first.");
    }
  };

  const addFeature = () => {
    const current = formData.features || [];
    setFormData({ ...formData, features: [...current, ""] });
  };

  const updateFeature = (index: number, value: string) => {
    const current = [...(formData.features || [])];
    current[index] = value;
    setFormData({ ...formData, features: current });
  };

  const removeFeature = (index: number) => {
    const current = formData.features || [];
    setFormData({
      ...formData,
      features: current.filter((_, i) => i !== index),
    });
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
          {/* Media Manager (Shopify Style) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 pb-4 border-b border-gray-100 mb-4">
              Media
            </h3>

            <div className="space-y-4">
              {/* Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Upload Button */}
                <div className="aspect-square">
                  <ImageUpload
                    onUploadComplete={handleImageUpload}
                    className="h-full"
                    key={`upload-${formData.images?.length || 0}`} // Force reset
                  />
                </div>

                {/* Images */}
                {formData.images?.map((img, idx) => (
                  <div
                    key={idx}
                    className={`relative group aspect-square border rounded-xl overflow-hidden bg-white shadow-sm ${
                      idx === 0
                        ? "ring-2 ring-berlin-blue border-transparent"
                        : "border-gray-200"
                    }`}
                  >
                    <img
                      src={img}
                      alt=""
                      className="w-full h-full object-contain p-2"
                    />

                    {/* Badge for Main */}
                    {idx === 0 && (
                      <span className="absolute top-2 left-2 bg-berlin-blue text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-sm">
                        Main
                      </span>
                    )}

                    {/* Actions Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex flex-col justify-between p-2 opacity-0 group-hover:opacity-100">
                      <div className="flex justify-end">
                        <button
                          type="button"
                          onClick={() => removeGalleryImage(idx)}
                          className="bg-white text-red-500 p-1.5 rounded-full shadow hover:bg-red-50 transition-colors"
                          title="Remove"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {idx !== 0 && (
                        <button
                          type="button"
                          onClick={() => setPrimaryImage(idx)}
                          className="bg-white text-gray-700 text-xs font-bold py-1.5 px-2 rounded shadow hover:bg-gray-50 transition-colors w-full text-center"
                        >
                          Set as Main
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-gray-400">
                The first image will be used as the main product image.
              </p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-bold text-lg text-slate-800 pb-2 border-b border-gray-100">
              Basic Identity
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Product Name
                </label>
                <div className="flex gap-2">
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
                  <button
                    type="button"
                    onClick={generateStandardName}
                    className="bg-industrial-100 hover:bg-industrial-200 text-industrial-700 px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap"
                    title="Auto-Generate Standard Title"
                  >
                    Auto-Name
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  SKU
                </label>
                <div className="flex gap-2">
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
                  <button
                    type="button"
                    onClick={generateSmartSKU}
                    className="bg-industrial-100 hover:bg-industrial-200 text-industrial-700 px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap"
                    title="Auto-Generate SKU from Attributes"
                  >
                    Auto-Gen
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Brand (Optional)
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
                About This Product
              </label>
              <textarea
                rows={3}
                className="block w-full rounded-md border-gray-300 border p-2 focus:ring-2 focus:ring-berlin-blue focus:border-transparent transition-all outline-none"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>
          </div>

          {/* Key Features (New) */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-gray-100">
              <h3 className="font-bold text-lg text-slate-800">Key Features</h3>
              <button
                type="button"
                onClick={addFeature}
                className="text-xs font-bold text-berlin-blue hover:bg-blue-50 px-2 py-1 rounded transition-colors"
              >
                + Add Feature
              </button>
            </div>
            <div className="space-y-3">
              {(formData.features || []).map((feature, idx) => (
                <div key={idx} className="flex gap-2">
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 border p-2 text-sm"
                    value={feature}
                    onChange={(e) => updateFeature(idx, e.target.value)}
                    placeholder="e.g. 100% PCR Aluminum"
                  />
                  <button
                    type="button"
                    onClick={() => removeFeature(idx)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {(!formData.features || formData.features.length === 0) && (
                <p className="text-sm text-gray-400 italic">
                  No features added.
                </p>
              )}
            </div>
          </div>

          {/* Specs */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            <h3 className="font-bold text-lg text-slate-800 pb-2 border-b border-gray-100">
              Technical Specifications
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

              <div className="flex gap-2 col-span-2 md:col-span-1">
                <div className="flex-1">
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
                    placeholder="e.g. Continuous Thread"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cap Size
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 border p-2"
                    value={formData.capSize}
                    onChange={(e) =>
                      setFormData({ ...formData, capSize: e.target.value })
                    }
                    placeholder="e.g. 38-400"
                  />
                </div>
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
                  Gram Weight
                </label>
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 border p-2"
                  value={formData.weight}
                  onChange={(e) =>
                    setFormData({ ...formData, weight: e.target.value })
                  }
                  placeholder="e.g. 18g"
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

              {/* Logistics (New) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Case Qty
                </label>
                <input
                  type="number"
                  className="block w-full rounded-md border-gray-300 border p-2"
                  value={formData.caseQty}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      caseQty: parseInt(e.target.value),
                    })
                  }
                />
              </div>
              <div className="bg-blue-50 p-2 rounded border border-blue-100">
                <label className="block text-sm font-bold text-berlin-blue mb-1">
                  Pallet Qty
                </label>
                <input
                  type="number"
                  className="block w-full rounded-md border-blue-200 border p-2 focus:ring-blue-500"
                  value={formData.palletQty || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      palletQty: parseInt(e.target.value),
                    })
                  }
                  placeholder="e.g. 2400"
                />
              </div>
            </div>
          </div>
          {/* Documentation Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg text-slate-800 border-b border-gray-100 pb-4 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-industrial-400" />
              Documentation (PDFs)
            </h3>

            <div className="space-y-4">
              {formData.downloads?.map((doc, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-md border border-gray-200"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="w-4 h-4 text-red-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {doc.label}
                    </span>
                    <a
                      href={doc.url}
                      target="_blank"
                      className="text-xs text-blue-500 underline"
                    >
                      View
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeDownload(idx)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="mt-4">
                <p className="text-xs font-bold text-gray-400 uppercase mb-2">
                  Upload Spec Sheet / Line Drawing
                </p>
                <FileUpload onUploadComplete={addDownload} />
              </div>
            </div>
          </div>

          {/* Dynamic Specifications Section */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-4">
              <h3 className="font-bold text-lg text-slate-800 flex items-center gap-2">
                <ListPlus className="w-5 h-5 text-industrial-400" />
                Additional Specifications
              </h3>
              <button
                type="button"
                onClick={addEmptySpec}
                className="flex items-center gap-1 text-xs font-bold bg-industrial-100 px-3 py-1.5 rounded-full hover:bg-industrial-200 text-industrial-700"
              >
                <Plus className="w-3 h-3" /> Add Row
              </button>
            </div>

            <div className="space-y-3">
              {formData.specifications &&
                Object.entries(formData.specifications).map(
                  ([key, value], idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-1/3">
                        <input
                          type="text"
                          value={key}
                          onChange={(e) =>
                            updateSpecKey(key, e.target.value, value)
                          }
                          className="w-full text-xs font-bold uppercase tracking-wider bg-gray-50 border border-gray-200 rounded p-2 focus:bg-white focus:border-berlin-blue outline-none"
                        />
                      </div>
                      <div className="flex-1">
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => updateSpecValue(key, e.target.value)}
                          className="w-full text-sm border-b border-gray-200 p-2 focus:border-berlin-blue outline-none transition-colors"
                          placeholder="Value..."
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeSpec(key)}
                        className="text-gray-300 hover:text-red-500"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )
                )}
              {(!formData.specifications ||
                Object.keys(formData.specifications).length === 0) && (
                <p className="text-sm text-gray-400 italic text-center py-4">
                  No additional specs added.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar / Meta */}
        <div className="space-y-6">
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
