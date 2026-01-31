"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PPEProduct, PPECategory, Sterility } from "@/types/ppe";
import { addPPEProduct, updatePPEProduct } from "@/services/ppeService";
import { Loader2, Save, ArrowLeft, Plus, X, Sparkles } from "lucide-react";
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
  "Syringes & Sharps",
  "Wound Care",
  "Specimen Collection",
  "Sterilization",
  "Diagnostic",
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
  "Polyisoprene",
  "Polycarbonate",
  "Stainless Steel", // Added
  "Medical Grade Plastic", // Added
  "Cotton", // Added
  "Glass", // Added
  "Non-Woven Fabric", // Added
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

const QUICK_SPEC_PRESETS: Record<string, { key: string; values: string[] }[]> =
  {
    "Syringes & Sharps": [
      {
        key: "Gauge",
        values: ["18G", "20G", "21G", "22G", "23G", "25G", "27G", "30G"],
      },
      { key: "Needle Length", values: ['1/2"', '5/8"', '1"', '1.5"'] },
      { key: "Volume", values: ["1ml", "3ml", "5ml", "10ml", "20ml", "60ml"] },
      {
        key: "Tip Type",
        values: ["Luer-Lock", "Slip Tip", "Catheter Tip", "Eccentric"],
      },
      { key: "Wall", values: ["Regular Wall", "Thin Wall", "Ultra-Thin Wall"] },
    ],
    "Wound Care": [
      { key: "Ply", values: ["4-Ply", "8-Ply", "12-Ply"] },
      { key: "Weave", values: ["Woven", "Non-Woven", "Sterile Mesh"] },
      { key: "Dimensions", values: ["2x2", "4x4", "2in x 2yds", "4in x 4yds"] },
      { key: "Adhesive", values: ["Adhesive Border", "Non-Adherent"] },
    ],
    "Specimen Collection": [
      { key: "Closure", values: ["Screw Cap", "Snap Cap", "Press-Seal"] },
      { key: "Volume", values: ["30ml", "60ml", "90ml", "120ml", "4oz"] },
      { key: "Additive", values: ["None", "Boric Acid", "Formalin"] },
      { key: "Graduated", values: ["Yes", "No"] },
    ],
    Diagnostic: [
      { key: "Tip", values: ["Straight", "Curved", "Serrated"] },
      { key: "Length", values: ["5.5in", "6.25in", "8in"] },
      { key: "Grade", values: ["OR Grade", "Economy Grade", "Floor Grade"] },
    ],
    Sterilization: [
      { key: "Indicator", values: ["Steam", "EtO", "Steam & EtO"] },
      { key: "Class", values: ["Class 1", "Class 4", "Class 5", "Class 6"] },
      { key: "Seal", values: ["Self-Seal", "Heat-Seal"] },
    ],
    "Masks & Respirators": [
      { key: "BFE", values: [">95%", ">98%", ">99%"] },
      { key: "PFE", values: [">95%", ">98%", ">99%"] },
      { key: "Fluid Resistance", values: ["80 mmHg", "120 mmHg", "160 mmHg"] },
    ],
    gloves: [
      { key: "Cuff", values: ["Beaded", "Straight"] },
      { key: "Finish", values: ["Chlorinated", "Polymer Coated"] },
      {
        key: "Grade",
        values: ["Exam Grade", "Chemo Rated", "Industrial Grade"],
      },
    ],
  };

