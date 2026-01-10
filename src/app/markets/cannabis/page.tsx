import { MARKETS_DATA } from "@/data/markets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

export default function CannabisMarketPage() {
  const market = MARKETS_DATA.find((m) => m.slug === "cannabis");

  if (!market) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* HERO SECTION - CINEMATIC */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 z-0">
          <Image
            src={market.image}
            alt={market.title}
            fill
            className="object-cover opacity-50 contrast-125 saturate-0"
            priority
          />
          {/* Grain Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
          {/* Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-12 transition-colors text-xs font-mono tracking-[0.2em] uppercase"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Intelligence
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-end">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-berlin-red/10 border border-berlin-red/30 rounded-full text-berlin-red text-sm font-bold uppercase tracking-wider mb-8 backdrop-blur-md">
                <market.icon className="w-4 h-4" />
                <span>Sector Intelligence</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-black text-white mb-6 tracking-tighter leading-[0.85]">
                {market.title}
              </h1>
              <p className="text-2xl md:text-3xl text-white/90 font-light tracking-tight max-w-2xl">
                {market.tagline || market.desc}
              </p>
            </div>

            {/* Hero Stat Block if available */}
            {market.stat && (
              <div className="md:text-right hidden md:block">
                <div className="inline-block text-left p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl">
                  <div className="text-sm text-neutral-400 font-mono uppercase tracking-widest mb-2">
                    {market.stat.label}
                  </div>
                  <div className="text-7xl font-black text-white tracking-tighter">
                    {market.stat.value}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* PROBLEM / SOLUTION - SPLIT LAYOUT */}
      {market.problem && market.solution && (
        <section className="bg-neutral-950 text-white border-y border-white/5">
          <div className="grid md:grid-cols-2">
            {/* PROBLEM - LEFT */}
            <div className="p-12 md:p-24 border-b md:border-b-0 md:border-r border-white/5 bg-neutral-900/50">
              <div className="inline-flex items-center gap-2 text-red-500 font-bold uppercase tracking-wider mb-6 text-sm">
                <ShieldAlert className="w-5 h-5" /> The Challenge
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                {market.problem.title}
              </h2>
              <p className="text-xl text-neutral-400 leading-relaxed max-w-md">
                {market.problem.desc}
              </p>
            </div>

            {/* SOLUTION - RIGHT */}
            <div className="p-12 md:p-24 relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-900/10 group-hover:bg-blue-900/20 transition-colors" />
              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 text-blue-400 font-bold uppercase tracking-wider mb-6 text-sm">
                  <ShieldCheck className="w-5 h-5" /> The PIF Solution
                </div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight text-white">
                  {market.solution.title}
                </h2>
                <p className="text-xl text-neutral-300 leading-relaxed max-w-md">
                  {market.solution.desc}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* THE ARSENAL (or BROWSE CATEGORIES) */}
      {(market.gallery?.length > 0 ||
        (market.browseCategories?.length ?? 0) > 0) && (
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black text-berlin-blue mb-4 tracking-tight">
                {market.browseCategories ? "Category Selection" : "The Arsenal"}
              </h2>
              <p className="text-neutral-500">
                Specialized hardware for {market.title} applications.
              </p>
            </div>

            {market.browseCategories ? (
              <div className="grid md:grid-cols-3 gap-8">
                {market.browseCategories.map((item, i) => (
                  <div
                    key={i}
                    className="group text-center cursor-pointer hover:-translate-y-2 transition-transform duration-300"
                  >
                    <div className="relative h-64 w-full mb-6 bg-neutral-50 rounded-2xl overflow-hidden border border-neutral-100 group-hover:shadow-xl transition-shadow">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-contain p-8 group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-berlin-blue group-hover:text-berlin-red transition-colors">
                      {item.title}
                    </h3>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid md:grid-cols-3 gap-8">
                {market.gallery.map((item, i) => (
                  <div
                    key={i}
                    className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-neutral-100"
                  >
                    <div className="relative h-64 overflow-hidden bg-neutral-100">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className={`object-cover group-hover:scale-110 transition-transform duration-700 ${
                          item.imagePosition || "object-center"
                        }`}
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-bold text-berlin-blue mb-2">
                        {item.title}
                      </h3>
                      <p className="text-neutral-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* MARKET INTELLIGENCE REPORTS */}
      {market.reports && (
        <section className="py-24 bg-neutral-50 border-t border-neutral-100">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-4xl font-black text-berlin-blue mb-4 tracking-tight">
                  Market Intelligence
                </h2>
                <p className="text-neutral-500 max-w-xl">
                  stay ahead of supply chain volatility with our latest sector
                  analysis.
                </p>
              </div>
              <Link
                href="/insights"
                className="text-berlin-red font-bold hover:underline hidden md:block"
              >
                View All Reports
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {market.reports.map((report, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="relative h-64 rounded-2xl overflow-hidden mb-6">
                    <Image
                      src={report.image}
                      alt={report.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-berlin-blue/20 group-hover:bg-transparent transition-colors" />
                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-berlin-blue uppercase tracking-wider">
                      {report.category}
                    </div>
                  </div>
                  <div className="space-y-3">
                    <p className="text-sm text-neutral-400 font-mono">
                      {report.date}
                    </p>
                    <h3 className="text-2xl font-bold text-berlin-blue leading-tight group-hover:text-berlin-red transition-colors">
                      {report.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {market.qcImage ? (
        <section className="relative py-32 overflow-hidden bg-neutral-900">
          <div className="absolute inset-0">
            <Image
              src={market.qcImage}
              alt="Technical Standard"
              fill
              className="object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent" />
          </div>

          <div className="relative z-10 container mx-auto px-6 max-w-7xl">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="text-white">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-2 h-2 rounded-full bg-berlin-red animate-pulse" />
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
                    Technical Standards
                  </span>
                </div>
                <h2 className="text-5xl font-black mb-8 tracking-tight leading-tight">
                  {market.qcCopy?.title || "Engineered for"} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
                    {market.qcCopy?.highlight || "Compliance."}
                  </span>
                </h2>
                <p className="text-lg text-neutral-400 leading-relaxed max-w-md">
                  {market.qcCopy?.desc ||
                    "We don't just sell packaging; we sell structural integrity. Every unit meets rigorous ISO 9001 quality assurance standards to ensure your product performs as well as it looks."}
                </p>
              </div>

              <div className="space-y-2">
                {market.features.map((feature, i) => (
                  <div
                    key={i}
                    className="group flex items-center gap-6 p-6 border-b border-white/10 hover:bg-white/5 transition-all duration-300 rounded-xl"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-berlin-red group-hover:scale-110 transition-all duration-300">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:translate-x-1 transition-transform duration-300">
                        {feature}
                      </h3>
                      <p className="text-xs font-mono text-neutral-500 mt-1 uppercase tracking-wider group-hover:text-neutral-400">
                        Specification Confirmed
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="py-24 bg-neutral-50">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="grid md:grid-cols-12 gap-12 lg:gap-24 items-start">
              <div className="md:col-span-5 pt-8">
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-2 h-2 rounded-full bg-berlin-red" />
                  <span className="font-mono text-xs uppercase tracking-widest text-neutral-500">
                    Technical Standards
                  </span>
                </div>
                <h2 className="text-4xl font-black text-neutral-900 mb-6 tracking-tight">
                  Engineered for <br />
                  Compliance.
                </h2>
                <p className="text-lg text-neutral-500 leading-relaxed">
                  In the {market.title.toLowerCase()} aisle, the bottle is the
                  brand. We supply heavyweight, cosmetic-grade flint glass that
                  communicates value before the cork is even popped. From
                  bespoke molds to rapid-launch stock programs.
                </p>
              </div>

              <div className="md:col-span-7 space-y-6">
                {market.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-6 pb-6 border-b border-neutral-200 last:border-0 last:pb-0 group"
                  >
                    <div className="w-12 h-12 bg-white text-blue-600 rounded-xl flex-shrink-0 flex items-center justify-center border border-neutral-200 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600 transition-all duration-300 shadow-sm">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div className="pt-2">
                      <h3 className="text-lg font-bold text-neutral-900 mb-2">
                        {feature}
                      </h3>
                      <div className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest bg-white border border-neutral-200 inline-block px-2 py-1 rounded">
                        Specification Met
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-24 bg-berlin-blue text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight uppercase">
            Solve The <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
              {market.problem?.title
                .replace("The ", "")
                .replace(" Problem", "") || "Packaging"}
            </span>{" "}
            Problem.
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-berlin-blue font-bold text-lg rounded-full hover:bg-neutral-100 transition-colors shadow-2xl"
          >
            Start Engineering
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
