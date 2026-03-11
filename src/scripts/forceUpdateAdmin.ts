import * as admin from "firebase-admin";

admin.initializeApp({
  projectId: "demo-packaging-catalog"
});

const db = admin.firestore();

async function run() {
  const targetId = "QsP0ZDdjTR3b9t7FrsUH";
  console.log(`Force updating document via Admin SDK: ${targetId}`);

  try {
    const docRef = db.collection("products").doc(targetId);
    
    await docRef.update({
      dimensions: {
        diameter: "3.2",
        height: "2"
      },
      closure: {
        type: "Continuous Thread",
        color: "Silver"
      },
      weight: "65g",
      caseQty: 36,
      labelPanel: {
        dimensions: "2.480",
        shape: "Round"
      },
      // Fixing the description the UI mangled
      description: "8 oz Flush Seal Seamless Screw Top Tins\nIncludes a Matching Screw Cap\nFDA Food Contact Compliant",
      updatedAt: new Date().toISOString()
    });
    
    console.log("SUCCESS! Database patched via Admin SDK.");
  } catch (err) {
    console.error("FAILED to update document:", err);
  }
}

run();
