import { Product } from "@/types";
import { MOCK_PRODUCTS } from "@/lib/mockData";
import { db } from "@/lib/firebase";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  query,
  where,
} from "firebase/firestore";

// Feature Flag: Set to false to attempt real Firestore connections
const USE_MOCK_DATA = false;

export async function fetchProducts(filters?: {
  category?: string;
  material?: string;
  industry?: string;
  search?: string;
}): Promise<Product[]> {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    // await new Promise(resolve => setTimeout(resolve, 500));

    let filtered = MOCK_PRODUCTS;
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }
    if (filters?.category)
      filtered = filtered.filter((p) => p.category === filters.category);
    if (filters?.material)
      filtered = filtered.filter((p) => p.material === filters.material);
    if (filters?.industry)
      filtered = filtered.filter((p) =>
        p.industry.includes(filters.industry as any)
      );
    return filtered;
  }

  // Real Firestore Implementation
  try {
    const productsRef = collection(db, "products");
    let q = query(productsRef);

    if (filters?.category)
      q = query(q, where("category", "==", filters.category));
    if (filters?.material)
      q = query(q, where("material", "==", filters.material));

    // Note: 'array-contains' is needed for industry
    if (filters?.industry)
      q = query(q, where("industry", "array-contains", filters.industry));

    const snapshot = await getDocs(q);
    let results = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Product)
    );

    // Client-side text filtering for MVP (Firestore doesn't support native fuzzy search)
    if (filters?.search) {
      const queryText = filters.search.toLowerCase();
      results = results.filter(
        (p) =>
          p.name.toLowerCase().includes(queryText) ||
          p.category.toLowerCase().includes(queryText)
      );
    }

    return results;
  } catch (error) {
    console.error("Error fetching products from Firestore:", error);
    return [];
  }
}

export async function fetchProductById(
  id: string
): Promise<Product | undefined> {
  if (USE_MOCK_DATA) {
    return MOCK_PRODUCTS.find((p) => p.id === id);
  }

  try {
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    return undefined;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return undefined;
  }
}

export async function fetchRecommendedClosures(
  product: Product
): Promise<Product[]> {
  if (
    !product.recommendedClosureIds ||
    product.recommendedClosureIds.length === 0
  )
    return [];

  if (USE_MOCK_DATA) {
    return MOCK_PRODUCTS.filter((p) =>
      product.recommendedClosureIds?.includes(p.id)
    );
  }

  try {
    // Firestore 'in' query supports up to 10 items
    const productsRef = collection(db, "products");
    const q = query(
      productsRef,
      where("__name__", "in", product.recommendedClosureIds)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Product)
    );
  } catch (error) {
    console.error("Error fetching closures:", error);
    return [];
  }
}
