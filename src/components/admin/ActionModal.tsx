import React, { useEffect } from "react";
import { X, AlertTriangle, Wand2, Trash2 } from "lucide-react";

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText: string;
  type?: "danger" | "warning" | "magic";
  isLoading?: boolean;
}

export default function ActionModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
  type = "warning",
  isLoading = false,
}: ActionModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const IconMap = {
    danger: Trash2,
    warning: AlertTriangle,
    magic: Wand2,
  };

  const ColorMap = {
    danger: {
      bg: "bg-red-50",
      text: "text-red-600",
      border: "border-red-100",
      btn: "bg-red-600 hover:bg-red-700 text-white",
    },
    warning: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-100",
      btn: "bg-amber-600 hover:bg-amber-700 text-white",
    },
    magic: {
      bg: "bg-purple-50",
      text: "text-purple-600",
      border: "border-purple-100",
      btn: "bg-purple-600 hover:bg-purple-700 text-white shadow-md shadow-purple-900/10",
    },
  };

  const Icon = IconMap[type];
  const colors = ColorMap[type];

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden relative"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${colors.bg} ${colors.text} border ${colors.border}`}>
            <Icon className="w-6 h-6" />
          </div>
          
          <h2 className="text-xl font-bold text-slate-900 mb-2">
            {title}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-8">
            {message}
          </p>

          <div className="flex gap-3 justify-end">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2 text-slate-700 font-medium hover:bg-slate-50 rounded-lg transition-colors border border-slate-200 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${colors.btn} disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Processing...
                </>
              ) : (
                confirmText
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
