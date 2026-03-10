import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  writeBatch,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "packaging-catalog",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const CATEGORY_NAME = "Nail Polish Bottles & Nail Care Product Packaging";

const newProducts = [
  {
    sku: "v5200B31 B",
    name: "Glass Thick Base Jars",
    material: "Glass",
    capacity: { value: "Multiple", unit: "" },
    price: "From $13.69 Case",
    imageUrl: "/images/nail_glass_thick_base_jar_no_cap.png",
    inStock: true,
  },
  {
    sku: "v5200B31",
    name: "Glass Thick Base Jars with Cap",
    material: "Glass",
    capacity: { value: "Multiple", unit: "" },
    price: "From $18.76 Case",
    imageUrl: "/images/nail_glass_thick_base_jar_with_cap.png",
    inStock: true,
  },
  {
    sku: "v5001B21",
    name: "Glass Straight Sided Jars with PP Cap",
    material: "Glass",
    capacity: { value: "Multiple", unit: "" },
    price: "From $7.51 Case",
    imageUrl: "/images/nail_batch5_placeholder_TODO.png",
    inStock: true,
  },
  {
    sku: "v4699B31",
    name: "Glass Boston Round Bottles with Dropper Cap",
    material: "Glass",
    capacity: { value: "Multiple", unit: "" },
    price: "From $17.35 Case",
    imageUrl: "/images/nail_batch5_placeholder_TODO.png",
    inStock: true,
  },
  {
    sku: "v3572B01",
    name: "HDPE Plastic Bullet Bottles with Cap",
    material: "HDPE Plastic",
    capacity: { value: "Multiple", unit: "" },
    price: "From $0.29 Each",
    imageUrl: "/images/nail_batch5_placeholder_TODO.png",
    inStock: true,
  },
  {
    sku: "v3301B04",
    name: "HDPE Plastic Wide Mouth Straight Sided Jars with Cap",
    material: "HDPE Plastic",
    capacity: { value: "Multiple", unit: "" },
    price: "From $0.79 Each",
    imageUrl: "/images/nail_batch5_placeholder_TODO.png",
    inStock: true,
  },
  {
    sku: "v2952B01",
    name: "PET Plastic Straight Sided Jars with Ribbed Cap",
    material: "PET Plastic",
    capacity: { value: "Multiple", unit: "" },
    price: "From $0.29 Each",
    imageUrl: "/images/nail_batch5_placeholder_TODO.png",
    inStock: true,
  },
  {
    sku: "v2830B01",
    name: "PS Plastic Jars with Lid",
    material: "PS Plastic",
    capacity: { value: "Multiple", unit: "" },
    price: "From $0.21 Each",
    imageUrl: "/images/nail_batch5_placeholder_TODO.png",
    inStock: true,
  },
];

const seedNailCareBatch5 = async () => {
  try {
    console.log("Starting Nail Care Seed Batch 5 (Items 33-40)...");
    const productsRef = collection(db, "products");
    const batch = writeBatch(db);

    for (const prod of newProducts) {
      const docRef = doc(productsRef);
      batch.set(docRef, {
        ...prod,
        categories: [CATEGORY_NAME],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    }

    await batch.commit();
    console.log(
      `✅ successfully seeded ${newProducts.length} items for Nail Care Batch 5.`,
    );
    process.exit(0);
  } catch (error) {
    console.error("Error running seed script:", error);
    process.exit(1);
  }
};

seedNailCareBatch5();
