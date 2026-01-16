"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { fetchProductById } from "@/services/productService";
import ProductForm from "@/components/admin/ProductForm";
import { Product } from "@/types";

export default function EditProductPage() {
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchProductById(id).then((p) => {
        setProduct(p || null);
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-berlin-blue"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold">Product Not Found</h2>
        <p className="text-gray-500">
          The product you requested does not exist.
        </p>
      </div>
    );
  }

  return <ProductForm initialData={product} />;
}
