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

const NEW_FOUNDATION_PRODUCTS = [
  {
    name: "2 oz Clear PET Plastic Oblong Bottles",
    sku: "299824",
    brand: "Berlin Cosmetics",
    categories: ["Foundation & Concealer Packaging"],
    industry: ["Cosmetics"],
    material: "PET",
    color: "Clear",
    shape: "Oblong",
    capacity: {
      value: 2,
      unit: "oz",
    },
    price: "$0.15 Each",
    description:
      "2 oz clear PET plastic oblong bottles ideal for liquid foundation.",
    imageUrl: "/images/foundation_clear_pet_oblong.png",
  },
  {
    name: "0.5 oz White Oversized Lip Balm Tube (White Press On Cap)",
    sku: "1122B03",
    brand: "Berlin Cosmetics",
    categories: ["Foundation & Concealer Packaging"],
    industry: ["Cosmetics"],
    material: "Plastic",
    color: "White",
    shape: "Cylinder",
    capacity: {
      value: 0.5,
      unit: "oz",
    },
    price: "$0.86 Each",
    description:
      "0.5 oz white oversized stick tube used for solid foundation or concealer. Completely opaque.",
    imageUrl: "/images/foundation_white_oversized_tube.png",
  },
  {
    name: "1 oz Clear Plastic Push-Up Solid Stick with Clear Screw Cap",
    sku: "1126001",
    brand: "Berlin Cosmetics",
    categories: ["Foundation & Concealer Packaging"],
    industry: ["Cosmetics"],
    material: "Plastic",
    color: "Clear",
    shape: "Cylinder",
    capacity: {
      value: 1,
      unit: "oz",
    },
    price: "$2.01 Each",
    description:
      "1 oz clear plastic push-up solid stick with transparent mechanism, used for solid concealer.",
    imageUrl: "/images/foundation_clear_push_up_stick.png",
  },
  {
    name: "20-400 Black PP Plastic Child-Resistant Capable Graduated Dropper Caps",
    sku: "v6775DBACCR",
    brand: "Berlin Cosmetics",
    categories: ["Foundation & Concealer Packaging"],
    industry: ["Cosmetics"],
    material: "PP/Glass",
    color: "Black",
    shape: "Round",
    price: "From $0.71 Each",
    description:
      "1 Dip Tube Length | 20-400 Black PP Plastic Child-Resistant Capable Graduated Dropper Caps.",
    imageUrl: "/images/foundation_black_graduated_dropper.png",
  },
  {
    name: "20-400 Metal Collar Curved Tip Dropper Caps",
    sku: "vX20-400",
    brand: "Berlin Cosmetics",
    categories: ["Foundation & Concealer Packaging"],
    industry: ["Cosmetics"],
    material: "Metal/Glass",
    color: "Silver",
    shape: "Round",
    price: "From $0.68 Each",
    description:
      "2 Colors | 2 Heights | 2 Quantity Sizes | 20-400 Metal Collar Curved Tip Dropper Caps.",
    imageUrl: "/images/foundation_metal_collar_dropper.png",
  },
  {
    name: "White Glass Boston Round Bottles",
    sku: "v4701B01-B",
    brand: "Berlin Cosmetics",
    categories: ["Foundation & Concealer Packaging"],
    industry: ["Cosmetics"],
    material: "Glass",
    color: "White",
    shape: "Boston Round",
    price: "From $211.20 Case",
    description:
      "2 Capacities | 5 Quantity Sizes | White Glass Boston Round Bottles.",
    imageUrl: "/images/foundation_white_glass_boston_round.png",
  },
  {
    name: "Treatment Pumps",
    sku: "vTRPBBLK",
    brand: "Berlin Cosmetics",
    categories: ["Foundation & Concealer Packaging"],
    industry: ["Cosmetics"],
    material: "Plastic",
    color: "Clear",
    shape: "Round",
    price: "From $0.67 Each",
    description:
      "2 Colors | 1 Cap Size | 1 Dip Tube Length | 1 Quantity Size | Treatment Pumps.",
    imageUrl: "/images/foundation_treatment_pump_clear_cap.png",
  },
  {
    name: "Frosted Glass Bottles with Treatment Pump",
    sku: "vA888B001",
    brand: "Berlin Cosmetics",
    categories: ["Foundation & Concealer Packaging"],
    industry: ["Cosmetics"],
    material: "Glass",
    color: "Frosted",
    shape: "Boston Round",
    price: "From $61.76 Case",
    description: "1 Capacity | Frosted Glass Bottles with Treatment Pump.",
    imageUrl: "/images/foundation_frosted_glass_treatment_pump.png",
  },
  {
    name: "Frosted Glass Bottles",
    sku: "v4888B001-B",
    brand: "Berlin Cosmetics",
    categories: ["Foundation & Concealer Packaging"],
    industry: ["Cosmetics"],
    material: "Glass",
    color: "Frosted",
    shape: "Boston Round",
    price: "From $25.50 Case",
    description: "4 Capacities | 6 Quantity Sizes | Frosted Glass Bottles.",
    imageUrl: "/images/foundation_frosted_glass_bottle.png",
  },
  {
    name: "Glass Boston Round Bottles with Treatment Pump",
    sku: "v1770B01",
    brand: "Berlin Cosmetics",
    categories: ["Foundation & Concealer Packaging"],
    industry: ["Cosmetics"],
    material: "Glass",
    color: "Amber",
    shape: "Boston Round",
    price: "From $18.53 Case",
    description:
      "2 Capacities | 3 Colors | 1 Cap Color | Glass Boston Round Bottles with Treatment Pump.",
    imageUrl: "/images/foundation_amber_glass_treatment_pump.png",
  },
  {
    name: "Frosted Glass Boston Round Bottles with Phenolic Cap",
    sku: "v1733B01",
    brand: "Berlin Cosmetics",
    categories: ["Foundation & Concealer Packaging"],
    industry: ["Cosmetics"],
    material: "Glass",
    color: "Amber Frosted",
    shape: "Boston Round",
    price: "From $15.50 Case",
    description:
      "1 Capacity | 1 Color | Frosted Glass Boston Round Bottles with Phenolic Cap.",
    imageUrl: "/images/foundation_frosted_amber_phenolic.png",
  },
  {
    name: "Glass Boston Round Bottles with Dropper Cap",
    sku: "v1699B01",
    brand: "Berlin Cosmetics",
    categories: ["Foundation & Concealer Packaging"],
    industry: ["Cosmetics"],
    material: "Glass",
    color: "Amber",
    shape: "Boston Round",
    price: "From $17.35 Case",
    description:
      "4 Capacities | 4 Colors | 2 Cap Colors | Glass Boston Round Bottles with Dropper Cap.",
    imageUrl: "/images/foundation_amber_glass_dropper.png",
  },
  {
    name: "Glass Boston Round Bottles with Pulp & Vinyl Lined Phenolic Cap",
    sku: "v4680B01",
    brand: "Berlin Cosmetics",
    categories: ["Foundation & Concealer Packaging"],
    industry: ["Cosmetics"],
    material: "Glass",
    color: "Amber",
    shape: "Boston Round",
    price: "From $8.07 Case",
    description:
      "7 Capacities | 4 Colors | 6 Cap Sizes | Glass Boston Round Bottles with Pulp & Vinyl Lined Phenolic Cap.",
    imageUrl: "/images/foundation_amber_glass_phenolic.png",
  },
  {
    name: "Frosted Glass Boston Round Bottles",
    sku: "v4700B01-B",
    brand: "Berlin Cosmetics",
    categories: ["Foundation & Concealer Packaging"],
    industry: ["Cosmetics"],
    material: "Glass",
    color: "Amber Frosted",
    shape: "Boston Round",
    price: "From $0.46 Case",
    description:
      "4 Capacities | 3 Colors | 6 Quantity Sizes | Frosted Glass Boston Round Bottles.",
    imageUrl: "/images/foundation_frosted_amber_bottle.png",
  },
  {
    name: "Glass Boston Round Bottles",
    sku: "v4605B01-B",
    brand: "Berlin Cosmetics",
    categories: ["Foundation & Concealer Packaging"],
    industry: ["Cosmetics"],
    material: "Glass",
    color: "Clear",
    shape: "Boston Round",
    price: "From $10.57 Pallet",
    description:
      "14 Capacities | 4 Colors | 6 Cap Sizes | 21 Quantity Sizes | Glass Boston Round Bottles.",
    imageUrl: "/images/foundation_clear_glass_boston_round.png",
  },
];

const seedFoundation = async () => {
  try {
    console.log("Starting Foundation & Concealer Seeding Script...");
    const productsRef = collection(db, "products");
    const newBatch = writeBatch(db);

    console.log(
      `Inserting ${NEW_FOUNDATION_PRODUCTS.length} new containers...`,
    );

    NEW_FOUNDATION_PRODUCTS.forEach((product) => {
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
    console.log(
      "✅ Successfully seeded 15 new Foundation & Concealer products.",
    );

    process.exit(0);
  } catch (error) {
    console.error("Error running script:", error);
    process.exit(1);
  }
};

seedFoundation();
