"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PPEProduct, PPECategory, Sterility } from "@/types/ppe";
import { addPPEProduct, updatePPEProduct } from "@/services/ppeService";
import {
  Loader2,
  Save,
  ArrowLeft,
  Plus,
  X,
  Upload,
  Sparkles,
  Trash2,
  Camera,
} from "lucide-react";
import Link from "next/link";
import ImageUpload from "./ImageUpload";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { SortableImage } from "./SortableImage";

const CATEGORIES: PPECategory[] = [
  "Gloves",
  "Masks & Respirators",
  "Gowns & Apparel",
  "Face Shields",
  "Sanitization",
  "Other",
];

const CERTIFICATIONS = [
  "FDA 510(k)",
  "NIOSH Approved",
  "ASTM D6319", // Nitrile Standard
  "ASTM D3578", // Latex Standard
  "ASTM F2100 Level 1",
  "ASTM F2100 Level 2",
  "ASTM F2100 Level 3",
  "EN 455",
  "EN 374",
  "ISO 13485",
  "AAMI Level 1",
  "AAMI Level 2",
  "AAMI Level 3",
  "AAMI Level 4",
];

// --- INDUSTRY STANDARD LISTS ---
const PPE_MATERIALS = [
  "Nitrile",
  "Latex",
  "Vinyl",
  "Chloroprene",
  "Polyethylene",
  "Polypropylene (SMS)",
  "Polycarbonate",
];

const GLOVE_THICKNESS = [
  "3 mil",
  "3.5 mil",
  "4 mil",
  "5 mil",
  "6 mil",
  "8 mil",
  "9 mil",
  "10+ mil (Heavy Duty)",
];

const GLOVE_TEXTURES = [
  "Smooth",
  "Finger Textured",
  "Palm Textured",
  "Fully Textured",
  "Diamond Grip (Raised)",
];

const MASK_STYLES = [
  "Earloop",
  "Tie-On",
  "Headband (N95)",
  "Cone Style",
  "Duckbill",
];

const COLORS = [
  "Blue",
  "Black",
  "White",
  "Purple",
  "Green",
  "Orange",
  "Pink",
  "Pink",
  "Clear",
];

const SIZES = ["Small", "Medium", "Large", "XL", "XXL", "3XL", "4XL"];

interface PPEProductFormProps {
  initialData?: PPEProduct;
}

