import { MetadataRoute } from "next";
import { fetchProducts } from "@/services/productService";
import { fetchPPEProducts } from "@/services/ppeService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://pifpackaging.com";

  // 1. Static Routes
  const staticRoutes = [
    "",
    "/about",
    "/shop-all",
    "/manufacturing",
    "/portal",
    "/markets/food",
    "/markets/beverage",
    "/markets/automotive",
    "/markets/spirits",
    "/markets/wine",
    "/markets/personal-care",
    "/markets/pharmaceutical",
    "/markets/cannabis",
    "/markets/home-care",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // 2. Dynamic Product Routes (Standard)
  const products = await fetchProducts();
  const productRoutes = products.map((product) => ({
    url: `${baseUrl}/product/${product.slug || product.id}`,
    lastModified: new Date(product.updatedAt || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // 3. Dynamic PPE Routes
  let ppeProducts: any[] = [];
  try {
    ppeProducts = await fetchPPEProducts();
  } catch (e) {
    console.error("Sitemap PPE Fetch Error", e);
  }

  const ppeRoutes = ppeProducts.map((product) => ({
    url: `${baseUrl}/ppe/products/${product.id}`,
    lastModified: new Date(product.updatedAt || new Date()),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  return [...staticRoutes, ...productRoutes, ...ppeRoutes];
}
