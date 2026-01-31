"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Shield,
  Truck,
  AlertOctagon,
  CheckCircle2,
  Globe,
  Anchor,
  Plane,
  History as HistoryIcon,
  Activity,
  Syringe,
  Microscope,
  Stethoscope,
} from "lucide-react";
import PPESpecModal, { PPESpecData } from "@/components/ppe/PPESpecModal";

// --- PRODUCT DATA 1: PPE ---
const PPE_PRODUCTS: PPESpecData[] = [
  {
    id: "nitrile-gloves",
    title: "Nitrile Examination Gloves",
    category: "Hand Protection",
    description:
      "Medical-grade, powder-free nitrile examination gloves offering superior puncture resistance and tactical sensitivity. Optimized for high-risk environments and chemical handling.",
    specs: [
      { label: "Material", value: "100% Synthetic Nitrile" },
      { label: "Thickness", value: "3.5mil (Palm) / 4.2mil (Finger)" },
      { label: "Surface", value: "Textured Fingertips" },
      { label: "Color", value: "Medical Blue" },
    ],
    compliance: ["ASTM D6319 Standard", "FDA 510(k) Cleared", "Chemo Rated"],
    packaging: {
      caseCount: "1,000 pcs (10/100)",
      palletCount: "96 Cases",
      moq: "1 Container",
    },
  },
  {
    id: "n95-respirator",
    title: "N95 Particulate Respirator",
    category: "Respiratory",
    description:
      "NIOSH-approved particulate respirator designed to provide at least 95% filtration efficiency against non-oil based particles. Features a collapse-resistant shell.",
    specs: [
      { label: "Filter Type", value: "Electrostatically Charged Meltblown" },
      { label: "Style", value: "Foldable / Cup Shape" },
      { label: "Fluid Resistance", value: "160 mmHg (ASTM F1862)" },
    ],
    compliance: ["NIOSH Approved (TC-84A)", "FDA Cleared Surgical Mask"],
    packaging: {
      caseCount: "240 pcs (12/20)",
      palletCount: "40 Cases",
      moq: "1 Pallet",
    },
  },
  {
    id: "isolation-gown",
    title: "AAMI Level 2 Isolation Gown",
    category: "Body Protection",
    description:
      "High-quality SMS material isolation gown providing reliable fluid resistance for low-to-moderate risk scenarios.",
    specs: [
      { label: "Material", value: "Multi-layer SMS" },
      { label: "Weight", value: "40 GSM" },
      { label: "Closure", value: "Neck & Waist Ties" },
    ],
    compliance: ["AAMI Level 2", "FDA Registered Class 1"],
    packaging: {
      caseCount: "100 pcs",
      palletCount: "40 Cases",
      moq: "1 Pallet",
    },
  },
];

// --- PRODUCT DATA 2: CLINICAL CONSUMABLES ---
const CLINICAL_PRODUCTS: PPESpecData[] = [
  {
    id: "luer-lock-syringe",
    title: "3mL Luer Lock Syringe",
    category: "Syringes & Sharps",
    description:
      "High-clarity polypropylene barrel with precision-glide plunger. Standard Luer Lock mechanism ensures secure needle attachment.",
    specs: [
      { label: "Volume", value: "3mL / 3cc" },
      { label: "Tip Type", value: "Luer Lock" },
      { label: "Material", value: "Medical Grade PP" },
    ],
    compliance: ["ISO 7886-1", "Latex Free", "DEHP Free"],
    packaging: {
      caseCount: "2,000 pcs",
      palletCount: "30 Cases",
      moq: "1 Pallet",
    },
  },
  {
    id: "specimen-cup",
    title: "Sterile Specimen Container",
    category: "Specimen Collection",
    description:
      "4oz (120ml) sterile specimen cups with leak-proof screw cap and tamper-evident seal. Ideal for comprehensive diagnostic collection.",
    specs: [
      { label: "Capacity", value: "4oz / 120ml" },
      { label: "Sterility", value: "Gamma Irradiated" },
      { label: "Label", value: "Patient ID Area" },
    ],
    compliance: ["Leak-Proof Tested", "ISO 13485 Mfg"],
    packaging: {
      caseCount: "500 pcs",
      palletCount: "20 Cases",
      moq: "1 Pallet",
    },
  },
  {
    id: "biohazard-bag",
    title: "Red Biohazard Bag",
    category: "Waste Management",
    description:
      "Heavy-duty LDPE biohazard liners with high puncture resistance. Star-sealed bottom for maximum load capacity.",
    specs: [
      { label: "Size", value: "24x24 / 10 Gallon" },
      { label: "Thickness", value: "1.5 Mil" },
      { label: "Printing", value: "Biohazard Symbol (OSHA)" },
    ],
    compliance: ["ASTM D1709 (Impact)", "ASTM D1922 (Tear)"],
    packaging: {
      caseCount: "500 pcs",
      palletCount: "48 Cases",
      moq: "1 Pallet",
    },
  },
];

