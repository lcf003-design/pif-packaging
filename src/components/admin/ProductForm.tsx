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
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  defaultDropAnimationSideEffects,
  DropAnimation,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

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
  "Personal Health & Beauty",
  "Pharma, Nutraceuticals & Healthcare",
  "Home Care",
  "Pet Care & Veterinary",
  "Beer",
  "Spirits",
  "Industrial Chemical",
  "Wine",

  "Cosmetics",
  "Cannabis & CBD",
];
const MATERIALS: Material[] = [
  "Glass",
  "Glass (Type III)",
  "HDPE",
  "PET",
  "PP",
  "LDPE",
  "PVC",
  "Aluminum",
  "Tinplate",
  "PCR PET",
  "PCR HDPE",
  "BPA-Free Plastic",
];

const COLORS = [
  "Clear",
  "Flint",
  "Amber",
  "Blue",
  "Green",
  "White",
  "Black",
  "Natural",
  "Frosted",
  "Silver",
  "Gold",
];

const SHAPES = [
  "Round",
  "Square",
  "Oval",
  "Oblong",
  "Straight Sided",
  "Bullet",
  "Boston Round",
  "Cosmo Round",
  "Packer",
  "Wide Mouth",
  "Cylinder",
  "F-Style",
  "Woozy",
  "Sauce",
  "Claret",
  "Burgundy",
  "Hock",
  "Champagne",
  "Sparkling",
  "Ice Wine",
  "Bellissima",
];

const COMMON_CAPACITIES: { label: string; value: number; unit: string }[] = [
  { label: "0.5 oz (15ml)", value: 0.5, unit: "oz" },
  { label: "1 oz (30ml)", value: 1, unit: "oz" },
  { label: "2 oz (60ml)", value: 2, unit: "oz" },
  { label: "4 oz (120ml)", value: 4, unit: "oz" },
  { label: "8 oz (240ml)", value: 8, unit: "oz" },
  { label: "12 oz (355ml)", value: 12, unit: "oz" },
  { label: "16 oz (480ml)", value: 16, unit: "oz" },
  { label: "32 oz (950ml)", value: 32, unit: "oz" },
  { label: "64 oz (Half Gal)", value: 64, unit: "oz" },
  { label: "1 Gallon", value: 1, unit: "gal" },
];

const NECK_FINISH_TYPES = [
  "Continuous Thread",
  "Lug (Twist-Off)",
  "R3",
  "Ribbed",
  "Smooth",
  "Snap-On",
  "Cork",
  "Crimp",
  "Dropper",
  "Pump",
  "Sprayer",
  "GPI 400",
  "GPI 410",
  "GPI 415",
  "GPI 425",
  "GPI 430",
  "GPI 480",
  "GPI 485",
  "ROPP",
  "ROPE",
  "BVS",
  "Spec / Custom",
];

const CAP_SIZES = [
  "13-415",
  "15-415",
  "18-400",
  "18-410",
  "18-415",
  "20-400",
  "20-410",
  "22-400",
  "24-400",
  "24-410",
  "28-400",
  "28-410",
  "30-1680",
  "33-400",
  "38-400",
  "43-400",
  "45-400",
  "48-400",
  "53-400",
  "58-400",
  "63-400",
  "70-400",
  "83-400",
  "89-400",
  "100-400",
  "110-400",
  "120-400",
];

const LINER_TYPES = [
  "Unlined",
  "F217 (PE Foam)",
  "PE (Polyethylene)",
  "PS-22 (Pressure Sensitive)",
  "HS035 (Heat Induction)",
  "Plastisol (Metal Only)",
  "Polycone (Phenolic)",
  "Pulp & Poly",
  "Teflon (PTFE)",
  "Foil Laminate",
];

const LABEL_PANEL_SHAPES = [
  "Rectangular",
  "Die-Cut",
  "Round",
  "Oval",
  "Wrap-Around",
];

interface ProductFormProps {
  initialData?: Product;
}

