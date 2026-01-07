"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { doc, setDoc, writeBatch, collection } from "firebase/firestore";
import { MOCK_PRODUCTS } from "@/lib/mockData";

export default function SeedPage() {
  const [status, setStatus] = useState("Ready to seed");
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    setStatus("Starting seed process...");

    try {
      const batch = writeBatch(db);

      MOCK_PRODUCTS.forEach((product) => {
        const docRef = doc(collection(db, "products"), product.id);
        batch.set(docRef, product);
      });

      await batch.commit();
      setStatus(
        `Success! Uploaded ${MOCK_PRODUCTS.length} products to Firestore.`
      );
    } catch (error: any) {
      console.error(error);
      setStatus("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Database Seeder</h1>
      <div className="p-4 bg-gray-100 rounded mb-4">
        <p className="font-mono text-sm">{status}</p>
      </div>
      <button
        onClick={handleSeed}
        disabled={loading}
        className="w-full py-2 px-4 bg-green-600 text-white font-bold rounded hover:bg-green-700 disabled:opacity-50"
      >
        {loading ? "Seeding..." : "Seed Products DB"}
      </button>
    </div>
  );
}
