import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

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

const MISSING_PRODUCTS = [
  {
    sku: "v6218T02",
    name: "Seamless Screw Top Tins",
    brand: "PIF Packaging",
    category: "Eyeshadow Containers",
    industry: ["Personal Health & Beauty"],
    material: "Tinplate",
    shape: "Round",
    color: "Silver",
    price: 50.57,
    caseQty: 100, // Assuming case pricing
    imageUrl: "/images/catalog/eyeshadow_seamless_screw_top_tin.png",
    description: "3 Capacities | 2 Quantity Sizes | Seamless Screw Top Tins",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "v264RRO1FRST",
    name: "Frosted PET Plastic Thick Wall Jars",
    brand: "PIF Packaging",
    category: "Eyeshadow Containers",
    industry: ["Personal Health & Beauty"],
    material: "PET",
    shape: "Round",
    color: "Frosted",
    price: 2.9,
    caseQty: 1,
    imageUrl: "/images/catalog/eyeshadow_frosted_pet_jar.png",
    description: "1 Capacity | Frosted PET Plastic Thick Wall Jars",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "v2830R01",
    name: "PS Plastic Jars with Lid",
    brand: "PIF Packaging",
    category: "Eyeshadow Containers",
    industry: ["Personal Health & Beauty"],
    material: "PS",
    shape: "Round",
    color: "Clear",
    price: 0.21,
    caseQty: 1,
    imageUrl: "/images/catalog/eyeshadow_ps_plastic_jar.png",
    description: "2 Capacities | PS Plastic Jars with Lid",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "v241D0",
    name: "PP-PS Plastic Double Wall Straight Base Jars with Cap",
    brand: "PIF Packaging",
    category: "Eyeshadow Containers",
    industry: ["Personal Health & Beauty"],
    material: "PP/PS",
    shape: "Straight Base",
    color: "White",
    price: 0.34,
    caseQty: 1,
    imageUrl: "/images/catalog/eyeshadow_pp_ps_straight_base_jar_white.png",
    description:
      "1 Capacity | PP-PS Plastic Double Wall Straight Base Jars with Cap",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "v240DB",
    name: "PP-PS Plastic Double Wall Round Base Jars with Domed Cap",
    brand: "PIF Packaging",
    category: "Eyeshadow Containers",
    industry: ["Personal Health & Beauty"],
    material: "PP/PS",
    shape: "Round Base",
    color: "White",
    price: 0.38,
    caseQty: 1,
    imageUrl: "/images/catalog/eyeshadow_pp_ps_round_base_jar_domed.png",
    description:
      "4 Capacities | 4 Heights | 3 Diameters | PP-PS Plastic Double Wall Round Base Jars with Domed Cap",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    sku: "v1122352",
    name: "11 ml PETG Plastic Lip Gloss Tube with Cap",
    brand: "PIF Packaging",
    category: "Eyeshadow Containers",
    industry: ["Personal Health & Beauty"],
    material: "PETG",
    shape: "Tube",
    color: "Clear/Black",
    capacity: { value: 11, unit: "ml" },
    price: 1.22,
    caseQty: 1,
    imageUrl: "/images/catalog/eyeshadow_petg_lip_gloss_tube.png",
    description: "1 Cap Color | 11 ml PETG Plastic Lip Gloss Tube with Cap",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

async function seedMissing() {
  try {
    const productsRef = collection(db, "products");
    console.log(`Injecting missing 6 Eyeshadow Container products...`);

    for (const product of MISSING_PRODUCTS) {
      const { id } = await addDoc(productsRef, product);
      console.log(`✅ Seeded: ${product.sku} (${id})`);
    }

    console.log(`\n🎉 Successfully seeded the remaining 6 products!`);
  } catch (error) {
    console.error("Error seeding missing eyeshadow containers:", error);
  }
}

seedMissing().then(() => {
  console.log("Seeding script complete.");
  process.exit(0);
});
