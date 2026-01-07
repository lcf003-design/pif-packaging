"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Category, Material } from "@/types";
import { ChevronDown, ChevronUp, Check, X } from "lucide-react";
import { useState } from "react";

export default function FilterSidebar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State for collapsible sections
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    category: true,
    material: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

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

  // Helper to get swatch color for materials
  const getMaterialColor = (mat: Material) => {
    switch (mat) {
      case "Glass":
        return "bg-blue-100 border-blue-200";
      case "Aluminum":
        return "bg-gray-300 border-gray-400";
      case "PET":
        return "bg-transparent border-industrial-300"; // Clear/White
      case "HDPE":
        return "bg-white border-industrial-200"; // Opaque White
      default:
        return "bg-gray-100";
    }
  };

  return (
    <div className="space-y-6 w-64 flex-shrink-0">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-industrial-200">
        <h2 className="text-lg font-bold text-industrial-900">Filters</h2>
        {(currentCategory || currentMaterial) && (
          <button
            onClick={() => router.push("/products")}
            className="text-xs font-medium text-action hover:text-red-700 flex items-center gap-1"
          >
            Clear All <X className="w-3 h-3" />
          </button>
        )}
      </div>

      {/* Container Type Section */}
      <div className="border-b border-industrial-100 pb-6">
        <button
          onClick={() => toggleSection("category")}
          className="w-full flex items-center justify-between group mb-4"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-500 group-hover:text-industrial-900 transition-colors">
            Container Type
          </h3>
          {openSections["category"] ? (
            <ChevronUp className="w-4 h-4 text-industrial-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-industrial-400" />
          )}
        </button>

        {openSections["category"] && (
          <div className="space-y-2 animate-in slide-in-from-top-2 duration-200">
            {categories.map((cat) => {
              const isActive = currentCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => updateFilter("category", cat)}
                  className={`w-full flex items-center justify-between group px-3 py-2 rounded-md border text-sm transition-all duration-200 ${
                    isActive
                      ? "bg-industrial-900 border-industrial-900 text-white shadow-md"
                      : "bg-white border-industrial-200 text-industrial-600 hover:border-industrial-300 hover:bg-industrial-50"
                  }`}
                >
                  <span className={isActive ? "font-medium" : ""}>{cat}</span>
                  {isActive && <Check className="w-3.5 h-3.5" />}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Material Section */}
      <div className="border-b border-industrial-100 pb-6">
        <button
          onClick={() => toggleSection("material")}
          className="w-full flex items-center justify-between group mb-4"
        >
          <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-500 group-hover:text-industrial-900 transition-colors">
            Material
          </h3>
          {openSections["material"] ? (
            <ChevronUp className="w-4 h-4 text-industrial-400" />
          ) : (
            <ChevronDown className="w-4 h-4 text-industrial-400" />
          )}
        </button>

        {openSections["material"] && (
          <div className="grid grid-cols-2 gap-2 animate-in slide-in-from-top-2 duration-200">
            {materials.map((mat) => {
              const isActive = currentMaterial === mat;
              return (
                <button
                  key={mat}
                  onClick={() => updateFilter("material", mat)}
                  className={`relative flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all duration-200 ${
                    isActive
                      ? "bg-industrial-50 border-action ring-1 ring-action/20"
                      : "bg-white border-industrial-200 hover:border-industrial-300 hover:shadow-sm"
                  }`}
                >
                  {/* Color Swatch */}
                  <div
                    className={`w-8 h-8 rounded-full shadow-inner ${getMaterialColor(
                      mat
                    )}`}
                  />
                  <span
                    className={`text-xs ${
                      isActive
                        ? "font-bold text-industrial-900"
                        : "text-industrial-600"
                    }`}
                  >
                    {mat}
                  </span>
                  {/* Active Indicator */}
                  {isActive && (
                    <div className="absolute top-2 right-2 text-action">
                      <Check className="w-3 h-3" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
