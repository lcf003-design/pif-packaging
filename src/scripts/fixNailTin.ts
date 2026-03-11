// RUN WITH: npx ts-node src/scripts/fixNailTin.ts
import { db } from "../lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

async function run() {
  console.log("Searching for 6218T32 Products...");
  const q = query(
    collection(db, "products"),
    where("sku", "==", "6218T32")
  );

  const querySnapshot = await getDocs(q);
  console.log(`Found ${querySnapshot.size} products.`);

  if (querySnapshot.size === 0) {
    console.log("No products found to fix.");
    return;
  }

  const docs = querySnapshot.docs;
  // Keep the first one, delete the rest
  const targetDoc = docs[0];
  const docsToDelete = docs.slice(1);

  for (const docSnapshot of docsToDelete) {
    console.log(`Deleting duplicate: ${docSnapshot.id}`);
    await deleteDoc(doc(db, "products", docSnapshot.id));
  }

  console.log(`Updating primary document: ${targetDoc.id}`);
  await updateDoc(doc(db, "products", targetDoc.id), {
    sku: "TIN-8-OZ-RND-CT-SLV",
    name: "8 oz Flush Seal Seamless Screw Top Tins",
    categories: ["Nail Care Products Packaging"],
    industry: ["Personal Health & Beauty"],
    material: "Tinplate",
    shape: "Round",
    color: "Silver",
    price: 114.11,
    imageUrl: "/images/catalog/nail_flush_seal_seamless_screw_top_tin_8oz.png",
    description: "8 oz Flush Seal Seamless Screw Top Tins\nIncludes a Matching Screw Cap\nFDA Food Contact Compliant",
    capacity: { value: 8, unit: "oz" },
    dimensions: {
      diameter: "3.2",
      height: "2",
    },
    weight: "65g",
    neckFinish: "Continuous Thread",
    labelPanel: {
      dimensions: "2.480",
      shape: "Round",
    },
    caseQty: 36,
    isClosure: false,
    updatedAt: new Date().toISOString(),
  });

  console.log("Database patch complete.");
}

run().catch(console.error);
