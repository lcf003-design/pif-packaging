import {
  fetchProductById,
  fetchRecommendedClosures,
} from "@/services/productService";
import ProductDetailClient from "@/app/products/ProductDetailClient";

export default async function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await fetchProductById(params.id);

  if (!product) {
    return (
      <div className="container mx-auto p-20 text-center">
        Product Not Found
      </div>
    );
  }

  const recommendedClosures = await fetchRecommendedClosures(product);

  return (
    <ProductDetailClient
      product={product}
      recommendedClosures={recommendedClosures}
    />
  );
}
