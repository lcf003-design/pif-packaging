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
} from "firebase/firestore";

const COLLECTION_NAME = "ppe_products";
const USE_MOCK_DATA = false; // Toggle for dev

export async function fetchPPEProducts(filters?: {
  category?: string;
  sterility?: string;
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

    const snapshot = await getDocs(q);

    // Sort logic can happen here if needed
    return snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as PPEProduct)
    );
  } catch (error) {
    console.error("Error fetching PPE products:", error);
    return [];
  }
}

export async function fetchPPEProductById(
  id: string
): Promise<PPEProduct | undefined> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() } as PPEProduct;
    }
    return undefined;
  } catch (error) {
    console.error("Error fetching PPE product:", error);
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
