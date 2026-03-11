import * as admin from 'firebase-admin';

// Initialize using the default credential
// This assumes you've set GOOGLE_APPLICATION_CREDENTIALS
// or we can initialize with a service account path if it exists

try {
  admin.initializeApp();
} catch (e) {
  // Ignore already initialized error
}

const db = admin.firestore();

async function inspect() {
  const snapshot = await db.collection("products").limit(10).get();
  snapshot.forEach(doc => {
    const data = doc.data();
    console.log(`ID: ${doc.id}`);
    console.log(`Name: ${data.name}`);
    console.log(`SKU: ${data.sku}`);
    console.log(`Slug: ${data.slug}`);
    console.log("-------------------");
  });
  console.log("Done");
  process.exit(0);
}

inspect();
