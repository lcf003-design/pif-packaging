"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ChevronDown, X, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Material, Category } from "@/types";
import {
  MATERIALS,
  COLORS,
  SHAPES,
  INDUSTRIES,
  NECK_FINISH_TYPES,
  COMMON_CAPACITIES,
  CAP_SIZES,
} from "@/data/constants";

type FilterType =
  | "Category"
  | "Material"
  | "Color"
  | "Shape"
  | "Neck Finish"
  | "Capacity"
  | "Industry";

import { createPortal } from "react-dom";

export default function FilterBar() {
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
      ["material", "color", "shape", "neck", "capacity", "industry"].includes(
        key
      )
    ) {
      activeFilters.push({ key, label: key, value });
    }
  });

  const clearAll = () => {
    router.push("?");
  };

  return (
    <div className="w-full mb-8 relative z-30" ref={dropdownRef}>
      {/* Top Row: Dropdown Buttons */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-industrial-200">
        {/* Capacity (Priority) */}
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
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-industrial-200 rounded-lg shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
              {COMMON_CAPACITIES.map((c: any) => (
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

        {/* Industry (Secondary) */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("Industry")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-bold transition-all ${
              openDropdown === "Industry"
                ? "border-industrial-900 bg-industrial-900 text-white"
                : "border-industrial-200 bg-white text-industrial-700 hover:border-industrial-400"
            }`}
          >
            Industry
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                openDropdown === "Industry" ? "rotate-180" : ""
              }`}
            />
          </button>

          {openDropdown === "Industry" && (
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-industrial-200 rounded-lg shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
              {INDUSTRIES.map((ind: string) => (
                <button
                  key={ind}
                  onClick={() => updateFilter("industry", ind)}
                  className="flex items-center justify-between w-full px-3 py-2 text-sm text-left rounded-md hover:bg-industrial-50 text-industrial-700"
                >
                  {ind}
                  {isActive("industry", ind) && (
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
            className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-bold transition-all ${
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
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-industrial-200 rounded-lg shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
              {MATERIALS.map((m: string) => (
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

        {/* Color */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("Color")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-bold transition-all ${
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
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-industrial-200 rounded-lg shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
              {COLORS.map((c: string) => (
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

        {/* Shape */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("Shape")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-bold transition-all ${
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
            <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-industrial-200 rounded-lg shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
              {SHAPES.map((s: string) => (
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

        {/* Neck Finish */}
        <div className="relative">
          <button
            onClick={() => toggleDropdown("Neck Finish")}
            className={`flex items-center gap-2 px-4 py-2 border rounded-full text-sm font-bold transition-all ${
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
            <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-industrial-200 rounded-lg shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 origin-top-left">
              {CAP_SIZES.map((n: string) => (
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

        {/* See All Filters (Red Button) */}
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

      {/* Mobile/All Filters Sidebar Drawer */}
      {isSidebarOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-[100] backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setIsSidebarOpen(false)}
          />

          {/* Sidebar */}
          <div className="fixed top-[65px] right-0 h-[calc(100vh-65px)] w-80 bg-white z-[101] shadow-2xl p-6 overflow-y-auto animate-in slide-in-from-right duration-300 border-l border-industrial-200">
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

            <div className="space-y-8">
              {/* Capacity Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-500">
                  Capacity
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {COMMON_CAPACITIES.map((c: any) => (
                    <button
                      key={c.value}
                      onClick={() =>
                        updateFilter("capacity", c.value.toString())
                      }
                      className={`px-3 py-2 text-xs font-medium border rounded-md text-left transition-colors ${
                        isActive("capacity", c.value.toString())
                          ? "bg-industrial-900 text-white border-industrial-900"
                          : "bg-white text-industrial-600 border-industrial-200 hover:border-industrial-400"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Industry Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-500">
                  Industry
                </h3>
                <div className="flex flex-wrap gap-2">
                  {INDUSTRIES.map((ind: string) => (
                    <button
                      key={ind}
                      onClick={() => updateFilter("industry", ind)}
                      className={`px-3 py-1.5 text-xs font-medium border rounded-full transition-colors ${
                        isActive("industry", ind)
                          ? "bg-industrial-900 text-white border-industrial-900"
                          : "bg-white text-industrial-600 border-industrial-200 hover:border-industrial-400"
                      }`}
                    >
                      {ind}
                    </button>
                  ))}
                </div>
              </div>

              {/* Material Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-500">
                  Material
                </h3>
                <div className="flex flex-wrap gap-2">
                  {MATERIALS.map((m: string) => (
                    <button
                      key={m}
                      onClick={() => updateFilter("material", m)}
                      className={`px-3 py-1.5 text-xs font-medium border rounded-full transition-colors ${
                        isActive("material", m)
                          ? "bg-industrial-900 text-white border-industrial-900"
                          : "bg-white text-industrial-600 border-industrial-200 hover:border-industrial-400"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* Shape Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-500">
                  Shape
                </h3>
                <div className="flex flex-wrap gap-2">
                  {SHAPES.map((s: string) => (
                    <button
                      key={s}
                      onClick={() => updateFilter("shape", s)}
                      className={`px-3 py-1.5 text-xs font-medium border rounded-full transition-colors ${
                        isActive("shape", s)
                          ? "bg-industrial-900 text-white border-industrial-900"
                          : "bg-white text-industrial-600 border-industrial-200 hover:border-industrial-400"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Section */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-industrial-500">
                  Color
                </h3>
                <div className="flex flex-wrap gap-2">
                  {COLORS.map((c: string) => (
                    <button
                      key={c}
                      onClick={() => updateFilter("color", c)}
                      className={`px-3 py-1.5 text-xs font-medium border rounded-full transition-colors ${
                        isActive("color", c)
                          ? "bg-industrial-900 text-white border-industrial-900"
                          : "bg-white text-industrial-600 border-industrial-200 hover:border-industrial-400"
                      }`}
                    >
                      {c}
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
