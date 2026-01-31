import { fetchPPEProductById } from "@/services/ppeService";
import PPEProductDetail from "@/components/ppe/PPEProductDetail";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

// Generate Metadata for SEO
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await fetchPPEProductById(id);

  if (!product) {
    return {
      title: "Product Not Found | Berlin Health",
    };
  }

  return {
    title: `${product.name} | Berlin Health PPE`,
    description: product.description.substring(0, 160),
    openGraph: {
      images: product.imageUrl ? [product.imageUrl] : [],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  const product = await fetchPPEProductById(id);

  if (!product) {
    notFound();
  }

  return <PPEProductDetail product={product} />;
}
