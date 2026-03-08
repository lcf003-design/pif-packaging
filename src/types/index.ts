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
    length?: string;
    width?: string;
    depth?: string;
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

export interface QuoteRequest {
  id?: string;
  type: string; // e.g., "wine-bulk"
  firstName: string;
  lastName: string;
  title: string;
  phone: string;
  email: string;
  company: string;
  website?: string;
  address: string;
  city: string;
  country: string;
  state: string;
  zipCode: string;
  submittedAt?: any;
  status?: "new" | "reviewed" | "quoted" | "closed";
}

export interface UniversalInquiry {
  id?: string;
  sourceType:
    | "general_contact"
    | "wine_quote"
    | "custom_closure"
    | "product_inquiry";
  status: "new" | "in_review" | "contacted" | "closed";
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    company?: string;
  };
  payload: any; // Dynamic payload retaining original form fields
  submittedAt?: any; // Firestore serverTimestamp
}
