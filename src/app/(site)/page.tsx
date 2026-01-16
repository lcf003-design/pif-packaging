import Link from "next/link";
import { Box, Hexagon, Layers } from "lucide-react";
import HeroSection from "@/components/home/HeroSection";
import TrustBar from "@/components/home/TrustBar";
import IndustryGrid from "@/components/home/IndustryGrid";
import ServicesSection from "@/components/home/ServicesSection";
import ValuePropBanner from "@/components/home/ValuePropBanner";
import ForwardThinkingBanner from "@/components/home/ForwardThinkingBanner";
import ExecutionGrid from "@/components/home/ExecutionGrid";
import ManufacturingPreview from "@/components/home/ManufacturingPreview";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* High-Impact Hero Grid */}
      <HeroSection />

      {/* Trust Indicators */}
      <TrustBar />

      {/* Manufacturing Preview - Hybrid Strategy */}
      <ManufacturingPreview />

      {/* Markets Grid */}
      <IndustryGrid />

      {/* Value Prop Banner */}
      <ValuePropBanner />

      {/* Services Section */}
      <ServicesSection />

      {/* Forward Thinking Banner */}
      <ForwardThinkingBanner />

      {/* Unmatched Execution Grid */}
      <ExecutionGrid />
    </div>
  );
}
