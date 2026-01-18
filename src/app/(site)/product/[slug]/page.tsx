import { Metadata } from "next";
import {
  fetchProductBySlug,
  fetchProductById,
  fetchRecommendedClosures,
} from "@/services/productService";
import ProductDetailClient from "../ProductDetailClient";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  // Try slug first, then ID
  let product = await fetchProductBySlug(slug);
  if (!product) {
    product = await fetchProductById(slug);
  }

  if (!product) {
    return {
      title: "Product Not Found | CatalogPrime",
    };
  }

  return {
    title: `${product.name} | ${product.material} ${product.category} | CatalogPrime`,
    description:
      product.description ||
      `Premium ${product.color || ""} ${product.material} ${
        product.category
      }. Bulk pricing and customization available.`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  console.log("DEBUG: Product Page Request for Slug/ID:", slug);

  // Dual-Strategy Lookup
  let product = await fetchProductBySlug(slug);
  if (!product) {
    console.log("DEBUG: Slug verification failed, attempting ID lookup...");
    product = await fetchProductById(slug);
  }

  console.log("DEBUG: Final Fetch Result:", product ? "Found" : "Not Found");

  if (!product) {
    return (
      <div className="container mx-auto p-20 text-center">
        Product Not Found
      </div>
    );
  }

  const recommendedClosures = await fetchRecommendedClosures(product);
  // const variants = await fetchProductVariants(product); // Disabled per request

  return (
    <ProductDetailClient
      product={product}
      recommendedClosures={recommendedClosures}
      variants={[]}
    />
  );
}
