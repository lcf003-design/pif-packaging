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
    sku: "v6002",
    name: "Natural-Red LDPE Plastic Yorker Spout Caps with Pre-Cut Orifice",
    material: "LDPE Plastic",
    capacity: { value: "2 Cap Sizes", unit: "" },
    price: "From $0.17 Each",
    imageUrl: "/images/nail_red_yorker_spout_cap.png",
    inStock: true,
  },
  {
    sku: "v1122B90EBT",
    name: "Matte Black PETG Plastic Tube with Eyeliner Wand & Wiper",
    material: "PETG Plastic",
    capacity: { value: "1 Capacity", unit: "" },
    price: "From $1.24 Each",
    imageUrl: "/images/nail_matte_black_eyeliner_tube.png",
    inStock: true,
  },
  {
    sku: "v4998B84BLK",
    name: "Glass Boston Round Bottles with Child-Resistant Capable Controlled Dropper Cap",
    material: "Glass",
    capacity: { value: "2 Capacities", unit: "" },
    price: "From $10.95 Case",
    imageUrl: "/images/nail_cobalt_blue_boston_dropper.png",
    inStock: true,
  },
  {
    sku: "6218T32",
    name: "8 oz Flush Seal Seamless Screw Top Tins - 6218T32",
    material: "Metal",
    capacity: { value: "8", unit: " oz" },
    price: "$114.11 Case",
    imageUrl: "/images/nail_8oz_flush_seal_tin.png",
    inStock: true,
  },
  {
    sku: "v6218T30",
    name: "Flush Seal Seamless Screw Top Tins",
    material: "Metal",
    capacity: { value: "2 Capacities", unit: "" },
    price: "From $69.83 Case",
    imageUrl: "/images/nail_flush_seal_tin.png",
    inStock: true,
  },
  {
    sku: "vTU1CAP",
    name: "PP Plastic Press On Caps for Lip Balm Tubes",
    material: "PP Plastic",
    capacity: { value: "2 Colors", unit: "" },
    price: "From $0.05 Each",
    imageUrl: "/images/nail_black_lip_balm_cap.png",
    inStock: true,
  },
  {
    sku: "vTU1-B",
    name: "0.15 oz PP Plastic Lip Balm Tubes",
    material: "PP Plastic",
    capacity: { value: "0.15", unit: " oz" },
    price: "From $0.21 Each",
    imageUrl: "/images/nail_white_lip_balm_tube.png",
    inStock: true,
  },
  {
    sku: "v2400B01",
    name: "PP-PP Plastic Double Wall Straight Base Jars with Cap",
    material: "PP-PP Plastic",
    capacity: { value: "2 Capacities", unit: "" },
    price: "From $0.49 Each",
    imageUrl: "/images/nail_black_double_wall_jar.png",
    inStock: true,
  },
];

const seedNailCareBatch2 = async () => {
  try {
    console.log("Starting Nail Care Seed Batch 2 (Items 9-16)...");
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
      `✅ successfully seeded ${newProducts.length} items for Nail Care Batch 2.`,
    );
    process.exit(0);
  } catch (error) {
    console.error("Error running seed script:", error);
    process.exit(1);
  }
};

seedNailCareBatch2();
