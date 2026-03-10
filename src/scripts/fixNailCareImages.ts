import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
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

const fixImageKeys = async () => {
  try {
    const productsRef = collection(db, "products");

    // Query directly for products with the bad `image` key
    // Wait, Firestore doesn't easily query for existence like this without index unless we just query by category and fix them.
    const q = query(
      productsRef,
      where(
        "categories",
        "array-contains",
        "Nail Polish Bottles & Nail Care Product Packaging",
      ),
    );
    const snap = await getDocs(q);

    console.log(`Found ${snap.size} Nail Care products. Fixing keys...`);
    const batch = writeBatch(db);

    let fixCount = 0;
    snap.forEach((docSnap) => {
      const data = docSnap.data();
      if (data.image) {
        batch.update(docSnap.ref, {
          imageUrl: data.image,
          image: null, // optionally remove the old one (can use FieldValue.delete() but null is fine or we can just update imageUrl)
          updatedAt: serverTimestamp(),
        });
        fixCount++;
      }
    });

    await batch.commit();
    console.log(`✅ Fixed imageUrl mapping for ${fixCount} products!`);
    process.exit(0);
  } catch (error) {
    console.error("Error running fix script:", error);
    process.exit(1);
  }
};

fixImageKeys();
