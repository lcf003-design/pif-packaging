import React, { useState } from "react";
import { X, Loader2, AlertCircle } from "lucide-react";
import { Product } from "@/types";
import { CATEGORIES, INDUSTRIES } from "@/data/constants";
import { bulkUpdateProducts } from "@/services/productService";

interface BulkEditModalProps {
  selectedIds: Set<string>;
  onClose: () => void;
  onSuccess: () => void;
}

type FieldType = "category" | "material" | "color" | "industry" | "";

export default function BulkEditModal({
  selectedIds,
  onClose,
  onSuccess,
}: BulkEditModalProps) {
  const [field, setField] = useState<FieldType>("");
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    if (!field || !value) return;
    setLoading(true);
    setError("");

    try {
      const updates: Partial<Product> = {};

      if (field === "industry") {
        // For industry, we might ideally want to add/remove, but for simple bulk edit,
        // let's assume we are APPENDING or REPLACING?
        // Simpler for now: Single select replaces the array OR adds to it?
        // Let's implement REPLACE for simplicity and consistency with other fields,
        // or array-contains logic is hard.
        // Better UX: "Add Industry" vs "Set Industry".
        // Let's stick to "Set Industry" (overwrite) for MVP, or just single string fields.

        // Wait, typical bulk edit replaces the value.
        // If it's an array field, we need to be careful.
        // Let's coerce to array.
        updates[field] = [value as any];
      } else if (field === "category") {
        updates[field] = value as any;
      } else {
        updates[field] = value;
      }

      await bulkUpdateProducts(Array.from(selectedIds), updates);
      onSuccess();
      onClose();
    } catch (err) {
      console.error(err);
      setError("Failed to update products. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Bulk Edit</h2>
            <p className="text-sm text-slate-500">
              Editing {selectedIds.size} products
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* FIELD SELECTOR */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              Field to Update
            </label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berlin-blue focus:border-transparent"
              value={field}
              onChange={(e) => {
                setField(e.target.value as FieldType);
                setValue(""); // Reset value on field change
              }}
            >
              <option value="" disabled>
                Select a field...
              </option>
              <option value="category">Category</option>
              <option value="material">Material</option>
              <option value="color">Color</option>
              <option value="industry">Industry (Set Primary)</option>
            </select>
          </div>

          {/* VALUE INPUT */}
          {field && (
            <div className="animate-in slide-in-from-top-2 duration-200">
              <label className="block text-sm font-bold text-slate-700 mb-2">
                New Value for {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>

              {field === "category" ? (
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berlin-blue"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                >
                  <option value="" disabled>
                    Select Category...
                  </option>
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              ) : field === "industry" ? (
                <select
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berlin-blue"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                >
                  <option value="" disabled>
                    Select Industry...
                  </option>
                  {INDUSTRIES.map((i) => (
                    <option key={i} value={i}>
                      {i}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type="text"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-berlin-blue"
                  placeholder={`Enter new ${field}...`}
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                />
              )}

              <p className="text-xs text-amber-600 mt-2 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                This will overwrite the {field} for all selected items.
              </p>
            </div>
          )}

          {error && (
            <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              {error}
            </div>
          )}
        </div>

        <div className="p-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-slate-600 font-bold hover:bg-gray-200 rounded-lg transition-colors"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            disabled={!field || !value || loading}
            className="flex items-center gap-2 px-6 py-2 bg-berlin-blue text-white font-bold rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-blue-900/10"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Update {selectedIds.size} Items
          </button>
        </div>
      </div>
    </div>
  );
}
