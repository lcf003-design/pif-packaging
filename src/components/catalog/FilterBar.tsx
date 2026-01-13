"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { ChevronDown, X, Check } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Material, Category } from "@/types";

type FilterType = "Category" | "Material" | "Color" | "Shape" | "Neck Finish";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [openDropdown, setOpenDropdown] = useState<FilterType | null>(null);
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
    router.push(`?${params.toString()}`);
    setOpenDropdown(null);
  };

  // --- options ---
  const materials: Material[] = [
    "Glass",
    "PET",
    "HDPE",
    "Aluminum",
    "Tinplate",
    "PP",
  ];
  const colors = [
    "Amber",
    "Blue",
    "Clear",
    "Green",
    "White",
    "Black",
    "Natural",
    "Silver",
    "Gold",
  ];
  const shapes = [
    "Boston Round",
    "Cylinder",
    "Square",
    "Straight Sided",
    "Oval",
    "F-Style",
  ];
  const necks = [
    "18-400",
    "20-400",
    "24-410",
    "28-400",
    "38-400",
    "53-400",
    "70-400",
    "89-400",
  ];

  // Helper to check active state
  const isActive = (key: string, value: string) =>
    searchParams.get(key) === value;

  // Active filters list for chips
  const activeFilters: { key: string; label: string; value: string }[] = [];
  searchParams.forEach((value, key) => {
    if (["material", "color", "shape", "neck"].includes(key)) {
      activeFilters.push({ key, label: key, value });
    }
  });

  const clearAll = () => {
    router.push("?");
  };

  return (
    <div className="w-full mb-8 relative z-20" ref={dropdownRef}>
      {/* Top Row: Dropdown Buttons */}
      <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-industrial-200">
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
              {materials.map((m) => (
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
              {colors.map((c) => (
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
              {shapes.map((s) => (
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
              {necks.map((n) => (
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
        <button className="flex items-center gap-2 px-4 py-2 bg-berlin-red hover:bg-red-700 text-white rounded-md text-sm font-bold transition-colors ml-auto">
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
    </div>
  );
}
