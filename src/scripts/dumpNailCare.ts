import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "packaging-catalog",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const dumpNailCare = async () => {
  const productsRef = collection(db, "products");
  const q = query(
    productsRef,
    where(
      "categories",
      "array-contains",
      "Nail Polish Bottles & Nail Care Product Packaging",
    ),
  );
  const snapshot = await getDocs(q);
  const items = snapshot.docs.map((d) => ({
    id: d.id,
    name: d.data().name,
    sku: d.data().sku,
    imageUrl: d.data().imageUrl,
  }));
  console.log(`Found ${items.length} items`);
  items.forEach((i) => console.log(`- [${i.sku}] ${i.name} (${i.imageUrl})`));
  process.exit(0);
};

dumpNailCare();
