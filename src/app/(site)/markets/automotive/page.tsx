import { MARKETS_DATA } from "@/data/markets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ShieldAlert,
  Zap,
  Gauge,
  FlaskConical,
  Scale,
} from "lucide-react";

export default function AutomotiveMarketPage() {
  const market = MARKETS_DATA.find((m) => m.slug === "automotive");

  if (!market) {
    notFound();
  }

  return (
    <div className="bg-neutral-950 min-h-screen text-neutral-100 selection:bg-orange-500 selection:text-white">
      {/* 1. HERO: THE TEST TRACK - DARK INDUSTRIAL VIDEO LOOP VIBE */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden flex flex-col justify-between border-b border-white/10">
        <div className="absolute inset-0 z-0">
          <Image
            src={market.image}
            alt="Automotive Fluid Engineering"
            fill
            className="object-cover opacity-40 grayscale contrast-125 saturate-0"
            priority
          />
          {/* Carbon Fiber / Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.5)_2px,transparent_2px),linear-gradient(90deg,rgba(0,0,0,0.5)_2px,transparent_2px)] bg-[length:40px_40px] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/80 to-transparent" />
        </div>

        {/* HUD Header */}
        <div className="relative z-10 w-full p-6 md:p-8 flex justify-between items-start">
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-400 transition-colors duration-300 font-mono text-xs tracking-[0.2em] uppercase"
          >
            <ArrowLeft className="w-3 h-3" /> Sector Index
          </Link>
          <div className="flex gap-6 font-mono text-[10px] md:text-xs tracking-[0.2em] text-white/40 uppercase">
            <span className="hidden md:inline">Temp: 200°F</span>
            <span className="hidden md:inline">Viscosity: High</span>
            <span className="text-orange-500">ID: AUTO-01</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 container mx-auto px-6 pb-24 max-w-[1800px]">
          <div className="max-w-5xl">
            <div className="inline-flex items-center gap-3 px-3 py-1 border border-orange-500/30 bg-orange-500/10 text-orange-500 text-[10px] font-mono uppercase tracking-widest mb-6 rounded-sm backdrop-blur-md">
              <Zap className="w-3 h-3" />
              <span>Fluid Dynamics Division</span>
            </div>
            <h1 className="text-[10vw] md:text-[7rem] font-black text-white leading-[0.85] tracking-tighter mb-8 uppercase">
              Performance <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">
                Under Pressure.
              </span>
            </h1>
            <div className="flex flex-col md:flex-row gap-8 md:items-end">
              <p className="text-lg md:text-xl text-neutral-400 max-w-xl font-light leading-relaxed border-l border-orange-500 pl-6">
                Whether you&apos;re an independent shop blending custom
                formulations or a global OEM, we engineer packaging that
                survives the journey from factory floor to engine bay.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE CHALLENGE: PANELING PHYSICS (Interactive-ish Visualization) */}
      <section className="py-24 bg-neutral-900 border-b border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Visual Side */}
            {/* Visual Side */}
            {/* Visual Side */}
            <div className="relative aspect-square md:aspect-[4/3] bg-neutral-950 border border-white/10 rounded-sm overflow-hidden group">
              {/* "Before" State: Video of Paneling Failure */}
              <div className="absolute inset-0 transition-opacity duration-700 opacity-100 group-hover:opacity-0">
                <video
                  src="/videos/markets/Bottle_Sucking_In_Video.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="object-cover w-full h-full opacity-80"
                />
                <div className="absolute inset-0 bg-red-900/10 mix-blend-overlay" />{" "}
                {/* Alarm Tint */}
                <div className="absolute top-4 left-4 font-mono text-xs text-red-500 bg-black/80 px-2 py-1 border border-red-500/50 backdrop-blur-md animate-pulse">
                  ⚠️ LIVE FEED: VACUUM FAILURE
                </div>
              </div>

              {/* "After" State: Fluorinated/Pristine Bottle */}
              <div className="absolute inset-0 transition-opacity duration-700 opacity-0 group-hover:opacity-100 z-10">
                <Image
                  src="/images/markets/automotive-pristine.png"
                  alt="Fluorinated Integrity"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 font-mono text-xs text-green-500 bg-black/80 px-2 py-1 border border-green-500/50 backdrop-blur-md">
                  ✓ INTEGRITY RESTORED
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent border-t border-white/10 font-mono text-xs text-neutral-400 text-center pointer-events-none z-20">
                HOVER TO DEPLOY FLUORINATION
              </div>
            </div>

            {/* Content Side */}
            <div>
              <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="w-5 h-5 text-orange-500" />
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-orange-500">
                  The Physics of Failure
                </h3>
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 uppercase tracking-tight">
                The Paneling <br /> Effect.
              </h2>
              <p className="text-lg text-neutral-400 leading-relaxed mb-8">
                Aggressive additives in octane boosters and synthetic oils
                attack standard HDPE. The result? &quot;Paneling&quot;—where
                pressure drops cause container walls to collapse. It renders
                your product unsellable before it even hits the shelf.
              </p>

              <div className="space-y-4 font-mono text-sm border-t border-white/10 pt-6">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-neutral-500">Chemical Aggressor</span>
                  <span className="text-white">Hydrocarbons</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-neutral-500">Failure Mode</span>
                  <span className="text-white">Wall Collapse</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-neutral-500">Financial Impact</span>
                  <span className="text-red-500">Total Recall</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. THE SOLUTION: FLUORINATION DEFENSE */}
      <section className="py-24 bg-neutral-950 relative">
        {/* Molecular Grid Background */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />

        <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
          <div className="max-w-3xl mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter uppercase">
              Level 5 <br /> Fluorination.
            </h2>
            <p className="text-xl text-neutral-400 font-light leading-relaxed">
              We don&apos;t just coat the plastic. We modify the molecular
              surface. Post-Mold Fluorination (PMF) replaces hydrogen atoms with
              fluorine, creating an impenetrable carbon-fluorine shield.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-neutral-900 border border-white/10 p-8 hover:border-orange-500/50 transition-colors group">
              <FlaskConical className="w-8 h-8 text-neutral-500 mb-6 group-hover:text-orange-500 transition-colors" />
              <h3 className="text-xl font-bold text-white mb-2">
                Permeation Block
              </h3>
              <p className="text-sm text-neutral-400">
                Reduces solvent permeation by up to 1000x across container
                walls.
              </p>
            </div>
            <div className="bg-neutral-900 border border-white/10 p-8 hover:border-orange-500/50 transition-colors group">
              <Scale className="w-8 h-8 text-neutral-500 mb-6 group-hover:text-orange-500 transition-colors" />
              <h3 className="text-xl font-bold text-white mb-2">
                UN Rated Y-Series
              </h3>
              <p className="text-sm text-neutral-400">
                Certified for Packing Group II (Medium Danger) hazardous liquid
                transport.
              </p>
            </div>
            <div className="bg-neutral-900 border border-white/10 p-8 hover:border-orange-500/50 transition-colors group">
              <Gauge className="w-8 h-8 text-neutral-500 mb-6 group-hover:text-orange-500 transition-colors" />
              <h3 className="text-xl font-bold text-white mb-2">
                Zero Distortion
              </h3>
              <p className="text-sm text-neutral-400">
                Maintains shelf presence and structural dimensions under extreme
                temp swings.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PRODUCTION HARDWARE (Formerly Arsenal) */}
      <section className="py-24 bg-neutral-950 border-t border-white/5">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter mb-2 uppercase">
                Component Matrix
              </h2>
              <div className="h-1 w-24 bg-orange-500 mb-4" />
              <p className="text-neutral-500 font-mono text-sm max-w-md">
                // AUTHORIZED HARDWARE LIST <br />
                Filtering by: Industrial Grade
              </p>
            </div>
            <Link
              href="/catalog"
              className="px-6 py-3 border border-neutral-700 text-white hover:bg-white hover:text-black transition-all uppercase tracking-widest text-xs font-bold"
            >
              View Full Spec Sheet
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {market.gallery.map((item, i) => (
              <div
                key={i}
                className="group relative bg-neutral-900 border border-white/5 hover:border-orange-500 transition-colors duration-300"
              >
                {/* Technical Corner Markers */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20 group-hover:border-orange-500 transition-colors" />
                <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20 group-hover:border-orange-500 transition-colors" />
                <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20 group-hover:border-orange-500 transition-colors" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20 group-hover:border-orange-500 transition-colors" />

                <div className="relative aspect-[4/3] bg-neutral-800/50 overflow-hidden p-8">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`object-contain p-8 group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100 ${
                      item.imagePosition || "object-center"
                    }`}
                  />
                  <div className="absolute top-4 right-4 text-[10px] font-mono text-orange-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    READY FOR PROD
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <div className="flex items-center gap-2 text-neutral-500 text-xs font-mono uppercase">
                    <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
                    {item.desc.replace(".", "")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA: IGNITION */}
      <section className="py-24 bg-orange-600 text-neutral-950 relative overflow-hidden">
        {/* Striped Warning Tape Pattern */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(0,0,0,0.1)_20px,rgba(0,0,0,0.1)_40px)]" />

        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase">
            Start Your Engine.
          </h2>
          <p className="text-xl font-bold mb-12 max-w-2xl mx-auto opacity-80">
            Ready to upgrade your supply chain? Whether you need 1 pallet or 10
            truckloads, let&apos;s talk specs.
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-6 bg-neutral-950 text-white font-mono text-lg uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300 border border-transparent hover:border-black shadow-2xl"
          >
            Configurator Init &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}
