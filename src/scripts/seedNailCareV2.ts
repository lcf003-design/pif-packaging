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

const generateRandomSKU = (prefix: string) =>
  `N${Math.floor(Math.random() * 10000)}` + prefix;

const newProducts = [
  // 1. 2.67 oz Natural PP Plastic Round Low Profile Jar with Natural Cap - MJJ
  {
    sku: "MJJ",
    name: "2.67 oz Natural PP Plastic Round Low Profile Jar with Natural Cap - MJJ",
    material: "PP Plastic",
    capacity: { value: "2.67", unit: " oz" },
    price: "$0.47 Each",
    imageUrl: "/images/nail_pp_ribbed_mj.png",
    inStock: true,
  },
  // 2. 20-400 Black PP Plastic Child-Resistant Capable Graduated Dropper Caps
  {
    sku: "vX775GRADCR",
    name: "20-400 Black PP Plastic Child-Resistant Capable Graduated Dropper Caps",
    material: "PP Plastic",
    capacity: { value: "1 Dip", unit: " Tube" },
    price: "From $0.71 Each",
    imageUrl: "/images/nail_cr_dropper_grad.png",
    inStock: true,
  },
  // 3. 13-415 Black PP Plastic Flat Nail Polish Cap and Brush Wand
  {
    sku: "v4100C06",
    name: "13-415 Black PP Plastic Flat Nail Polish Cap and Brush Wand",
    material: "PP Plastic",
    capacity: { value: "2 Dip", unit: " Tubes" },
    price: "From $0.11 Each",
    imageUrl: "/images/nail_flat_brush_wand.png",
    inStock: true,
  },
  // 4. 13-415 Black PP Plastic Domed Nail Polish Cap and Brush Wand
  {
    sku: "v4100C03",
    name: "13-415 Black PP Plastic Domed Nail Polish Cap and Brush Wand",
    material: "PP Plastic",
    capacity: { value: "2 Dip", unit: " Tubes" },
    price: "From $0.13 Each",
    imageUrl: "/images/nail_domed_brush_wand.png",
    inStock: true,
  },
  // 5. Glass Vials with Controlled Dropper Cap
  {
    sku: "v4445B04",
    name: "Glass Vials with Controlled Dropper Cap",
    material: "Glass",
    capacity: { value: "2", unit: " Colors" },
    price: "From $78.14 Pack",
    imageUrl: "/images/nail_amber_vial_dropper.png",
    inStock: true,
  },
  // 6. Natural PP Plastic Low Profile Jar with Natural Cap
  {
    sku: "v2818B01",
    name: "Natural PP Plastic Low Profile Jar with Natural Cap",
    material: "PP Plastic",
    capacity: { value: "Multiple", unit: "" },
    price: "From $0.42 Each",
    imageUrl: "/images/nail_pp_smooth_jar.png",
    inStock: true,
  },
  // 7. White PP-PS Plastic Double Wall Round Base Jars
  {
    sku: "v24001-B",
    name: "White PP-PS Plastic Double Wall Round Base Jars",
    material: "PP-PS Plastic",
    capacity: { value: "Multiple", unit: "" },
    price: "From $0.29 Each",
    imageUrl: "/images/nail_white_round_base_jar.png",
    inStock: true,
  },
  // 8. PP-PS Plastic Double Wall Straight Base Jars with Smooth Cap
  {
    sku: "vDW1",
    name: "PP-PS Plastic Double Wall Straight Base Jars with Smooth Cap",
    material: "PP-PS Plastic",
    capacity: { value: "Multiple", unit: "" },
    price: "From $0.19 Each",
    imageUrl: "/images/nail_white_straight_base_jar.png",
    inStock: true,
  },
];

const seedNailCareV2 = async () => {
  try {
    console.log("Starting Nail Care Seed V2 (First 8 items)...");
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
      `✅ successfully seeded ${newProducts.length} true items for Nail Care.`,
    );
    process.exit(0);
  } catch (error) {
    console.error("Error running seed script:", error);
    process.exit(1);
  }
};

seedNailCareV2();
