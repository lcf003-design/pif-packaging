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
              <div className="flex flex-col items-center text-center group">
                <div className="mb-6 p-4 rounded-full bg-red-50 text-berlin-red group-hover:scale-110 transition-transform duration-300">
                  <MessageSquare className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-bold text-industrial-900 mb-4">
                  Chat with Us
                </h3>
                <p className="text-industrial-500 text-sm mb-6 max-w-xs mx-auto">
                  Chat with a Customer Care Advocate during business hours for
                  product and order information.
                </p>
                <div className="mt-auto text-xs text-industrial-400 flex items-center gap-1.5 bg-industrial-50 px-3 py-1.5 rounded-sm">
                  <Clock className="w-3 h-3" />
                  <span>Mon-Fri 8:00 AM - 5:00 PM CT</span>
                </div>
              </div>

              {/* Column 2: Email */}
              <div className="flex flex-col items-center text-center group">
                <div className="mb-6 p-4 rounded-full bg-red-50 text-berlin-red group-hover:scale-110 transition-transform duration-300">
                  <Mail className="w-10 h-10 stroke-[1.5]" />
                </div>
                <h3 className="text-xl font-bold text-industrial-900 mb-4">
                  Email Us
                </h3>
                <p className="text-industrial-500 text-sm mb-8 max-w-xs mx-auto">
                  We will get back to you within 2 business days.
                </p>
                <a
                  href="mailto:support@pifpackaging.com"
                  className="mt-auto bg-berlin-red text-white px-8 py-3 rounded-sm font-bold uppercase tracking-wide hover:bg-red-700 transition-colors shadow-lg shadow-berlin-red/20 w-full max-w-[200px]"
                >
                  Email Us
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
