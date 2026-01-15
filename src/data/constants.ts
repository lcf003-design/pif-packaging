import { Category, Industry, Material } from "@/types";

export const CATEGORIES: Category[] = [
  "Bottles",
  "Jars",
  "Jugs",
  "Vials",
  "Tubes",
  "Closures",
];

export const INDUSTRIES: Industry[] = [
  "Automotive",
  "Beverage",
  "Food",
  "Personal Health & Beauty",
  "Pharma, Nutraceuticals & Healthcare",
  "Pet Care & Veterinary",
  "Beer",
  "Spirits",
  "Industrial Chemical",
  "Wine",
  "Cosmetics",
  "Cannabis & CBD",
];

export const MATERIAL_GROUPS: Record<string, string> = {
  HDPE: "Plastic",
  PET: "Plastic",
  PP: "Plastic",
  LDPE: "Plastic",
  PVC: "Plastic",
  "PCR PET": "Plastic",
  "PCR HDPE": "Plastic",
  "BPA-Free Plastic": "Plastic",
  Glass: "Glass",
  "Glass (Type III)": "Glass",
  Aluminum: "Metal",
  Tinplate: "Metal",
};

export const MATERIALS: Material[] = [
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

export const NECK_FINISH_TYPES = [
  "Continuous Thread",
  "Lug / Twist-Off",
  "Snap-On",
  "Child Resistant",
  "Tamper Evident",
  "Deep Skirt",
  "Buttress",
  "Pour-Out",
];

export const CAP_SIZES = [
  "18-400",
  "20-400",
  "20-410",
  "24-400",
  "24-410",
  "28-400",
  "28-410",
  "33-400",
  "38-400",
  "38-430",
  "45-400",
  "48-400",
  "53-400",
  "58-400",
  "63-400",
  "70-400",
  "89-400",
  "110-400",
  "DIN 18",
  "GL 18",
  "28mm PCO",
];

export const SHAPES = [
  "Boston Round",
  "Round",
  "Bullet",
  "Packer",
  "Straight Sided",
  "Square",
  "Oval",
  "Cylinder",
  "Woozy",
  "Flask",
  "Wide Mouth",
  "Narrow Mouth",
];

export const COLORS = [
  "Clear (Flint)",
  "Flint",
  "Amber",
  "Cobalt Blue",
  "Emerald Green",
  "White (Opaque)",
  "Black (Opaque)",
  "Natural (Translucent)",
  "Silver",
  "Gold",
  "Frosted",
];

export const LINER_TYPES = [
  "PE Liner",
  "PE Foam",
  "F217",
  "Pulp/Poly",
  "Heat Induction (HIS)",
  "Pressure Sensitive (PS)",
  "Plastisol",
  "Teflon",
  "Polycone",
  "Unlined",
];

export const LABEL_PANEL_SHAPES = [
  "Rectangular",
  "Round",
  "Oval",
  "Wrap-Around",
  "Die-Cut",
  "Irregular",
];

export const COMMON_CAPACITIES = [
  // Small / Vials
  { label: "5 ml (0.17 oz)", value: 5, unit: "ml" },
  { label: "10 ml (0.33 oz)", value: 10, unit: "ml" },
  { label: "15 ml (0.5 oz)", value: 15, unit: "ml" },
  { label: "1 oz / 30 ml", value: 1, unit: "oz" },
  { label: "2 oz / 60 ml", value: 2, unit: "oz" },
  { label: "3 oz / 90 ml", value: 3, unit: "oz" }, // User requested
  { label: "4 oz / 120 ml", value: 4, unit: "oz" },
  { label: "5 oz / 150 ml", value: 5, unit: "oz" },
  { label: "6 oz / 180 ml", value: 6, unit: "oz" },
  { label: "8 oz / 240 ml", value: 8, unit: "oz" },
  { label: "10 oz / 300 ml", value: 10, unit: "oz" },
  { label: "12 oz / 355 ml", value: 12, unit: "oz" },
  { label: "16 oz / 480 ml", value: 16, unit: "oz" },
  { label: "24 oz / 710 ml", value: 24, unit: "oz" },
  { label: "32 oz / 1 L", value: 32, unit: "oz" },
  { label: "64 oz / 2 L (Growler)", value: 64, unit: "oz" },
  { label: "1 Gallon / 128 oz", value: 128, unit: "oz" },
  { label: "2.5 Gallons", value: 2.5, unit: "gal" },
  { label: "5 Gallons (Pail)", value: 5, unit: "gal" },
];
