"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { fetchPPEProductById } from "@/services/ppeService";
import { PPEProduct } from "@/types/ppe";
import PPEProductForm from "@/components/admin/PPEProductForm";
import { Loader2 } from "lucide-react";

export default function EditPPEPage() {
  const params = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<PPEProduct | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (params.id) {
        const data = await fetchPPEProductById(params.id as string);
        if (data) {
          setProduct(data);
        } else {
          alert("Product not found");
          router.push("/admin/ppe");
        }
        setLoading(false);
      }
    }
    loadData();
  }, [params.id, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
      </div>
    );
  }

  if (!product) return null;

  return <PPEProductForm initialData={product} />;
}
