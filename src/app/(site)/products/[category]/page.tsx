import { Suspense } from "react";
import FilterSidebar from "@/components/catalog/FilterSidebar";
import ProductCard from "@/components/catalog/ProductCard";
import { fetchProducts } from "@/services/productService";

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { category: rawCategory } = await params;
  const searchParamsValue = await searchParams;

  // Format category param to Title Case (e.g., "bottles" -> "Bottles")
  const categoryParam =
    rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);

  // Initialize filters
  let category: string | undefined = categoryParam;
  let material =
    typeof searchParamsValue.material === "string"
      ? searchParamsValue.material
      : undefined;
  let industry =
    typeof searchParamsValue.industry === "string"
      ? searchParamsValue.industry
      : undefined;
  let search =
    typeof searchParamsValue.search === "string"
      ? searchParamsValue.search
      : undefined;
  let color =
    typeof searchParamsValue.color === "string"
      ? searchParamsValue.color
      : undefined;
  let shape =
    typeof searchParamsValue.shape === "string"
      ? searchParamsValue.shape
      : undefined;

  // Specific Shop Menu Query Mapping (reused logic for robustness)
  // We still check query params in case they override or add context
  const sParams = searchParamsValue;

  // Helper to extract category from key prefix
  const extractCategory = (key: string) => {
    if (key.startsWith("bottles")) return "Bottles";
    if (key.startsWith("jars")) return "Jars";
    if (key.startsWith("jugs")) return "Jugs";
    if (key.startsWith("vials")) return "Vials";
    if (key.startsWith("tubes")) return "Tubes";
    if (key.startsWith("caps")) return "Closures";
    return undefined;
  };

  Object.keys(sParams).forEach((key) => {
    const value = sParams[key];
    if (typeof value !== "string") return;

    if (key.endsWith("_material")) {
      // If the URL category matches (or is generic), use the specific material
      // We don't overwrite category since it's in the URL path, but we could validat it
      material = value;
    }

    if (key.endsWith("_color")) {
      color = value.replace(/ (Bottles|Jars|Vials|Jugs|Tubes|Caps)$/i, "");
    }

    if (key.endsWith("_shape")) {
      shape = value.replace(/ (Jars|Bottles|Vials)$/i, "");
    }

    if (
      key.endsWith("_popular") ||
      key.endsWith("_beauty") ||
      key.endsWith("_food") ||
      key.endsWith("_more") ||
      key.endsWith("_utility") ||
      key.endsWith("_beverage") ||
      key.endsWith("_spirits") ||
      key.endsWith("_pharma") ||
      key.endsWith("_industrial") ||
      key.endsWith("_novelty") ||
      key.endsWith("_seamless") ||
      key.endsWith("_accessories")
    ) {
      if (!search) search = value;
    }
  });

  const filteredProducts = await fetchProducts({
    category,
    material,
    industry,
    search,
    color,
    shape,
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <Suspense fallback={<div>Loading filters...</div>}>
            <FilterSidebar />
          </Suspense>
        </aside>

        {/* Grid */}
        <div className="flex-1">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-industrial-900">
              {categoryParam}{" "}
              <span className="text-industrial-400 font-light ml-2">
                ({filteredProducts.length} Items)
              </span>
            </h1>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-industrial-200">
              <p className="text-industrial-500">
                No products found in {categoryParam}.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
