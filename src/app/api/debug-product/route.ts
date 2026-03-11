import { NextResponse } from "next/server";
import { fetchProductById } from "@/services/productService";

export async function GET() {
  const targetId = "QsP0ZDdjTR3b9t7FrsUH";
  try {
    const product = await fetchProductById(targetId);
    return NextResponse.json({ success: true, product });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
