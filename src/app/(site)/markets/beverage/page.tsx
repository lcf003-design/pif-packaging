import { MARKETS_DATA } from "@/data/markets";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Play } from "lucide-react";
import MarketCategoryGrid from "@/components/markets/MarketCategoryGrid";

export default function BeverageMarketPage() {
  const market = MARKETS_DATA.find((m) => m.slug === "beverage");

  if (!market) {
    notFound();
  }

  const beverageCategories = [
    {
      title: "Glass Beverage Bottles",
      image: "/images/markets/bev_glass.png",
      href: "/search?q=glass+beverage",
    },
    {
      title: "Plastic Beverage Bottles",
      image: "/images/markets/bev_plastic.png",
      href: "/search?q=plastic+beverage",
    },
    {
      title: "Beverage Jugs",
      image: "/images/markets/bev_jugs.png",
      href: "/search?q=beverage+jugs",
    },
    {
      title: "Aluminum Beverage Cans",
      image: "/images/markets/bev_cans.png",
      href: "/search?q=aluminum+cans",
    },
    {
      title: "Juice Bottles",
      image: "/images/markets/bev_juice.png",
      href: "/search?q=juice",
    },
    {
      title: "PET Bottles",
      image: "/images/markets/bev_pet.png",
      href: "/search?q=pet+bottles",
    },
    {
      title: "Milk Bottles",
      image: "/images/markets/bev_milk.png",
      href: "/search?q=milk+bottles",
    },
    {
      title: "Water Bottles",
      image: "/images/markets/bev_water.png",
      href: "/search?q=water+bottles",
    },
  ];

  return (
    <div className="bg-[#f8f9fa] min-h-screen font-sans">
      {/* 1. HERO SECTION */}
      <section className="relative h-[250px] md:h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/markets/bev_hero.png"
            alt="Beverage Packaging Hero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white tracking-wide shadow-black drop-shadow-md">
            Beverage Packaging
          </h1>
        </div>
      </section>

      {/* 2. CATEGORY GRID */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-7xl">
          <MarketCategoryGrid items={beverageCategories} />
        </div>
      </section>

      {/* 3. FUNCTION AND INNOVATION BANNER */}
      <section className="relative py-24 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/markets/bev_function_banner.png"
            alt="Function and Innovation"
            fill
            className="object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wide drop-shadow-md">
            Function and Innovation – the Right Ingredients
          </h2>
          <p className="text-lg md:text-xl font-medium leading-relaxed drop-shadow-sm px-4">
            PIF Packaging's devoted Packaging Consultants are able to work hand
            in hand with all areas of your organization including marketing,
            engineering, and production. The goal is to not only have a package
            that is marketable, but functions well on the filling line to ensure
            operational excellence.
          </p>
        </div>
      </section>

      {/* 4. QUENCH YOUR THIRST (Text Left, Image Right) */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-black text-neutral-900 mb-6 tracking-tight">
                Quench Your Thirst
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                Despite the dominance of Keurig and Nestlé, the U.S. beverage
                industry remains ripe for disruption. With annual sales
                exceeding 30 billion cases, the battle for 'share of stomach' is
                fierce.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Breaking through requires more than just taste; it takes a
                combination of efficient logistics and premium packaging
                designed to dominate the retail cooler.
              </p>
            </div>
            <div className="relative aspect-[16/9] w-full bg-neutral-100 group cursor-pointer overflow-hidden border border-neutral-200 shadow-sm">
              <Image
                src="/images/markets/bev_video_thumbnail.png"
                alt="Beverage Aisles"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-14 bg-berlin-red/90 group-hover:bg-berlin-red flex items-center justify-center rounded-xl transition-colors shadow-lg">
                  <Play className="w-8 h-8 text-white ml-1 fill-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WE HAVE YOU COVERED (Image Left, Text Right) */}
      <section className="py-24 bg-[#f8f9fa] border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/3] w-full shadow-lg">
              <Image
                src="/images/markets/bev_lifestyle.png"
                alt="Child enjoying beverage"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-black text-neutral-900 mb-6 tracking-tight">
                We Have You Covered
              </h2>
              <p className="text-neutral-600 leading-relaxed mb-6">
                For several decades, PIF Packaging has been the silent partner
                behind successful drink brands, delivering high-quality
                containers and materials that balance excellence with
                cost-efficiency. Our mission is to propel your brand to the top
                of the retail rankings through innovative, budget-friendly
                solutions.
              </p>
              <p className="text-neutral-600 leading-relaxed">
                Regardless of your company’s scale or market niche, we offer a
                comprehensive, end-to-end partnership. From the initial spark of
                an idea to the final product launch, our team manages every
                phase of development, ensuring your project hits the market
                precisely when planned and without financial surprises.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CASE STUDY */}
      <section className="py-24 bg-white border-t border-neutral-200">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-black text-neutral-900 mb-6 tracking-tight">
                High-Viscosity Dispensing Innovation
              </h2>
              <div className="space-y-6 text-neutral-600 leading-relaxed">
                <p>
                  "Thick liquids like fruit purees and smoothie mixes often
                  frustrate end-users due to inconsistent flow and messy
                  dispensing. To solve this, PIF Packaging's design engineers
                  partnered with industry leaders to rethink the standard
                  closure."
                </p>
                <p>
                  Unlike typical round-orifice caps, our specialized
                  high-viscosity closure features a proprietary venting
                  mechanism and an elongated spout. This design creates a
                  smooth, controlled pour without the sudden 'glugging' effect
                  that causes spills. During human-factors testing, this design
                  proved superior for fast-paced commercial environments like
                  bars and cafes.
                </p>
                <p>
                  The intuitive hinged lid naturally guides the user's thumb,
                  allowing for quick, one-handed operation. A secure, audible
                  snap-fit prevents contamination and spoilage during storage,
                  elevating both convenience and product safety.
                </p>
              </div>
            </div>
            {/* Right side - Case Study Image */}
            <div className="relative aspect-[4/5] w-full bg-neutral-100 border border-neutral-200 shadow-xl ml-auto rounded-sm overflow-hidden">
              <Image
                src="/images/markets/bev_case_study.png"
                alt="Specialized dispensing closure for smoothie mix"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 7. QUOTE CTA BANNER */}
      <section className="relative py-20 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 z-0 bg-berlin-blue">
          <Image
            src="/images/markets/bev_quote_banner.png"
            alt="Sparkling water background"
            fill
            className="object-cover opacity-20 mix-blend-overlay"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-center gap-8">
          <h2 className="text-xl md:text-2xl font-bold text-white text-center md:text-left drop-shadow-md">
            Looking for a large-quantity quote? Contact a PIF Packaging
            Consultant today.
          </h2>
          <Link
            href="/contact"
            className="px-8 py-4 bg-berlin-red hover:bg-neutral-900 text-white font-bold tracking-wide uppercase rounded-sm transition-colors duration-300 whitespace-nowrap shadow-lg"
          >
            REQUEST A QUOTE
          </Link>
        </div>
      </section>

      {/* 8. BOTTOM CONTENT / SEO (Text Heavy) */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6 space-y-16">
          {/* Intro Para */}
          <div className="border-l-4 border-berlin-red pl-6">
            <p className="text-base text-neutral-600 leading-relaxed font-medium mb-4">
              Whether your product is housed in glass or plastic, our selection
              covers a vast spectrum of silhouettes, dimensions, and hues. We
              offer a diverse array of sealing options, such as safety-focused,
              tamper-evident lids that provide immediate visual proof of any
              interference.
            </p>
            <p className="text-base text-neutral-600 leading-relaxed font-medium">
              For consumer convenience, you might choose threaded twist-offs or
              snap-on lids for effortless access. Alternatively, for active
              lifestyles, our containers can be equipped with specialized
              sport-top dispensers. These feature narrow-flow nozzles to prevent
              messes and a simple press-to-close mechanism, typically shielded
              by a protective outer cover to maintain hygiene.
            </p>
          </div>

          <div className="space-y-16">
            {/* Paragraph Block 1 */}
            <div>
              <h3 className="text-2xl font-black text-neutral-900 mb-4 tracking-tight leading-snug">
                The Advantages of Resilient Silica Containers
              </h3>
              <p className="text-neutral-600 leading-relaxed max-w-4xl text-base mb-6">
                Opting for these robust and enduring vessels provides an
                impermeable barrier that guards against environmental
                pollutants, guaranteeing that the liquid’s authentic hue and
                taste remain uncompromised. This medium is entirely
                non-reactive, eliminating the risk of substance migration, and
                it preserves its physical firmness and clarity through
                consistent cleaning.
              </p>
              <p className="text-neutral-600 leading-relaxed max-w-4xl text-base">
                As a favored industry choice, these units come in various forms:
                geometric models ideal for multi-sided branding or transparent
                versions equipped with stylish metallic clasp seals.
                Additionally, integrated fluted patterns are available to
                enhance manual control and streamline the serving process.
              </p>
            </div>

            {/* Paragraph Block 2 */}
            <div>
              <h3 className="text-2xl font-black text-neutral-900 mb-4 tracking-tight leading-snug">
                The Benefits of Versatile Synthetic Containers
              </h3>
              <p className="text-neutral-600 leading-relaxed max-w-4xl text-base mb-6">
                Utilizing low-mass materials can significantly lower logistical
                overhead and transportation costs. These vessels are engineered
                for impact durability, effectively minimizing fractures and
                liquid loss during handling. They serve as an ideal housing for
                dairy, fruit-based drinks, and hydration products, as well as
                various industrial fluids.
              </p>
              <p className="text-neutral-600 leading-relaxed max-w-4xl text-base">
                Many designs incorporate integrated grips for effortless
                transport. Ergonomic, curved profiles are available to perfectly
                accommodate heat-shrink branding or detailed consumer data.
                Alternatively, geometric, four-sided models are engineered to
                maximize warehouse density and freight efficiency. These units
                can be reinforced with structured base-ribbing for added
                stability or designed with sleek, flat surfaces to showcase your
                brand’s aesthetics.
              </p>
            </div>

            {/* Paragraph Block 3 */}
            <div>
              <h3 className="text-2xl font-black text-neutral-900 mb-4 tracking-tight leading-snug">
                How Else Can We Support Your Brand?
              </h3>
              <p className="text-neutral-600 leading-relaxed max-w-4xl text-base">
                Beyond container sourcing, our firm offers specialized expertise
                in graphic branding and strategic operations. We guarantee
                high-level performance when auditing vendors and streamlining
                production to eliminate inefficiencies. To ensure your formulas
                meet rigorous standards, we maintain an in-house facility
                dedicated to evaluating the integrity and uniformity of every
                batch.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
