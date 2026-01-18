const { initializeApp, getApps, getApp } = require("firebase/app");
const {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} = require("firebase/firestore");
require("dotenv").config({ path: ".env.local" });

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

async function fixData() {
  console.log("Searching for 250ml bottle...");
  const q = query(
    collection(db, "products"),
    where("name", "==", "250 ml Aluminum Bottle - Silver with Black Pump"),
  );

  const snapshot = await getDocs(q);
  if (snapshot.empty) {
    console.log("Product not found!");
    return;
  }

  snapshot.forEach(async (productDoc) => {
    console.log(`Found product: ${productDoc.id}`);
    console.log("Current Data:", productDoc.data().closure);

    await updateDoc(doc(db, "products", productDoc.id), {
      closure: {
        type: "Lotion Pump",
        color: "Black",
        material: "Plastic", // Inferring from typical data
      },
    });
    console.log("UPDATED closure to Lotion Pump (Black)");
  });
}

fixData().then(() => {
  console.log("Done");
  // process.exit(0); // Let it drain
});