const COLORS = [
  "Blue",
  "Black",
  "White",
  "Purple",
  "Green",
  "Orange",
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
      brand: "PIF Medical & Clinical", // Updated default brand
      category: "Gloves",
      description: "",
      upc: "",
      mpn: "",
      unspsc: "",
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
    },
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
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

  const removeSpec = (key: string) => {
    const newSpecs = { ...formData.specifications };
    delete newSpecs[key];
    setFormData({ ...formData, specifications: newSpecs });
  };

  const generateIdentity = () => {
    // 1. Generate Name
    // Structure: [Material] [Category] - [Main Spec] - [Secondary Spec] - [Color]
    const mat = formData.material || "";
    const cat = formData.category || "";
    const color = getColor();
    const sizes = formData.sizes || [];
    let specDetail = "";

    // Helper to get spec value safely
    const getSpec = (key: string) => formData.specifications?.[key] || "";

    if (cat === "Gloves") {
      specDetail = formData.thickness || "";
    } else if (cat === "Masks & Respirators") {
      if (formData.certifications?.includes("ASTM F2100 Level 3"))
        specDetail = "ASTM Level 3";
      else if (formData.certifications?.includes("ASTM F2100 Level 2"))
        specDetail = "ASTM Level 2";
      else if (formData.certifications?.includes("NIOSH Approved"))
        specDetail = "N95";
      const style = getMaskStyle();
      if (style) specDetail += `, ${style}`;
    } else if (cat === "Syringes & Sharps") {
      const gauge = getSpec("Gauge");
      const len = getSpec("Needle Length");
      const vol = getSpec("Volume");
      const tip = getSpec("Tip Type");
      // "18G x 1.5" - 3ml Luer-Lock"
      const needleSpec = gauge && len ? `${gauge} x ${len}` : gauge || "";
      const syringeSpec = vol && tip ? `${vol} ${tip}` : vol || tip || "";
      specDetail = [needleSpec, syringeSpec].filter(Boolean).join(" - ");
    } else if (cat === "Wound Care") {
      const dim = getSpec("Dimensions");
      const ply = getSpec("Ply");
      // "4x4 - 12-Ply"
      specDetail = [dim, ply].filter(Boolean).join(" ");
    } else if (cat === "Specimen Collection") {
      const vol = getSpec("Volume");
      const closure = getSpec("Closure");
      specDetail = [vol, closure].filter(Boolean).join(" ");
    } else if (cat === "Gowns & Apparel") {
      specDetail = getSpec("AAMI Level");
    } else if (cat === "Diagnostic") {
      specDetail = getSpec("Tip") + " " + (getSpec("Length") || "");
    } else if (cat === "Face Shields") {
      specDetail = getSpec("Coating");
    }

    const title = `${mat} ${cat} ${
      specDetail ? `- ${specDetail}` : ""
    } - ${color}`
      .replace(/\s+/g, " ")
      .replace(/- -/g, "-") // Cleanup double dashes
      .trim();

    // 2. Generate SKU
    // PPE-[CAT]-[MAT]-[SPEC]-[COL]
    // GLV-NIT-4MIL-BLU
    const catCode =
      cat === "Gloves"
        ? "GLV"
        : cat === "Masks & Respirators"
          ? "MSK"
          : cat === "Syringes & Sharps"
            ? "SYR"
            : cat === "Wound Care"
              ? "WND"
              : cat === "Specimen Collection"
                ? "SPC"
                : cat === "Sterilization"
                  ? "STR"
                  : cat === "Diagnostic"
                    ? "DIA"
                    : "PPE";

    // Material Code
    const matMap: Record<string, string> = {
      Nitrile: "NIT",
      Latex: "LAT",
      Vinyl: "VIN",
      "Polypropylene (SMS)": "SMS",
      "Stainless Steel": "SS",
      "Medical Grade Plastic": "ABS",
      Cotton: "CTN",
      Glass: "GLS",
      "Non-Woven Fabric": "NWF",
    };
    const matCode = matMap[mat] || mat.substring(0, 3).toUpperCase();

    // Spec Code
    let specCode = "GEN";
    let sizeCode = sizes.length > 0 ? "VAR" : "GEN";

    // Helper to get spec value safely (re-declared for scope if needed, or rely on closure)

    if (cat === "Gloves" && formData.thickness) {
      specCode = formData.thickness.replace(" mil", "MIL").replace(".", "");
    } else if (cat === "Masks & Respirators") {
      // Re-derive specDetail for SKU logic if needed or parse certifications again
      if (formData.certifications?.includes("ASTM F2100 Level 3"))
        specCode = "LV3";
      else if (formData.certifications?.includes("ASTM F2100 Level 2"))
        specCode = "LV2";
      else if (formData.certifications?.includes("NIOSH Approved"))
        specCode = "N95";
    } else if (cat === "Syringes & Sharps") {
      // Gauge is best identifier: 18G -> 18G
      const gauge = getSpec("Gauge");
      if (gauge) specCode = gauge;
    } else if (cat === "Wound Care") {
      // Ply or Dimensions
      const ply = getSpec("Ply");
      if (ply) specCode = ply.replace("-Ply", "P"); // 12-Ply -> 12P
    } else if (cat === "Gowns & Apparel") {
      const aami = getSpec("AAMI Level");
      if (aami) specCode = aami.replace("Level ", "LV"); // Level 3 -> LV3
    } else if (cat === "Specimen Collection") {
      const vol = getSpec("Volume");
      if (vol)
        specCode = vol.toUpperCase().replace("ML", "ML").replace("OZ", "OZ");
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

              <div className="space-y-2 col-span-2 md:col-span-1">
                <label className="text-sm font-bold text-slate-700">
                  UNSPSC
                </label>
                <input
                  type="text"
                  value={formData.unspsc || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, unspsc: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-blue-100 bg-blue-50/10 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none font-mono text-sm"
                  placeholder="e.g. 42132203"
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
                      cert, // Simplified list for rendering, full list in code
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
                    ),
                  )}
                </div>
              </div>

              {/* QUICK SPECS - Category Aware */}
              {QUICK_SPEC_PRESETS[formData.category || ""] && (
                <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100 mb-4">
                  <label className="text-xs font-bold text-blue-800 uppercase tracking-wide block mb-3">
                    ✨ Quick Add Specs for {formData.category}
                  </label>
                  <div className="space-y-3">
                    {QUICK_SPEC_PRESETS[formData.category || ""].map(
                      (group) => (
                        <div
                          key={group.key}
                          className="flex flex-wrap gap-2 items-center"
                        >
                          <span className="text-xs font-bold text-slate-500 w-24">
                            {group.key}:
                          </span>
                          <div className="flex flex-wrap gap-1 flex-1">
                            {group.values.map((val) => {
                              const isActive =
                                formData.specifications?.[group.key] === val;
                              return (
                                <button
                                  type="button"
                                  key={val}
                                  onClick={() =>
                                    updateSpec(group.key, isActive ? "" : val)
                                  }
                                  className={`px-2 py-1 text-xs rounded border transition-all ${
                                    isActive
                                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                                      : "bg-white text-slate-600 border-blue-200 hover:border-blue-400 hover:text-blue-700"
                                  }`}
                                >
                                  {val}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              )}

              {/* Dynamic Additional Specs */}
              <div>
                <label className="text-sm font-bold text-slate-700 block mb-2">
                  Additional Specifications
                </label>
                <div className="bg-gray-50 rounded-lg p-3 space-y-3">
                  {/* List Existing Specs */}
                  {Object.entries(formData.specifications || {})
                    .filter(([k]) => !["color", "texture", "style"].includes(k)) // Hide internal mapped specs
                    .map(([key, val]) => (
                      <div
                        key={key}
                        className="flex items-center gap-2 text-sm group"
                      >
                        <span className="font-semibold text-slate-600 min-w-[120px]">
                          {key}:
                        </span>
                        <span className="flex-1 text-slate-800">{val}</span>
                        <button
                          type="button"
                          onClick={() => removeSpec(key)}
                          className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}

                  {/* Add New Spec */}
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-200">
                    <input
                      type="text"
                      id="new-spec-key"
                      placeholder="Name (e.g. Shelf Life)"
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm outline-none focus:border-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const keyInput = e.currentTarget;
                          const valInput = document.getElementById(
                            "new-spec-val",
                          ) as HTMLInputElement;
                          if (keyInput.value && valInput.value) {
                            updateSpec(keyInput.value, valInput.value);
                            keyInput.value = "";
                            valInput.value = "";
                            keyInput.focus();
                          }
                        }
                      }}
                    />
                    <input
                      type="text"
                      id="new-spec-val"
                      placeholder="Value"
                      className="flex-1 px-3 py-1.5 border border-gray-300 rounded text-sm outline-none focus:border-blue-500"
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          const valInput = e.currentTarget;
                          const keyInput = document.getElementById(
                            "new-spec-key",
                          ) as HTMLInputElement;
                          if (keyInput.value && valInput.value) {
                            updateSpec(keyInput.value, valInput.value);
                            keyInput.value = "";
                            valInput.value = "";
                            keyInput.focus();
                          }
                        }
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const keyInput = document.getElementById(
                          "new-spec-key",
                        ) as HTMLInputElement;
                        const valInput = document.getElementById(
                          "new-spec-val",
                        ) as HTMLInputElement;
                        if (keyInput.value && valInput.value) {
                          updateSpec(keyInput.value, valInput.value);
                          keyInput.value = "";
                          valInput.value = "";
                        }
                      }}
                      className="p-1.5 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
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