export default function PPEProductForm({ initialData }: PPEProductFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<Partial<PPEProduct>>(
    initialData || {
      name: "",
      sku: "",
      brand: "PIF Medical", // Updated default brand
      category: "Gloves",
      description: "",
      upc: "",
      mpn: "",
      sterility: "Non-Sterile",
      certifications: [],
      material: "Nitrile",
      thickness: "4 mil",
      stockStatus: "In Stock",
      slug: "",
      features: [], // Reuse features array for specific attributes like color/texture
      specifications: {}, // Store things like Color/Texture here
      caseQty: 1000,
      palletQty: 0,
      imageUrl: "",
      images: [],
    }
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = formData.images?.indexOf(active.id as string) ?? -1;
      const newIndex = formData.images?.indexOf(over?.id as string) ?? -1;

      if (oldIndex !== -1 && newIndex !== -1 && formData.images) {
        const newImages = arrayMove(formData.images, oldIndex, newIndex);
        setFormData({
          ...formData,
          images: newImages,
          imageUrl: newImages[0] || "",
        });
      }
    }
  }

  const handleImageRemove = (urlToRemove: string) => {
    const newImages =
      formData.images?.filter((url) => url !== urlToRemove) || [];
    setFormData({
      ...formData,
      images: newImages,
      imageUrl: newImages[0] || "",
    });
  };

  // Helper getters for specs stored in loose objects
  const getColor = () => formData.specifications?.color || "Blue";
  const getTexture = () =>
    formData.specifications?.texture || "Finger Textured";
  const getMaskStyle = () => formData.specifications?.style || "Earloop";

  const updateSpec = (key: string, value: string) => {
    setFormData({
      ...formData,
      specifications: { ...formData.specifications, [key]: value },
    });
  };

  const generateIdentity = () => {
    // 1. Generate Name
    // Structure: [Material] [Category] - [Thickness/Level] - [Color]
    const mat = formData.material || "";
    const cat = formData.category || "";
    const color = getColor();
    const sizes = formData.sizes || [];
    let specDetail = "";

    if (cat === "Gloves") {
      specDetail = formData.thickness || "";
    } else if (cat === "Masks & Respirators") {
      // Find highest level cert
      if (formData.certifications?.includes("ASTM F2100 Level 3"))
        specDetail = "ASTM Level 3";
      else if (formData.certifications?.includes("ASTM F2100 Level 2"))
        specDetail = "ASTM Level 2";
      else if (formData.certifications?.includes("ASTM F2100 Level 1"))
        specDetail = "ASTM Level 1";
      else if (formData.certifications?.includes("NIOSH Approved"))
        specDetail = "N95";

      const style = getMaskStyle();
      if (style) specDetail += `, ${style}`;
    }

    const title = `${mat} ${cat} ${
      specDetail ? `- ${specDetail}` : ""
    } - ${color}`
      .replace(/\s+/g, " ")
      .trim();

    // 2. Generate SKU
    // PPE-[CAT]-[MAT]-[SPEC]-[COL]
    // GLV-NIT-4MIL-BLU
    const catCode =
      cat === "Gloves" ? "GLV" : cat === "Masks & Respirators" ? "MSK" : "PPE";

    // Material Code
    const matMap: Record<string, string> = {
      Nitrile: "NIT",
      Latex: "LAT",
      Vinyl: "VIN",
      "Polypropylene (SMS)": "SMS",
    };
    const matCode = matMap[mat] || mat.substring(0, 3).toUpperCase();

    // Spec Code
    let specCode = "GEN";
    let sizeCode = sizes.length > 0 ? "VAR" : "GEN"; // VAR = Varied/Master

    if (cat === "Gloves" && formData.thickness) {
      specCode = formData.thickness.replace(" mil", "MIL").replace(".", "");
    } else if (cat === "Masks & Respirators") {
      if (specDetail.includes("Level 3")) specCode = "LV3";
      else if (specDetail.includes("Level 2")) specCode = "LV2";
      else if (specDetail.includes("Level 1")) specCode = "LV1";
      else if (specDetail.includes("N95")) specCode = "N95";
    }

    // Color Code
    const colMap: Record<string, string> = {
      Blue: "BLU",
      Black: "BLK",
      White: "WHT",
      Purple: "PUR",
      Green: "GRN",
    };
    const colCode = colMap[color] || color.substring(0, 3).toUpperCase();

    // SKU: PPE-[CAT]-[MAT]-[SPEC]-[VAR]-[COL]
    // Example: PPE-GLV-NIT-4MIL-VAR-BLU
    const sku = `PPE-${catCode}-${matCode}-${specCode}-${sizeCode}-${colCode}`;

    // Slug Generation
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

    setFormData({ ...formData, name: title, sku: sku, slug: slug });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.name || !formData.sku) {
        alert("Name and SKU are required");
        setLoading(false);
        return;
      }
      if (initialData?.id) {
        await updatePPEProduct(initialData.id, formData);
      } else {
        await addPPEProduct(formData as any);
      }
      router.push("/admin/ppe");
    } catch (error) {
      console.error(error);
      alert("Error saving PPE product");
    } finally {
      setLoading(false);
    }
  };

  const toggleCertification = (cert: string) => {
    const current = formData.certifications || [];
    if (current.includes(cert)) {
      setFormData({
        ...formData,
        certifications: current.filter((c) => c !== cert),
      });
    } else {
      setFormData({ ...formData, certifications: [...current, cert] });
    }
  };

  const toggleSize = (size: string) => {
    const current = formData.sizes || [];
    if (current.includes(size)) {
      setFormData({ ...formData, sizes: current.filter((s) => s !== size) });
    } else {
      setFormData({ ...formData, sizes: [...current, size] });
    }
  };

  const handleImageUpload = (url: string | string[]) => {
    const currentImages = formData.images || [];
    const newUrls = Array.isArray(url) ? url : [url];
    setFormData({
      ...formData,
      imageUrl: newUrls[0] || formData.imageUrl,
      images: [...currentImages, ...newUrls],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl mx-auto pb-24">
      {/* Header */}
      <div className="flex items-center justify-between sticky top-4 bg-gray-50/90 backdrop-blur z-20 py-4 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/ppe"
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-gray-500" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {initialData ? "Edit Medical Item" : "Add Medical Item"}
            </h1>
            <p className="text-sm text-slate-500">
              {initialData ? `Editing: ${initialData.name}` : "New SKU Entry"}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={generateIdentity}
            className="px-4 py-2 text-sm font-bold text-purple-600 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors flex items-center gap-2 border border-purple-200"
          >
            <Sparkles className="w-4 h-4" />
            Auto-Generate Identity
          </button>

          <Link
            href="/admin/ppe"
            className="px-4 py-2 text-sm font-bold text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 shadow-lg shadow-blue-900/10"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save Item
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* LEFT COL: Main Info */}
        <div className="md:col-span-2 space-y-8">
          {/* Identity */}
          <section className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-slate-800 border-b border-gray-100 pb-2">
              Product Identity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-sm font-bold text-slate-700">
                  Category
                </label>
                <select
                  value={formData.category || "Gloves"}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      category: e.target.value as PPECategory,
                    })
                  }
                  className="w-full px-3 py-2 border border-blue-300 bg-blue-50/20 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-800"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-sm font-bold text-slate-700">
                  Material
                </label>
                <select
                  value={formData.material || "Nitrile"}
                  onChange={(e) =>
                    setFormData({ ...formData, material: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {PPE_MATERIALS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
              </div>

              {/* Sizes Multi-Select */}
              <div className="space-y-2 col-span-2">
                <label className="text-sm font-bold text-slate-700 block mb-2">
                  Available Sizes
                </label>
                <div className="flex flex-wrap gap-2">
                  {SIZES.map((size) => (
                    <label
                      key={size}
                      className={`px-3 py-1.5 rounded-lg border text-sm font-bold cursor-pointer transition-all ${
                        formData.sizes?.includes(size)
                          ? "bg-slate-800 text-white border-slate-800"
                          : "bg-white text-slate-600 border-gray-200 hover:border-slate-400"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={formData.sizes?.includes(size)}
                        onChange={() => toggleSize(size)}
                      />
                      {size}
                    </label>
                  ))}
                </div>
              </div>

              {/* Dynamic Fields based on Category */}
              {formData.category === "Gloves" && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      Thickness
                    </label>
                    <select
                      value={formData.thickness || "4 mil"}
                      onChange={(e) =>
                        setFormData({ ...formData, thickness: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      {GLOVE_THICKNESS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">
                      Texture
                    </label>
                    <select
                      value={getTexture()}
                      onChange={(e) => updateSpec("texture", e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      {GLOVE_TEXTURES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              )}

              {formData.category === "Masks & Respirators" && (
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Mask Style
                  </label>
                  <select
                    value={getMaskStyle()}
                    onChange={(e) => updateSpec("style", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    {MASK_STYLES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Color
                </label>
                <select
                  value={getColor()}
                  onChange={(e) => updateSpec("color", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  {COLORS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-sm font-bold text-slate-700">
                  UPC / GTIN
                </label>
                <input
                  type="text"
                  value={formData.upc || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, upc: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                  placeholder="e.g. 196345000000"
                />
              </div>

              <div className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-sm font-bold text-slate-700">
                  MPN (Part #)
                </label>
                <input
                  type="text"
                  value={formData.mpn || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, mpn: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                  placeholder="e.g. REF-100-AB"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-slate-50"
                  placeholder="Click Auto-Generate..."
                  readOnly={false} // Allow manual edit if needed
                />
              </div>

              {/* Slug Field */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  URL Slug
                  <span className="text-xs font-normal text-gray-400 bg-gray-50 px-2 py-0.5 rounded">
                    visible-link-preview
                  </span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                    /
                  </span>
                  <input
                    type="text"
                    value={formData.slug || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, slug: e.target.value })
                    }
                    className="w-full pl-6 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm font-mono text-blue-600"
                    placeholder="auto-generated-slug"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">SKU</label>
                <input
                  type="text"
                  required
                  value={formData.sku || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, sku: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm bg-slate-50"
                  placeholder="Click Auto-Generate..."
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <label className="text-sm font-bold text-slate-700">
                Description
              </label>
              <textarea
                rows={4}
                value={formData.description || ""}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Detailed product description..."
              />
            </div>
          </section>

          {/* Medical Specs */}
          <section className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-slate-800 border-b border-gray-100 pb-2 flex items-center gap-2">
              <span className="text-blue-600">✚</span> Medical Specifications
            </h3>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">
                  Sterility
                </label>
                <div className="flex gap-4">
                  {["Non-Sterile", "Sterile"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="sterility"
                        value={opt}
                        checked={formData.sterility === opt}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sterility: e.target.value as Sterility,
                          })
                        }
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">
                  Certifications
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {CERTIFICATIONS.map(
                    (
                      cert // Simplified list for rendering, full list in code
                    ) => (
                      <label
                        key={cert}
                        className={`flex items-center gap-2 px-3 py-2 rounded border cursor-pointer transition-colors ${
                          formData.certifications?.includes(cert)
                            ? "bg-blue-50 border-blue-200"
                            : "bg-gray-50 border-gray-100"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={formData.certifications?.includes(cert)}
                          onChange={() => toggleCertification(cert)}
                          className="rounded text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm font-medium text-slate-700">
                          {cert}
                        </span>
                      </label>
                    )
                  )}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* RIGHT COL: Media & Logistics */}
        <div className="space-y-8">
          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-slate-800 border-b border-gray-100 pb-2">
              Images
            </h3>
            <ImageUpload onUploadComplete={handleImageUpload} />

            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >
              <SortableContext
                items={formData.images || []}
                strategy={rectSortingStrategy}
              >
                <div className="grid grid-cols-3 gap-2">
                  {formData.images?.map((url) => (
                    <SortableImage
                      key={url}
                      id={url}
                      url={url}
                      onRemove={handleImageRemove}
                    />
                  ))}
                  {(!formData.images || formData.images.length === 0) && (
                    <div className="col-span-3 text-center py-8 text-gray-400 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                      No images uploaded
                    </div>
                  )}
                </div>
              </SortableContext>
            </DndContext>
          </section>

          <section className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="font-bold text-lg text-slate-800 border-b border-gray-100 pb-2">
              Logistics
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Case Qty
                  </label>
                  <input
                    type="number"
                    value={formData.caseQty || 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        caseQty: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">
                    Pallet Qty
                  </label>
                  <input
                    type="number"
                    value={formData.palletQty || 0}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        palletQty: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </form>
  );
}
