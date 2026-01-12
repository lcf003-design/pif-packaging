import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  query,
  orderBy,
  limit,
  serverTimestamp,
  Timestamp,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "@/lib/firebase";

// --- Types ---

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  company?: string;
  phoneNumber?: string;
  role?: string;
  createdAt?: any;
}

export interface ProjectItem {
  id: string; // SKU or unique ID
  name: string;
  sku: string;
  detail?: string;
  addedAt: number;
}

export interface Project {
  id: string;
  name: string;
  items: ProjectItem[];
  createdAt: any;
  updatedAt: any;
  userId: string;
}

export interface RecentlyViewedItem {
  sku: string;
  name: string;
  imageColor?: string; // Storing UI reference for now
  viewedAt: any;
}

export interface OrderItem {
  sku: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  date: string; // ISO date string or formatted
  status: "Processing" | "Shipped" | "Delivered";
  total: number;
  items: OrderItem[];
}

// --- User Profile ---

export const createUserProfile = async (
  uid: string,
  data: Partial<UserProfile>
) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      uid,
      createdAt: serverTimestamp(),
      ...data,
    });
  }
};

export const getUserProfile = async (uid: string) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? (snap.data() as UserProfile) : null;
};

export const setUserRole = async (uid: string, role: string) => {
  const ref = doc(db, "users", uid);
  await updateDoc(ref, { role });
};

// --- Projects (Wishlists) ---

export const getProjects = async (uid: string): Promise<Project[]> => {
  const ref = collection(db, "users", uid, "projects");
  const q = query(ref, orderBy("updatedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Project));
};

export const createProject = async (uid: string, name: string) => {
  const ref = collection(db, "users", uid, "projects");
  await addDoc(ref, {
    name,
    items: [],
    userId: uid,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

export const deleteProject = async (uid: string, projectId: string) => {
  const ref = doc(db, "users", uid, "projects", projectId);
  await deleteDoc(ref);
};

export const addItemToProject = async (
  uid: string,
  projectId: string,
  item: Omit<ProjectItem, "addedAt">
) => {
  const ref = doc(db, "users", uid, "projects", projectId);
  await updateDoc(ref, {
    items: arrayUnion({ ...item, addedAt: Date.now() }),
    updatedAt: serverTimestamp(),
  });
};

export const removeItemFromProject = async (
  uid: string,
  projectId: string,
  item: ProjectItem
) => {
  const ref = doc(db, "users", uid, "projects", projectId);
  await updateDoc(ref, {
    items: arrayRemove(item),
    updatedAt: serverTimestamp(),
  });
};

// --- Recently Viewed ---

export const getRecentlyViewed = async (
  uid: string
): Promise<RecentlyViewedItem[]> => {
  const ref = collection(db, "users", uid, "recentlyViewed");
  const q = query(ref, orderBy("viewedAt", "desc"), limit(4));
  const snap = await getDocs(q);
  return snap.docs.map((d) => d.data() as RecentlyViewedItem);
};

export const addToRecentlyViewed = async (
  uid: string,
  item: Omit<RecentlyViewedItem, "viewedAt">
) => {
  // We use the SKU as the document ID to prevent duplicates and just update the timestamp
  const ref = doc(db, "users", uid, "recentlyViewed", item.sku);
  await setDoc(ref, {
    ...item,
    viewedAt: serverTimestamp(),
  });
};

// --- Past Orders (Mock/Seed) ---

export const getPastOrders = async (uid: string): Promise<Order[]> => {
  const ref = collection(db, "users", uid, "orders");
  const q = query(ref, orderBy("date", "desc"));
  const snap = await getDocs(q);

  if (snap.empty) {
    // Seed some data for demo purposes if empty
    const mockOrders = [
      {
        date: "2026-10-12",
        status: "Delivered",
        total: 1250.0,
        items: [
          {
            sku: "PET-100-SPR",
            name: "100ml PET Spray Bottle",
            quantity: 5000,
            price: 0.25,
          },
        ],
      },
      {
        date: "2026-09-28",
        status: "Delivered",
        total: 450.0,
        items: [
          {
            sku: "TRIG-28410-WHT",
            name: "28-410 Trigger Sprayer",
            quantity: 3000,
            price: 0.15,
          },
        ],
      },
    ];

    for (const order of mockOrders) {
      await addDoc(ref, order);
    }
    // Return the seeded data (mapped with IDs)
    // For simplicity in this demo, we'll just fetch again or return the mocks
    const newSnap = await getDocs(q);
    return newSnap.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
  }

  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Order));
};
