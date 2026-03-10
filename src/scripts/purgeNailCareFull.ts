import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "packaging-catalog",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const CATEGORY_NAME = "Nail Polish Bottles & Nail Care Product Packaging";

const fullPurgeNailCare = async () => {
  try {
    const productsRef = collection(db, "products");

    // We get all products in Nail Care category
    const q = query(
      productsRef,
      where("categories", "array-contains", CATEGORY_NAME),
    );
    const snap = await getDocs(q);

    console.log(
      `Scanning ${snap.size} Nail Care products for deletion/removal...`,
    );

    const batch = writeBatch(db);
    let deleteCount = 0;
    let updateCount = 0;

    snap.forEach((docSnap) => {
      const data = docSnap.data();
      const cats = data.categories || [];

      // If it's ONLY in this category, delete it entirely.
      if (cats.length === 1) {
        batch.delete(docSnap.ref);
        deleteCount++;
      } else {
        // If it overlaps with other categories, just remove this category tag
        const newCats = cats.filter((c: string) => c !== CATEGORY_NAME);
        batch.update(docSnap.ref, { categories: newCats });
        updateCount++;
      }
    });

    if (deleteCount > 0 || updateCount > 0) {
      await batch.commit();
      console.log(
        `✅ Successfully deleted ${deleteCount} standalone products and decoupled ${updateCount} overlapping products.`,
      );
    } else {
      console.log(`✅ No Nail Care products found to purge.`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Error running full purge script:", error);
    process.exit(1);
  }
};

fullPurgeNailCare();
