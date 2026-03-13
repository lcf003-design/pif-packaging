import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "packaging-catalog",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const consolidateMJJ = async () => {
  const productsRef = collection(db, "products");
  const q = query(productsRef, where("sku", "==", "MJJ"));
  const snapshot = await getDocs(q);

  if (snapshot.docs.length < 2) {
    console.log("Not enough MJJ products found to consolidate.");
    process.exit(0);
  }

  const doc1 = snapshot.docs[0];
  const doc2 = snapshot.docs[1];

  const categories1 = doc1.data().categories || [];
  const categories2 = doc2.data().categories || [];

  const mergedCategories = Array.from(
    new Set([...categories1, ...categories2]),
  );

  // Keep doc1, update its categories, and delete doc2
  await updateDoc(doc1.ref, { categories: mergedCategories });
  await deleteDoc(doc2.ref);

  console.log(
    `Consolidated MJJ. Kept ${doc1.id} with categories: ${mergedCategories.join(", ")}`,
  );
  console.log(`Deleted duplicate MJJ product ${doc2.id}`);

  process.exit(0);
};

consolidateMJJ();
