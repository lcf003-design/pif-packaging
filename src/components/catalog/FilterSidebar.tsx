"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Category, Material } from "@/types";

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentCategory = searchParams.get("category");
  const currentMaterial = searchParams.get("material");

  const updateFilter = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      if (params.get(key) === value) {
        params.delete(key); // Toggle off
      } else {
        params.set(key, value);
      }
    } else {
      params.delete(key);
    }
    router.push(`/products?${params.toString()}`);
  };

  const categories: Category[] = [
    "Bottles",
    "Jars",
    "Closures",
    "Jugs",
    "Vials",
  ];
  const materials: Material[] = ["Glass", "PET", "HDPE", "Aluminum"];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-industrial-900 mb-4 pb-2 border-b border-industrial-200">
          Container Type
        </h3>
        <ul className="space-y-2">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => updateFilter("category", cat)}
                className={`text-sm w-full text-left transition-colors ${
                  currentCategory === cat
                    ? "font-bold text-action"
                    : "text-industrial-600 hover:text-industrial-900"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3 className="text-sm font-bold uppercase tracking-wider text-industrial-900 mb-4 pb-2 border-b border-industrial-200">
          Material
        </h3>
        <ul className="space-y-2">
          {materials.map((mat) => (
            <li key={mat}>
              <button
                onClick={() => updateFilter("material", mat)}
                className={`flex items-center text-sm w-full text-left transition-colors ${
                  currentMaterial === mat
                    ? "font-bold text-action"
                    : "text-industrial-600 hover:text-industrial-900"
                }`}
              >
                <span
                  className={`w-3 h-3 mr-2 border ${
                    currentMaterial === mat
                      ? "bg-action border-action"
                      : "border-industrial-300"
                  }`}
                ></span>
                {mat}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {(currentCategory || currentMaterial) && (
        <button
          onClick={() => router.push("/products")}
          className="text-xs text-industrial-500 hover:text-industrial-900 underline decoration-industrial-300 underline-offset-4"
        >
          Clear All Filters
        </button>
      )}
    </div>
  );
}
