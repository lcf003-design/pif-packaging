const admin = require("firebase-admin");
const serviceAccount = require("../../service-account.json");

// Initialize Firebase Admin with the explicit service account credentials the user just downloaded.
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    projectId: "packaging-catalog"
  });
}

const db = admin.firestore();

async function run() {
  const targetId = "QsP0ZDdjTR3b9t7FrsUH";
  console.log(`Force updating document via Server-Side Admin: ${targetId}`);

  try {
    const docRef = db.collection("products").doc(targetId);
    
    // Hard override of the data matching the user's exact specification
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
      description: "8 oz Flush Seal Seamless Screw Top Tins\nIncludes a Matching Screw Cap\nFDA Food Contact Compliant",
      updatedAt: new Date().toISOString()
    });
    
    console.log("SUCCESS! Database patched via Server-Side Admin!");
    process.exit(0);
  } catch (err) {
    console.error("FAILED to update document:", err);
    process.exit(1);
  }
}

run();
