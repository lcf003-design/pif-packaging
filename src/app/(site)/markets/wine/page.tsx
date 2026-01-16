import { MARKETS_DATA } from "@/data/markets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Zap,
  Droplets,
  Box,
  Factory,
} from "lucide-react";

export default function WineMarketPage() {
  const market = MARKETS_DATA.find((m) => m.slug === "wine") || {
    // Fallback if not in data yet
    slug: "wine",
    title: "Wine",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2670&auto=format&fit=crop",
    description: "Premium glass packaging for vineyards and wineries.",
    gallery: [
      {
        title: "Bordeaux",
        desc: "Classic shoulders.",
        image:
          "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=2670&auto=format&fit=crop",
        imagePosition: "",
      },
      {
        title: "Burgundy",
        desc: "Sloped elegance.",
        image:
          "https://images.unsplash.com/photo-1559563362-c667ba5f5480?q=80&w=2602&auto=format&fit=crop",
        imagePosition: "",
      },
      {
        title: "Sparkling",
        desc: "Pressure rated.",
        image:
          "https://images.unsplash.com/photo-1594452092523-287df5d4151b?q=80&w=2670&auto=format&fit=crop",
        imagePosition: "",
      },
    ],
  };

  return (
    <div className="bg-white min-h-screen text-neutral-900 selection:bg-berlin-red selection:text-white">
      {/* 1. CINEMATIC MONOLITH HERO */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-neutral-950 flex flex-col justify-between">
        {/* Background Layer */}
        <div className="absolute inset-0 z-0">
          <Image
            src={market.image}
            alt="Wine Cellar"
            fill
            className="object-cover opacity-60 grayscale contrast-125"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/80 via-transparent to-neutral-950/90" />
        </div>

        {/* Top Nav Area */}
        <div className="relative z-10 w-full p-8 flex justify-between items-start">
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors duration-300 font-mono text-xs tracking-[0.2em] uppercase"
          >
            <ArrowLeft className="w-3 h-3" /> Market Intelligence
          </Link>
          <div className="hidden md:block font-mono text-xs tracking-[0.2em] text-white/40 uppercase">
            Sector ID: 006-WINE
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 container mx-auto px-6 pb-24 max-w-[1800px]">
          <div className="max-w-4xl">
            <h1 className="text-[12vw] md:text-[8rem] font-black text-white leading-[0.85] tracking-tighter mb-8">
              BOTTLED <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-berlin-red to-orange-600">
                TERROIR
              </span>
            </h1>
            <div className="flex flex-col md:flex-row gap-8 md:items-end">
              <p className="text-xl md:text-2xl text-white/80 max-w-xl font-light leading-relaxed border-l-2 border-berlin-red pl-6">
                From estate bottling to global distribution, we provide the
                glass that protects the vintage and defines the brand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SPOTLIGHT (Asymmetrical Layout) */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-24 items-center">
            {/* Image Side - Unconstrained */}
            <div className="lg:col-span-7 relative group">
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100">
                <Image
                  src="https://images.unsplash.com/photo-1504279577054-12350c3c75fe?q=80&w=2574&auto=format&fit=crop"
                  alt="Vineyard Case Study"
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105 grayscale group-hover:grayscale-0"
                />
                {/* Floating Badge */}
                <div className="absolute top-8 left-8 bg-white/90 backdrop-blur-md px-6 py-4 border border-white/20 shadow-2xl">
                  <span className="block font-mono text-xs text-neutral-400 uppercase tracking-widest mb-1">
                    Featured Partner
                  </span>
                  <span className="block font-bold text-xl text-berlin-blue">
                    Napa Valley Estates
                  </span>
                </div>
              </div>
            </div>

            {/* Content Side - Typography Focused */}
            <div className="lg:col-span-5 space-y-12">
              <div className="space-y-6">
                <h2 className="text-6xl font-black text-neutral-900 tracking-tighter leading-[0.9]">
                  THE HARVEST <br />
                  <span className="text-berlin-red">READY.</span>
                </h2>
                <p className="text-xl text-neutral-500 font-light leading-relaxed">
                  When a record harvest overwhelmed local glass supplies, we
                  mobilized our global network to deliver 50,000 cases of
                  Antique Green Bordeaux bottles in 72 hours.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 border-t border-neutral-200 pt-8">
                <div>
                  <div className="text-4xl font-black text-neutral-900 mb-2">
                    50K
                  </div>
                  <div className="text-sm font-mono text-neutral-500 uppercase tracking-widest">
                    Cases Delivered
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-black text-neutral-900 mb-2">
                    72hr
                  </div>
                  <div className="text-sm font-mono text-neutral-500 uppercase tracking-widest">
                    Turnaround
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. "DRINK IT IN" FEATURE (Dark Mode Break) */}
      <section className="py-32 bg-neutral-950 text-white relative isolate overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-berlin-blue/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/3 w-[600px] h-[600px] bg-berlin-red/10 rounded-full blur-[100px]" />

        <div className="container mx-auto px-6 max-w-[1600px] relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">
              AGE WITH GRACE.
            </h2>
            <p className="text-xl md:text-2xl text-neutral-400 font-light leading-relaxed">
              Glass engineered for long-term cellaring. Protection against UV
              and oxidation to ensure the bottle only gets better with time.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group p-8 bg-neutral-900/50 border border-white/5 hover:border-white/20 transition-all duration-500">
              <div className="mb-8 w-16 h-16 bg-berlin-blue/10 rounded-full flex items-center justify-center text-berlin-blue group-hover:bg-berlin-blue group-hover:text-white transition-colors">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform">
                UV Filtration
              </h3>
              <p className="text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors">
                Antique Green and Dead Leaf Green glass block harmful light
                spectrums, preventing oxidation and "light strike" faults in
                delicate wines.
              </p>
            </div>

            {/* Card 2 */}
            <div className="group p-8 bg-neutral-900/50 border border-white/5 hover:border-white/20 transition-all duration-500">
              <div className="mb-8 w-16 h-16 bg-berlin-red/10 rounded-full flex items-center justify-center text-berlin-red group-hover:bg-berlin-red group-hover:text-white transition-colors">
                <Droplets className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform">
                Punt Technology
              </h3>
              <p className="text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors">
                Deep punts not only add aesthetic weight and grandeur but also
                aid in sediment collection for proper decanting and service.
              </p>
            </div>

            {/* Card 3 */}
            <div className="group p-8 bg-neutral-900/50 border border-white/5 hover:border-white/20 transition-all duration-500">
              <div className="mb-8 w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-white group-hover:bg-white group-hover:text-neutral-950 transition-colors">
                <Box className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold mb-4 group-hover:translate-x-2 transition-transform">
                Finish Precision
              </h3>
              <p className="text-neutral-500 leading-relaxed group-hover:text-neutral-400 transition-colors">
                Exact bore specifications for cork, synthetic, or screw cap
                (Stelvin), ensuring a perfect airtight seal every time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE SHOWROOM (Grid) */}
      <section className="py-32 bg-neutral-50">
        <div className="container mx-auto px-6 max-w-[1600px]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tighter mb-4">
                THE CELLAR
              </h2>
              <p className="text-lg text-neutral-500 max-w-md">
                curated glass for the modern vintner.
              </p>
            </div>
            <Link
              href="/catalog"
              className="text-berlin-blue font-bold hover:text-berlin-red transition-colors uppercase tracking-widest text-sm"
            >
              View Full Catalog &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8">
            {market.gallery.map((item, i) => (
              <div key={i} className="group perspective-1000">
                <div className="relative aspect-square bg-white shadow-xl hover:shadow-2xl transition-all duration-500 mb-8 overflow-hidden transform-gpu group-hover:rotate-1">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className={`object-cover ${
                      item.imagePosition || "object-center"
                    } group-hover:scale-110 transition-transform duration-700`}
                  />
                </div>
                <div className="flex justify-between items-start border-t border-neutral-200 pt-6">
                  <div>
                    <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-neutral-500 font-mono text-sm">
                      {item.desc}
                    </p>
                  </div>
                  <div className="text-neutral-300 group-hover:text-berlin-red transition-colors">
                    <Factory className="w-6 h-6" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FINAL CTA */}
      <section className="py-32 bg-berlin-blue text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]" />
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
            READY TO BOTTLE?
          </h2>
          <p className="text-xl text-blue-200 mb-12 max-w-2xl mx-auto">
            Prepare for the crush. Secure your glass allocation before harvest
            season begins.
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-6 bg-white text-berlin-blue font-black text-lg uppercase tracking-widest hover:bg-berlin-red hover:text-white transition-colors duration-300"
          >
            Start Your Order
          </Link>
        </div>
      </section>
    </div>
  );
}
