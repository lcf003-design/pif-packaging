import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="bg-white">
      <div className="max-w-[1920px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 min-h-[500px]">
          {/* Main Hero - 50% Width (md:col-span-2) */}
          <div className="md:col-span-2 relative bg-industrial-100 min-h-[400px] group overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1587293852726-70cdb56c2866?q=80&w=2072')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

            <div className="absolute bottom-12 left-12 max-w-lg z-10">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
                Packaging Sourced to Spec. Not Off a Shelf.
              </h1>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold uppercase text-sm tracking-wider hover:bg-white hover:text-black transition-colors">
                  Shop Now
                </button>
              </div>
            </div>
          </div>

          {/* Sub Hero 1 - Industry Update (25% Width) */}
          <div className="md:col-span-1 bg-[#4a8ba8] relative overflow-hidden group">
            {/* Abstract Blue Background */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1532153955177-f59af40d6472?q=80&w=1000')] bg-cover bg-center mix-blend-overlay opacity-30 transition-transform duration-700 group-hover:scale-105"></div>

            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 p-8 z-10">
              <h2 className="text-3xl font-bold text-white mb-6 leading-tight">
                Streamlined Execution -
                <span className="block opacity-90">
                  Your Supply Chain, Simplified.
                </span>
              </h2>
              <button className="px-5 py-2 border border-white text-white font-bold text-xs uppercase hover:bg-white/10 transition">
                Learn More
              </button>
            </div>
          </div>

          {/* Sub Hero 2 - Trends (25% Width) */}
          <div className="md:col-span-1 bg-[#e056fd] relative overflow-hidden group">
            {/* Colorful/Vibrant Backgroud */}
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?q=80&w=1000')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105"></div>
            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>

            <div className="absolute bottom-12 left-8 right-8 z-10">
              <h2 className="text-3xl font-bold text-white mb-6 leading-tight drop-shadow-md">
                Markets We Serve
              </h2>
              <button className="px-5 py-2 border border-white text-white font-bold text-xs uppercase hover:bg-white/10 transition backdrop-blur-sm">
                View Markets
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
