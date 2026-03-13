import Image from "next/image";
import Link from "next/link";
import MarketCategoryGrid from "@/components/markets/MarketCategoryGrid";

export default function SpiritsMarketPage() {
  const spiritsItems = [
    {
      title: "Spirits Bottles",
      image: "/images/markets/spirits_grid_glass.png",
      href: "/search?q=glass+liquor+bottles",
    },
    {
      title: "Liquor Decanters",
      image: "/images/markets/spirits_grid_decanters.png",
      href: "/search?q=decanters",
    },
    {
      title: "Flasks",
      image: "/images/markets/spirits_grid_flasks.png",
      href: "/search?q=flasks",
    },
    {
      title: "Closures",
      image: "/images/markets/spirits_grid_corks.png",
      href: "/search?q=bar+top+corks",
    },
    {
      title: "Custom Closures",
      image: "/images/markets/spirits_grid_tamper_caps.png",
      href: "/custom-bar-top-quote",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/markets/spirits_hero_bg.png"
            alt="Spirits Packaging Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 text-center text-white px-6 mt-16 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-lg">
            Spirits Packaging
          </h1>
          <p className="text-xl md:text-2xl font-medium drop-shadow-md text-neutral-100">
            Premium bottles, bespoke closures, and top-shelf clarity designed to
            elevate your brand.
          </p>
        </div>
      </section>

      {/* 2. CATEGORY GRID */}
      <MarketCategoryGrid items={spiritsItems} columns={5} />

      {/* 3. STOCK & CUSTOM (Split) */}
      <section className="py-20 bg-neutral-50 border-t border-neutral-100">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image Block */}
            <div className="relative h-[350px] md:h-[450px] w-full rounded-lg overflow-hidden shadow-xl border border-neutral-200">
              <Image
                src="/images/markets/spirits_split_custom_design.png"
                alt="Stock and Custom Spirits Packaging"
                fill
                className="object-cover"
              />
            </div>

            {/* Content Block */}
            <div className="p-4 md:p-8">
              <h2 className="text-3xl font-black text-neutral-900 mb-6 tracking-tight leading-tight shrink-0">
                Stock and Custom Spirits Packaging
              </h2>
              <p className="text-neutral-700 leading-relaxed text-base mb-6">
                From high-clarity stock bottles and specialized closures to
                bespoke primary and secondary packaging, PIF Packaging supports
                your brand from initial concept to commercial launch.
              </p>
              <h3 className="text-xl font-bold text-neutral-900 mb-3 mt-8">
                Top-Shelf Design to Stand Out
              </h3>
              <p className="text-neutral-700 leading-relaxed text-base mb-8">
                Our in-house design capabilities can elevate your distillery's
                presence and boost sales with custom packaging molds, cohesive
                brand strategy, and permanent tactile branding like embossing.
              </p>
              <Link
                href="/contact"
                className="inline-flex px-8 py-3 bg-[#e31837] text-white font-bold rounded hover:bg-red-700 transition-colors shadow-sm"
              >
                Request a Design Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 4. TOP SHELF DESIGN (Showcase Grid) */}
      <section className="bg-black py-24 border-t border-neutral-900">
        <div className="container mx-auto px-6 max-w-4xl text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
            Bespoke Structural Design for Premium Brands
          </h2>
          <p className="text-lg md:text-xl font-medium text-neutral-300 mb-8 leading-relaxed max-w-3xl mx-auto drop-shadow-sm">
            At PIF Packaging, our dedicated design consultants collaborate
            directly with your distillery. We transform your concept into a
            tangible reality through proprietary glass molds, distinctive
            closure systems, and high-fidelity decoration—engineering a premium
            physical presence that inherently commands the top shelf.
          </p>
          <Link
            href="/contact"
            className="inline-flex px-10 py-4 bg-[#e31837] text-white font-bold rounded hover:bg-red-700 transition-colors shadow-lg uppercase tracking-wider text-sm"
          >
            Reach out today!
          </Link>
        </div>

        {/* 8-Image Grid */}
        <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-0">
          {[
            "design_showcase_1_1772893102605.png",
            "design_showcase_2_1772893116610.png",
            "design_showcase_3_1772893135639.png",
            "design_showcase_4_1772893149664.png",
            "design_showcase_5_1772893163930.png",
            "design_showcase_6_1772893180704.png",
            "design_showcase_7_1772893196491.png",
            "design_showcase_8_1772893211145.png",
          ].map((filename, idx) => (
            <div
              key={idx}
              className="relative aspect-square md:aspect-[4/5] w-full overflow-hidden bg-neutral-900 group"
            >
              <Image
                src={`/images/markets/${filename}`}
                alt={`Premium Spirits Design Showcase ${idx + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-1000 ease-out opacity-90 group-hover:opacity-100"
              />
            </div>
          ))}
        </div>
      </section>

      {/* 5. TAKE YOUR BEST SHOT (Split) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid md:grid-cols-2 gap-12 items-center md:flex-row-reverse">
            {/* Content Block (Left on Desktop, Top on Mobile) */}
            <div className="p-4 md:p-8 order-2 md:order-1">
              <h2 className="text-3xl font-black text-neutral-900 mb-6 tracking-tight leading-tight shrink-0">
                Take Your Best Shot
              </h2>
              <p className="text-neutral-700 leading-relaxed text-base mb-6">
                The spirits market is fiercely competitive, with both global
                mega-brands and artisanal craft distillers vying for consumer
                attention and &quot;share of stomach.&quot; Distinctive, premium
                packaging is required to command the top shelf and survive in a
                crowded retail landscape.
              </p>
              <p className="text-neutral-700 leading-relaxed text-base mb-8">
                We engineered our glass with maximum refractive integrity—our
                Super Flint formulation removes iron impurities, resulting in an
                optically neutral medium that ensures your liquid&apos;s true
                hue is never distorted by a greenish bloom.
              </p>
              <Link
                href="/contact"
                className="inline-flex px-8 py-3 outline outline-2 outline-offset-[-2px] outline-[#e31837] text-[#e31837] font-bold rounded hover:bg-red-50 transition-colors"
              >
                Order Material Samples
              </Link>
            </div>

            {/* Image Block (Right on Desktop, Bottom on Mobile) */}
            <div className="relative h-[350px] md:h-[450px] w-full rounded-lg overflow-hidden shadow-xl border border-neutral-100 order-1 md:order-2">
              <Image
                src="/images/markets/spirits_split_best_shot.png"
                alt="Take Your Best Shot - Premium Bar Shelves"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 5. QUOTE BANNER */}
      <section className="bg-berlin-blue py-12 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-2xl md:text-3xl font-black text-white mb-6">
            Looking for a large-quantity quote? Contact a PIF Packaging
            Consultant today.
          </h2>
          <Link
            href="/contact"
            className="inline-block px-8 py-3 bg-[#e31837] text-white font-bold rounded hover:bg-red-700 transition-colors shadow-md"
          >
            Request a Quote
          </Link>
        </div>
      </section>

      {/* 6. SEO FOOTER */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 max-w-4xl flex flex-col gap-12">
          {/* Paragraph Block 1 */}
          <div>
            <p className="text-neutral-600 leading-relaxed max-w-4xl text-base">
              PIF Packaging provides spirits bottles in a variety of classic and
              bespoke shapes, prioritizing inert, high-clarity materials. Glass
              is absolutely impermeable, shielding precious botanical and barrel
              profiles from oxidation or contamination while perfectly
              displaying the liquid&apos;s true hue. For high-velocity
              hospitality or airline environments, our premium shatter-resistant
              plastic bottles reduce breakage without compromising the brand
              aesthetic.
            </p>
          </div>

          {/* Paragraph Block 2 */}
          <div>
            <h3 className="text-xl font-black text-neutral-900 mb-4 tracking-tight leading-snug">
              A Variety of Shapes and Types of Spirits Bottles
            </h3>
            <p className="text-neutral-600 leading-relaxed max-w-4xl text-base">
              The architectural form of a glass bottle is the primary language
              of a spirits brand. We offer everything from classic narrowed
              bottoms with deep push-up bases for wine-inspired spirits, to
              stout, cubist decanters that highlight the rich amber of an aged
              whiskey. For unique tactile engagement, we supply textured
              exteriors and old-world bale wire swing tops that snap secure with
              a satisfying, reliable seal.
            </p>
          </div>

          {/* Paragraph Block 3 */}
          <div>
            <h3 className="text-xl font-black text-neutral-900 mb-4 tracking-tight leading-snug">
              What Additional Spirits Bottles Accessories Are Available?
            </h3>
            <p className="text-neutral-600 leading-relaxed max-w-4xl text-base">
              The closure represents the final signature of trust. Pair your
              liquor bottles with high-end bar top corks utilizing real wood or
              zamac shanks, offering both easy access and a distinguished
              unsealing experience. For rigorous transit operations, employ
              heavy-duty tamper-evident threaded caps or tin pilfer-proof
              closures—these instantly alert consumers if the seal is
              compromised while tightly securing the remaining contents.
            </p>
          </div>

          {/* Paragraph Block 4 */}
          <div>
            <h3 className="text-xl font-black text-neutral-900 mb-4 tracking-tight leading-snug">
              Benefits of Choosing PIF Packaging
            </h3>
            <p className="text-neutral-600 leading-relaxed max-w-4xl text-base">
              Beyond sourcing exceptional glass, PIF Packaging provides complete
              supply chain management, ensuring your proprietary bottles arrive
              clean and precisely on schedule. Furthermore, our dedicated
              decoration team assists with brand articulation—selecting complex
              embossments, ceramic decals, metalizing treatments, and precision
              neck bands to distinguish your spirit on any retail shelf.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
