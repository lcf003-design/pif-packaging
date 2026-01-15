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
  ShieldCheck,
  Zap,
  Activity,
  Info,
} from "lucide-react";
import PPESpecModal, { PPESpecData } from "@/components/ppe/PPESpecModal";

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
      { label: "Sterility", value: "Non-Sterile" },
    ],
    compliance: [
      "ASTM D6319 Standard Specification",
      "FDA 510(k) Cleared",
      "EN 455 Level 1-4",
      "Chemotherapy Drug Tested (ASTM D6978)",
    ],
    packaging: {
      caseCount: "1,000 pcs (10/100)",
      palletCount: "96 Cases",
      moq: "1 Container (20ft)",
    },
  },
  {
    id: "n95-respirator",
    title: "N95 Particulate Respirator",
    category: "Respiratory",
    description:
      "NIOSH-approved particulate respirator designed to provide at least 95% filtration efficiency against non-oil based particles. Features a collapse-resistant shell and adjustable nose clip.",
    specs: [
      { label: "Filter Type", value: "Electrostatically Charged Meltblown" },
      { label: "Style", value: "Foldable / Cup Shape" },
      { label: "Attachment", value: "Ultrasonically Welded Headbands" },
      { label: "Fluid Resistance", value: "160 mmHg (ASTM F1862)" },
    ],
    compliance: [
      "NIOSH Approved (TC-84A)",
      "FDA Cleared Surgical Mask",
      "ISO 13485 Manufacturing",
    ],
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
      "High-quality SMS material isolation gown providing reliable fluid resistance for low-to-moderate risk scenarios. Designed for comfort and full coverage.",
    specs: [
      { label: "Material", value: "Multi-layer SMS (Spunbond/Meltblown)" },
      { label: "Weight", value: "40 GSM" },
      { label: "Cuffs", value: "Elastic or Knit Options" },
      { label: "Closure", value: "Neck & Waist Ties" },
    ],
    compliance: [
      "AAMI Level 2 (ANSI/AAMI PB70)",
      "FDA Registered Class 1",
      "Latex Free",
    ],
    packaging: {
      caseCount: "100 pcs",
      palletCount: "40 Cases",
      moq: "1 Pallet",
    },
  },
];

