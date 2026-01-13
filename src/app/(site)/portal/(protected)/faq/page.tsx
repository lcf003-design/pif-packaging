import React from "react";
import { ChevronDown } from "lucide-react";

export default function FAQPage() {
  return (
    <div className="w-full h-full p-8 max-w-4xl mx-auto">
      <h1 className="text-2xl font-black text-industrial-900 uppercase mb-2">
        Frequently Asked Questions
      </h1>
      <p className="text-industrial-500 mb-8">
        Common questions about orders, shipping, and account management.
      </p>

      <div className="space-y-4">
        {[
          "What is the lead time for custom tooling?",
          "How do I track my active shipment?",
          "Can I update my shipping address after placing an order?",
          "What payment methods do you accept?",
          "How do I request a sample?",
        ].map((q, i) => (
          <div
            key={i}
            className="bg-white border border-industrial-200 rounded-sm overflow-hidden"
          >
            <button className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-industrial-50 transition-colors group">
              <span className="font-bold text-industrial-800 group-hover:text-berlin-red transition-colors">
                {q}
              </span>
              <ChevronDown className="w-5 h-5 text-industrial-400" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-12 p-8 bg-industrial-900 text-white rounded-sm text-center">
        <h3 className="text-xl font-bold mb-2">Still have questions?</h3>
        <p className="text-industrial-400 mb-6 max-w-lg mx-auto">
          Our team is available Monday through Friday, 8am - 6pm EST to assist
          you with any inquiries.
        </p>
        <button className="bg-berlin-red text-white px-8 py-3 rounded-sm font-bold uppercase tracking-widest hover:bg-red-700 transition-colors">
          Contact Support
        </button>
      </div>
    </div>
  );
}
