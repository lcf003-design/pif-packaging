import { Product } from "@/types";

export const MOCK_PRODUCTS: Product[] = [
  // Bottles
  {
    id: "b1",
    sku: "GLS-001",
    name: "12 oz Flint Glass Woozy Bottle",
    brand: "Berlin Standard",
    category: "Bottles",
    industry: ["Food", "Beverage"],
    material: "Glass",
    shape: "Round",
    color: "Clear",
    capacity: { value: 12, unit: "oz" },
    dimensions: { height: '8.5"', diameter: '2.25"' },
    neckFinish: "24-414",
    weight: "250g",
    caseQty: 12,
    imageUrl: "https://placehold.co/400x600/e2e8f0/1e293b?text=Woozy+Bottle",
    description:
      "Classic sauce bottle style, perfect for hot sauces, marinades, and dressings. Flint glass offers maximum product visibility.",
    recommendedClosureIds: ["c1", "c2"],
    isClosure: false,
  },
  {
    id: "b2",
    sku: "PET-002",
    name: "16 oz Clear PET Boston Round",
    brand: "Berlin Standard",
    category: "Bottles",
    industry: ["Personal Care", "Home Care"],
    material: "PET",
    shape: "Boston Round",
    color: "Clear",
    capacity: { value: 16, unit: "oz" },
    dimensions: { height: '6.7"', diameter: '2.8"' },
    neckFinish: "24-410",
    weight: "35g",
    caseQty: 24,
    imageUrl: "https://placehold.co/400x600/e2e8f0/1e293b?text=Boston+Round",
    description:
      "Versatile PET bottle with high clarity and impact resistance. Ideal for lotions, soaps, and sanitizers.",
    recommendedClosureIds: ["c1"],
    isClosure: false,
  },
  {
    id: "j1",
    sku: "GLS-003",
    name: "9 oz Straight Sided Glass Jar",
    brand: "Berlin Standard",
    category: "Jars",
    industry: ["Food", "Personal Care"],
    material: "Glass",
    shape: "Round",
    color: "Clear",
    capacity: { value: 9, unit: "oz" },
    dimensions: { height: '3.5"', diameter: '2.8"' },
    neckFinish: "70-400",
    weight: "210g",
    caseQty: 12,
    imageUrl: "https://placehold.co/400x400/e2e8f0/1e293b?text=Glass+Jar",
    description:
      "Premium heavy-base glass jar. Excellent for jams, candles, or creams.",
    recommendedClosureIds: ["c3"],
    isClosure: false,
  },
  // Closures
  {
    id: "c1",
    sku: "CAP-001",
    name: "24-410 Black Disc Top Cap",
    brand: "Berlin Standard",
    category: "Closures",
    industry: ["Personal Care"],
    material: "PP",
    color: "Black",
    neckFinish: "24-410",
    imageUrl: "https://placehold.co/200x200/334155/ffffff?text=Disc+Top",
    description: "Press-top dispensing closure.",
    isClosure: true,
  },
  {
    id: "c2",
    sku: "CAP-002",
    name: "24-414 Black Ribbed Screw Cap",
    brand: "Berlin Standard",
    category: "Closures",
    industry: ["Food"],
    material: "PP",
    color: "Black",
    neckFinish: "24-414",
    imageUrl: "https://placehold.co/200x200/334155/ffffff?text=Screw+Cap",
    description: "Standard continuous thread closure with liner.",
    isClosure: true,
  },
  {
    id: "c3",
    sku: "CAP-003",
    name: "70-400 Silver Metal Lug Cap",
    brand: "Berlin Standard",
    category: "Closures",
    industry: ["Food"],
    material: "Tinplate",
    color: "Silver",
    neckFinish: "70-400",
    imageUrl: "https://placehold.co/200x200/94a3b8/000000?text=Metal+Cap",
    description: "Plastisol lined lug cap for vacuum sealing.",
    isClosure: true,
  },
];

export function getProducts() {
  return MOCK_PRODUCTS;
}

export function getProductById(id: string) {
  return MOCK_PRODUCTS.find((p) => p.id === id);
}

export function getRecommendedClosures(product: Product) {
  if (!product.recommendedClosureIds) return [];
  return MOCK_PRODUCTS.filter((p) =>
    product.recommendedClosureIds?.includes(p.id)
  );
}
