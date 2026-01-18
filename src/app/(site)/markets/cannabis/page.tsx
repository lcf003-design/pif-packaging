import { MARKETS_DATA } from "@/data/markets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  ShieldAlert,
  Leaf,
  Wind,
  Droplet,
  Sun,
  Lock,
} from "lucide-react";

export default function CannabisMarketPage() {
  const market = MARKETS_DATA.find((m) => m.slug === "cannabis");

  if (!market) {
    notFound();
  }

  // ASSETS MAPPING
  const ASSETS = {
    catalog: [
      {
        title: "Amber Flower Jars",
        image: "/images/markets/cannabis_flower_amber_jar.png",
        desc: "UV-blocking glass with matte CR caps.",
      },
      {
        title: "Crystal Pre-Rolls",
        image: "/images/markets/cannabis_preroll_tube_glass.png",
        desc: "High-clarity glass presentation tubes.",
      },
      {
        title: "Quartz Concentrates",
        image: "/images/markets/cannabis_concentrate_jar.png",
        desc: "Low-profile, non-stick quartz glass.",
      },
      {
        title: "Matte Tinctures",
        image: "/images/markets/cannabis_tincture_matte_black.png",
        desc: "Child-resistant calibrated droppers.",
      },
      {
        title: "Edible Slide Tins",
        image: "/images/markets/cannabis_edible_tin.png",
        desc: "Brushed metal with locking mechanisms.",
      },
      {
        title: "Topical Airless",
        image: "/images/markets/cannabis_topical_pump.png",
        desc: "Metered dosing for infused creams.",
      },
      {
        title: "Ceramic Vapes",
        image: "/images/markets/cannabis_vape_cartridge.png",
        desc: "Heavy-metal free heating elements.",
      },
      {
        title: "CR Technology",
        image: "/images/markets/cannabis_child_resistant_cap.png",
        desc: "Certified Push-and-Turn mechanisms.",
      },
    ],
    greenhouseBg: "/images/markets/cannabis_greenhouse_abstract.png",
    labCompliance: "/images/markets/cannabis_lab_compliance.png",
  };

  return (
    <div className="bg-white min-h-screen font-sans text-neutral-900 selection:bg-emerald-100 selection:text-emerald-900">
      {/* 1. HERO SECTION (PRESERVED & ENHANCED) */}
      <section className="relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 z-0">
          <Image
            src={ASSETS.greenhouseBg} // UPDATED to new Lush Background
            alt="Greenhouse Luxury"
            fill
            className="object-cover opacity-60"
            priority
          />
          {/* Grain Overlay */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20" />
          {/* Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-transparent" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 text-white/50 hover:text-emerald-400 mb-12 transition-colors text-xs font-mono tracking-[0.2em] uppercase"
          >
            <ArrowLeft className="w-3 h-3" /> Back to Intelligence
          </Link>

          <div className="grid md:grid-cols-2 gap-12 items-end">
            <div>
              <div className="inline-flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full text-emerald-400 text-sm font-bold uppercase tracking-wider mb-8 backdrop-blur-md">
                <Leaf className="w-4 h-4" />
                <span>Cultivation Sector</span>
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white mb-6 tracking-tighter leading-[0.9]">
                Greenhouse <br />
                <span className="text-emerald-500">Luxury.</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 font-light tracking-tight max-w-2xl">
                Respect the plant. Protect the product. We supply the hardware
                that top-shelf cultivators trust to preserve terpenes and
                potency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. PROBLEM / SOLUTION (PRESERVED) */}
      <section className="bg-neutral-950 text-white border-y border-white/5">
        <div className="grid md:grid-cols-2">
          {/* PROBLEM */}
          <div className="p-12 md:p-24 border-b md:border-b-0 md:border-r border-white/5 bg-neutral-900/50">
            <div className="inline-flex items-center gap-2 text-red-500 font-bold uppercase tracking-wider mb-6 text-sm">
              <ShieldAlert className="w-5 h-5" /> The Challenge
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-white">
              Degradation is the Enemy.
            </h2>
            <p className="text-xl text-neutral-400 leading-relaxed max-w-md">
              Light, air, and humidity destroy cannabinoids. Generic packaging
              turns premium flower into mid-grade hay before it even reaches the
              dispensary shelf.
            </p>
          </div>

          {/* SOLUTION */}
          <div className="p-12 md:p-24 relative overflow-hidden group">
            <div className="absolute inset-0 bg-emerald-900/10 group-hover:bg-emerald-900/20 transition-colors" />
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 text-emerald-400 font-bold uppercase tracking-wider mb-6 text-sm">
                <ShieldCheck className="w-5 h-5" /> The PIF Solution
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight text-white">
                Hermetic Defense.
              </h2>
              <p className="text-xl text-neutral-300 leading-relaxed max-w-md">
                We engineer micro-climates. Our UV-blocking glass and air-tight
                seals lock in the curing process, ensuring the nose on opening
                day is as loud as harvest day.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE CULTIVATION CATALOG (New Grid) */}
      <section className="py-24 bg-neutral-50 border-b border-neutral-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-neutral-900 mb-4 tracking-tight uppercase">
              The Cultivation <span className="text-emerald-600">Catalog.</span>
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-lg">
              A curated selection of compliant hardware for every stage of the
              harvest. From bulk curing jars to retail-ready units.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ASSETS.catalog.map((item, i) => (
              <div
                key={i}
                className="group bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-neutral-100"
              >
                <div className="relative h-56 w-full mb-6 overflow-hidden rounded-xl bg-neutral-50">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700 mix-blend-multiply"
                  />
                  {/* Subtle Green Overlay on Hover */}
                  <div className="absolute inset-0 bg-emerald-500/0 group-hover:bg-emerald-500/10 transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-neutral-900 group-hover:text-emerald-600 transition-colors tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-xs text-neutral-400 mt-2 font-medium">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMPLIANCE & LAB (New "Vibrant" Visual) */}
      <section className="py-0 border-b border-neutral-900">
        <div className="grid md:grid-cols-2 min-h-[600px] bg-neutral-900">
          <div className="relative min-h-[400px]">
            <Image
              src={ASSETS.labCompliance}
              alt="Compliance Testing Lab"
              fill
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-900" />
          </div>
          <div className="flex flex-col justify-center p-12 md:p-24 text-white relative z-10">
            <Lock className="w-12 h-12 text-emerald-500 mb-8" />
            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">
              Calculated <br />
              <span className="text-emerald-500">Compliance.</span>
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed max-w-md mb-8">
              We navigate the red tape so you don&apos;t have to. Our catalog is
              certified for CPSC 16 CFR 1700.20 Child Resistance, with ASTM test
              data available on demand.
            </p>
            <div className="flex flex-wrap gap-4">
              <span className="px-4 py-2 bg-emerald-900/30 border border-emerald-500/30 rounded text-emerald-400 text-xs font-mono uppercase tracking-widest">
                CPSC Certified
              </span>
              <span className="px-4 py-2 bg-emerald-900/30 border border-emerald-500/30 rounded text-emerald-400 text-xs font-mono uppercase tracking-widest">
                ASTM Standards
              </span>
              <span className="px-4 py-2 bg-emerald-900/30 border border-emerald-500/30 rounded text-emerald-400 text-xs font-mono uppercase tracking-widest">
                Heavy Metal Free
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TERPENE DEFENSE (Technical Specs) */}
      <section className="py-32 bg-emerald-950 text-white relative overflow-hidden">
        {/* Abstract Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <Image
            src={ASSETS.greenhouseBg}
            alt="Background"
            fill
            className="object-cover grayscale"
          />
        </div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="mb-20">
            <h2 className="text-3xl font-bold mb-6 uppercase tracking-widest text-emerald-400">
              Terpene Defense Grid
            </h2>
            <div className="h-0.5 w-24 bg-white/20" />
          </div>

          <div className="grid md:grid-cols-3 gap-16">
            <div className="space-y-4">
              <Sun className="w-10 h-10 text-emerald-400" />
              <h3 className="text-2xl font-black tracking-tight">
                UV Shielding
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                Light is the catalyst for cannabinoid degradation. Our
                true-amber and opaque glass options block 99% of UV rays,
                preserving Δ9-THC stability.
              </p>
            </div>
            <div className="space-y-4">
              <Wind className="w-10 h-10 text-emerald-400" />
              <h3 className="text-2xl font-black tracking-tight">
                Oxygen Barrier
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                Oxygen converts THC to CBN. Our PVDC-lined closures and
                air-tight seals starve the oxidation process, keeping your
                flower potent and fresh.
              </p>
            </div>
            <div className="space-y-4">
              <Droplet className="w-10 h-10 text-emerald-400" />
              <h3 className="text-2xl font-black tracking-tight">
                Humidity Control
              </h3>
              <p className="text-neutral-400 leading-relaxed">
                Too dry means dust; too wet means mold. Our jars are engineered
                to maintain optimal RH levels when paired with 2-way humidity
                packs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white text-center">
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-6xl font-black text-neutral-900 mb-8 tracking-tighter">
            Ready to <br className="hidden md:block" />
            Scale Your <span className="text-emerald-600">Harvest?</span>
          </h2>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-neutral-900 text-white font-bold text-lg rounded-full hover:bg-emerald-600 transition-all shadow-2xl"
          >
            Consult Cultivation
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
