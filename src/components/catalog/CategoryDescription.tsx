"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function CategoryDescription({
  category,
}: {
  category: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Dynamic content based on category (mocked for now, but wired for Aluminum Bottles)
  const getContent = () => {
    if (
      category.toLowerCase() === "bottles" ||
      category.toLowerCase() === "all products"
    ) {
      return {
        title: "Bottles",
        short:
          "Explore our extensive collection of wholesale bottles, engineered in glass, plastic, and aluminum. Ranging from sizes of half-ounce to 1-gallon, with a spectrum of colors, our bottles are ready for your custom branding. We specialize in custom decoration, including neckbands, embossing, and high-definition labeling to showcase your logo.",
        full: (
          <div className="space-y-4 mt-4 animate-in fade-in duration-300">
            <div>
              <h3 className="text-2xl font-bold text-industrial-900 mb-2">
                Choosing a Bottle Material
              </h3>
              <p className="text-industrial-600 leading-relaxed">
                Whether you need the clarity of glass, the durability of
                plastic, or the premium finish of aluminum, we have the right
                material for your product. From pharmaceuticals and cosmetics to
                food and beverage, our diverse material selection ensures safety
                and sustainability for every application.
              </p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-industrial-900 mb-2">
                Partner with Us
              </h3>
              <p className="text-industrial-600 leading-relaxed">
                When you partner with us for your bottle packaging, you get
                direct access to world-class manufacturing and precise packaging
                solutions. We don't just source; we manufacture, decorate, and
                package your vision, helping you take your brand to the next
                level.
              </p>
            </div>
          </div>
        ),
      };
    }

    if (category.toLowerCase().includes("aluminum")) {
      return {
        title: "Aluminum Bottles",
        short:
          "Aluminum bottles are lightweight, durable, and cost-effective to ship. Brushed aluminum bottles offer visual appeal for customers and are corrosion-resistant for bottling a large variety of products.",
        full: (
          <div className="space-y-4 mt-4 animate-in fade-in duration-300">
            <div>
              <h3 className="text-lg font-bold text-industrial-900 mb-2">
                Why Choose Aluminum Spray Bottles?
              </h3>
              <p className="text-industrial-600 leading-relaxed">
                Aluminum spray bottles are a superior choice for cleaning
                solutions as they don't absorb scents and are robust enough to
                resist punctures or breakage. Pairing aluminum bottles with fine
                mist sprayers creates a practical, high-performance solution for
                products ranging from hairspray and air fresheners to oil-based
                lubricants.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-industrial-900 mb-2">
                Packaging That Stands Out
              </h3>
              <p className="text-industrial-600 leading-relaxed">
                Brushed aluminum offers a cosmetically attractive finish, making
                it a favorite for premium scented oils and body sprays.
                Consumers appreciate aluminum for its reusability and
                recyclability. With the right branding—such as custom labeling
                or screen printing—your product can achieve a distinctive shelf
                presence. Our bottles are compatible with a wide range of
                decorative techniques to match your brand identity.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-industrial-900 mb-2">
                Wholesale Efficiency
              </h3>
              <p className="text-industrial-600 leading-relaxed">
                Buying aluminum bottles wholesale keeps your inventory stocked
                and minimizes production downtime. Explore our bulk options in
                various shapes, sizes, and capacities to meet your high-volume
                bottling requirements efficiently.
              </p>
            </div>
          </div>
        ),
      };
    }

    if (
      category.toLowerCase() === "eyeshadow containers" ||
      category.toLowerCase() === "eyeshadow-containers"
    ) {
      return {
        title: "Eyeshadow Containers",
        short:
          "Finding the right eyeshadow packaging for your cosmetics line requires combining practicality with branding in a complementary way. We carry an assortment of high-quality eyeshadow tubs and pots to secure your product while maximizing visual appeal. Available in numerous colors and plastic types, our selection of eyeshadow jars meets the quality and volume you expect with cosmetic production.",
        full: null, // As per standard Berlin catalog, this short text is usually all there is for specific subcategories
      };
    }

    if (
      category.toLowerCase() === "mascara & eyebrow packaging" ||
      category.toLowerCase() === "mascara-and-eyebrow-packaging"
    ) {
      return {
        title: "Mascara Tubes & Eyeliner Packaging",
        short:
          "Berlin Packaging offers empty mascara tubes and eyebrow products and eyeliner packaging in various colors and capacity options. Choose from clear or matte black PETG plastic mascara bottles with brushes or frosted ABS plastic tubes with wands and wipers.",
        full: null,
      };
    }

    if (
      category.toLowerCase() === "foundation & concealer packaging" ||
      category.toLowerCase() === "foundation-and-concealer-packaging"
    ) {
      return {
        title: "Foundation Containers & Concealer Packaging",
        short:
          "Package your products beautifully in top-quality concealer and foundation containers from Berlin Packaging. We offer plastic and glass bottles and vials in a wide range of capacities for use as liquid foundation containers. Offer your customers precision application with a dropper cap or the ease of treatment pump caps - both sold separately. For solid foundation packaging, choose from popular push-up or twist-up stick styles with screw caps. All our options are available in bulk quantities and at wholesale prices!",
        full: null,
      };
    }

    if (
      category.toLowerCase() === "bronzer & blush packaging" ||
      category.toLowerCase() === "bronzer-and-blush-packaging"
    ) {
      return {
        title: "Bronzer & Blush Packaging",
        short:
          "Whether you're developing a new product line or rebranding an existing one, stand out on store shelves with high-quality bronzer and blush packaging from Berlin Packaging. We offer a variety of shapes and capacities for powder or liquid cosmetics, from 0.5 ounces to 32-ounce bulk sizes. Browse our selection of empty blush containers and bronzer dispensers, including plastic tubes, bottles with dropper caps, glass vials, and other popular styles.",
        full: null,
      };
    }

    if (
      category.toLowerCase() ===
        "nail polish bottles & nail care product packaging" ||
      category.toLowerCase() ===
        "nail-polish-bottles-and-nail-care-product-packaging"
    ) {
      return {
        title: "Nail Polish Bottles & Nail Care Product Packaging",
        short:
          "Whether you're crafting a new base coat or rebranding your line of cuticle creams, your items will stand out on store shelves in premium packaging. Our selection of nail care packaging features metal tins, plastic lip balm and mascara tubes, glass dropper bottles, and heavy wall jars. Protect and present your nail products properly with wholesale nail polish bottles and containers from Berlin Packaging.",
        full: null,
      };
    }

    // Default fallback for other categories
    return {
      title: category,
      short: `Premium ${category.toLowerCase()} available in various materials, shapes, and sizes. Perfect for your specific packaging needs.`,
      full: null,
    };
  };

  const content = getContent();

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-black text-industrial-900 tracking-tight uppercase mb-2">
        {content.title}
      </h1>

      <div className="w-full">
        <p className="text-industrial-600 leading-relaxed text-sm md:text-base">
          {content.short}
        </p>

        {isExpanded && content.full}
      </div>

      {content.full && (
        <div className="flex justify-center mt-8 relative w-full">
          <div className="absolute inset-x-0 top-1/2 h-px bg-berlin-red -z-10" />

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="bg-white px-8 py-2 border-2 border-berlin-blue text-berlin-blue font-bold text-sm uppercase tracking-wider hover:bg-berlin-blue hover:text-white transition-all shadow-sm flex items-center gap-2"
          >
            {isExpanded ? (
              <>
                Show Less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Continue Reading <ChevronDown className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