// Sortable Image Component
function SortableImage({
  url,
  index,
  onRemove,
  onSetMain,
  isOverlay = false, // Add overlay flag for cleaner drag appearance
}: {
  url: string;
  index: number;
  onRemove: (idx: number) => void;
  onSetMain: (idx: number) => void;
  isOverlay?: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: url });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.3 : 1,
    zIndex: isDragging ? 999 : undefined, // Ensure dragged item is on top
  };

  // Specific style for the overlay item (what you see under the cursor)
  if (isOverlay) {
    return (
      <div className="relative aspect-square border-2 border-berlin-blue rounded-xl overflow-hidden bg-white shadow-2xl cursor-grabbing z-[9999]">
        <img src={url} alt="" className="w-full h-full object-contain p-2" />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`relative group aspect-square border rounded-xl overflow-hidden bg-white shadow-sm touch-none ${
        index === 0
          ? "ring-2 ring-berlin-blue border-transparent"
          : "border-gray-200"
      } hover:border-berlin-blue/50 transition-colors cursor-grab active:cursor-grabbing`}
    >
      <img src={url} alt="" className="w-full h-full object-contain p-2" />

      {/* Badge for Main */}
      {index === 0 && (
        <span className="absolute top-2 left-2 bg-berlin-blue text-white text-[10px] uppercase font-bold px-2 py-0.5 rounded shadow-sm z-10">
          Main
        </span>
      )}

      {/* Actions Overlay: Only show when not dragging */}
      {!isDragging && (
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex flex-col justify-between p-2 opacity-0 group-hover:opacity-100">
          <div className="flex justify-end">
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()} // Prevent drag start
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onRemove(index);
              }}
              className="bg-white text-red-500 p-1.5 rounded-full shadow hover:bg-red-50 transition-colors"
              title="Remove"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>

          {index !== 0 && (
            <button
              type="button"
              onPointerDown={(e) => e.stopPropagation()} // Prevent drag start
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onSetMain(index);
              }}
              className="bg-white text-gray-700 text-xs font-bold py-1.5 px-2 rounded shadow hover:bg-gray-50 transition-colors w-full text-center"
            >
              Set as Main
            </button>
          )}
        </div>
      )}
    </div>
  );
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

  // DnD Sensors & State
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = (formData.images || []).indexOf(active.id as string);
      const newIndex = (formData.images || []).indexOf(over?.id as string);

      const newImages = arrayMove(formData.images || [], oldIndex, newIndex);

      setFormData({
        ...formData,
        images: newImages,
        imageUrl: newImages[0], // Update main image if order changes
      });
    }
    setActiveId(null);
  };

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
  };

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
      neck_finish:
        formData.neckFinish === "Continuous Thread"
          ? "CT"
          : formData.neckFinish,
    };

    let { title, slug } = generateProductMetadata(
      specs,
      formData.category || "Container"
    );

    // Append Closure if present (User Request)
    if (formData.closure?.type) {
      const closureStr = ` with ${formData.closure.color || ""} ${
        formData.closure.type
      }`
        .trim()
        .replace(/\s+/g, " ");
      title += ` ${closureStr}`; // "Glass Bottle with Black Lotion Pump"

      const closureSlug = `-${formData.closure.color || ""}-${
        formData.closure.type
      }`
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      slug += closureSlug;
    }

    // Sanitization for No Decimals (User Request)
    title = title.replace(/\./g, "-");
    slug = slug.replace(/\./g, "-");

    setFormData({ ...formData, name: title, slug: slug });
  };

  // Media Helpers
  const handleImageUpload = (url: string | string[]) => {
    const currentImages = formData.images || [];
    const newUrls = Array.isArray(url) ? url : [url];
    const validUrls = newUrls.filter((u) => u); // Filter empty strings
    const newImages = [...currentImages, ...validUrls];

    setFormData({
      ...formData,
      images: newImages,
      imageUrl: newImages.length > 0 ? newImages[0] : "", // Ensure Main is set
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

  const handleUnitChange = (newUnit: string) => {
    const currentVal = formData.capacity?.value || 0;
    const currentUnit = formData.capacity?.unit || "oz";

    if (currentVal === 0 || currentUnit === newUnit) {
      setFormData({
        ...formData,
        capacity: { ...formData.capacity!, unit: newUnit as any },
      });
      return;
    }

    // Factors to ML (Base)
    const toML: Record<string, number> = {
      oz: 29.5735,
      ml: 1,
      gal: 3785.41,
      l: 1000,
    };

    const mlValue = currentVal * (toML[currentUnit] || 1);
    const newValue = mlValue / (toML[newUnit] || 1);

    // Smart rounding
    // If < 10, maybe 2 decimals? If > 1000, maybe integer?
    // Let's stick to 2 decimals for consistency, or 3 for small gals?
    // Gal is usually large. 1 oz = 0.0078 gal. Need 4 decimals for gal.
    // ML needs 0 or 1 decimal.
    // Let's just use strict 2 for now, or 4 if target is gal.
    let decimals = 2;
    if (newUnit === "gal") decimals = 4;
    if (newUnit === "l") decimals = 3;
    if (newUnit === "ml") decimals = 1;

    setFormData({
      ...formData,
      capacity: {
        value: parseFloat(newValue.toFixed(decimals)),
        unit: newUnit as any,
      },
    });
  };

  const generateSmartSKU = () => {
    const parts: string[] = [];

    // 1. Material (3-Letter Code)
    const matMap: Record<string, string> = {
      Aluminum: "AL",
      Glass: "GLS",
      "Glass (Type III)": "GLS3",
      Plastic: "PLA",
      PET: "PET",
      HDPE: "HDPE",
      PP: "PP",
      LDPE: "LDPE",
      PVC: "PVC",
      Tinplate: "TIN",
      "PCR PET": "PET",
      "PCR HDPE": "HDPE",
      "BPA-Free Plastic": "PLA",
    };
    if (formData.material) {
      parts.push(
        matMap[formData.material] ||
          formData.material.substring(0, 3).toUpperCase()
      );
    }

    // 2. Capacity & Unit
    if (formData.capacity?.value) {
      const val = formData.capacity.value.toString().replace(".", "-");
      const unit = formData.capacity.unit
        ? formData.capacity.unit.toUpperCase()
        : "";
      parts.push(val);
      if (unit) parts.push(unit);
    }

    // 3. Shape (The Missing Link - 3 Letter Codes)
    const shapeMap: Record<string, string> = {
      Round: "RND",
      Square: "SQR",
      Oval: "OVL",
      Oblong: "OBL",
      "Straight Sided": "STR",
      Bullet: "BLT",
      "Boston Round": "BOS",
      "Cosmo Round": "CSM",
      Packer: "PKR",
      "Wide Mouth": "WID",
      Cylinder: "CYL",
      "F-Style": "FST",
      Woozy: "WZY",
      Sauce: "SCE",
      // Wine Shapes
      Claret: "CLT",
      Burgundy: "BRG",
      Hock: "HCK",
      Champagne: "CHM",
      Sparkling: "SPK",
      "Ice Wine": "ICE",
      Bellissima: "BEL",
    };
    if (formData.shape) {
      parts.push(
        shapeMap[formData.shape] || formData.shape.substring(0, 3).toUpperCase()
      );
    }

    // 4. Neck Finish (Smart Codes)
    const neckMap: Record<string, string> = {
      "Continuous Thread": "CT",
      "Lug (Twist-Off)": "LUG",
      Cork: "CRK",
      ROPP: "ROP",
      ROPE: "RPE",
      BVS: "BVS",
      "Snap-On": "SNP",
      Crimp: "CRM",
      Dropper: "DRP",
      Pump: "PMP",
      Sprayer: "SPR",
      "Spec / Custom": "SPC",
    };

    // Check Cap Size (Numeric) or Neck Finish (Type)
    let neckCode = "";
    if (formData.capSize) {
      neckCode = formData.capSize.replace(/[^0-9-]/g, ""); // e.g. 28-410
    } else if (formData.neckFinish) {
      // Check map first
      if (neckMap[formData.neckFinish]) {
        neckCode = neckMap[formData.neckFinish];
      } else {
        // Fallback: Strip non-numeric for things like "GPI 400" -> "400"
        const numeric = formData.neckFinish.replace(/[^0-9]/g, "");
        neckCode = numeric || formData.neckFinish.substring(0, 3).toUpperCase();
      }
    }
    if (neckCode) parts.push(neckCode);

    // 5. Color
    const colMap: Record<string, string> = {
      Silver: "SLV",
      Amber: "AMB",
      Clear: "CLR",
      Flint: "FLT",
      White: "WHT",
      Black: "BLK",
      Cobalt: "CBL",
      Green: "GRN",
      Natural: "NAT",
      Frosted: "FRS",
      Gold: "GLD",
    };
    if (formData.color) {
      let colCode = colMap[formData.color];
      if (!colCode) {
        colCode = formData.color.substring(0, 3).toUpperCase();
      }
      parts.push(colCode);
    }

    // 6. Included Closure Context
    // If it's a Closure product itself, we might want Liner info?
    // For now, if it's a Container with a Closure, the closure type is usually implied or strictly added.
    // The User asked "Does this cover everything?".
    // If formatting as a Container SKU, usually Container details are paramount.
    // If a closure is attached, maybe append -W-CAP?
    // Leaving standard logic for now as requested.

    if (parts.length > 0) {
      setFormData({ ...formData, sku: parts.join("-") });
    } else {
      alert("Please fill in Material, Capacity, Shape, and Neck Finish first.");
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

  const autoTagIndustries = () => {
    const newIndustries = new Set<Industry>(); // Start fresh to avoid stale tags
    const name = (formData.name || "").toLowerCase();
    const desc = (formData.description || "").toLowerCase();
    const mat = (formData.material || "").toLowerCase();
    const cat = (formData.category || "").toLowerCase();
    const shape = (formData.shape || "").toLowerCase();
    const neck = (formData.neckFinish || "").toLowerCase();
    const closureType = (formData.closure?.type || "").toLowerCase();

    const reasons: string[] = [];
    // Helper to check text presence
    const has = (keywords: string[]) => {
      const match = keywords.find((k) => name.includes(k) || desc.includes(k));
      if (match) reasons.push(`Matched keyword: ${match}`);
      return !!match;
    };

    // --- 1. KEYWORD FORENSICS ---

    // Alcohol
    if (
      has([
        "beer",
        "brew",
        "ale",
        "lager",
        "ipa",
        "stout",
        "pilsner",
        "malt",
        "hops",
        "growler",
      ])
    )
      newIndustries.add("Beer");
    if (
      has([
        "wine",
        "chardonnay",
        "merlot",
        "cabernet",
        "pinot",
        "rose",
        "bordeaux",
        "riesling",
        "claret",
      ])
    )
      newIndustries.add("Wine");
    if (
      has([
        "spirit",
        "liquor",
        "vodka",
        "gin",
        "whiskey",
        "rum",
        "tequila",
        "bourbon",
        "brandy",
        "cognac",
        "moonshine",
        "distillery",
        "750ml",
      ])
    )
      newIndustries.add("Spirits");

    // Beverage (Non-Alc)
    if (
      has([
        "juice",
        "water",
        "soda",
        "coffee",
        "tea",
        "energy drink",
        "cold brew",
        "kombucha",
        "milk",
        "dairy",
        "beverage",
        "carbonated",
        "drink",
      ])
    )
      newIndustries.add("Beverage");

    // Food
    if (
      has([
        "sauce",
        "condiment",
        "dressing",
        "marinade",
        "spice",
        "honey",
        "syrup",
        "jam",
        "jelly",
        "bbq",
        "hot sauce",
        "chocolate",
        "candy",
        "snack",
        "kitchen",
        "vinegar",
        "cooking oil",
        "olive oil",
      ])
    )
      newIndustries.add("Food");

    // Personal Health & Beauty
    if (
      has([
        "shampoo",
        "conditioner",
        "soap",
        "lotion",
        "wash",
        "body",
        "face",
        "skin",
        "hair",
        "grooming",
        "moisturizer",
        "cleanser",
        "scrub",
        "spa",
        "bath",
      ])
    )
      newIndustries.add("Personal Health & Beauty");

    // Cosmetics
    if (
      has([
        "serum",
        "makeup",
        "foundation",
        "mascara",
        "lipstick",
        "gloss",
        "balm",
        "beauty",
        "cosmetic",
        "luxury",
        "perfume",
        "fragrance",
      ])
    )
      newIndustries.add("Cosmetics");

    // Pharma & Healthcare
    if (
      has([
        "vitamin",
        "supplement",
        "pill",
        "capsule",
        "tablet",
        "medicine",
        "clinical",
        "pharmacy",
        "medical",
        "protein",
        "workout",
        "dietary",
        "herbal",
        "wellness",
        "healthcare",
      ])
    )
      newIndustries.add("Pharma, Nutraceuticals & Healthcare");

    // Pet Care
    if (
      has([
        "pet",
        "dog",
        "cat",
        "vet",
        "animal",
        "veterinary",
        "equine",
        "k9",
        "treat",
      ])
    )
      newIndustries.add("Pet Care & Veterinary");

    // Cannabis
    if (
      has([
        "cannabis",
        "cbd",
        "thc",
        "hemp",
        "marijuana",
        "flower",
        "pre-roll",
        "edible",
        "tincture",
        "dispensary",
      ])
    )
      newIndustries.add("Cannabis & CBD");

    // Automotive
    if (
      has([
        "motor oil",
        "vehicle",
        "lubricant",
        "fuel",
        "additive",
        "brake fluid",
        "transmission",
        "coolant",
        "auto body",
        "car wash",
        "detailer",
      ])
    )
      newIndustries.add("Automotive");

    // Home Care & Industrial
    // Logic: Strong cleaners often span both.
    if (
      has([
        "cleaner",
        "detergent",
        "sanitizer",
        "disinfectant",
        "household",
        "laundry",
        "fabric",
        "bleach",
        "surface",
        "glass cleaner",
      ])
    ) {
      newIndustries.add("Home Care");
      newIndustries.add("Industrial Chemical");
    }

    // Industrial Specific
    if (
      has([
        "chemical",
        "solvent",
        "acid",
        "degreaser",
        "industrial",
        "agrochemical",
        "pesticide",
        "herbicide",
        "coating",
        "paint",
        "thinner",
      ])
    )
      newIndustries.add("Industrial Chemical");

    // --- 2. CONTEXTUAL FORENSICS (Closures, Shapes, Materials) ---

    // Closure Logic
    if (closureType.includes("trigger")) {
      newIndustries.add("Home Care");
      newIndustries.add("Industrial Chemical");
      newIndustries.add("Automotive");
    }
    if (
      closureType.includes("pump") ||
      closureType.includes("mist") ||
      closureType.includes("disc")
    ) {
      newIndustries.add("Personal Health & Beauty");
    }
    if (closureType.includes("dropper") || closureType.includes("pipette")) {
      newIndustries.add("Cosmetics");
      newIndustries.add("Pharma, Nutraceuticals & Healthcare");
      newIndustries.add("Cannabis & CBD");
    }
    if (closureType.includes("child resistant") || closureType.includes("cr")) {
      newIndustries.add("Pharma, Nutraceuticals & Healthcare");
      newIndustries.add("Cannabis & CBD");
    }
    if (closureType.includes("spice") || closureType.includes("sifter")) {
      newIndustries.add("Food");
    }
    if (closureType.includes("cork") || closureType.includes("bar top")) {
      newIndustries.add("Spirits");
      newIndustries.add("Wine");
    }
    if (closureType.includes("crown")) {
      newIndustries.add("Beer");
    }

    // Shape Logic
    if (shape.includes("f-style") || shape.includes("jerry")) {
      newIndustries.add("Industrial Chemical");
      newIndustries.add("Automotive");
    }
    if (shape.includes("woozy")) {
      newIndustries.add("Food");
    }
    if (cat === "vials") {
      newIndustries.add("Pharma, Nutraceuticals & Healthcare");
      newIndustries.add("Cosmetics");
    }

    // --- 3. DEEP TECH SPEC FORENSICS ---

    // Neck Finish Logic
    if (
      neck.includes("ropp") ||
      neck.includes("rope") ||
      neck.includes("bvs")
    ) {
      newIndustries.add("Spirits");
      newIndustries.add("Wine");
    }
    if (neck.includes("485") || neck.includes("spice")) {
      newIndustries.add("Food");
    }
    if (neck.includes("cork")) {
      newIndustries.add("Spirits");
      newIndustries.add("Wine");
    }

    // Liner Logic (The "Hidden" Tech Spec)
    const liner = (formData.closure?.liner || "").toLowerCase();
    if (liner.includes("plastisol")) {
      newIndustries.add("Food"); // Vacuum seal for jams/salsas
    }
    if (liner.includes("polycone") || liner.includes("phenolic")) {
      newIndustries.add("Industrial Chemical"); // Solvents
      newIndustries.add("Home Care"); // Strong Cleaners
    }
    if (liner.includes("induction") || liner.includes("hs035")) {
      newIndustries.add("Pharma, Nutraceuticals & Healthcare"); // Tamper Evident
      newIndustries.add("Food");
    }
    if (liner.includes("teflon") || liner.includes("ptfe")) {
      newIndustries.add("Industrial Chemical"); // High acid resistance
    }

    // Color Logic (Industry Standards)
    const color = (formData.color || "").toLowerCase();
    if (color.includes("amber")) {
      // UV Protection
      if (!newIndustries.has("Beer")) {
        newIndustries.add("Pharma, Nutraceuticals & Healthcare");
        newIndustries.add("Industrial Chemical");
      }
    }
    if (color.includes("cobalt") || color.includes("blue")) {
      newIndustries.add("Cosmetics");
      newIndustries.add("Personal Health & Beauty");
      newIndustries.add("Pharma, Nutraceuticals & Healthcare");
    }
    if (color.includes("green")) {
      // Often Olive Oil or Wine
      if (!newIndustries.has("Wine")) newIndustries.add("Food");
    }

    // Advanced Shape Logic
    if (shape.includes("packer")) {
      newIndustries.add("Pharma, Nutraceuticals & Healthcare"); // Pill Packers
    }
    if (shape.includes("cosmo") || shape.includes("bullet")) {
      newIndustries.add("Personal Health & Beauty");
      newIndustries.add("Cosmetics");
    }
    if (shape.includes("woozy") || shape.includes("sauce")) {
      newIndustries.add("Food");
    }
    if (shape.includes("f-style") || shape.includes("jerry")) {
      newIndustries.add("Industrial Chemical");
      newIndustries.add("Automotive");
    }
    if (
      shape.includes("claret") ||
      shape.includes("burgundy") ||
      shape.includes("hock") ||
      shape.includes("champagne") ||
      shape.includes("sparkling") ||
      shape.includes("ice wine") ||
      shape.includes("bellissima")
    ) {
      newIndustries.add("Spirits");
      newIndustries.add("Wine");
      newIndustries.add("Beverage");
    }

    // Capacity Logic
    const capacity = formData.capacity?.value || 0;
    const unit = formData.capacity?.unit || "";
    if (unit === "gal" || (unit === "oz" && capacity >= 64)) {
      newIndustries.add("Industrial Chemical");
      newIndustries.add("Home Care");
      newIndustries.add("Automotive"); // Bulk fluids
    }
    if (unit === "oz" && capacity <= 2) {
      // Small sizes
      newIndustries.add("Cosmetics");
      newIndustries.add("Personal Health & Beauty"); // Travel sizes / Serums
    }

    // Material Logic (Refinement)
    // Material Logic (Refinement)
    if (mat === "aluminum") {
      // Aluminum Context
      if (has(["can", "beverage", "drink"])) newIndustries.add("Beverage");

      // User Fix: Aluminum + Screw Cap often = Beverage
      if (
        closureType.includes("screw") ||
        closureType.includes("standard") ||
        closureType.includes("cap")
      ) {
        newIndustries.add("Beverage");
      }

      // Aluminum bottles often used for these if not specified
      if (newIndustries.size === 0) {
        newIndustries.add("Personal Health & Beauty");
        newIndustries.add("Beverage");
      }
    }

    setFormData({ ...formData, industry: Array.from(newIndustries) });

    // Format alert for clarity
    const industryList = Array.from(newIndustries).join(", ");
    alert(
      `Smart Tagged ${
        newIndustries.size
      } Industries:\n${industryList}\n\nReasoning:\n${reasons.join("\n")}`
    );
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
              {/* Grid with DnD */}
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {/* Upload Button */}
                  <div className="aspect-square">
                    <ImageUpload
                      onUploadComplete={handleImageUpload}
                      className="h-full"
                      fileNamePrefix={formData.sku || formData.slug}
                      key={`upload-${formData.images?.length || 0}`}
                    />
                  </div>

                  <SortableContext
                    items={formData.images || []}
                    strategy={rectSortingStrategy}
                  >
                    {formData.images?.map((img, idx) => (
                      <SortableImage
                        key={img}
                        url={img}
                        index={idx}
                        onRemove={removeGalleryImage}
                        onSetMain={setPrimaryImage}
                      />
                    ))}
                  </SortableContext>

                  <DragOverlay adjustScale={true}>
                    {activeId ? (
                      <SortableImage
                        url={activeId}
                        index={0} // Index doesn't matter for overlay
                        onRemove={() => {}}
                        onSetMain={() => {}}
                        isOverlay
                      />
                    ) : null}
                  </DragOverlay>
                </div>
              </DndContext>
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
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center justify-between">
                  <span>URL Slug (SEO)</span>
                  <span className="text-[10px] text-gray-400 font-normal">
                    Auto-generated, but you can edit constraints manually.
                  </span>
                </label>
                <input
                  type="text"
                  className="block w-full rounded-md border-gray-300 border p-2 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-berlin-blue focus:border-transparent transition-all outline-none text-sm font-mono text-gray-600"
                  value={formData.slug || ""}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      slug: e.target.value
                        .toLowerCase()
                        .replace(/\s+/g, "-")
                        .replace(/[^\w-]+/g, ""),
                    })
                  }
                  placeholder="e.g. 12oz-amber-glass-bottle"
                />
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

            {/* 1. Physical Attributes Group */}
            <div className="space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1">
                Physical Attributes
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Material
                  </label>
                  <select
                    className="block w-full rounded-md border-gray-300 border p-2 focus:ring-2 focus:ring-berlin-blue outline-none bg-gray-50 focus:bg-white transition-colors"
                    value={formData.material}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        material: e.target.value as Material,
                      })
                    }
                  >
                    <option value="">Select Material...</option>
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
                  <select
                    className="block w-full rounded-md border-gray-300 border p-2 focus:ring-2 focus:ring-berlin-blue outline-none bg-gray-50 focus:bg-white transition-colors"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData({ ...formData, color: e.target.value })
                    }
                  >
                    <option value="">Select Color...</option>
                    {COLORS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Shape
                  </label>
                  <select
                    className="block w-full rounded-md border-gray-300 border p-2 focus:ring-2 focus:ring-berlin-blue outline-none bg-gray-50 focus:bg-white transition-colors"
                    value={formData.shape}
                    onChange={(e) =>
                      setFormData({ ...formData, shape: e.target.value })
                    }
                  >
                    <option value="">Select Shape...</option>
                    {SHAPES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gram Weight
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 border p-2 bg-gray-50 focus:bg-white transition-colors"
                    value={formData.weight}
                    onChange={(e) =>
                      setFormData({ ...formData, weight: e.target.value })
                    }
                    placeholder="e.g. 18g"
                  />
                </div>
              </div>
            </div>

            {/* 2. Volume & Dimensions Group */}
            <div className="pt-4 space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1">
                Volume & Dimensions
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Capacity Smart Input */}
                <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between">
                      <label className="block text-sm font-bold text-berlin-blue">
                        Capacity (Vol)
                      </label>
                      <select
                        className="text-[10px] bg-white text-blue-600 border border-blue-200 rounded px-2 py-0.5 outline-none cursor-pointer hover:border-blue-400 transition-colors"
                        onChange={(e) => {
                          if (!e.target.value) return;
                          const idx = parseInt(e.target.value);
                          const cap = COMMON_CAPACITIES[idx];
                          setFormData({
                            ...formData,
                            capacity: {
                              value: cap.value,
                              unit: cap.unit as any,
                            },
                          });
                        }}
                        defaultValue=""
                      >
                        <option value="">⚡️ Quick Fill...</option>
                        {COMMON_CAPACITIES.map((cap, idx) => (
                          <option key={idx} value={idx}>
                            {cap.label}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        step="0.01"
                        className="block w-full rounded-md border-gray-300 border p-2 focus:ring-2 focus:ring-berlin-blue outline-none"
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
                        placeholder="0.00"
                      />
                      <select
                        className="block w-20 rounded-md border-gray-300 border p-2 bg-gray-50 focus:bg-white"
                        value={formData.capacity?.unit}
                        onChange={(e) => handleUnitChange(e.target.value)}
                      >
                        <option value="oz">oz</option>
                        <option value="ml">ml</option>
                        <option value="gal">gal</option>
                        <option value="l">L</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Dimensions (H x D) */}
                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        step="0.01"
                        className="flex-1 block w-full rounded-l-md border-gray-300 border-y border-l p-2 focus:ring-2 focus:ring-berlin-blue outline-none min-w-0"
                        value={
                          (formData.dimensions?.height || "").split(" ")[0] ||
                          ""
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          const current = formData.dimensions?.height || " in";
                          const unit = current.split(" ")[1] || "in";
                          setFormData({
                            ...formData,
                            dimensions: {
                              ...formData.dimensions!,
                              height: val ? `${val} ${unit}` : "",
                            },
                          });
                        }}
                        placeholder="0.00"
                      />
                      <select
                        className="w-14 rounded-r-md border-gray-300 border p-2 bg-gray-50 text-xs focus:ring-2 focus:ring-berlin-blue outline-none border-l-0"
                        value={
                          (formData.dimensions?.height || "").split(" ")[1] ||
                          "in"
                        }
                        onChange={(e) => {
                          const unit = e.target.value;
                          const current = formData.dimensions?.height || " ";
                          const val = current.split(" ")[0] || "";
                          setFormData({
                            ...formData,
                            dimensions: {
                              ...formData.dimensions!,
                              height: `${val} ${unit}`,
                            },
                          });
                        }}
                      >
                        <option value="in">in</option>
                        <option value="mm">mm</option>
                        <option value="cm">cm</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Diameter
                    </label>
                    <div className="flex">
                      <input
                        type="number"
                        step="0.01"
                        className="flex-1 block w-full rounded-l-md border-gray-300 border-y border-l p-2 focus:ring-2 focus:ring-berlin-blue outline-none min-w-0"
                        value={
                          (formData.dimensions?.diameter || "").split(" ")[0] ||
                          ""
                        }
                        onChange={(e) => {
                          const val = e.target.value;
                          const current =
                            formData.dimensions?.diameter || " in";
                          const unit = current.split(" ")[1] || "in";
                          setFormData({
                            ...formData,
                            dimensions: {
                              ...formData.dimensions!,
                              diameter: val ? `${val} ${unit}` : "",
                            },
                          });
                        }}
                        placeholder="0.00"
                      />
                      <select
                        className="w-14 rounded-r-md border-gray-300 border p-2 bg-gray-50 text-xs focus:ring-2 focus:ring-berlin-blue outline-none border-l-0"
                        value={
                          (formData.dimensions?.diameter || "").split(" ")[1] ||
                          "in"
                        }
                        onChange={(e) => {
                          const unit = e.target.value;
                          const current = formData.dimensions?.diameter || " ";
                          const val = current.split(" ")[0] || "";
                          setFormData({
                            ...formData,
                            dimensions: {
                              ...formData.dimensions!,
                              diameter: `${val} ${unit}`,
                            },
                          });
                        }}
                      >
                        <option value="mm">mm</option>
                        <option value="in">in</option>
                        <option value="cm">cm</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Neck & Compatibility Group */}
            <div className="pt-4 space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1">
                Neck & Compatibility
              </h4>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Neck Finish
                  </label>
                  <select
                    className="block w-full rounded-md border-gray-300 border p-2 focus:ring-2 focus:ring-berlin-blue outline-none bg-gray-50 focus:bg-white transition-colors"
                    value={formData.neckFinish}
                    onChange={(e) =>
                      setFormData({ ...formData, neckFinish: e.target.value })
                    }
                  >
                    <option value="">Finish Type...</option>
                    {NECK_FINISH_TYPES.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Cap Size
                  </label>
                  <select
                    className="block w-full rounded-md border-gray-300 border p-2 focus:ring-2 focus:ring-berlin-blue outline-none bg-gray-50 focus:bg-white transition-colors"
                    value={formData.capSize}
                    onChange={(e) =>
                      setFormData({ ...formData, capSize: e.target.value })
                    }
                  >
                    <option value="">Size...</option>
                    {CAP_SIZES.map((cs) => (
                      <option key={cs} value={cs}>
                        {cs}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Closure Section (Restored) */}
            <div className="pt-6 border-t border-gray-100">
              <h4 className="font-bold text-sm text-slate-800 mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-berlin-blue" />
                Included Closure (Optional)
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Color
                  </label>
                  <select
                    className="block w-full rounded-md border-gray-300 border p-2 text-sm"
                    value={formData.closure?.color || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        closure: {
                          ...formData.closure!,
                          color: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="">Select Color...</option>
                    {COLORS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Style
                  </label>
                  <select
                    className="block w-full rounded-md border-gray-300 border p-2 text-sm"
                    value={formData.closure?.type || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        closure: {
                          ...formData.closure!,
                          type: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="">None / Capless</option>
                    <option value="Standard Cap">Standard Cap</option>
                    <option value="Screw Top Cap">Screw Top Cap</option>
                    <option value="Dispensing">Dispensing</option>
                    <option value="Lotion Pump">Lotion Pump</option>
                    <option value="Trigger Sprayer">Trigger Sprayer</option>
                    <option value="Fine Mist">Fine Mist Sprayer</option>
                    <option value="Disc Top">Disc Top</option>
                    <option value="Dropper">Dropper</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Liner
                  </label>
                  <select
                    className="block w-full rounded-md border-gray-300 border p-2 text-sm"
                    value={formData.closure?.liner || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        closure: {
                          ...formData.closure!,
                          liner: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="">Select Liner...</option>
                    {LINER_TYPES.map((l) => (
                      <option key={l} value={l}>
                        {l}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Label Panel Section (Restored) */}
            <div className="pt-6 border-t border-gray-100">
              <h4 className="font-bold text-sm text-slate-800 mb-4 flex items-center gap-2">
                <FileText className="w-4 h-4 text-berlin-blue" />
                Label Panel (Metadata)
              </h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Dimensions
                  </label>
                  <input
                    type="text"
                    className="block w-full rounded-md border-gray-300 border p-2 text-sm"
                    value={formData.labelPanel?.dimensions || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        labelPanel: {
                          ...formData.labelPanel!,
                          dimensions: e.target.value,
                        },
                      })
                    }
                    placeholder="e.g. 3.5in H x 8in W"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                    Shape
                  </label>
                  <select
                    className="block w-full rounded-md border-gray-300 border p-2 text-sm"
                    value={formData.labelPanel?.shape || ""}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        labelPanel: {
                          ...formData.labelPanel!,
                          shape: e.target.value,
                        },
                      })
                    }
                  >
                    <option value="">Select Shape...</option>
                    {LABEL_PANEL_SHAPES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Logistics Group (Restored/Wrapped) */}
            <div className="pt-4 space-y-4">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100 pb-1">
                Logistics
              </h4>
              <div className="grid grid-cols-2 gap-6">
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
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-gray-700">
                  Industries
                </label>
                <button
                  type="button"
                  onClick={autoTagIndustries}
                  className="text-[10px] font-bold uppercase tracking-wider bg-berlin-blue/10 text-berlin-blue px-2 py-1 rounded hover:bg-berlin-blue/20 flex items-center gap-1 transition-colors"
                  title="Auto-Detect Industries based on specs"
                >
                  <Sparkles className="w-3 h-3" />
                  Smart Tag
                </button>
              </div>
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
