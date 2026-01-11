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
            {/* CARD 1: CHAT */}
            <div className="bg-neutral-50 border border-neutral-200 p-12 text-center rounded-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
              <div className="w-16 h-16 mb-8 text-berlin-red">
                <MessageSquare className="w-full h-full stroke-[1.5]" />
              </div>

              <h3 className="text-2xl font-black text-industrial-900 uppercase tracking-tight mb-4">
                Chat with Us
              </h3>
              <p className="text-industrial-500 mb-10 max-w-xs mx-auto">
                Chat with a Customer Care Advocate during business hours for
                product and order information.
              </p>

              <button
                className="mt-auto px-8 py-3 bg-neutral-200 text-industrial-500 font-bold uppercase tracking-widest rounded-sm cursor-not-allowed"
                disabled
                title="Chat is currently offline"
              >
                Launch Chat
              </button>
            </div>

            {/* CARD 2: EMAIL */}
            <div className="bg-neutral-50 border border-neutral-200 p-12 text-center rounded-sm hover:shadow-lg transition-shadow duration-300 flex flex-col items-center">
              <div className="w-16 h-16 mb-8 text-berlin-red">
                <Mail className="w-full h-full stroke-[1.5]" />
              </div>

              <h3 className="text-2xl font-black text-industrial-900 uppercase tracking-tight mb-4">
                Email Us
              </h3>
              <p className="text-industrial-500 mb-10 max-w-xs mx-auto">
                We will get back to you within 2 business days regarding your
                inquiry.
              </p>

              <button
                onClick={() => setContactModalOpen(true)}
                className="mt-auto px-8 py-3 bg-berlin-red text-white font-bold uppercase tracking-widest rounded-sm hover:bg-red-700 transition-colors shadow-lg hover:shadow-xl"
              >
                Contact Us
              </button>
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
