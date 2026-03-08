import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Truck,
  Target,
  Recycle,
  Clock,
  Globe2,
  ArrowRight,
  Download,
} from "lucide-react";
import { MARKETS_DATA } from "@/data/markets";

export default function WineMarketPage() {
  const market = MARKETS_DATA.find((m) => m.slug === "wine") || {
    slug: "wine",
    title: "Wine",
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2670&auto=format&fit=crop",
    description: "Premium glass packaging for vineyards and wineries.",
  };

  return (
    <div className="bg-white min-h-screen text-neutral-900 selection:bg-berlin-red selection:text-white pb-32">
      {/* 1. CINEMATIC MONOLITH HERO */}
      <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-neutral-950 flex flex-col justify-between">
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

      {/* 2. PRODUCT GRID (5-ITEM) */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-neutral-900 mb-6 tracking-tight">
              Glass That Elevates Every Vintage
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-8">
              Discover our comprehensive portfolio of premium wine packaging,
              engineered to preserve delicate flavor profiles while maximizing
              shelf impact.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              {
                img: "/images/markets/wine_cat_burgundy_1772895216021.png",
                title: "Burgundy Glass",
              },
              {
                img: "/images/markets/wine_cat_claret_1772895231514.png",
                title: "Claret / Bordeaux",
              },
              {
                img: "/images/markets/wine_cat_hock_1772895248630.png",
                title: "Hock Forms",
              },
              {
                img: "/images/markets/wine_cat_sparkling_1772895260971.png",
                title: "Sparkling & Cuvée",
              },
              {
                img: "/images/markets/wine_cat_closures_1772895277828.png",
                title: "Premium Closures",
              },
            ].map((item, i) => (
              <Link
                href={`/products?category=${item.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                key={i}
                className="flex flex-col items-center group cursor-pointer text-center"
              >
                <div className="relative w-full aspect-[3/4] mb-4 bg-[#f8f8f8] border border-neutral-100 group-hover:border-berlin-red/30 transition-colors overflow-hidden">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h4 className="font-bold text-sm tracking-widest uppercase text-neutral-800 group-hover:text-berlin-red transition-colors">
                  {item.title}
                </h4>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-block border-2 border-neutral-900 px-8 py-3 font-bold text-sm uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-colors"
            >
              View In-Stock Catalog
            </Link>
          </div>
        </div>
      </section>

      {/* 3. EXPERTISE SPLIT */}
      <section className="py-24 bg-[#f4f4f4]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-black leading-[0.9] tracking-tighter">
                Strategic Partners For The Global Wine Industry
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Wine production is a delicate balance of agriculture, chemistry,
                and precise timing. At PIF Packaging, our deep understanding of
                the harvest cycle allows us to preempt supply chain bottlenecks.
              </p>
              <p className="text-neutral-600 text-lg leading-relaxed">
                Whether you are a boutique estate winery requiring rapid
                inventory turns, or a mass-market conglomerate managing massive
                glass allocations, our logistics network ensures your bottles
                arrive flawlessly, exactly when the vintage demands it.
              </p>
              <div className="pt-4">
                <Link
                  href="/quotes/wine"
                  className="inline-block border-2 border-neutral-900 px-8 py-3 font-bold text-sm uppercase tracking-widest hover:bg-neutral-900 hover:text-white transition-colors"
                >
                  Get In Touch Today
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative aspect-[4/5] w-full group overflow-hidden">
                  <Image
                    src="/images/markets/wine_exp_vineyard_1772895307188.png"
                    alt="Vineyard"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="relative aspect-square w-full group overflow-hidden">
                  <Image
                    src="/images/markets/wine_exp_logistics_1772895336690.png"
                    alt="Logistics"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="pt-12">
                <div className="relative aspect-[4/5] w-full group overflow-hidden shadow-2xl">
                  <Image
                    src="/images/markets/wine_exp_cellar_1772895322498.png"
                    alt="Cellar"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-berlin-red/10 group-hover:bg-transparent transition-colors duration-500" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. GLOBAL REACH BANNER */}
      <section className="relative py-32 bg-black overflow-hidden flex items-center justify-center min-h-[500px]">
        <Image
          src="/images/markets/wine_global_reach_1772895352856.png"
          alt="Global Region"
          fill
          className="object-cover opacity-50"
        />
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto text-white">
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 uppercase">
            At Home In Every Terroir
          </h2>
          <p className="text-xl md:text-2xl font-light text-white/90 mb-8 leading-relaxed">
            From the historic soils of Bordeaux, France to the sun-drenched
            valleys of Napa, California, our logistics architecture spans the
            globe. We hold vast domestic inventory to shield our partners from
            geopolitical shipping delays.
          </p>
          <button className="bg-transparent border-2 border-white px-8 py-3 uppercase tracking-widest text-sm font-bold hover:bg-white hover:text-black transition-colors">
            Explore Our Network
          </button>
        </div>
      </section>

      {/* 5. SERVICES GRID */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black tracking-tighter mb-4">
              Value-Added Structural Services
            </h2>
            <p className="text-neutral-500 max-w-2xl mx-auto text-lg pt-4 border-t border-neutral-200">
              Beyond supplying glass, PIF Packaging provides the infrastructural
              support required to dominate retail environments.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-16 gap-x-12">
            {[
              {
                icon: Truck,
                title: "Just-In-Time Delivery",
                desc: "Warehousing programs matched to your bottling schedule.",
              },
              {
                icon: Globe2,
                title: "Global Glass Sourcing",
                desc: "Unrestricted access to the world's finest glass manufacturing facilities.",
              },
              {
                icon: ShieldCheck,
                title: "Quality Assurance",
                desc: "Rigorous QA checks for punt depth, bore consistency, and pressure safety.",
              },
              {
                icon: Target,
                title: "Brand Alignment",
                desc: "Bespoke molds and proprietary shapes for market differentiation.",
              },
              {
                icon: Recycle,
                title: "Sustainability Protocols",
                desc: "Lightweighted glass options and PCR integration to meet ESG targets.",
              },
              {
                icon: Clock,
                title: "Harvest Readiness",
                desc: "Emergency glass allocations secured prior to harvest peaks.",
              },
            ].map((feature, i) => (
              <div key={i} className="text-center group">
                <div className="mx-auto w-16 h-16 rounded-full border border-neutral-200 flex items-center justify-center mb-6 group-hover:border-berlin-red group-hover:text-berlin-red transition-colors">
                  <feature.icon className="w-6 h-6 stroke-[1.5]" />
                </div>
                <h4 className="font-bold text-lg mb-2">{feature.title}</h4>
                <p className="text-neutral-500 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 3-COLUMN CAPABILITY GRID */}
      <section className="py-24 bg-[#0a0a0a] text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter max-w-lg leading-[0.9]">
              WE BRING CELLARS TO LIFE
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                img: "/images/markets/wine_cap_design_1772895386185.png",
                title: "Custom Structural Design",
                desc: "In-house industrial engineers drafting proprietary glass shapes that command the shelf and disrupt traditional wine packaging norms.",
              },
              {
                img: "/images/ীব/wine_cap_secondary_1772895401146.png",
                title: "Secondary Packaging",
                desc: "Premium custom corrugated shippers, pulp dividers, and luxury presentation boxes designed to survive transit while retaining brand equity.",
              },
              {
                img: "/images/markets/wine_cap_repack_1772895418156.png",
                title: "Quality Control & Prep",
                desc: "Meticulous pre-bottling inspection, sanitization protocols, and preparatory staging for high-speed automated bottling lines.",
              },
            ].map((cap, i) => (
              <div key={i} className="group">
                <div className="relative aspect-[4/3] w-full mb-6 overflow-hidden">
                  {/* Using standard replace logic for the typo in img path */}
                  <Image
                    src={cap.img.replace("ীব", "markets")}
                    alt={cap.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80 group-hover:opacity-100"
                  />
                </div>
                <h4 className="text-xl font-bold mb-3">{cap.title}</h4>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. REPACKING SPLIT SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black mb-6 tracking-tighter leading-[0.9]">
                High-Volume Repacking & Value-Add Services
              </h2>
              <p className="text-neutral-600 text-lg leading-relaxed mb-6">
                Bottling wine is only half the battle. PIF Packaging provides
                mass-scale contract repacking, club-box assembly, and multi-pack
                kitting services directly from our FDA-certified warehouse hubs.
                We strip away logistical friction.
              </p>
              <Link
                href="/services/logistics"
                className="inline-flex items-center gap-2 font-bold uppercase tracking-widest text-sm text-berlin-red hover:text-neutral-900 transition-colors"
              >
                Learn About Logistics <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="relative aspect-[16/9] w-full border border-neutral-200">
              <Image
                src="/images/markets/wine_repacking_wide_1772895432487.png"
                alt="Repacking Line"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 8. GLOBAL SOURCING NETWORK (Case Study Replacement) */}
      <section className="py-24 bg-neutral-900 text-white text-center">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl font-bold tracking-[0.2em] text-neutral-400 mb-6 uppercase text-sm">
            Strategic Infrastructure
          </h2>
          <h3 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-neutral-200 to-neutral-500 pb-2">
            The Global Sourcing Network
          </h3>
          <p className="text-xl font-light text-neutral-300 leading-relaxed mb-12">
            When domestic glass furnaces face unexpected shutdowns or seasonal
            harvest spikes overwhelm regional supply, PIF Packaging leverages
            its deeply entrenched global procurement matrix. We secure
            high-tonnage glass allocations internationally, shielding our
            partners from critical supply chain failures.
          </p>
        </div>
      </section>

      {/* 9. BROCHURE BANNER */}
      <section className="py-16 bg-[#f4f4f4]">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="bg-white p-8 md:p-12 shadow-2xl flex flex-col md:flex-row gap-12 items-center">
            <div className="relative w-full md:w-1/2 aspect-square">
              <Image
                src="/images/markets/wine_brochure_1772895446083.png"
                alt="Brochure"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-full md:w-1/2 space-y-6">
              <h3 className="text-3xl font-black tracking-tighter">
                The 2026 In-Stock Wine Offerings Portfolio
              </h3>
              <p className="text-neutral-600 leading-relaxed">
                Explore our immediate-release inventory of premium glass,
                closures, and presentation packaging. Access the digital
                brochure to view structural specs, punt depths, and pallet
                configurations.
              </p>
              <button className="flex items-center gap-3 bg-berlin-red text-white px-8 py-4 font-bold uppercase tracking-widest hover:bg-neutral-900 transition-colors">
                <Download className="w-5 h-5" /> Download PDF
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
