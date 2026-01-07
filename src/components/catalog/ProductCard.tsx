import Link from "next/link";
import { Product } from "@/types";
import { ArrowRight } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="group block bg-white border border-industrial-100 hover:border-industrial-300 transition-all duration-300 ease-in-out"
    >
      <div className="relative aspect-[3/4] bg-industrial-50 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="object-cover w-full h-full opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-transform duration-500"
        />
        {product.isClosure && (
          <span className="absolute top-2 right-2 bg-industrial-900 text-white text-[10px] uppercase font-bold px-2 py-1 tracking-wider">
            Closure
          </span>
        )}
      </div>
      <div className="p-4 border-t border-industrial-100">
        <p className="text-xs text-industrial-500 uppercase tracking-wider mb-1 font-medium">
          {product.brand}
        </p>
        <h3 className="text-industrial-900 font-semibold mb-2 group-hover:text-action transition-colors line-clamp-2 min-h-[3rem]">
          {product.name}
        </h3>
        <div className="flex items-center justify-between text-xs text-industrial-600 border-t border-industrial-50 pt-3 mt-3">
          <span>{product.material}</span>
          <span className="flex items-center group-hover:translate-x-1 transition-transform">
            Details <ArrowRight className="w-3 h-3 ml-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}
