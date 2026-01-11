import { Truck } from "lucide-react";

export default function ShippingPage() {
  return (
    <div className="container mx-auto px-4 py-24 max-w-4xl">
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-industrial-100 rounded-full mb-6 text-industrial-900">
          <Truck className="w-8 h-8" />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-industrial-900 mb-6 uppercase tracking-tight">
          Shipping Policy
        </h1>
        <p className="text-xl text-industrial-500 max-w-2xl mx-auto">
          Global logistics and freight forwarding tailored to your production
          schedule.
        </p>
      </div>

      <div className="prose prose-lg prose-industrial mx-auto">
        <h3 className="uppercase tracking-wider font-bold text-industrial-900">
          1. Production Lead Times
        </h3>
        <p>
          Standard lead times for in-stock items are 3-5 business days. Custom
          tooling and bespoke production runs typically require 8-12 weeks
          depending on complexity and volume.
        </p>

        <h3 className="uppercase tracking-wider font-bold text-industrial-900 mt-12">
          2. Freight & Logistics
        </h3>
        <p>
          We offer FOB (Free On Board) and CIF (Cost, Insurance, and Freight)
          terms. Our logistics team handles customs clearance and documentation
          for international shipments.
        </p>

        <h3 className="uppercase tracking-wider font-bold text-industrial-900 mt-12">
          3. Sample Shipments
        </h3>
        <p>
          Samples are shipped via express air freight (DHL/FedEx/UPS) and
          typically arrive within 48-72 hours of approval.
        </p>
      </div>
    </div>
  );
}
