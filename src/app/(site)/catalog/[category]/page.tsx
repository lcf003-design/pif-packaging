import { Suspense } from "react";
import FilterSidebar from "@/components/catalog/FilterSidebar";
import ProductCard from "@/components/catalog/ProductCard";
import { fetchProducts } from "@/services/productService";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

interface CatalogPageProps {
  params: Promise<{
    category: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function CatalogPage({
  params,
  searchParams,
}: CatalogPageProps) {
  const { category: categorySlug } = await params;
  const searchResolved = await searchParams;

  // Normalize slug to query (e.g. 'airless' -> 'airless')
  // Depending on how fetchProducts works, we might need to map slugs to IDs or Names.
  // For now, passing the slug as 'category' filter.

  const filteredProducts = await fetchProducts({
    category: categorySlug,
    material:
      typeof searchResolved.material === "string"
        ? searchResolved.material
        : undefined,
    industry:
      typeof searchResolved.industry === "string"
        ? searchResolved.industry
        : undefined,
    search:
      typeof searchResolved.search === "string"
        ? searchResolved.search
        : undefined,
  });

  // Capitalize for display title
  const title = categorySlug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-industrial-500 hover:text-berlin-red transition-colors text-sm font-bold uppercase tracking-wider mb-4"
        >
          <ArrowLeft className="w-4 h-4" /> Back to All Products
        </Link>
        <h1 className="text-4xl font-black text-industrial-900 uppercase tracking-tight">
          {title}{" "}
          <span className="text-industrial-400 font-light">Collection</span>
        </h1>
      </div>

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
            <h2 className="text-xl font-bold text-industrial-900">
              {filteredProducts.length} Items Found
            </h2>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center border border-dashed border-industrial-200">
              <p className="text-industrial-500 mb-4">
                No products found in the <strong>{title}</strong> collection
                matching your criteria.
              </p>
              <Link
                href="/products"
                className="text-berlin-red font-bold hover:underline"
              >
                View All Products
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
