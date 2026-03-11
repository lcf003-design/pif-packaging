import { NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, updateDoc } from "firebase/firestore";

export async function GET() {
  const targetId = "QsP0ZDdjTR3b9t7FrsUH";
  
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
      weight: "65g",
      caseQty: 36,
      labelPanel: {
        dimensions: "2.480",
        shape: "Round"
      },
      updatedAt: new Date().toISOString()
    });
    
    return NextResponse.json({ success: true, message: "Product updated successfully via API Route bypass." });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
