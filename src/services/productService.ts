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
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

// Feature Flag: Set to false to attempt real Firestore connections
const USE_MOCK_DATA = false;

export async function fetchProducts(filters?: {
  category?: string;
  material?: string;
  industry?: string;
  search?: string;
  color?: string;
  shape?: string;
  capacity?: string;
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
    if (filters?.color)
      filtered = filtered.filter((p) => p.color === filters.color);
    if (filters?.shape)
      filtered = filtered.filter((p) => p.shape === filters.shape);
    if (filters?.industry)
      filtered = filtered.filter((p) =>
        p.industry.includes(filters.industry as any)
      );
    if (filters?.capacity) {
      const val = parseFloat(filters.capacity);
      if (!isNaN(val)) {
        // Val is assumed to be in OZ (from COMMON_CAPACITIES)
        const targetOz = val;
        const targetMl = val * 29.5735;

        // Allow small tolerance (e.g. 10%) or match nominal values
        filtered = filtered.filter((p) => {
          if (!p.capacity) return false;

          if (p.capacity.unit === "oz") {
            return Math.abs(p.capacity.value - targetOz) < 0.1;
          }
          if (p.capacity.unit === "ml") {
            // Check if it matches the ML equivalent
            return Math.abs(p.capacity.value - targetMl) < 5; // +/- 5ml tolerance
          }
          return false;
        });
      }
    }
    return filtered;
  }

  // Real Firestore Implementation
  try {
    const productsRef = collection(db, "products");

    // Firestore QueryBuilder
    // Note: Complex OR logic (oz OR ml) is hard in a single Firestore query without 'OR' operators (available in newer SDKs but complex with other filters).
    // Strategy: Fetch slightly broader set if possible, or use client-side refinement for Capacity.

    // We will apply all filters EXCEPT capacity first, then filter capacity in memory (Client-Side Refinement).
    // This is safer for "Smart" conversions.

    let q = query(productsRef);

    if (filters?.category)
      q = query(q, where("category", "==", filters.category));
    if (filters?.material) {
      if (filters.material === "Glass") {
        q = query(q, where("material", "in", ["Glass", "Type III Glass"]));
      } else {
        q = query(q, where("material", "==", filters.material));
      }
    }
    if (filters?.color) q = query(q, where("color", "==", filters.color));
    if (filters?.shape) q = query(q, where("shape", "==", filters.shape));

    if (filters?.industry)
      q = query(q, where("industry", "array-contains", filters.industry));

    const snapshot = await getDocs(q);
    let results = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Product)
    );

    // Smart Capacity Filter (Client Side Memory)
    if (filters?.capacity) {
      console.log("[Debug] Filtering by capacity:", filters.capacity);
      const val = parseFloat(filters.capacity);
      if (!isNaN(val)) {
        const targetOz = val;
        const targetMl = val * 29.5735;
        console.log(`[Debug] Target: ${targetOz} oz / ${targetMl} ml`);

        results = results.filter((p) => {
          if (!p.capacity) {
            console.log(`[Debug] Product ${p.sku} has no capacity`);
            return false;
          }
          console.log(`[Debug] Checking ${p.sku}:`, p.capacity);

          if (p.capacity.unit === "oz") {
            return Math.abs(p.capacity.value - targetOz) < 0.1;
          }
          if (p.capacity.unit === "ml") {
            return Math.abs(p.capacity.value - targetMl) < 10; // +/- 10ml
          }
          return false;
        });
        console.log("[Debug] Results after capacity filter:", results.length);
      }
    }

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
    console.log(`[Service] Fetching product with ID: "${id}"`);
    const docRef = doc(db, "products", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log(`[Service] Found product: ${docSnap.id}`);
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }
    console.log(`[Service] Product ${id} does not exist in Firestore.`);
    return undefined;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    return undefined;
  }
}

