export type Industry =
  | "Automotive"
  | "Beverage"
  | "Food"
  | "Personal Health & Beauty"
  | "Pharma, Nutraceuticals & Healthcare"
  | "Home Care"
  | "Pet Care & Veterinary"
  | "Beer"
  | "Spirits"
  | "Industrial Chemical"
  | "Wine"
  | "Cosmetics"
  | "Cannabis & CBD";

export type Category =
  | "Bottles"
  | "Jars"
  | "Jugs"
  | "Vials"
  | "Tubes"
  | "Closures";

export type Material =
  | "Glass"
  | "Glass (Type III)"
  | "HDPE"
  | "PET"
  | "PP"
  | "LDPE"
  | "PVC"
  | "Aluminum"
  | "Tinplate"
  | "PCR PET"
  | "PCR HDPE"
  | "BPA-Free Plastic";

export type MaterialGroup = "Plastic" | "Glass" | "Metal" | "Other";

export interface Product {
  id: string;
  slug?: string;
  sku: string;
  name: string;
  brand: string;
  category: Category;
  industry: Industry[];
  material: string | Material;
  materialGroup?: MaterialGroup;
  shape?: string;
  color?: string;
  closure?: {
    type: string;
    color: string;
    material?: string;
    liner?: string;
  };
  labelPanel?: {
    dimensions: string;
    shape: string;
  };
  capacity?: {
    value: number;
    unit: "oz" | "ml" | "gal";
  };
  dimensions?: {
    height: string;
    diameter: string;
  };
  neckFinish?: string;
  weight?: string;
  caseQty?: number;
  imageUrl: string;
  images?: string[];
  description: string;
  recommendedClosureIds?: string[];
  isClosure?: boolean;
  features?: string[];
  palletQty?: number;
  capSize?: string;
  downloads?: { label: string; url: string }[];
  specifications?: Record<string, string>;
  createdAt?: string;
  updatedAt?: string;
}

export interface InquiryItem {
  product: Product;
  quantity: number; // e.g. number of pallets or cases
  notes?: string;
}

export interface Inquiry {
  id?: string;
  items: InquiryItem[];
  customer: {
    name: string;
    company: string;
    email: string;
    phone: string;
  };
  status?: "new" | "contacted" | "quoted" | "closed";
  submittedAt?: any;
}

export interface ContactMessage {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  submittedAt?: any; // Firestore serverTimestamp
}
