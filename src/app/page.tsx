import Link from "next/link";
import { Box, Hexagon, Layers } from "lucide-react";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import IndustryGrid from "@/components/home/IndustryGrid";
import ServicesSection from "@/components/home/ServicesSection";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* High-Impact Hero Grid */}
      <HeroSection />

      {/* Trust Indicators */}
      <TrustBar />

      {/* Markets Grid */}
      <IndustryGrid />

      {/* Services Section */}
      <ServicesSection />
    </div>
  );
}
