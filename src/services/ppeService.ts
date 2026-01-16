import { PPEProduct } from "@/types/ppe";
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
  limit,
} from "firebase/firestore";

const COLLECTION_NAME = "ppe_products";
const USE_MOCK_DATA = false; // Toggle for dev

export async function fetchPPEProducts(filters?: {
  category?: string;
  sterility?: string;
  limit?: number;
}): Promise<PPEProduct[]> {
  try {
    const productsRef = collection(db, COLLECTION_NAME);
    let q = query(productsRef);

    if (filters?.category) {
      q = query(q, where("category", "==", filters.category));
    }
    if (filters?.sterility) {
      q = query(q, where("sterility", "==", filters.sterility));
    }

    // SAFETY LIMIT: Allow override for full catalog export, default to 100
    const queryLimit = filters?.limit || 100;
    q = query(q, limit(queryLimit));

    const snapshot = await getDocs(q);

    // Data Sanitizer: Convert Timestamps to strings
    return snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate?.().toISOString() || data.createdAt,
        updatedAt: data.updatedAt?.toDate?.().toISOString() || data.updatedAt,
      } as unknown as PPEProduct;
    });
  } catch (error) {
    console.error("Error fetching PPE products:", error);
    return [];
  }
}

export async function fetchPPEProductById(
  idOrSlug: string
): Promise<PPEProduct | undefined> {
  try {
    // 1. Try fetching by Document ID (efficient)
    const docRef = doc(db, COLLECTION_NAME, idOrSlug);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as PPEProduct;
    }

    // 2. Fallback: Try fetching by Slug (query)
    // This handles pretty URLs like /ppe/products/nitrile-gloves
    return await fetchPPEProductBySlug(idOrSlug);
  } catch (error) {
    console.error(`Error fetching PPE product (${idOrSlug}):`, error);
    return undefined;
  }
}

export async function fetchPPEProductBySlug(
  slug: string
): Promise<PPEProduct | undefined> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("slug", "==", slug),
      limit(1)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() } as PPEProduct;
    }
    return undefined;
  } catch (error) {
    console.error("Error fetching PPE product by slug:", error);
    return undefined;
  }
}

export async function addPPEProduct(
  product: Omit<PPEProduct, "id">
): Promise<string> {
  try {
    const docRef = await addDoc(collection(db, COLLECTION_NAME), product);
    return docRef.id;
  } catch (error) {
    console.error("Error adding PPE product:", error);
    throw error;
  }
}

export async function updatePPEProduct(
  id: string,
  updates: Partial<PPEProduct>
): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const { id: _, ...data } = updates as any;
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating PPE product:", error);
    throw error;
  }
}

export async function deletePPEProduct(id: string): Promise<void> {
  try {
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    console.error("Error deleting PPE product:", error);
    throw error;
  }
}

export async function batchAddPPEProducts(products: Omit<PPEProduct, "id">[]) {
  try {
    // batch limit is 500, we'll assume chunks < 500 for now or chunk it
    const { writeBatch } = await import("firebase/firestore");
    const batch = writeBatch(db);

    products.forEach((p) => {
      const docRef = doc(collection(db, COLLECTION_NAME));
      batch.set(docRef, p);
    });

    await batch.commit();
    return products.length;
  } catch (error) {
    console.error("Batch write failed", error);
    throw error;
  }
}
