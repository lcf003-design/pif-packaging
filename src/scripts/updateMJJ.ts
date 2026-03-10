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

const updateMJJ = async () => {
  const productsRef = collection(db, "products");
  const q = query(productsRef, where("sku", "==", "MJJ"));
  const snapshot = await getDocs(q);

  if (snapshot.empty) {
    console.log("No product found with SKU MJJ");
    process.exit(1);
  }

  for (const productDoc of snapshot.docs) {
    const updateData = {
      imageUrl: "/images/nail_pp_low_profile_jar_mjj_main.png",
      images: [
        "/images/nail_pp_low_profile_jar_mjj_main.png",
        "/images/nail_pp_low_profile_jar_mjj_open.png",
      ],
    };

    await updateDoc(productDoc.ref, updateData);
    console.log(`Updated product ${productDoc.id} (SKU: MJJ) with new images.`);
  }
  process.exit(0);
};

updateMJJ();
