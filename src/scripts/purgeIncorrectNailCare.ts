import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  deleteDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "packaging-catalog",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const TO_DELETE = [
  "32 oz Natural HDPE Plastic Cylinder Bottles with White Snap Top Caps",
  "2 oz Natural HDPE Plastic Cylinder Bottles",
  "4 oz Natural HDPE Plastic Cylinder Bottles",
  "8 oz Natural HDPE Plastic Cylinder Bottles",
  "16 oz White HDPE Plastic Cylinder Bottles",
  // Also delete the duplicate "Natural LDPE Plastic..." just in case
];

const purgeIncorrectProducts = async () => {
  try {
    const productsRef = collection(db, "products");

    // We get all products in Nail Care category
    const q = query(
      productsRef,
      where(
        "categories",
        "array-contains",
        "Nail Polish Bottles & Nail Care Product Packaging",
      ),
    );
    const snap = await getDocs(q);

    console.log(
      `Scanning ${snap.size} Nail Care products for incorrect items...`,
    );

    const batch = writeBatch(db);
    let deleteCount = 0;

    // Track seen names to delete duplicates
    const seenNames = new Set();

    snap.forEach((docSnap) => {
      const data = docSnap.data();
      const name = data.name;

      let shouldDelete = false;

      // Delete if in the TO_DELETE list
      if (TO_DELETE.includes(name)) {
        shouldDelete = true;
      }

      // Delete if duplicate LDPE Yorker Cap
      if (
        name === "Natural LDPE Plastic Cylinder Bottles with Red Yorker Caps"
      ) {
        if (seenNames.has(name)) {
          shouldDelete = true; // Duplicate
        } else {
          seenNames.add(name);
        }
      }

      if (shouldDelete) {
        console.log(`Deleting: ${name} (${data.sku})`);
        batch.delete(docSnap.ref);
        deleteCount++;
      }
    });

    if (deleteCount > 0) {
      await batch.commit();
      console.log(
        `✅ Successfully deleted ${deleteCount} incorrect/duplicate products from the live database.`,
      );
    } else {
      console.log(`✅ No incorrect products found to delete.`);
    }

    process.exit(0);
  } catch (error) {
    console.error("Error running purge script:", error);
    process.exit(1);
  }
};

purgeIncorrectProducts();
