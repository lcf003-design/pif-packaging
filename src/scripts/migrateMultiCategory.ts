import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

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

async function migrateCategories() {
  try {
    const productsRef = collection(db, "products");
    const snapshot = await getDocs(productsRef);

    console.log(`Starting migration for ${snapshot.size} products...`);

    let migratedCount = 0;
    let skippedCount = 0;

    for (const document of snapshot.docs) {
      const data = document.data();

      // If it still has the legacy 'category' string
      if (data.category && typeof data.category === "string") {
        const docRef = doc(db, "products", document.id);

        await updateDoc(docRef, {
          categories: [data.category],
          category: null, // Or omit depending on your preference, but usually better to set to null/delete
        });

        console.log(
          `✅ Migrated: ${data.sku} (${data.category} -> [${data.category}])`,
        );
        migratedCount++;
      } else if (data.categories && Array.isArray(data.categories)) {
        // Already migrated
        skippedCount++;
      } else {
        console.log(`⚠️ Skipped ${data.sku} - No recognized category field.`);
        skippedCount++;
      }
    }

    console.log(`\n🎉 Migration complete!`);
    console.log(`Total Migrated: ${migratedCount}`);
    console.log(`Total Skipped: ${skippedCount}`);
  } catch (error) {
    console.error("Error running migration:", error);
  }
}

migrateCategories().then(() => {
  console.log("Migration script complete.");
  process.exit(0);
});