export default function PPEPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<PPESpecData | null>(
    null
  );

  const handleOpenSpecs = (id: string) => {
    const product = PPE_PRODUCTS.find((p) => p.id === id);
    if (product) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-900 selection:text-white">
      {/* HERO SECTION */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Abstract Dark Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-950" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/20 via-slate-950 to-slate-950" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.03] mix-blend-overlay" />
        </div>

        <div className="relative z-10 container mx-auto px-6 text-center max-w-5xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-8 uppercase tracking-widest animate-fade-in-up">
            <Shield className="w-4 h-4" />
            <span>Start Manufacturing Division</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9] text-white">
            Defense-Grade <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
              Protection.
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-medium mb-12">
            High-volume manufacturing of medical-grade PPE. FDA registered. ISO
            13485 certified. Ready for scale.
          </p>

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/ppe/products"
              className="px-8 py-4 bg-blue-600 text-white font-bold rounded-full hover:bg-blue-500 transition-all shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)]"
            >
              View Full Catalog
            </Link>
            <Link
              href="/contact?subject=Bulk%20PPE%20Request"
              className="px-8 py-4 bg-transparent border border-slate-700 text-slate-300 font-bold rounded-full hover:bg-slate-800 transition-all"
            >
              Request Bulk Quote
            </Link>
          </div>
        </div>
      </section>

      {/* PANDEMIC RESPONSE / HISTORY */}
      <section className="py-24 bg-slate-900 border-y border-slate-800">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <div className="md:w-1/2">
              <div className="inline-flex items-center gap-2 text-rose-500 font-bold uppercase tracking-widest mb-4">
                <HistoryIcon className="w-5 h-5" />
                <span>Forged in Crisis</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                When the world stopped, <br />
                <span className="text-blue-500">We delivered.</span>
              </h2>
              <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                <p>
                  During the height of the global pandemic, typical supply
                  chains fractured. We didn't just adapt—we mobilized.
                  Partnering with federal agencies and state governments, we
                  secured and delivered{" "}
                  <strong className="text-white">millions of units</strong> of
                  critical PPE to frontline workers when it mattered most.
                </p>
                <p>
                  Today, we maintain that same readiness. Our infrastructure is
                  hardened, our logistics routes are secured, and our capacity
                  is reservable for national stockpile requirements.
                </p>
              </div>
              <div className="mt-8 flex gap-4">
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded border border-slate-700 text-slate-300 text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Direct-to-Manufacturer Sourcing
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-slate-800 rounded border border-slate-700 text-slate-300 text-sm font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  Scalable Supply Chain Infrastructure
                </div>
              </div>
            </div>
            <div className="md:w-1/2 relative group">
              <div className="absolute -inset-4 bg-blue-500/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative aspect-[4/3] w-full bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/ppe_production_real.jpg"
                  alt="Authentic PPE Manufacturing Facility"
                  fill
                  className="object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* GLOBAL LOGISTICS / AUTHORITY */}
      <section className="py-24 bg-slate-950">
        <div className="container mx-auto px-6 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Global Strategic Infrastructure
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our supply chain isn't just about moving boxes. It's about security,
            redundancy, and speed. We operate a multi-modal logistics network
            designed for resilience.
          </p>
        </div>

        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Plane className="w-8 h-8 text-blue-400" />}
            title="Air Charter Capabilities"
            description="Direct charter access for urgent, high-volume deployments bypassing commercial freight bottlenecks."
          />
          <FeatureCard
            icon={<Anchor className="w-8 h-8 text-blue-400" />}
            title="Port Priority Access"
            description="Established relationships with major ports of entry ensuring expedited customs clearance."
          />
          <FeatureCard
            icon={<Globe className="w-8 h-8 text-blue-400" />}
            title="Diversified Sourcing"
            description="Manufacturing redundancy across three continents to mitigate geopolitical risks."
          />
        </div>
      </section>

      {/* PRODUCT CATALOG GRID */}
      <section id="catalog" className="py-32 bg-slate-900 relative">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-16">
            <div>
              <h2 className="text-4xl text-white font-bold mb-4">
                Protective Equipment
              </h2>
              <p className="text-slate-400 max-w-xl">
                Engineered for frontline defense. Available in bulk quantities
                for healthcare systems and industrial distribution.
              </p>
            </div>
            <div className="hidden md:block text-right">
              <div className="text-blue-500 font-mono text-sm">
                CATALOG ID: 2026-Q1
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ProductCard
              id="nitrile-gloves"
              category="Hand Protection"
              title="Nitrile Examination Gloves"
              specs={[
                "ASTM D6319",
                "Chemo Rated",
                "Powder-Free",
                "3.5mil Thickness",
              ]}
              gradient="from-blue-500/20 to-cyan-500/5"
              onOpenSpecs={handleOpenSpecs}
            />
            <ProductCard
              id="n95-respirator"
              category="Respiratory"
              title="N95 Particulate Respirator"
              specs={[
                "NIOSH Approved",
                "Fluid Resistant",
                "Adjustable Nose Clip",
                "Headband Style",
              ]}
              gradient="from-emerald-500/20 to-teal-500/5"
              onOpenSpecs={handleOpenSpecs}
            />
            <ProductCard
              id="isolation-gown"
              category="Body Protection"
              title="AAMI Level 2 Isolation Gown"
              specs={[
                "Fluid Resistant",
                "SMS Material",
                "Elastic Cuffs",
                "Full Back",
              ]}
              gradient="from-indigo-500/20 to-violet-500/5"
              onOpenSpecs={handleOpenSpecs}
            />
          </div>
        </div>
      </section>

      {/* CERTIFICATIONS */}
      <section className="py-24 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-16">
            Compliance & Certifications
          </h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {/* Stamped Metal Badges */}
            <div className="relative group cursor-default">
              <div className="absolute inset-0 bg-slate-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-4 border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.5)] group-hover:border-slate-500 transition-colors">
                <div className="text-xl font-black text-slate-400 tracking-tighter uppercase drop-shadow-md group-hover:text-slate-200">
                  FDA
                </div>
              </div>
            </div>
            <div className="relative group cursor-default">
              <div className="absolute inset-0 bg-slate-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-4 border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.5)] group-hover:border-slate-500 transition-colors">
                <div className="text-xl font-black text-slate-400 tracking-tighter uppercase drop-shadow-md group-hover:text-slate-200">
                  CE
                </div>
              </div>
            </div>
            <div className="relative group cursor-default">
              <div className="absolute inset-0 bg-slate-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-4 border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.5)] group-hover:border-slate-500 transition-colors">
                <div className="text-center">
                  <div className="text-xs font-bold text-slate-500 mb-1">
                    ISO
                  </div>
                  <div className="text-xl font-black text-slate-400 tracking-tighter uppercase drop-shadow-md group-hover:text-slate-200">
                    13485
                  </div>
                </div>
              </div>
            </div>
            <div className="relative group cursor-default">
              <div className="absolute inset-0 bg-slate-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-4 border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.5)] group-hover:border-slate-500 transition-colors">
                <div className="text-xl font-black text-slate-400 tracking-tighter uppercase drop-shadow-md group-hover:text-slate-200">
                  ASTM
                </div>
              </div>
            </div>
            <div className="relative group cursor-default">
              <div className="absolute inset-0 bg-slate-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative w-32 h-32 flex items-center justify-center rounded-full border-4 border-slate-700 bg-gradient-to-br from-slate-800 to-slate-900 shadow-[inset_0_2px_4px_rgba(0,0,0,0.5),0_4px_8px_rgba(0,0,0,0.5)] group-hover:border-slate-500 transition-colors">
                <div className="text-center">
                  <div className="text-xs font-bold text-slate-500 mb-1">
                    ISO
                  </div>
                  <div className="text-xl font-black text-slate-400 tracking-tighter uppercase drop-shadow-md group-hover:text-slate-200">
                    9001
                  </div>
                </div>
              </div>
            </div>
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

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="bg-slate-900 p-4 rounded-lg border border-slate-800">
      <div className="text-2xl md:text-3xl font-black text-white mb-1">
        {value}
      </div>
      <div className="text-xs text-slate-400 font-mono uppercase tracking-wide leading-tight">
        {label}
      </div>
    </div>
  );
}

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
    <div className="bg-slate-900 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition-colors duration-300 text-left group">
      <div className="mb-6 p-4 bg-slate-950 rounded-xl inline-block group-hover:scale-110 transition-transform duration-300 border border-slate-800">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
        {title}
      </h3>
      <p className="text-slate-400 leading-relaxed text-sm">{description}</p>
    </div>
  );
}

