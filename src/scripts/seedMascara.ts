import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  writeBatch,
  serverTimestamp,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "packaging-catalog-demo",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const NEW_MASCARA_PRODUCTS = [
  {
    name: "3.5 ml Clear PETG Plastic Mascara Tube with Brush & Wiper",
    sku: "1122B76",
    brand: "Berlin Cosmetics",
    categories: ["Mascara & Eyebrow Packaging"],
    industry: ["Cosmetics"],
    material: "PETG",
    color: "Clear",
    shape: "Cylinder",
    capacity: {
      value: 3.5,
      unit: "ml",
    },
    price: "From $1.63 Each",
    description:
      "Clear PETG plastic mascara tube demonstrating classic aesthetics and high clarity for bulk manufacturing.",
    imageUrl: "/images/mascara_clear_tube.png",
  },
  {
    name: "13 mm Gold Mascara Brush Cap with Wiper",
    sku: "DC-MASCARA-G",
    brand: "Berlin Cosmetics",
    categories: ["Mascara & Eyebrow Packaging"],
    industry: ["Cosmetics"],
    material: "Plastic/Metal",
    color: "Gold",
    shape: "Round",
    price: "From $0.21 Each",
    description:
      "Elegant 13mm metallic gold mascara brush cap offering a premium feel and precise application.",
    imageUrl: "/images/mascara_gold_cap.png",
  },
  {
    name: "13 mm Matte Silver Eyeliner Brush Cap with Wiper",
    sku: "318427",
    brand: "Berlin Cosmetics",
    categories: ["Mascara & Eyebrow Packaging"],
    industry: ["Cosmetics"],
    material: "Plastic/Metal",
    color: "Matte Silver",
    shape: "Round",
    price: "From $0.25 Each",
    description:
      "Matte silver eyeliner brush cap specifically designed with a fine-point applicator wiper.",
    imageUrl: "/images/eyeliner_matte_silver_cap.png",
  },
  {
    name: "13 mm Silver Eyeliner Brush Cap with Wiper",
    sku: "DC-EYELINER-S",
    brand: "Berlin Cosmetics",
    categories: ["Mascara & Eyebrow Packaging"],
    industry: ["Cosmetics"],
    material: "Plastic/Metal",
    color: "Shiny Silver",
    shape: "Round",
    price: "$0.52 Each",
    description:
      "High-shine silver eyeliner cap with fine-point brush and integrated friction wiper.",
    imageUrl: "/images/eyeliner_silver_cap.png",
  },
  {
    name: "Matte Black PETG Plastic Tube with Eyeliner Wand & Wiper",
    sku: "v1122B90EBT",
    brand: "Berlin Cosmetics",
    categories: ["Mascara & Eyebrow Packaging"],
    industry: ["Cosmetics"],
    material: "PETG",
    color: "Matte Black",
    shape: "Cylinder",
    capacity: {
      value: 1,
      unit: "Capacity",
    },
    price: "From $1.24 Each",
    description:
      "Sleek, velvety matte black PETG eyeliner tube providing exceptional light-blocking capability and high-end feel.",
    imageUrl: "/images/eyeliner_matte_black.png",
  },
];

const seedMascara = async () => {
  try {
    console.log("Starting Mascara & Eyebrow Seeding Script...");
    const productsRef = collection(db, "products");
    const newBatch = writeBatch(db);

    console.log(`Inserting ${NEW_MASCARA_PRODUCTS.length} new containers...`);

    NEW_MASCARA_PRODUCTS.forEach((product) => {
      const slug = product.sku.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const docRef = doc(productsRef); // Auto-ID
      newBatch.set(docRef, {
        ...product,
        id: docRef.id,
        slug,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });

    await newBatch.commit();
    console.log("✅ Successfully seeded 5 new Mascara & Eyebrow products.");

    process.exit(0);
  } catch (error) {
    console.error("Error running script:", error);
    process.exit(1);
  }
};

seedMascara();
