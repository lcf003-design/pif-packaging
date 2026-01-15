"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageSquare, Mail, Phone, Clock } from "lucide-react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center p-0 md:p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-industrial-900/40 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full md:max-w-5xl h-full md:h-auto md:max-h-[90vh] bg-white md:rounded-sm shadow-2xl overflow-hidden border-t md:border border-industrial-200 z-[101] flex flex-col md:block"
        >
          {/* Header */}
          <div className="px-4 md:px-8 py-6 border-b border-industrial-100 flex items-center justify-between">
            <h2 className="text-2xl font-black text-industrial-900 uppercase tracking-tight">
              Contact Us
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-industrial-50 rounded-full transition-colors text-industrial-400 hover:text-berlin-red"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-8 md:p-12 flex-1 overflow-y-auto">
            <p className="text-industrial-600 mb-12 max-w-3xl leading-relaxed text-lg">
              Our Customer Care Advocates are ready to help you with order
              inquiries, product questions, and more. Our regular business hours
              are Monday – Friday from 8:00am – 5:00pm CT. We look forward to
              hearing from you.
            </p>

            <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-4xl mx-auto">
              {/* Column 1: Chat */}
              {/* Column 1: WhatsApp */}
              <div className="flex flex-col items-center text-center group p-6 rounded-xl border border-transparent hover:border-industrial-100 hover:bg-industrial-50/50 transition-all duration-300">
                <div className="mb-6 p-4 rounded-full bg-green-50 text-green-600 group-hover:scale-110 transition-transform duration-300 ring-4 ring-green-50/50">
                  <MessageSquare className="w-8 h-8 stroke-[2px]" />
                </div>
                <h3 className="text-xl font-black text-industrial-900 mb-2 uppercase tracking-tight">
                  WhatsApp Business
                </h3>
                <p className="text-industrial-500 text-sm mb-6 max-w-xs mx-auto leading-relaxed">
                  Chat directly with our packaging specialists for immediate
                  assistance.
                </p>

                <div className="mb-6">
                  <div className="text-2xl font-black text-industrial-900 tracking-tight">
                    +44 (0) 7553 479 040
                  </div>
                  <div className="text-xs font-bold text-green-600 uppercase tracking-wider mt-1">
                    Available Now
                  </div>
                </div>

                <a
                  href="https://wa.me/447553479040"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto px-8 py-3 rounded-sm font-bold uppercase tracking-wide border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white transition-all w-full max-w-[200px]"
                >
                  Chat Now
                </a>
              </div>

              {/* Column 2: Email */}
              <div className="flex flex-col items-center text-center group p-6 rounded-xl border border-transparent hover:border-industrial-100 hover:bg-industrial-50/50 transition-all duration-300">
                <div className="mb-6 p-4 rounded-full bg-red-50 text-berlin-red group-hover:scale-110 transition-transform duration-300 ring-4 ring-red-50/50">
                  <Mail className="w-8 h-8 stroke-[2px]" />
                </div>
                <h3 className="text-xl font-black text-industrial-900 mb-2 uppercase tracking-tight">
                  Email Support
                </h3>
                <p className="text-industrial-500 text-sm mb-6 max-w-xs mx-auto leading-relaxed">
                  Send us your specifications and we'll respond within 24 hours.
                </p>

                <div className="mb-6">
                  <div className="text-xl font-bold text-industrial-900 tracking-tight break-all">
                    support@pifpackaging.com
                  </div>
                  <div className="text-xs font-bold text-berlin-red uppercase tracking-wider mt-1">
                    24h Response Time
                  </div>
                </div>

                <a
                  href="mailto:support@pifpackaging.com"
                  className="mt-auto px-8 py-3 rounded-sm font-bold uppercase tracking-wide border-2 border-berlin-red text-berlin-red hover:bg-berlin-red hover:text-white transition-all w-full max-w-[200px]"
                >
                  Message Us
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