export default function MedicalPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<PPESpecData | null>(
    null,
  );

  const handleOpenSpecs = (id: string, type: "ppe" | "clinical") => {
    const list = type === "ppe" ? PPE_PRODUCTS : CLINICAL_PRODUCTS;
    const product = list.find((p) => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-blue-200 selection:text-blue-900">
      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-white">
        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-bold mb-8 uppercase tracking-widest animate-fade-in-up">
            <Activity className="w-4 h-4" />
            <span>Medical & Clinical Division</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-slate-900">
            Clinical Precision <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              At Scale.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-medium mb-12">
            High-volume manufacturing of medical-grade PPE and clinical
            consumables. FDA registered. ISO 13485 certified.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/medical/products"
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/20"
            >
              View Products
            </Link>
            <Link
              href="/contact?subject=Medical%20Inquiry"
              className="px-8 py-4 bg-white border border-slate-200 text-slate-700 font-bold rounded-full hover:bg-slate-50 transition-all shadow-sm"
            >
              Request Quote
            </Link>
          </div>
        </div>
      </section>

      {/* STRATEGIC INFRASTRUCTURE */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Strategic Healthcare Infrastructure
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Beyond standard manufacturing. We provide a fortified supply chain
            for critical healthcare systems, ensuring readiness and redundancy.
          </p>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Plane className="w-8 h-8 text-blue-400" />}
            title="Rapid Deployment"
            description="Air charter capabilities for urgent medical supply drops bypassing commercial bottlenecks."
          />
          <FeatureCard
            icon={<Shield className="w-8 h-8 text-blue-400" />}
            title="Stockpile Management"
            description="Vendor-managed inventory programs for hospital systems and government entities."
          />
          <FeatureCard
            icon={<Globe className="w-8 h-8 text-blue-400" />}
            title="Global Compliance"
            description="Manufacturing redundancy across FDA-registered facilities to mitigate risk."
          />
        </div>
      </section>

      {/* CATALOG SECTION 1: PPE */}
      <section id="catalog" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12 border-b border-slate-200 pb-8">
            <div>
              <div className="flex items-center gap-2 text-blue-600 font-bold uppercase tracking-widest mb-2">
                <Shield className="w-5 h-5" />
                <span>Frontline Defense</span>
              </div>
              <h2 className="text-4xl text-slate-900 font-bold">
                Protective Equipment
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PPE_PRODUCTS.map((p) => (
              <ProductCard
                key={p.id}
                {...p}
                gradient="from-slate-100 to-white"
                onOpenSpecs={() => handleOpenSpecs(p.id, "ppe")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CATALOG SECTION 2: CLINICAL */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12 border-b border-slate-100 pb-8">
            <div>
              <div className="flex items-center gap-2 text-emerald-600 font-bold uppercase tracking-widest mb-2">
                <Syringe className="w-5 h-5" />
                <span>Clinical Precision</span>
              </div>
              <h2 className="text-4xl text-slate-900 font-bold">
                Designated Consumables
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {CLINICAL_PRODUCTS.map((p) => (
              <ProductCard
                key={p.id}
                {...p}
                gradient="from-blue-50/50 to-white"
                onOpenSpecs={() => handleOpenSpecs(p.id, "clinical")}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Modal */}
      <PPESpecModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        data={selectedProduct}
      />
    </div>
  );
}

// --- SUBCOMPONENTS ---

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-slate-800 border border-slate-700 p-8 rounded-2xl hover:border-blue-500/50 transition-colors duration-300 text-left group">
      <div className="mb-6 p-4 bg-slate-900 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300 border border-slate-700">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

function ProductCard(
  props: PPESpecData & {
    gradient: string;
    onOpenSpecs: () => void;
  },
) {
  const { category, title, specs, gradient, onOpenSpecs } = props;
  return (
    <button
      onClick={onOpenSpecs}
      className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:border-blue-300 transition-all duration-300 overflow-hidden block text-left hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/5 w-full"
    >
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-50`}
      />

      <div className="relative z-10">
        <div className="text-xs font-mono text-slate-500 mb-4 uppercase tracking-widest flex items-center justify-between">
          <span>{category}</span>
          <AlertOctagon className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
        </div>
        <h3 className="text-2xl font-bold text-slate-900 mb-6 group-hover:text-blue-700 transition-colors">
          {title}
        </h3>

        <ul className="space-y-3 mb-8">
          {specs.map((spec, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-slate-600 text-sm"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="font-semibold">{spec.label}:</span> {spec.value}
            </li>
          ))}
        </ul>

        <div className="flex items-center text-blue-600 font-bold text-sm gap-2 mt-auto">
          <span>View Specs</span>
          <Activity className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </button>
  );
}
