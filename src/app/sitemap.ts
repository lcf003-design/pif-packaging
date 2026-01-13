import { MetadataRoute } from "next";
import { fetchProducts } from "@/services/productService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://packaging-catalog.web.app"; // Default Firebase URL

  // 1. Static Routes
  const routes = ["", "/about", "/shop-all", "/manufacturing", "/portal"].map(
    (route) => ({
      url: `${baseUrl}${route}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })
  );

  // 2. Dynamic Product Routes
  const products = await fetchProducts();
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.id}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));

  return [...routes, ...productRoutes];
}
