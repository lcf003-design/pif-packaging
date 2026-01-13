import { SHOP_NAVIGATION } from "@/config/shop-navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata = {
  title: "Shop All Categories | Packaging Catalog",
  description:
    "Browse our complete catalog of bottles, jars, cans, and closures.",
};

export default function ShopAllPage() {
  // Filter out "market" and "function" to show only product categories
  const categories = SHOP_NAVIGATION.filter(
    (cat) => cat.id !== "market" && cat.id !== "function"
  );

  return (
    <div className="bg-white min-h-screen text-neutral-900 selection:bg-berlin-red selection:text-white pt-0 pb-20">
      {/* Promo Banner */}
      <div className="w-full bg-berlin-red py-24 text-center text-white mb-12 shadow-xl -mt-1">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-wider mb-4">
          Wholesale Pricing & Bulk Volume Discounts
        </h2>
        <p className="text-white/80 text-sm font-medium">
          Request a quote today for commercial production runs. Global logistics
          available.
        </p>
      </div>

      <div className="container mx-auto px-6 max-w-[1600px]">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-neutral-400 hover:text-berlin-blue transition-colors duration-300 font-mono text-xs tracking-[0.2em] uppercase mb-8"
          >
            <ArrowLeft className="w-3 h-3" /> Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-neutral-900 mb-8">
            SHOP ALL PRODUCTS
          </h1>

          <h2 className="text-3xl font-bold text-neutral-900 tracking-tight mb-10">
            Shop By Category
          </h2>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products/${category.id}`}
              className="group block"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 rounded-lg mb-4 border border-neutral-100 group-hover:border-berlin-blue/20 group-hover:shadow-xl transition-all duration-300">
                {category.image ? (
                  <Image
                    src={category.image}
                    alt={category.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-300">
                    <span className="text-xs font-mono uppercase">
                      No Image
                    </span>
                  </div>
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-berlin-blue/0 group-hover:bg-berlin-blue/5 transition-colors duration-300" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 group-hover:text-berlin-blue transition-colors text-center">
                {category.label}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
