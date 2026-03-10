import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "packaging-catalog",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const updateBostonRound = async () => {
  const productsRef = collection(db, "products");
  const q = query(productsRef, where("sku", "==", "v4699B31"));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    console.log("No product found with SKU v4699B31");
    process.exit(1);
  }

  const productDoc = snapshot.docs[0];
  const updateData = {
    imageUrl: "/images/nail_glass_boston_round_dropper_amber.png",
    images: [
      "/images/nail_glass_boston_round_dropper_amber.png",
      "/images/nail_glass_boston_round_dropper_blue.png",
      "/images/nail_glass_boston_round_dropper_clear.png",
    ],
  };

  await updateDoc(productDoc.ref, updateData);
  console.log(
    `Updated product ${productDoc.id} (SKU: v4699B31) with new images.`,
  );
  process.exit(0);
};

updateBostonRound();
