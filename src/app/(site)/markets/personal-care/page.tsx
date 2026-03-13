"use client";

import { MARKETS_DATA, Market } from "@/data/markets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function PersonalCareMarketPage() {
  const market = MARKETS_DATA.find((m: Market) => m.slug === "personal-care");

  if (!market) {
    notFound();
  }

  const personalCareItems = [
    {
      title: "Skin & Face Care",
      image: "/images/markets/pc_cat_skin_care_1772894009183.png",
    },
    {
      title: "Hair Care",
      image: "/images/markets/pc_cat_hair_care_1772894022257.png",
    },
    {
      title: "Perfume & Fragrance",
      image: "/images/markets/pc_cat_perfume_1772894035784.png",
    },
    {
      title: "Deodorant",
      image: "/images/markets/pc_cat_deodorant_1772894050508.png",
    },
    {
      title: "Ointment",
      image: "/images/markets/pc_cat_ointment_1772894063958.png",
    },
    {
      title: "Oral Care",
      image: "/images/markets/pc_cat_oral_care_1772894080387.png",
    },
    {
      title: "Solution Bottles",
      image: "/images/markets/pc_cat_solution_1772894092447.png",
    },
    {
      title: "Tablets & Capsules",
      image: "/images/markets/pc_cat_capsules_1772894106218.png",
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans selection:bg-rose-100 selection:text-berlin-blue">
      {/* 1. HERO: THE RITUAL - HIGH KEY STUDIO */}
      <section className="relative h-[90vh] min-h-[700px] flex items-center justify-center overflow-hidden bg-neutral-900">
        <div className="absolute inset-0 z-0">
          <Image
            src={market.image}
            alt="Beauty & Personal Care"
            fill
            className="object-cover opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
        </div>

        <div className="relative z-10 container mx-auto px-6 max-w-[1600px] text-center">
          <Link
            href="/markets"
            className="inline-flex items-center gap-2 text-white/50 hover:text-white mb-8 transition-colors text-xs font-mono tracking-[0.3em] uppercase"
          >
            <ArrowLeft className="w-3 h-3" /> CatalogPrime Intelligence
          </Link>

          <h1 className="text-7xl md:text-[9rem] font-black text-white mb-6 tracking-tighter leading-[0.85] uppercase">
            Beauty & <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-300">
              Personal Care.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-200 font-light tracking-wide max-w-3xl mx-auto leading-relaxed mb-12">
            Where clinical efficacy meets luxury shelf appeal. We engineer
            medical-grade dispensing systems wrapped in award-winning
            aesthetics.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <button className="px-8 py-4 bg-white text-berlin-blue font-bold uppercase tracking-widest hover:bg-neutral-100 transition-colors shadow-2xl">
              Start Your Project
            </button>
            <button className="px-8 py-4 bg-transparent text-white border border-white/30 font-bold uppercase tracking-widest hover:bg-white/10 transition-colors">
              Request Samples
            </button>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY GRID */}
      <section className="py-24 bg-[#f4f4f4]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {personalCareItems.map((item, idx) => (
              <div
                key={idx}
                className="bg-white p-8 flex flex-col items-center justify-between shadow-sm border border-neutral-100 hover:shadow-md transition-shadow h-full"
              >
                <div className="relative w-full h-48 mb-8">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="border border-[#e31837] text-[#e31837] font-bold text-[10px] md:text-xs uppercase px-4 py-2 hover:bg-[#e31837] hover:text-white transition-colors cursor-pointer text-center w-auto">
                  {item.title}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. PUT YOUR BEST FOOT FORWARD */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-4">
              <h2 className="text-3xl md:text-4xl font-black text-neutral-900 mb-6 leading-tight tracking-tight">
                Command The Shelf Without
                <br className="hidden lg:block" /> Compromise
              </h2>
              <p className="text-neutral-700 leading-relaxed text-sm">
                In the saturated beauty and wellness landscape, your dispensing
                architecture must perform flawlessly while instantly
                communicating brand equity. Whether it's the precise actuation
                force of a luxury serum pump or the haptic feedback of a compact
                closure, PIF Packaging engineers physical touchpoints that build
                consumer loyalty from the first use.
              </p>
            </div>
            <div className="lg:col-span-8 relative">
              <div className="relative aspect-[16/9] w-full border border-neutral-200">
                <Image
                  src="/images/markets/pc_feature_best_foot_1772894123534.png"
                  alt="Personal Care Environment"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/10 p-4">
                  <h3 className="text-5xl md:text-7xl lg:text-[5.5rem] font-black text-[#e31837] drop-shadow-md text-center uppercase tracking-tighter leading-[0.85]">
                    PERSONAL CARE <br /> PACKAGING
                  </h3>
                  <div className="mt-4 bg-white/90 px-6 py-2 border-2 border-[#e31837]">
                    <span className="text-[#e31837] font-black tracking-widest text-lg md:text-2xl uppercase">
                      PIFPACKAGING.COM
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. WE HAVE YOU COVERED */}
      <section className="py-24 bg-[#f4f4f4]">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-12 gap-12 lg:gap-24">
            <div className="md:col-span-4">
              <h3 className="text-xl font-black text-neutral-900 mb-4 tracking-tight">
                A Holistic Ecosystem
              </h3>
              <p className="text-neutral-600 mb-4 text-sm leading-relaxed">
                Dive into our highly curated vault of validated components,
                designed to protect your most sensitive formulations.
              </p>
              <Link
                href="/catalog"
                className="text-neutral-900 hover:text-[#e31837] font-bold text-sm transition-colors border-b border-neutral-900 hover:border-[#e31837] pb-1 uppercase tracking-wider"
              >
                Enter the Catalog
              </Link>
            </div>
            <div className="md:col-span-8">
              <h2 className="text-3xl font-black text-neutral-900 mb-6 tracking-tight">
                End-to-End Orchestration
              </h2>
              <p className="text-neutral-700 leading-relaxed text-sm mb-6">
                PIF Packaging brings decades of highly specialized expertise to
                global skincare conglomerates, boutique formulation labs, and
                specialized contract manufacturers. We recognize that the vessel
                is just as critical as the clinical actives inside it.
              </p>
              <p className="text-neutral-700 leading-relaxed text-sm">
                Our global supply matrix navigates the extreme technical
                requirements of the sector—from glass delamination risks in
                sensitive serums to the regulatory demands of SPF dispersions.
                We don't just supply bottles; we integrate seamlessly into your
                commercialization pipeline to ensure stability, aesthetic
                dominance, and reliable scaled production.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. SUSTAINABLE ARCHITECTURE */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-black text-neutral-900 mb-6 tracking-tight">
            Sustainable Architecture & PCR Integration
          </h2>
          <div className="space-y-6 max-w-5xl">
            <p className="text-neutral-700 leading-relaxed text-sm">
              The future of personal care lies in environmental responsibility
              without sacrificing the premium unboxing experience. At PIF
              Packaging, we engineer solutions that balance luxury weight and
              physical presence with advanced sustainable materials, including
              Post-Consumer Recycled (PCR) resins, infinitely recyclable
              aluminum, and true mono-material pump systems.
            </p>
            <p className="text-neutral-700 leading-relaxed text-sm">
              Our engineering team works directly with your brand to conduct
              structural lifecycle assessments, ensuring your product launch
              meets strict retailer sustainability mandates. By seamlessly
              transitioning complex multi-part closures into streamlined, easily
              recyclable single-polymer designs, we help you achieve your ESG
              (Environmental, Social, and Governance) goals while maintaining
              aesthetic dominance on the shelf.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="text-[#0055b8] hover:text-[#e31837] font-bold text-xs uppercase tracking-widest transition-colors block"
              >
                Explore Our Sustainability Initiatives
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CTA FOOTER */}
      <section className="py-24 bg-rose-50 text-berlin-blue relative overflow-hidden">
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase">
            Elevate Your Brand.
          </h2>
          <p className="text-xl text-neutral-600 mb-12 max-w-2xl mx-auto font-light">
            Ready to disrupt the shelf? Let&apos;s engineer a packaging program
            that performs as beautifully as it looks.
          </p>
          <Link
            href="/contact"
            className="inline-block px-12 py-5 bg-berlin-blue text-white font-bold text-lg uppercase tracking-widest hover:bg-neutral-900 transition-colors shadow-2xl"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  );
}
