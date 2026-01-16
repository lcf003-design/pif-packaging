import { Product } from "./index";

export type PPECategory =
  | "Gloves"
  | "Masks & Respirators"
  | "Gowns & Apparel"
  | "Face Shields"
  | "Sanitization"
  | "Other";

export type Sterility = "Sterile" | "Non-Sterile";

export interface PPEProduct {
  id: string;
  slug?: string;
  sku: string;
  name: string;
  brand: string;
  category: PPECategory;
  description: string;
  upc?: string; // GTIN-12 / Universal Product Code
  mpn?: string; // Manufacturer Part Number

  // Specific PPE Attributes
  sterility: Sterility;
  certifications: string[]; // e.g. ["FDA 510(k)", "ASTM D6319", "NIOSH"]
  material?: string; // e.g. "Nitrile", "SMS", "Polycarbonate"
  thickness?: string; // e.g. "3.5mil"

  // Size Variations (Often critical for PPE)
  sizes?: string[]; // e.g. ["S", "M", "L", "XL"]

  // Packaging
  caseQty?: number;
  palletQty?: number;

  // Media
  imageUrl: string;
  images?: string[];

  // Metadata
  specifications?: Record<string, string>;
  features?: string[];
  downloads?: { label: string; url: string }[];

  // Inventory/Status
  stockStatus?: "In Stock" | "Low Stock" | "Made to Order";
}
