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
  writeBatch,
  type QueryDocumentSnapshot,
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
  idOrSlug: string,
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
  slug: string,
): Promise<PPEProduct | undefined> {
  try {
    const q = query(
      collection(db, COLLECTION_NAME),
      where("slug", "==", slug),
      limit(1),
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const products = snapshot.docs.map(
        (doc: QueryDocumentSnapshot) =>
          ({
            id: doc.id,
            ...doc.data(),
          }) as unknown as PPEProduct,
      );
      // Assuming the intent was to return the first product from the map if found
      return products[0];
    }
    return undefined;
  } catch (error) {
    console.error("Error fetching PPE product by slug:", error);
    return undefined;
  }
}

export async function addPPEProduct(
  product: Omit<PPEProduct, "id">,
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
  updates: Partial<PPEProduct>,
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

export const batchAddPPEProducts = async (
  products: Omit<PPEProduct, "id">[],
) => {
  try {
    const batch = writeBatch(db);
    let count = 0;

    for (const product of products) {
      const docRef = doc(collection(db, COLLECTION_NAME));
      batch.set(docRef, {
        ...product,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
      count++;
    }

    await batch.commit();
    console.log(`Successfully batch added ${count} products.`);
    return count;
  } catch (error) {
    console.error("Batch write failed", error);
    throw error;
  }
};
