export type Industry =
  | "Automotive"
  | "Beverage"
  | "Food"
  | "Personal Care"
  | "Pharmaceutical"
  | "Home Care"
  | "Industrial";

export type Category =
  | "Bottles"
  | "Jars"
  | "Jugs"
  | "Vials"
  | "Tubes"
  | "Closures";

export type Material =
  | "Glass"
  | "HDPE"
  | "PET"
  | "PP"
  | "Aluminum"
  | "Tinplate";

export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  category: Category;
  industry: Industry[];
  material: Material;
  shape?: string;
  color?: string;
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
  description: string;
  recommendedClosureIds?: string[];
  isClosure?: boolean;
}

export interface InquiryItem {
  product: Product;
  quantity: number; // e.g. number of pallets or cases
  notes?: string;
}

export interface Inquiry {
  items: InquiryItem[];
  customer: {
    name: string;
    company: string;
    email: string;
    phone: string;
  };
  submittedAt?: Date;
}
