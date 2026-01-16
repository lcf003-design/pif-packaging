"use client";

import React from "react";
import { X, FileText, CheckCircle2, AlertOctagon, Anchor } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export interface PPESpecData {
  id: string;
  title: string;
  category: string;
  description: string;
  specs: { label: string; value: string }[];
  compliance: string[];
  packaging: {
    caseCount: string;
    palletCount: string;
    moq: string;
  };
}

interface PPESpecModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: PPESpecData | null;
}

export default function PPESpecModal({
  isOpen,
  onClose,
  data,
}: PPESpecModalProps) {
  if (!isOpen || !data) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700 bg-slate-950/50">
            <div>
              <div className="text-xs font-mono text-blue-400 uppercase tracking-widest mb-1">
                {data.category}
              </div>
              <h2 className="text-2xl font-bold text-white">{data.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content Scrollable Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Left Column: Description & Compliance */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-blue-400" /> Description
                </h3>
                <p className="text-slate-400 leading-relaxed mb-8">
                  {data.description}
                </p>

                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />{" "}
                  Compliance & Standards
                </h3>
                <ul className="space-y-3 mb-8">
                  {data.compliance.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-center gap-3 text-slate-300 bg-slate-800/50 px-3 py-2 rounded border border-slate-800"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Tech Specs Table */}
              <div>
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <AlertOctagon className="w-5 h-5 text-amber-500" /> Technical
                  Specifications
                </h3>
                <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden mb-8">
                  <table className="w-full text-sm">
                    <tbody>
                      {data.specs.map((spec, idx) => (
                        <tr
                          key={idx}
                          className="border-b border-slate-800 last:border-0"
                        >
                          <td className="px-4 py-3 text-slate-500 font-mono bg-slate-900/30 w-1/3">
                            {spec.label}
                          </td>
                          <td className="px-4 py-3 text-slate-200 font-medium">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                  <Anchor className="w-5 h-5 text-purple-500" /> Formatting &
                  Logistics
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-center">
                    <div className="text-slate-400 text-xs uppercase mb-1">
                      Case Count
                    </div>
                    <div className="text-white font-bold text-lg">
                      {data.packaging.caseCount}
                    </div>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-center">
                    <div className="text-slate-400 text-xs uppercase mb-1">
                      Pallet
                    </div>
                    <div className="text-white font-bold text-lg">
                      {data.packaging.palletCount}
                    </div>
                  </div>
                  <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-center">
                    <div className="text-slate-400 text-xs uppercase mb-1">
                      MOQ
                    </div>
                    <div className="text-white font-bold text-lg">
                      {data.packaging.moq}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-700 bg-slate-950/50 flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-6 py-3 font-bold text-slate-400 hover:text-white transition-colors"
            >
              Close
            </button>
            <Link
              href={`/contact?subject=Bulk Quote: ${data.title}`}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-blue-900/20 transition-all flex items-center gap-2"
            >
              Request Manufacturer Quote
            </Link>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
