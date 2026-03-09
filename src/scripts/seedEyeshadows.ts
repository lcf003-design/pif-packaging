import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

// Barebones initialization for the seeding script to bypass the full client-side setup
const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ||
    "dummy-key-for-emulator-or-unauthed-writes",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ||
    "dummy-domain.firebaseapp.com",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "packaging-catalog-demo",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Required structure from src/types/index.ts
// We are injecting the EXACT 12 products seen in the reference screenshot for "Eyeshadow Containers"
const EYESHADOW_PRODUCTS = [
  {
    sku: "MJJ",
    name: "2.67 oz Natural PP Plastic Round Low Profile Jar with Natural Cap - MJJ",
    brand: "PIF Packaging",
    category: "Eyeshadow Containers",
    industry: ["Personal Health & Beauty"],
    material: "PP",
    shape: "Round",
    color: "Natural",
    neckFinish: "Low Profile",
    price: 0.47,
    caseQty: 1,
    imageUrl: "/images/catalog/eyeshadow_pp_low_profile_jar.png",
    description:
      "2 Capacities | 1 Quantity Size | 2 Cap Sizes | 2.67 oz Natural PP Plastic Round Low Profile Jar with Natural Cap - MJJ",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "v2016001",
    name: "Natural PP Plastic Low Profile Jar with Natural Cap",
    brand: "PIF Packaging",
    category: "Eyeshadow Containers",
    industry: ["Personal Health & Beauty"],
    material: "PP",
    shape: "Round",
    color: "Natural",
    price: 0.42,
    caseQty: 1,
    imageUrl: "/images/catalog/eyeshadow_pp_low_profile_jar_2.png",
    description:
      "2 Capacities | 1 Quantity Size | 2 Cap Sizes | Natural PP Plastic Low Profile Jar with Natural Cap",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "vDW1",
    name: "PP-PS Plastic Double Wall Straight Base Jars with Smooth Cap",
    brand: "PIF Packaging",
    category: "Eyeshadow Containers",
    industry: ["Personal Health & Beauty"],
    material: "PP/PS",
    shape: "Straight Base",
    color: "White",
    price: 0.19,
    caseQty: 1,
    imageUrl: "/images/catalog/eyeshadow_pp_double_wall_jar.png",
    description:
      "3 Capacities | PP-PS Plastic Double Wall Straight Base Jars with Smooth Cap",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "v1122D90C0T",
    name: "Matte Black PETG Plastic Tube with Eyeliner Wand & Wiper",
    brand: "PIF Packaging",
    category: "Eyeshadow Containers",
    industry: ["Personal Health & Beauty"],
    material: "PETG",
    shape: "Tube",
    color: "Matte Black",
    price: 1.24,
    caseQty: 1,
    imageUrl: "/images/catalog/eyeshadow_petg_tube_black.png",
    description:
      "1 Capacity | Matte Black PETG Plastic Tube with Eyeliner Wand & Wiper",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "v6218T30",
    name: "Flush Seal Seamless Screw Top Tins",
    brand: "PIF Packaging",
    category: "Eyeshadow Containers",
    industry: ["Personal Health & Beauty"],
    material: "Tinplate",
    shape: "Round",
    color: "Silver",
    price: 69.83,
    caseQty: 100, // Assuming case pricing
    imageUrl: "/images/catalog/eyeshadow_flush_seal_tin.png",
    description:
      "2 Capacities | 3 Quantity Sizes | Flush Seal Seamless Screw Top Tins",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "6218T32",
    name: "8 oz Flush Seal Seamless Screw Top Tins - 6218T32",
    brand: "PIF Packaging",
    category: "Eyeshadow Containers",
    industry: ["Personal Health & Beauty"],
    material: "Tinplate",
    shape: "Round",
    color: "Silver",
    capacity: { value: 8, unit: "oz" },
    price: 114.11,
    caseQty: 100, // Assuming Case pricing
    imageUrl: "/images/catalog/eyeshadow_flush_seal_tin_2.png",
    description: "8 oz Flush Seal Seamless Screw Top Tins - 6218T32",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "v240DB01",
    name: "PP-PP Plastic Double Wall Straight Base Jars with Cap",
    brand: "PIF Packaging",
    category: "Eyeshadow Containers",
    industry: ["Personal Health & Beauty"],
    material: "PP",
    shape: "Straight Base",
    color: "Black",
    price: 0.49,
    caseQty: 1,
    imageUrl: "/images/catalog/eyeshadow_pp_black_jar.png",
    description:
      "2 Capacities | 2 Colors | PP-PP Plastic Double Wall Straight Base Jars with Cap",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "v6623T01",
    name: "Seamless Short Tins",
    brand: "PIF Packaging",
    category: "Eyeshadow Containers",
    industry: ["Personal Health & Beauty"],
    material: "Tinplate",
    shape: "Round",
    color: "Silver",
    price: 17.95,
    caseQty: 100, // Assuming Case
    imageUrl: "/images/catalog/eyeshadow_seamless_short_tin.png",
    description: "3 Capacities | 2 Quantity Sizes | Seamless Short Tins",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "vL9TSL",
    name: "Slide Top Tins",
    brand: "PIF Packaging",
    category: "Eyeshadow Containers",
    industry: ["Personal Health & Beauty"],
    material: "Tinplate",
    shape: "Rectangular",
    color: "Silver",
    price: 0.8,
    caseQty: 1,
    imageUrl: "/images/catalog/eyeshadow_slide_top_tin.png",
    description: "2 Capacities | Slide Top Tins",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "v6774112",
    name: "Seamless Tall Tins",
    brand: "PIF Packaging",
    category: "Eyeshadow Containers",
    industry: ["Personal Health & Beauty"],
    material: "Tinplate",
    shape: "Round",
    color: "Silver",
    price: 68.73,
    caseQty: 100, // Assuming Case
    imageUrl: "/images/catalog/eyeshadow_seamless_tall_tin.png",
    description: "1 Capacity | 2 Quantity Sizes | Seamless Tall Tins",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "v6222140",
    name: "Square Seamless Window Tins",
    brand: "PIF Packaging",
    category: "Eyeshadow Containers",
    industry: ["Personal Health & Beauty"],
    material: "Tinplate",
    shape: "Square",
    color: "Silver",
    price: 64.53,
    caseQty: 100, // Assuming Case
    imageUrl: "/images/catalog/eyeshadow_square_seamless_window_tin.png",
    description:
      "2 Capacities | 2 Quantity Sizes | Square Seamless Window Tins",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "v6222121",
    name: "Seamless Window Tins",
    brand: "PIF Packaging",
    category: "Eyeshadow Containers",
    industry: ["Personal Health & Beauty"],
    material: "Tinplate",
    shape: "Round",
    color: "Silver",
    price: 79.11,
    caseQty: 100, // Assuming Case
    imageUrl: "/images/catalog/eyeshadow_round_seamless_window_tin.png",
    description: "2 Capacities | 3 Quantity Sizes | Seamless Window Tins",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

async function seedEyeshadowContainers() {
  try {
    const productsRef = collection(db, "products");

    console.log(`Checking for existing Eyeshadow Container products...`);
    const q = query(
      productsRef,
      where("category", "==", "Eyeshadow Containers"),
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      console.log(
        `Found ${snapshot.docs.length} existing eyeshadow products. Skipping seed to prevent duplicates.`,
      );
      return;
    }

    console.log(`Injecting exactly 12 Eyeshadow Container products...`);

    for (const product of EYESHADOW_PRODUCTS) {
      const { id } = await addDoc(productsRef, product);
      console.log(`✅ Seeded: ${product.sku} (${id})`);
    }

    console.log(`\n🎉 Successfully seeded all 12 Eyeshadow Containers!`);
  } catch (error) {
    console.error("Error seeding eyeshadow containers:", error);
  }
}

// Execute the function
seedEyeshadowContainers().then(() => {
  console.log(
    "Seeding script complete. Ensure the images are moved to the public/images/catalog/ folder.",
  );
  process.exit(0);
});
