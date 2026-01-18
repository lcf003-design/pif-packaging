import { db } from "../src/lib/firebase"; // Inspect src/lib/firebase.ts first to ensure this import works in a node script
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc,
} from "firebase/firestore";

async function fixData() {
  const productsRef = collection(db, "products");

  // 1. Fetch the 80ml bottle (The "Good" Reference)
  const q80 = query(
    productsRef,
    where("slug", "==", "80-ml-aluminum-bottle-silver-black-lotion-pump"),
  );
  const snap80 = await getDocs(q80);
  let referenceClosure = null;

  if (!snap80.empty) {
    const p80 = snap80.docs[0].data();
    console.log("Found 80ml Reference:", p80.name);
    console.log("Reference Closure:", p80.closure);
    referenceClosure = p80.closure;
  } else {
    console.log("Could not find 80ml reference bottle!");
  }

  // 2. Fetch the 250ml bottle (The "Bad" Target)
  const q250 = query(
    productsRef,
    where("slug", "==", "250-ml-aluminum-bottle-silver-black-pump"),
  );
  const snap250 = await getDocs(q250);

  if (!snap250.empty) {
    const doc250 = snap250.docs[0];
    const p250 = doc250.data();
    console.log("\nFound 250ml Target:", p250.name);
    console.log("Current Closure:", p250.closure);
    console.log("Current Neck:", p250.neckFinish);

    // 3. Fix it if we have a reference
    if (referenceClosure) {
      console.log("\nApplying Fix...");
      // Ensure we don't overwrite if it's already good, but user said it's bad.
      // We will force update to be safe.

      await updateDoc(doc250.ref, {
        closure: referenceClosure,
      });
      console.log(
        "SUCCESS: Updated 250ml bottle closure to match 80ml reference.",
      );
    } else {
      console.log("Skipping fix because reference closure was not found.");
    }
  } else {
    console.log("Could not find 250ml target bottle!");
  }
}

// Check if we can run this.
// We might need to shim fetch or something if running in Node < 18,
// but Node 20 is enforced so we should be good.
fixData()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
