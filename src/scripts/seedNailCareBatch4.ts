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
    sku: "VVJ11B02X",
    name: "PET Plastic Straight Base Jars",
    material: "PET-PP Plastic",
    capacity: { value: "Multiple", unit: "" },
    price: "From $0.32 Each",
    imageUrl: "/images/nail_pet_straight_jar_black_cap.png",
    inStock: true,
  },
  {
    sku: "VVJ11B03X",
    name: "PET Plastic Thick Base Jars with Smooth Cap",
    material: "PET-PP Plastic",
    capacity: { value: "Multiple", unit: "" },
    price: "From $0.55 Each",
    imageUrl: "/images/nail_pet_thick_base_jar_black_cap.png",
    inStock: true,
  },
  {
    sku: "V4011B15",
    name: "1 oz Clear PET Plastic Straight Base Double Wall Jars with Smooth Cap",
    material: "PET-PP Plastic",
    capacity: { value: "1", unit: " oz" },
    price: "$341.28 Case",
    imageUrl: "/images/nail_pet_double_wall_1oz.png",
    inStock: true,
  },
  {
    sku: "V4011B17",
    name: "2 oz Clear PET Plastic Straight Base Double Wall Jars with Smooth Cap",
    material: "PET-PP Plastic",
    capacity: { value: "2", unit: " oz" },
    price: "$306.24 Case",
    imageUrl: "/images/nail_pet_double_wall_2oz.png",
    inStock: true,
  },
  {
    sku: "VSQGL1",
    name: "1 oz Square Glass Jars with Black Smooth Lid",
    material: "Glass",
    capacity: { value: "1", unit: " oz" },
    price: "$1.25 Each",
    imageUrl: "/images/nail_square_glass_jar.png",
    inStock: true,
  },
  {
    sku: "HDPECYLNAT1",
    name: "HDPE Plastic Cylinder Bottles with Natural Cap",
    material: "HDPE Plastic",
    capacity: { value: "Multiple", unit: "" },
    price: "From $0.24 Each",
    imageUrl: "/images/nail_hdpe_cylinder_tall.png",
    inStock: true,
  },
  {
    sku: "HDPECYLNAT2",
    name: "HDPE Plastic Cylinder Bottles with Smooth Cap",
    material: "HDPE Plastic",
    capacity: { value: "Multiple", unit: "" },
    price: "From $0.20 Each",
    imageUrl: "/images/nail_hdpe_cylinder_medium.png",
    inStock: true,
  },
  {
    sku: "HDPEBOSNAT1",
    name: "HDPE Plastic Boston Round Bottles with Cap",
    material: "HDPE Plastic",
    capacity: { value: "Multiple", unit: "" },
    price: "From $0.22 Each",
    imageUrl: "/images/nail_hdpe_boston_round.png",
    inStock: true,
  },
];

const seedNailCareBatch4 = async () => {
  try {
    console.log("Starting Nail Care Seed Batch 4 (Items 25-32)...");
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
      `✅ successfully seeded ${newProducts.length} items for Nail Care Batch 4.`,
    );
    process.exit(0);
  } catch (error) {
    console.error("Error running seed script:", error);
    process.exit(1);
  }
};

seedNailCareBatch4();