function ProductCard({
  id,
  category,
  title,
  specs,
  gradient,
  onOpenSpecs,
}: {
  id: string;
  category: string;
  title: string;
  specs: string[];
  gradient: string;
  onOpenSpecs: (id: string) => void;
}) {
  return (
    <button
      onClick={() => onOpenSpecs(id)}
      className="group relative bg-slate-950 border border-slate-800 rounded-2xl p-8 hover:border-slate-500 transition-all duration-300 overflow-hidden block text-left hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-900/10 w-full"
    >
      {/* Hover Gradient */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
      />

      <div className="relative z-10">
        <div className="text-xs font-mono text-blue-400 mb-4 uppercase tracking-widest flex items-center justify-between">
          <span>{category}</span>
          <AlertOctagon className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-6 group-hover:translate-x-1 transition-transform">
          {title}
        </h3>

        <ul className="space-y-3 mb-8">
          {specs.map((spec, i) => (
            <li
              key={i}
              className="flex items-center gap-2 text-slate-400 text-sm group-hover:text-slate-200 transition-colors"
            >
              <CheckCircle2 className="w-4 h-4 text-slate-600 group-hover:text-blue-400 transition-colors" />
              {spec}
            </li>
          ))}
        </ul>

        <div className="flex items-center text-white font-bold text-sm gap-2 mt-auto">
          <span className="group-hover:text-blue-400 transition-colors">
            View Specs
          </span>
          <Activity className="w-4 h-4 group-hover:translate-x-1 transition-transform group-hover:text-blue-400" />
        </div>
      </div>
    </button>
  );
}
