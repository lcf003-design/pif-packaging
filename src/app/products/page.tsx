import { Suspense } from "react";
import FilterSidebar from "@/components/catalog/FilterSidebar";
import ProductCard from "@/components/catalog/ProductCard";
import { fetchProducts } from "@/services/productService";

// Client component wrapper for search params usage in Next.js App Router (or usage inside Suspense)
// Actually, in App Router pages are Server Components by default and receive searchParams prop.
// However, filtering logic is often easier if we fetch data based on params.

export default async function ProductsPage({
  searchParams,
}: {
  // Next.js 15+ searchParams is a promise
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;

  const category =
    typeof params.category === "string" ? params.category : undefined;
  const material =
    typeof params.material === "string" ? params.material : undefined;
  const industry =
    typeof params.industry === "string" ? params.industry : undefined;
  const search = typeof params.search === "string" ? params.search : undefined;

  const filteredProducts = await fetchProducts({
    category,
    material,
    industry,
    search,
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
              Product Catalog{" "}
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
                No products match your criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
