"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ChevronDown, X, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import {
  MATERIALS,
  COLORS,
  SHAPES,
  INDUSTRIES,
  COMMON_CAPACITIES,
  CAP_SIZES,
  CATEGORIES,
} from "@/data/constants";

type FilterType =
  | "Category"
  | "Material"
  | "Color"
  | "Shape"
  | "Neck Finish"
  | "Capacity"
  | "Industry";

interface Facets {
  materials: string[];
  categories: string[];
  industries: string[];
  colors: string[];
  shapes: string[];
  neckFinishes: string[];
  capacities: string[];
}

export default function FilterBar({ facets }: { facets?: Facets }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openDropdown, setOpenDropdown] = useState<FilterType | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpenDropdown(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    setMounted(true); // Enable portal on mount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = (filter: FilterType) => {
    if (openDropdown === filter) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(filter);
    }
  };

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
    setOpenDropdown(null);
  };

  // Helper to check active state
  const isActive = (key: string, value: string) =>
    searchParams.get(key) === value.toString();

  // Active filters list for chips
  const activeFilters: { key: string; label: string; value: string }[] = [];
  searchParams.forEach((value, key) => {
    if (
      [
        "category",
        "material",
        "color",
        "shape",
        "neck",
        "capacity",
        "industry",
      ].includes(key)
    ) {
      activeFilters.push({ key, label: key, value });
    }
  });

  const clearAll = () => {
    router.push("/products");
  };

  // --- DYNAMIC FILTER LISTS ---
  // If facets are provided, use them. Otherwise fallback to constants (or empty).
  // We INTERSECT constants with facets to maintain Order but hide unused.

  const getVisibleOptions = (
    allOptions: string[] | any[],
    facetList?: string[]
  ) => {
    if (!facetList || facetList.length === 0) return allOptions; // Show all if no facets yet (or show none? User wants 'advanced', likely show only real)
    // Actually, if we have facets, filtering is better.
    // However, for complex objects like Capacities locally defined, we need to match carefully.
    return allOptions.filter((opt) => {
      const val = typeof opt === "string" ? opt : opt.value.toString();
      return facetList.includes(val);
    });
  };

  const visibleCategories = getVisibleOptions(CATEGORIES, facets?.categories);
  const visibleMaterials = getVisibleOptions(MATERIALS, facets?.materials);
  const visibleColors = getVisibleOptions(COLORS, facets?.colors);
  const visibleShapes = getVisibleOptions(SHAPES, facets?.shapes);
  const visibleNeck = getVisibleOptions(CAP_SIZES, facets?.neckFinishes); // CAP_SIZES maps to neck finish
  const visibleIndustries = getVisibleOptions(INDUSTRIES, facets?.industries);
  const visibleCapacities = getVisibleOptions(
    COMMON_CAPACITIES,
    facets?.capacities
  );

  return (
    <div className="w-full mb-8 relative z-30" ref={dropdownRef}>
      {/* Top Row: Dropdown Buttons */}
      <div className="flex flex-nowrap overflow-x-auto items-center gap-2 pb-4 border-b border-industrial-200 mask-fade-right px-4 -mx-4 no-scrollbar">
        {/* Container Type (Category) - NOW ADDED */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("Category")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-bold transition-all ${
              openDropdown === "Category"
                ? "border-industrial-900 bg-industrial-900 text-white"
                : "border-industrial-200 bg-white text-industrial-700 hover:border-industrial-400"
            }`}
          >
            Container
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openDropdown === "Category" ? "rotate-180" : ""
              }`}
            />
          </button>
          {openDropdown === "Category" && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-industrial-200 rounded-lg shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left max-h-64 overflow-y-auto">
              {visibleCategories.map((c: string) => (
                <button
                  key={c}
                  onClick={() => updateFilter("category", c)}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-left rounded-md hover:bg-industrial-50 text-industrial-700"
                >
                  {c}
                  {isActive("category", c) && (
                    <Check className="w-4 h-4 text-berlin-red" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Capacity */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("Capacity")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-bold transition-all ${
              openDropdown === "Capacity"
                ? "border-industrial-900 bg-industrial-900 text-white"
                : "border-industrial-200 bg-white text-industrial-700 hover:border-industrial-400"
            }`}
          >
            Capacity
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openDropdown === "Capacity" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openDropdown === "Capacity" && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-industrial-200 rounded-lg shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left max-h-64 overflow-y-auto">
              {visibleCapacities.map((c: any) => (
                <button
                  key={c.value}
                  onClick={() => updateFilter("capacity", c.value.toString())}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-left rounded-md hover:bg-industrial-50 text-industrial-700"
                >
                  {c.label}
                  {isActive("capacity", c.value.toString()) && (
                    <Check className="w-4 h-4 text-berlin-red" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Material */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("Material")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              openDropdown === "Material"
                ? "border-industrial-900 bg-industrial-900 text-white"
                : "border-industrial-200 bg-white text-industrial-700 hover:border-industrial-400"
            }`}
          >
            Material
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openDropdown === "Material" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openDropdown === "Material" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-industrial-200 rounded-lg shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left max-h-64 overflow-y-auto">
              {visibleMaterials.map((m: string) => (
                <button
                  key={m}
                  onClick={() => updateFilter("material", m)}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-left rounded-md hover:bg-industrial-50 text-industrial-700"
                >
                  {m}
                  {isActive("material", m) && (
                    <Check className="w-4 h-4 text-berlin-red" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Shape */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("Shape")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              openDropdown === "Shape"
                ? "border-industrial-900 bg-industrial-900 text-white"
                : "border-industrial-200 bg-white text-industrial-700 hover:border-industrial-400"
            }`}
          >
            Shape
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openDropdown === "Shape" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openDropdown === "Shape" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-industrial-200 rounded-lg shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left max-h-64 overflow-y-auto">
              {visibleShapes.map((s: string) => (
                <button
                  key={s}
                  onClick={() => updateFilter("shape", s)}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-left rounded-md hover:bg-industrial-50 text-industrial-700"
                >
                  {s}
                  {isActive("shape", s) && (
                    <Check className="w-4 h-4 text-berlin-red" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Color */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("Color")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              openDropdown === "Color"
                ? "border-industrial-900 bg-industrial-900 text-white"
                : "border-industrial-200 bg-white text-industrial-700 hover:border-industrial-400"
            }`}
          >
            Color
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openDropdown === "Color" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openDropdown === "Color" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-industrial-200 rounded-lg shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left max-h-64 overflow-y-auto">
              {visibleColors.map((c: string) => (
                <button
                  key={c}
                  onClick={() => updateFilter("color", c)}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-left rounded-md hover:bg-industrial-50 text-industrial-700"
                >
                  {c}
                  {isActive("color", c) && (
                    <Check className="w-4 h-4 text-berlin-red" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Neck Finish */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("Neck Finish")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-bold transition-all whitespace-nowrap ${
              openDropdown === "Neck Finish"
                ? "border-industrial-900 bg-industrial-900 text-white"
                : "border-industrial-200 bg-white text-industrial-700 hover:border-industrial-400"
            }`}
          >
            Neck Finish
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openDropdown === "Neck Finish" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openDropdown === "Neck Finish" && (
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-industrial-200 rounded-lg shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left max-h-64 overflow-y-auto">
              {visibleNeck.map((n: string) => (
                <button
                  key={n}
                  onClick={() => updateFilter("neck", n)}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-left rounded-md hover:bg-industrial-50 text-industrial-700"
                >
                  {n}
                  {isActive("neck", n) && (
                    <Check className="w-4 h-4 text-berlin-red" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* More Filters / All Filters Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-berlin-red hover:bg-red-700 text-white rounded-md text-sm font-bold transition-colors ml-auto"
        >
          All Filters
        </button>

        {activeFilters.length > 0 && (
          <button
            onClick={clearAll}
            className="text-sm font-bold text-berlin-red hover:text-red-800 underline ml-2"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Active Filter Chips */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 pt-4">
          <span className="text-xs text-industrial-500 font-medium mr-2">
            Active Filters:
          </span>
          {activeFilters.map((f) => (
            <div
              key={`${f.key}-${f.value}`}
              className="flex items-center gap-1.5 px-3 py-1 bg-industrial-100 text-industrial-800 text-xs font-bold rounded-full border border-industrial-200 group"
            >
              <span className="capitalize">{f.value}</span>
              <button
                onClick={() => updateFilter(f.key, null)}
                className="p-0.5 rounded-full hover:bg-industrial-200 text-industrial-500 hover:text-industrial-900"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* SIDEBAR DRAWER - REFACTORED TO HORIZONTAL SCROLLING TABS */}
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed top-[65px] right-0 h-[calc(100vh-65px)] w-full md:w-96 bg-white z-[101] shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-industrial-200">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-industrial-100">
              <h2 className="text-xl font-black text-industrial-900 uppercase tracking-tight">
                All Filters
              </h2>
              <button
                onClick={() => setIsSidebarOpen(false)}
                className="p-2 hover:bg-industrial-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-industrial-500" />
              </button>
            </div>

            <div className="space-y-8 pb-32">
              {/* Category (Container Type) */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-500">
                  Container Type
                </h3>
                <div className="flex overflow-x-auto gap-2 pb-2 -mx-2 px-2 no-scrollbar mask-fade-right">
                  {visibleCategories.map((c: string) => (
                    <button
                      key={c}
                      onClick={() => updateFilter("category", c)}
                      className={`whitespace-nowrap px-4 py-2 text-xs font-bold border rounded-full transition-colors flex-shrink-0 ${
                        isActive("category", c)
                          ? "bg-industrial-900 text-white border-industrial-900"
                          : "bg-white text-industrial-600 border-industrial-200 hover:border-berlin-blue"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-500">
                  Material
                </h3>
                <div className="flex overflow-x-auto gap-2 pb-2 -mx-2 px-2 no-scrollbar">
                  {visibleMaterials.map((m: string) => (
                    <button
                      key={m}
                      onClick={() => updateFilter("material", m)}
                      className={`whitespace-nowrap px-4 py-2 text-xs font-bold border rounded-full transition-colors flex-shrink-0 ${
                        isActive("material", m)
                          ? "bg-industrial-900 text-white border-industrial-900"
                          : "bg-white text-industrial-600 border-industrial-200 hover:border-berlin-blue"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Capacity */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-500">
                  Capacity
                </h3>
                <div className="flex overflow-x-auto gap-2 pb-2 -mx-2 px-2 no-scrollbar">
                  {visibleCapacities.map((c: any) => (
                    <button
                      key={c.value}
                      onClick={() =>
                        updateFilter("capacity", c.value.toString())
                      }
                      className={`whitespace-nowrap px-4 py-2 text-xs font-bold border rounded-full transition-colors flex-shrink-0 ${
                        isActive("capacity", c.value.toString())
                          ? "bg-industrial-900 text-white border-industrial-900"
                          : "bg-white text-industrial-600 border-industrial-200 hover:border-berlin-blue"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shape */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-500">
                  Shape
                </h3>
                <div className="flex overflow-x-auto gap-2 pb-2 -mx-2 px-2 no-scrollbar">
                  {visibleShapes.map((s: string) => (
                    <button
                      key={s}
                      onClick={() => updateFilter("shape", s)}
                      className={`whitespace-nowrap px-4 py-2 text-xs font-bold border rounded-full transition-colors flex-shrink-0 ${
                        isActive("shape", s)
                          ? "bg-industrial-900 text-white border-industrial-900"
                          : "bg-white text-industrial-600 border-industrial-200 hover:border-berlin-blue"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-500">
                  Color
                </h3>
                <div className="flex overflow-x-auto gap-2 pb-2 -mx-2 px-2 no-scrollbar">
                  {visibleColors.map((c: string) => (
                    <button
                      key={c}
                      onClick={() => updateFilter("color", c)}
                      className={`whitespace-nowrap px-4 py-2 text-xs font-bold border rounded-full transition-colors flex-shrink-0 ${
                        isActive("color", c)
                          ? "bg-industrial-900 text-white border-industrial-900"
                          : "bg-white text-industrial-600 border-industrial-200 hover:border-berlin-blue"
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Neck Finish */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-500">
                  Neck Finish
                </h3>
                <div className="flex overflow-x-auto gap-2 pb-2 -mx-2 px-2 no-scrollbar">
                  {visibleNeck.map((n: string) => (
                    <button
                      key={n}
                      onClick={() => updateFilter("neck", n)}
                      className={`whitespace-nowrap px-4 py-2 text-xs font-bold border rounded-full transition-colors flex-shrink-0 ${
                        isActive("neck", n)
                          ? "bg-industrial-900 text-white border-industrial-900"
                          : "bg-white text-industrial-600 border-industrial-200 hover:border-berlin-blue"
                      }`}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              {/* Industry */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-500">
                  Industry
                </h3>
                <div className="flex overflow-x-auto gap-2 pb-2 -mx-2 px-2 no-scrollbar">
                  {visibleIndustries.map((ind: string) => (
                    <button
                      key={ind}
                      onClick={() => updateFilter("industry", ind)}
                      className={`whitespace-nowrap px-4 py-2 text-xs font-bold border rounded-full transition-colors flex-shrink-0 ${
                        isActive("industry", ind)
                          ? "bg-industrial-900 text-white border-industrial-900"
                          : "bg-white text-industrial-600 border-industrial-200 hover:border-berlin-blue"
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
