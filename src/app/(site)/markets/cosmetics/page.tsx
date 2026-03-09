import { MARKETS_DATA } from "@/data/markets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import MarketCategoryGrid from "@/components/markets/MarketCategoryGrid";

export default function CosmeticsMarketPage() {
  const market = MARKETS_DATA.find((m) => m.slug === "cosmetics");

  if (!market) {
    notFound();
  }

  // Standard grid structure mirroring the reference site
  const cosmeticsCategories: {
    title: string;
    image: string;
    href: string;
  }[] = [
    {
      title: "Eyeshadow Containers",
      image: "/images/markets/cosmetics_eyeshadow.png",
      href: "/search?q=eyeshadow+containers",
    },
    {
      title: "Lip Balm & Lip Gloss Containers",
      image: "/images/markets/cosmetics_lip_balm.png",
      href: "/search?q=lip+balm+gloss",
    },
    {
      title: "Mascara & Eyebrow Packaging",
      image: "/images/markets/cosmetics_mascara.png",
      href: "/search?q=mascara+eyebrow",
    },
    {
      title: "Foundation & Concealer Packaging",
      image: "/images/markets/cosmetics_foundation.png",
      href: "/search?q=foundation+concealer",
    },
    {
      title: "Blush & Bronzer Packaging",
      image: "/images/markets/cosmetics_blush.png",
      href: "/search?q=blush+bronzer",
    },
    {
      title: "Nail Care Packaging",
      image: "/images/markets/cosmetics_nail_care.png",
      href: "/search?q=nail+care",
    },
    {
      title: "Online Easy Labels",
      image: "/images/markets/cosmetics_labels.png",
      href: "/services/decorating",
    },
    {
      title: "Truck Load Pricing",
      image: "/images/markets/cosmetics_truck.png",
      href: "/truckload-pricing",
    },
  ];

  return (
    <div className="bg-[#f4f4f4] min-h-screen font-sans pb-24">
      {/* 1. HERO SECTION (Restored per user request) */}
      <section className="relative h-[400px] md:h-[500px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={market.image}
            alt={`${market.title} Packaging`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 text-center text-white px-6 mt-16 max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-lg">
            {market.title} Packaging
          </h1>
          <p className="text-xl md:text-2xl font-medium drop-shadow-md text-neutral-100">
            {market.tagline}
          </p>
        </div>
      </section>

      {/* 2. EXACT GRID FROM SCREENSHOT (Using standard grid but without its own background color constraint) */}
      <section className="pt-12 pb-8">
        <div className="container mx-auto px-4 max-w-[1200px]">
          {/* We hide the title by overriding the grid's padding and header locally, but the easiest way is just to map the grid inline to match exactly */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {cosmeticsCategories.map((item, idx) => (
              <Link
                key={idx}
                href={item.href}
                className="group flex flex-col bg-white border border-neutral-200 hover:shadow-xl transition-shadow duration-300 relative overflow-hidden h-[340px]"
              >
                <div className="flex-1 relative p-6 flex flex-col items-center justify-center">
                  <div className="relative w-full h-full min-h-[160px]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="px-6 pb-6 w-full mt-auto">
                  <div className="w-full text-center py-2 border border-red-600 bg-white transition-colors duration-300">
                    <h3 className="text-[13px] font-bold text-red-600 tracking-wide capitalize px-1 leading-tight">
                      {item.title}
                    </h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. TEXT CONTENT EXACTLY AS SCREENSHOT */}
      <section className="py-12 bg-white mt-12 border-t border-neutral-200 shadow-sm">
        <div className="container mx-auto px-6 max-w-[1200px] text-slate-800 text-[15px] md:text-base leading-[1.7]">
          <p className="mb-0 font-medium text-slate-700">
            Elevating your cosmetic line begins with packaging that communicates
            uncompromising quality and inspires consumer trust. At PIF
            Packaging, we fuse aesthetic elegance with structural durability to
            deliver premium{" "}
            <span className="font-bold text-berlin-red">
              cosmetic packaging solutions
            </span>
            . Choose from our extensive catalog of high-grade glass, resilient
            plastics, and sleek metal containers, complete with
            precision-engineered dispensing closures designed to enhance your
            brand's presence.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-slate-900 mt-12 pb-3 border-b border-neutral-200">
            Premium Cosmetic Packaging Standards
          </h2>
          <p className="mb-0 text-slate-700 font-medium leading-[1.7]">
            For brands emphasizing clean, organic, or high-end formulations,
            optical clarity and structural feel are paramount. Transparent,
            heavy-walled PET and premium glass containers allow the natural
            beauty of your formulations to shine through, building immediate
            shelf appeal. From frosted glass jars that offer a weighty,
            luxurious hand-feel, to shatter-resistant acrylics that deliver the
            aesthetic of glass without the logistical fragility, our packaging
            ecosystem ensures your product feels as premium as it performs.
            Explore our{" "}
            <Link
              href="/search?q=plastic+bottles"
              className="text-berlin-red hover:underline font-bold"
            >
              advanced plastic bottles
            </Link>{" "}
            to find robust, elegant solutions for lotions, serums, and liquid
            soaps.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-slate-900 mt-12 pb-3 border-b border-neutral-200">
            Cross-Functional Beauty & Health Solutions
          </h2>
          <p className="mb-0 text-slate-700 font-medium leading-[1.7]">
            Our cosmetic packaging lines extend far beyond standard beauty
            applications. We supply FDA-approved, medical-grade components that
            cross over into the nutraceutical, personal care, and high-end
            apothecary sectors. Whether you require amber{" "}
            <Link
              href="/search?q=glass+jars"
              className="text-berlin-red hover:underline font-bold"
            >
              glass jars
            </Link>{" "}
            offering critical UV protection for volatile essential oils, or
            architecturally unique geometric containers for limited-edition
            product drops, our global supply chain is built to support diverse,
            cross-industry requirements with uncompromising safety standards.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-slate-900 mt-12 pb-3 border-b border-neutral-200">
            Wholesale & Industrial Scale Supply
          </h2>
          <p className="mb-0 text-slate-700 font-medium leading-[1.7]">
            Scaling your cosmetic production requires a secure, uninterrupted
            packaging supply chain. PIF Packaging offers aggressive wholesale
            and{" "}
            <Link
              href="/truckload-pricing"
              className="text-berlin-red hover:underline font-bold"
            >
              truck-load pricing
            </Link>{" "}
            structures designed strictly for industrial-scale manufacturing. Our
            bulk glass and PET plastic inventory not only optimizes your
            procurement costs but is engineered for superior barrier properties
            to maximize the shelf life and stability of your sensitive
            formulations.
          </p>

          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4 text-slate-900 mt-12 pb-3 border-b border-neutral-200">
            Advanced Decoration & Branding Services
          </h2>
          <p className="mb-0 text-slate-700 font-medium leading-[1.7]">
            Transform standard containers into iconic brand assets with our
            comprehensive decoration laboratory. At PIF Packaging,{" "}
            <Link
              href="/services/decorating"
              className="text-berlin-red hover:underline font-bold"
            >
              end-to-end labeling and finishing
            </Link>{" "}
            are handled with precision. From UV screen printing and bespoke
            spray frosting to high-build embossing and custom pressure-sensitive
            labels, our capabilities allow you to visualize your finished
            packaging on the shelf faster, accelerating your time to market.
          </p>
        </div>
      </section>
    </div>
  );
}
