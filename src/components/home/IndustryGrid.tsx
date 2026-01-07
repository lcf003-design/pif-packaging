import Link from "next/link";
import { ArrowRight } from "lucide-react";

const INDUSTRIES = [
  {
    name: "Food",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=500",
  },
  {
    name: "Beverage",
    image:
      "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=500",
  },
  {
    name: "Spirits",
    image:
      "https://images.unsplash.com/photo-1599309605791-cdd1cf70c663?q=80&w=500",
  },
  {
    name: "Wine",
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=500",
  },
  {
    name: "Beer",
    image:
      "https://images.unsplash.com/photo-1608270586620-248524c67de9?q=80&w=500",
  },
  {
    name: "Personal Healthcare & Beauty",
    image:
      "https://images.unsplash.com/photo-1556228720-1987ba8d98d2?q=80&w=500",
  },
  {
    name: "Pharmaceutical & Nutraceutical",
    image:
      "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=500",
  },
  {
    name: "Home Care",
    image:
      "https://images.unsplash.com/photo-1585421514738-01798e148061?q=80&w=500",
  },
  {
    name: "Pet Care & Veterinary",
    image:
      "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=500",
  },
  {
    name: "Industrial Chemical",
    image:
      "https://images.unsplash.com/photo-1615485499878-8316c026b978?q=80&w=500",
  },
  {
    name: "Automotive",
    image:
      "https://images.unsplash.com/photo-1635338573215-685718df2836?q=80&w=500",
  },
  {
    name: "Cannabis & CBD",
    image:
      "https://images.unsplash.com/photo-1603573355706-3914977435f3?q=80&w=500",
  },
];

export default function IndustryGrid() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-industrial-900 mb-4">
            Markets & Industries We Serve
          </h2>
          <p className="text-industrial-500 max-w-2xl mx-auto">
            Shop wholesale bottles, jars, cans, drums, and more – containers to
            suit every industry.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {INDUSTRIES.map((industry) => (
            <Link
              key={industry.name}
              href={`/products?industry=${industry.name}`}
              className="group flex flex-col items-center text-center"
            >
              <div className="w-full aspect-[3/4] mb-4 relative flex items-end justify-center">
                {/* Product Image Placeholder - Scaled specifically to look like a "bottle shot" */}
                <div
                  className="w-[80%] h-[80%] bg-contain bg-no-repeat bg-bottom transition-transform duration-300 group-hover:-translate-y-2"
                  style={{ backgroundImage: `url('${industry.image}')` }}
                ></div>
              </div>
              <h3 className="text-sm font-bold text-industrial-700 group-hover:text-berlin-blue transition-colors">
                {industry.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
