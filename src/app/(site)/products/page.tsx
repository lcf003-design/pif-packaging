import { Suspense } from "react";
import FilterBar from "@/components/catalog/FilterBar";
import ProductCard from "@/components/catalog/ProductCard";
import { fetchProducts } from "@/services/productService";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CategoryDescription from "@/components/catalog/CategoryDescription";

export default async function ProductsPage({
  searchParams,
}: {
  // Next.js 15+ searchParams is a promise
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  // Initialize generic filters
  let category =
    typeof params.category === "string" ? params.category : undefined;
  let material =
    typeof params.material === "string" ? params.material : undefined;
  let industry =
    typeof params.industry === "string" ? params.industry : undefined;
  let search = typeof params.search === "string" ? params.search : undefined;
  let color = typeof params.color === "string" ? params.color : undefined;
  let shape = typeof params.shape === "string" ? params.shape : undefined;
  let neck = typeof params.neck === "string" ? params.neck : undefined;

  // Specific Shop Menu Query Mapping
  if (params.market) {
    if (params.market === "pet-care")
      industry = "Personal Care"; // Example mapping
    else if (params.market === "beauty") industry = "Personal Care";
    else if (params.market === "pharma") industry = "Pharmaceutical";
    else if (params.market === "home-care") industry = "Home Care";
    else if (typeof params.market === "string")
      industry = params.market.charAt(0).toUpperCase() + params.market.slice(1);
  }

  // Helper to extract category from key prefix (e.g. 'bottles_material' -> 'Bottles')
  const extractCategory = (key: string) => {
    if (key.startsWith("bottles")) return "Bottles";
    if (key.startsWith("jars")) return "Jars";
    if (key.startsWith("jugs")) return "Jugs";
    if (key.startsWith("vials")) return "Vials";
    if (key.startsWith("tubes")) return "Tubes";
    if (key.startsWith("caps")) return "Closures";
    return undefined;
  };

  // Iterate over params to find specific filters
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (typeof value !== "string") return;

    // Material Handling
    if (key.endsWith("_material")) {
      category = extractCategory(key);
      material = value;
    }

    // Color Handling
    if (key.endsWith("_color")) {
      category = extractCategory(key);
      color = value.replace(/ (Bottles|Jars|Vials|Jugs|Tubes|Caps)$/i, "");
    }

    // Shape Handling
    if (key.endsWith("_shape")) {
      category = extractCategory(key);
      shape = value.replace(/ (Jars|Bottles|Vials)$/i, "");
    }

    // "Popular", "Beauty", "Food", "More" -> Fallback to Search
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
      if (!category) category = extractCategory(key);
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

  // Calculate Display Title
  let displayTitle = "All Products";
  if (category) {
    displayTitle = category;
    if (material) displayTitle = `${material} ${category}`;
  } else if (material) {
    displayTitle = `${material} Packaging`;
  } else if (search) {
    displayTitle = `Search: ${search}`;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumbs */}
      <div className="flex items-center text-xs text-industrial-500 mb-6 font-medium">
        <Link href="/" className="hover:text-industrial-900 transition-colors">
          Home
        </Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <Link
          href="/shop-all"
          className="hover:text-industrial-900 transition-colors"
        >
          Shop All
        </Link>
        <ChevronRight className="w-3 h-3 mx-2" />
        <span className="text-industrial-900 font-bold">All Products</span>
        {category && (
          <>
            <ChevronRight className="w-3 h-3 mx-2" />
            <span className="text-industrial-900 font-bold">
              {displayTitle}
            </span>
          </>
        )}
      </div>

      {/* Dynamic Header */}
      <CategoryDescription category={displayTitle} />

      {/* Item Count */}
      <div className="flex justify-end mb-4">
        <span className="text-industrial-400 font-medium text-sm">
          Showing 1-{filteredProducts.length} of {filteredProducts.length} Items
        </span>
      </div>

      {/* Filter Bar */}
      <Suspense fallback={<div>Loading filters...</div>}>
        <FilterBar />
      </Suspense>

      {/* Grid */}
      <div className="mt-6">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="py-32 text-center bg-industrial-50 rounded-lg border border-dashed border-industrial-200">
            <p className="text-industrial-500 text-lg font-medium">
              No products match your criteria.
            </p>
            <button className="mt-4 text-berlin-red font-bold hover:underline">
              Clear All Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
