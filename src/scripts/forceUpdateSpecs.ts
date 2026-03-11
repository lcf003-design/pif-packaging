import { db } from "../lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

async function forceUpdateProduct() {
  // We know the ID of the exact product from the Admin URL the user is currently on:
  // "http://localhost:3000/admin/products/QsP0ZDdjTR3b9t7FrsUH"
  const targetId = "QsP0ZDdjTR3b9t7FrsUH";
  
  console.log(`Force updating product: ${targetId}`);
  
  try {
    const docRef = doc(db, "products", targetId);
    
    await updateDoc(docRef, {
      dimensions: {
        diameter: "3.2",
        height: "2"
      },
      closure: {
        type: "Continuous Thread",
        color: "Silver"
      },
      // Ensuring the other fields are firmly locked in as well
      weight: "65g",
      caseQty: 36,
      labelPanel: {
        dimensions: "2.480",
        shape: "Round"
      },
      updatedAt: new Date().toISOString()
    });
    
    console.log("Product specs successfully force-injected into Firestore.");
    process.exit(0);
  } catch (err) {
    console.error("Error updating product:", err);
    process.exit(1);
  }
}

forceUpdateProduct();
