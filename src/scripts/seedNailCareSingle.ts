import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "packaging-catalog",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const newProduct = {
  name: "8 oz Flush Seal Seamless Screw Top Tins",
  sku: "6218T32",
  price: "114.11",
  priceUnit: "Case",
  stockStatus: "In Stock",
  categories: ["Nail Polish Bottles & Nail Care Product Packaging"],
  imageUrl: "/images/catalog/nail_8oz_flush_seal_tin.png",
  images: ["/images/catalog/nail_8oz_flush_seal_tin.png"],
  capacity: { value: 8, unit: "oz" },
  material: "Aluminum",
  featured: false,
  description: "High-quality 8 oz flush seal seamless screw top tin, perfect for nail care products, creams, and thicker cosmetics. Secure screw top closure ensures product freshness.",
};

const seedSingleProduct = async () => {
  try {
    const productsRef = collection(db, "products");
    const docRef = doc(productsRef, "nail_8oz_flush_seal_tin_6218t32");
    
    await setDoc(docRef, newProduct, { merge: true });
    console.log(`Successfully added product: ${newProduct.sku}`);
    process.exit(0);
  } catch (error) {
    console.error("Error seeding product:", error);
    process.exit(1);
  }
};

seedSingleProduct();
