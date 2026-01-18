import { MARKETS_DATA, Market } from "@/data/markets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";

export default function HomeCareMarketPage() {
  const market = MARKETS_DATA.find((m: Market) => m.slug === "home-care");

  if (!market) {
    notFound();
  }

  return (
    <div className="bg-white min-h-screen">
      {/* HERO SECTION - CINEMATIC */}
      <section className="group relative h-[80vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-neutral-950">
        <div className="absolute inset-0 z-0">
          <Image
            src={market.image}
            alt={market.title}
            fill
            className="object-cover opacity-50 contrast-125 saturate-0 group-hover:saturate-100 transition-all duration-700 ease-in-out"
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

      {/* 2. THE ARSENAL (Category Matrix) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="text-center mb-24">
            <h2 className="text-4xl font-black text-berlin-blue mb-4 tracking-tight uppercase">
              The Arsenal
            </h2>
            <div className="w-24 h-1 bg-berlin-red mx-auto" />
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: "Utility Jugs",
                image: "/images/markets/home_care_utility_jug.png",
              },
              {
                title: "Cleaning Bottles",
                image: "/images/markets/home_care_cleaning_bottle.png",
              },
              {
                title: "Spray Bottles",
                image: "/images/markets/home_care_spray_bottle.png",
              },
              {
                title: "Buckets & Pails",
                image: "/images/markets/home_care_pail.png",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="group relative bg-white border border-neutral-100 hover:border-berlin-red transition-all duration-500 hover:-translate-y-2 hover:shadow-xl"
              >
                <div className="aspect-[4/5] relative p-8">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain p-4 group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 bg-white border-t border-neutral-50">
                  <h3 className="text-lg font-bold text-berlin-blue text-center uppercase tracking-wider group-hover:text-berlin-red transition-colors">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. DISPENSING ARCHITECTURE (Tech Banner) */}
      <section className="relative h-[400px] bg-neutral-900 flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/markets/home_care_dispensing_banner.png"
            alt="Dispensing Technology"
            fill
            className="object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-900 via-neutral-900/80 to-transparent" />
        </div>
        <div className="relative z-10 container mx-auto px-6 max-w-7xl">
          <h2 className="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter max-w-3xl">
            Precision <br /> Dispensing <br />
            <span className="text-neutral-500">Systems.</span>
          </h2>
          <p className="text-xl text-neutral-400 max-w-xl font-light">
            Optimized actuation for every viscosity. From foaming triggers to
            high-output industrial pumps, we ensure the delivery matches the
            chemistry.
          </p>
        </div>
      </section>

      {/* 4. THE RITUAL (Narrative Split) */}
      <section className="py-0 bg-white border-b border-neutral-100">
        <div className="grid md:grid-cols-2 min-h-[700px]">
          <div className="flex flex-col justify-center p-12 md:p-32">
            <h2 className="text-4xl md:text-6xl font-black text-berlin-blue mb-8 tracking-tighter uppercase leading-[0.9]">
              Sanctuary <br /> Standards.
            </h2>
            <p className="text-lg text-neutral-500 leading-relaxed mb-8 max-w-md">
              The modern home is a fortress of well-being. Consumers demand
              hospital-grade hygiene without the clinical aesthetic. We design
              packaging that signals safety, efficacy, and premium care—bottles
              that earn their place on the countertop, not under the sink.
            </p>
            <div className="w-12 h-1 bg-berlin-red" />
          </div>
          <div className="relative bg-neutral-100 min-h-[500px]">
            <Image
              src="/images/markets/home_care_lifestyle_kitchen.png"
              alt="Home Lifestyle"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-berlin-blue/10 mix-blend-multiply" />
          </div>
        </div>
      </section>

      {/* 5. SURFACE SCIENCE (Use Case Split) */}
      <section className="py-0 bg-neutral-50 border-b border-neutral-100">
        <div className="grid md:grid-cols-2 min-h-[700px]">
          {/* Image Left */}
          <div className="relative bg-neutral-200 min-h-[500px] order-2 md:order-1">
            <Image
              src="/images/markets/home_care_cleaning_action.png"
              alt="Surface Cleaning"
              fill
              className="object-cover"
            />
          </div>
          {/* Text Right */}
          <div className="flex flex-col justify-center p-12 md:p-32 order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-black text-berlin-blue mb-8 tracking-tight uppercase">
              Industrial <br /> Efficacy.
            </h2>
            <p className="text-lg text-neutral-500 leading-relaxed mb-8">
              We don&apos;t just supply bottles; we engineer deployment systems
              for the I&I and Household sectors. From caustic chemical
              resistance to ergonomic fatigue reduction, our hardware is built
              for the rigors of real-world cleaning.
            </p>
            <ul className="space-y-4 font-bold text-berlin-blue">
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-berlin-red" /> Chemically
                Resistant HDPE
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-berlin-red" /> CR & TE
                Safety Protocols
              </li>
              <li className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-berlin-red" />{" "}
                UN-Certified Bulk Logistics
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 6. THE PCR INITIATIVE (Sustainability Feature) */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-3 px-3 py-1 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-widest rounded-full mb-8">
                <ShieldCheck className="w-4 h-4" /> Sustainability Initiative
              </div>
              <h2 className="text-5xl font-black text-berlin-blue mb-6 tracking-tight">
                Sustainability: <br /> Circle of Life.
              </h2>
              <p className="text-lg text-neutral-500 leading-relaxed mb-8">
                The package refresh for Eco-Clean Brands met several key
                requirements for success: reduced carbon footprint, 100% PCR
                integration, and fully recyclable mono-material pumps.
                <br />
                <br />
                Don&apos;t navigate the green transition alone. Our engineering
                team validates PCR supply chains and recyclability standards for
                your specific SKU.
              </p>
              <Link
                href="/contact"
                className="text-berlin-red font-bold uppercase tracking-widest text-sm hover:underline"
              >
                Start Your Transition &rarr;
              </Link>
            </div>
            <div className="relative h-[600px] w-full">
              <Image
                src="/images/markets/home_care_pcr_trio.png"
                alt="Sustainable Packaging Trio"
                fill
                className="object-contain object-right"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. TECHNICAL LEXICON (Detailed Footer Info) */}
      <section className="py-24 bg-neutral-50 border-t border-neutral-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-3 gap-16">
            {/* Col 1 */}
            <div>
              <h3 className="text-2xl font-black text-berlin-blue mb-6 uppercase">
                Form Factor Architecture
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                From bulk industrial buckets to ergonomic consumer-facing
                trigger sprayers. We optimize the vessel for the
                environment—maximizing pallet density for logistics and shelf
                presence for retail.
              </p>
            </div>
            {/* Col 2 */}
            <div>
              <h3 className="text-2xl font-black text-berlin-blue mb-6 uppercase">
                Polymer Engineering
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Material selection is critical for formulation stability. We
                deploy high-clarity PET for consumer appeal and impact-resistant
                HDPE for aggressive solvents and bleach-based compounds.
              </p>
            </div>
            {/* Col 3 */}
            <div>
              <h3 className="text-2xl font-black text-berlin-blue mb-6 uppercase">
                Brand Deployment
              </h3>
              <p className="text-sm text-neutral-500 leading-relaxed">
                Packaging is the only media channel with 100% reach. Our
                strategic design team ensures your structural branding acts as a
                silent salesman, communicating efficacy and value on the crowded
                shelf.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA */}
      <section className="py-24 bg-berlin-blue text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="container mx-auto px-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-black mb-8 tracking-tight uppercase">
            Looking for a large-quantity quote?
          </h2>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-10 py-5 bg-berlin-red text-white font-bold text-lg hover:bg-red-700 transition-colors shadow-2xl uppercase tracking-widest"
          >
            Contact A Consultant
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </div>
  );
}
