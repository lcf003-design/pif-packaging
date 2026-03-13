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
    sku: "V4011B11",
    name: "0.25 oz White PP Plastic Straight Base Double Wall Jars with Cap - V4011B11",
    material: "PP-PP Plastic",
    capacity: { value: "0.25", unit: " oz" },
    price: "$210.36 Case",
    imageUrl: "/images/nail_white_pp_straight_base_jar.png",
    inStock: true,
  },
  {
    sku: "vVJ11B029",
    name: "PET Plastic Heavy Wall Straight Base Jars with Smooth Cap",
    material: "PET-PP Plastic",
    capacity: { value: "3 Capacities", unit: "" },
    price: "From $0.62 Each",
    imageUrl: "/images/nail_clear_pet_heavy_wall_jar.png",
    inStock: true,
  },
  {
    sku: "vVJ12B005",
    name: "PET-PET Plastic Low Profile Jars with Flat Cap",
    material: "PET-PP Plastic",
    capacity: { value: "2 Capacities", unit: "" },
    price: "From $0.57 Each",
    imageUrl: "/images/nail_clear_pet_low_profile_jar.png",
    inStock: true,
  },
  {
    sku: "M2045S",
    name: "18-400 Silver Aluminum Screw Top Caps with Foam Liner",
    material: "Aluminum",
    capacity: { value: "1 Cap Size", unit: "" },
    price: "$95.12 Case",
    imageUrl: "/images/nail_silver_aluminum_cap_liner.png",
    inStock: true,
  },
  {
    sku: "v6217T30",
    name: "2 oz Flush Seal Seamless Screw Top Tins",
    material: "Metal",
    capacity: { value: "2", unit: " oz" },
    price: "From $185.00 Case",
    imageUrl: "/images/nail_shallow_seamless_tin.png",
    inStock: true,
  },
  {
    sku: "v6219T31",
    name: "4 oz Deep Seamless Tins with Rolled Edge Slip Cover Lid",
    material: "Metal",
    capacity: { value: "4", unit: " oz" },
    price: "From $130.00 Case",
    imageUrl: "/images/nail_deep_seamless_tin.png",
    inStock: true,
  },
  {
    sku: "v60002A",
    name: "8 oz Deep Seamless Tins with Slip Cover Lid",
    material: "Metal",
    capacity: { value: "8", unit: " oz" },
    price: "From $110.00 Case",
    imageUrl: "/images/nail_medium_seamless_tin.png",
    inStock: true,
  },
  {
    sku: "v60012A",
    name: "White-Red PP Plastic Ribbed Cap With Yorker Spout",
    material: "PP Plastic",
    capacity: { value: "1 Cap Size", unit: "" },
    price: "$0.14 Each",
    imageUrl: "/images/nail_white_ribbed_yorker_cap.png",
    inStock: true,
  },
];

const seedNailCareBatch3 = async () => {
  try {
    console.log("Starting Nail Care Seed Batch 3 (Items 17-24)...");
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
      `✅ successfully seeded ${newProducts.length} items for Nail Care Batch 3.`,
    );
    process.exit(0);
  } catch (error) {
    console.error("Error running seed script:", error);
    process.exit(1);
  }
};

seedNailCareBatch3();
