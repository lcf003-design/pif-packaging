import * as dotenv from 'dotenv';
import * as admin from 'firebase-admin';

// Load Next.js environment variables
dotenv.config({ path: '.env.local' });

if (!admin.apps.length) {
  // Try to initialize admin with application default credentials, 
  // or a stub project if just hitting a public/local db
  try {
    admin.initializeApp({
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
    });
  } catch (e) {
    console.error("Init Error:", e);
  }
}

const db = admin.firestore();

async function inspect() {
  try {
    const snapshot = await db.collection("products").limit(10).get();
    let count = 0;
    snapshot.forEach(doc => {
      const data = doc.data();
      console.log(`ID: ${doc.id}`);
      console.log(`Name: ${data.name}`);
      console.log(`SKU: ${data.sku}`);
      console.log(`Slug: ${data.slug}`);
      console.log("-------------------");
      count++;
    });
    console.log(`Found ${count} products.`);
    process.exit(0);
  } catch (error) {
    console.error("Firebase Error:", error);
    process.exit(1);
  }
}

inspect();