export async function fetchProductBySlug(
  slug: string
): Promise<Product | undefined> {
  if (USE_MOCK_DATA) {
    return MOCK_PRODUCTS.find((p) => p.slug === slug);
  }

  try {
    console.log(`[Service] Fetching product with Slug: "${slug}"`);
    const productsRef = collection(db, "products");
    const q = query(productsRef, where("slug", "==", slug));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const docSnap = querySnapshot.docs[0];
      return { id: docSnap.id, ...docSnap.data() } as Product;
    }

    console.log(`[Service] Slug ${slug} not found.`);
    return undefined;
  } catch (error) {
    console.error(`Error fetching product by slug ${slug}:`, error);
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

export async function addProduct(
  product: Omit<Product, "id">
): Promise<string> {
  // If mock mode, just return a fake ID (or handle differently)
  if (USE_MOCK_DATA) {
    console.warn("Adding product in MOCK MODE - not persisting.");
    return "mock-id-" + Date.now();
  }

  try {
    // Unique Slug Logic
    let uniqueSlug = product.slug;
    if (uniqueSlug) {
      let counter = 0;
      let exists = true;
      while (exists) {
        const candidate: string =
          counter === 0 ? uniqueSlug : `${uniqueSlug}-${counter}`;
        const q = query(
          collection(db, "products"),
          where("slug", "==", candidate)
        );
        const snap = await getDocs(q);
        if (snap.empty) {
          uniqueSlug = candidate;
          exists = false;
        } else {
          counter++;
        }
      }
      product.slug = uniqueSlug;
    }

    const docRef = await addDoc(collection(db, "products"), product);
    return docRef.id;
  } catch (error) {
    console.error("Error adding product:", error);
    throw error;
  }
}

export async function updateProduct(
  id: string,
  updates: Partial<Product>
): Promise<void> {
  if (USE_MOCK_DATA) {
    console.warn("Updating product in MOCK MODE - not persisting.");
    return;
  }

  try {
    const docRef = doc(db, "products", id);
    const { id: _, ...data } = updates as any; // Ensure ID is not in the data
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
}

export async function deleteProduct(id: string): Promise<void> {
  if (USE_MOCK_DATA) {
    console.warn("Deleting product in MOCK MODE - not persisting.");
    return;
  }

  try {
    await deleteDoc(doc(db, "products", id));
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
}

export async function fetchProductVariants(
  product: Product
): Promise<Product[]> {
  if (USE_MOCK_DATA) {
    // Mock logic: simply find products with same Material + Shape logic
    return MOCK_PRODUCTS.filter(
      (p) =>
        p.id !== product.id &&
        p.material === product.material &&
        p.shape === product.shape &&
        p.color === product.color
    );
  }

  try {
    const productsRef = collection(db, "products");

    // NEW LOGIC: Match based on Physical Attributes (Fingerprint), NOT Name.
    // Why? Because names often contain the size (e.g. "80ml Bottle" vs "250ml Bottle"),
    // so checking name equality fails to group them.

    // Core attributes that define a "Product Line":
    // 1. Category (e.g. Bottles)
    // 2. Material (e.g. Aluminum)
    // 3. Shape (e.g. Round)
    // 4. Color (e.g. Silver)

    // Note: Firestore requires an index for every combination of 'where' clauses.
    // To safe-guard against missing indexes, we will query strictly on the most stable attributes
    // and filter the rest in memory (client-side).

    // Strategy: Query by Category + Material + Shape
    let q = query(
      productsRef,
      where("category", "==", product.category || "Bottles"),
      where("material", "==", product.material || "Plastic"),
      where("shape", "==", product.shape || "Round")
    );

    const snapshot = await getDocs(q);
    const candidates = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Product)
    );

    // Client-side Refinement:
    // 1. Exclude self.
    // 2. Match Color (if applicable).
    // 3. Match Closure (if applicable) -> Crucial for "Pump" vs "Cap" variants.
    const strictVariants = candidates.filter((p) => {
      if (p.id === product.id) return false;

      const isColorMatch = (p.color || "N/A") === (product.color || "N/A");

      // Strict Closure Match: If current product has a closure, variant must have SAME closure type & color
      const pClosure = product.closure?.type
        ? `${product.closure.type}-${product.closure.color}`
        : "NONE";
      const vClosure = p.closure?.type
        ? `${p.closure.type}-${p.closure.color}`
        : "NONE";
      const isClosureMatch = pClosure === vClosure;

      return isColorMatch && isClosureMatch;
    });

    return strictVariants;
  } catch (error) {
    console.error("Error fetching product variants:", error);
    return [];
  }
}
