import { Suspense } from "react";
import FilterBar from "@/components/catalog/FilterBar";
import ProductCard from "@/components/catalog/ProductCard";
import { fetchProducts } from "@/services/productService";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import CategoryDescription from "@/components/catalog/CategoryDescription";

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
  let neck =
    typeof searchParamsValue.neck === "string"
      ? searchParamsValue.neck
      : undefined;

  // Specific Shop Menu Query Mapping
  const sParams = searchParamsValue;

  Object.keys(sParams).forEach((key) => {
    const value = sParams[key];
    if (typeof value !== "string") return;

    if (key.endsWith("_material")) {
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

  // Determine display title based on active filters
  let displayTitle = categoryParam;

  if (material) {
    displayTitle = `${material} ${categoryParam}`;
  } else if (search) {
    // If there's a specific search term that looks like a sub-category (e.g. "Juice Bottles"), use it
    // Simple heuristic: if search contains the category name, use it as title
    if (
      search.toLowerCase().includes(categoryParam.toLowerCase().slice(0, -1))
    ) {
      displayTitle = search;
    }
  }

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
        {displayTitle !== categoryParam ? (
          <>
            <Link
              href={`/products/${rawCategory}`}
              className="hover:text-industrial-900 transition-colors"
            >
              {categoryParam}
            </Link>
            <ChevronRight className="w-3 h-3 mx-2" />
            <span className="text-industrial-900 font-bold">
              {displayTitle}
            </span>
          </>
        ) : (
          <span className="text-industrial-900 font-bold">{categoryParam}</span>
        )}
      </div>

      {/* Dynamic Header with Expansion */}
      {/* Pass the fully qualified title (e.g. "Aluminum Bottles") so the component matches it */}
      <CategoryDescription category={displayTitle} />

      {/* Item Count (moved below header for clean layout, slightly tweaked) */}
      <div className="flex justify-end mb-4">
        <span className="text-industrial-400 font-medium text-sm">
          Showing 1-{filteredProducts.length} of {filteredProducts.length} Items
        </span>
      </div>

      {/* Horizontal Filter Bar */}
      <Suspense fallback={<div>Loading filters...</div>}>
        <FilterBar />
      </Suspense>

      {/* Grid - Full Width */}
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
              No products found matching your customized criteria.
            </p>
            <button
              className="mt-4 text-berlin-red font-bold hover:underline"
              // This would need to trigger a clear function or be a link
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
