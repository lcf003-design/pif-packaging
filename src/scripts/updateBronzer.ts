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

// These are the exact 13 SKUs from the Foundation set that appear in the Bronzer/Blush grid
const TARGET_SKUS_TO_UPDATE = [
  "1122B03",
  "1126001",
  "v6775DBACCR",
  "vX20-400",
  "v4701B01-B",
  "vTRPBBLK",
  "v4888B001-B",
  "v1770B01",
  "v1733B01",
  "v1699B01",
  "v4680B01",
  "v4700B01-B",
  "v4605B01-B",
];

const updateBronzerItems = async () => {
  try {
    console.log("Starting Bronzer & Blush Category Update Script...");
    const productsRef = collection(db, "products");
    const newBatch = writeBatch(db);

    const q = query(productsRef, where("sku", "in", TARGET_SKUS_TO_UPDATE));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      console.log("No matching products found to update.");
      process.exit(1);
    }

    let updateCount = 0;
    querySnapshot.forEach((docSnap) => {
      const data = docSnap.data();
      let categories = data.categories || [];

      if (!categories.includes("Bronzer & Blush Packaging")) {
        categories.push("Bronzer & Blush Packaging");
        newBatch.update(docSnap.ref, {
          categories,
          updatedAt: serverTimestamp(),
        });
        updateCount++;
        console.log(`Prepared update for SKU: ${data.sku}`);
      } else {
        console.log(`SKU ${data.sku} already has category. Skipping.`);
      }
    });

    if (updateCount > 0) {
      console.log(`Executing batch update for ${updateCount} products...`);
      await newBatch.commit();
      console.log("✅ Successfully appended 'Bronzer & Blush Packaging'.");
    } else {
      console.log("No updates needed.");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error running script:", error);
    process.exit(1);
  }
};

updateBronzerItems();
