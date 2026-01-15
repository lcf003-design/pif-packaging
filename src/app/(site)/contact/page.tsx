"use client";

import { MessageSquare, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ContactModal from "@/components/contact/ContactModal";

export default function ContactPage() {
  const [contactModalOpen, setContactModalOpen] = useState(false);

  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO HEADER */}
      {/* Using a red background with a subtle pattern to match the "Berlin" aesthetic */}
      <section className="relative h-[300px] bg-berlin-red flex items-center justify-center overflow-hidden">
        {/* Background Pattern - Icons overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="grid grid-cols-12 gap-4 p-4 transform -rotate-12 scale-150">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="text-white w-8 h-8 mx-auto">
                <MessageSquare className="w-full h-full" />
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10 text-center text-white p-6">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight">
            Contact Us
          </h1>
        </div>
      </section>

      {/* 2. INTRO TEXT */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="text-xl md:text-2xl font-bold text-industrial-900 mb-6 leading-relaxed">
            Our Customer Care Advocates are ready to help you with order
            inquiries, product questions, and more.
          </h2>
          <p className="text-industrial-500 text-lg">
            Our regular business hours are Monday – Friday from 8:00am – 5:00pm
            EST. We look forward to hearing from you.
          </p>
        </div>
      </section>

      {/* 3. CONTACT OPTIONS GRID */}
      <section className="pb-32 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-8">
            {/* CARD 1: WHATSAPP */}
            <div className="bg-neutral-50 border border-neutral-200 p-12 text-center rounded-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center group">
              <div className="w-16 h-16 mb-8 p-4 rounded-full bg-green-50 text-green-600 group-hover:scale-110 transition-transform duration-300 ring-4 ring-green-50/50">
                <MessageSquare className="w-full h-full stroke-[2px]" />
              </div>

              <h3 className="text-2xl font-black text-industrial-900 uppercase tracking-tight mb-4">
                WhatsApp Business
              </h3>
              <p className="text-industrial-500 mb-8 max-w-xs mx-auto">
                Chat directly with our packaging specialists for immediate
                assistance.
              </p>

              <div className="mb-8">
                <div className="text-2xl font-black text-industrial-900 tracking-tight">
                  +44 (0) 7553 479 040
                </div>
                <div className="text-sm font-bold text-green-600 uppercase tracking-wider mt-2">
                  Available Now
                </div>
              </div>

              <a
                href="https://wa.me/447553479040"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto px-10 py-4 border-2 border-green-600 text-green-600 font-bold uppercase tracking-widest rounded-sm hover:bg-green-600 hover:text-white transition-all w-full max-w-xs"
              >
                Chat Now
              </a>
            </div>

            {/* CARD 2: EMAIL */}
            <div className="bg-neutral-50 border border-neutral-200 p-12 text-center rounded-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center group">
              <div className="w-16 h-16 mb-8 p-4 rounded-full bg-red-50 text-berlin-red group-hover:scale-110 transition-transform duration-300 ring-4 ring-red-50/50">
                <Mail className="w-full h-full stroke-[2px]" />
              </div>

              <h3 className="text-2xl font-black text-industrial-900 uppercase tracking-tight mb-4">
                Email Support
              </h3>
              <p className="text-industrial-500 mb-8 max-w-xs mx-auto">
                Send us your specifications and we'll respond within 24 hours.
              </p>

              <div className="mb-8">
                <div className="text-xl font-black text-industrial-900 tracking-tight break-all">
                  support@pifpackaging.com
                </div>
                <div className="text-sm font-bold text-berlin-red uppercase tracking-wider mt-2">
                  24h Response Time
                </div>
              </div>

              <a
                href="mailto:support@pifpackaging.com"
                className="mt-auto px-10 py-4 border-2 border-berlin-red text-berlin-red font-bold uppercase tracking-widest rounded-sm hover:bg-berlin-red hover:text-white transition-all w-full max-w-xs"
              >
                Message Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      <ContactModal
        isOpen={contactModalOpen}
        onClose={() => setContactModalOpen(false)}
      />
    </div>
  );
}
