"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Loader2, CheckCircle } from "lucide-react";
import { submitContactMessage } from "@/services/inquiryService";
import { ContactMessage } from "@/types";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload: ContactMessage = {
      name: formData.name,
      email: formData.email,
      company: formData.company,
      phone: formData.phone,
      message: formData.message,
    };

    const result = await submitContactMessage(payload);

    setLoading(false);
    if (result) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setFormData({
          name: "",
          email: "",
          company: "",
          phone: "",
          message: "",
        });
        onClose();
      }, 2000);
    } else {
      alert("Something went wrong. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-industrial-900/60 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-2xl bg-white rounded-sm shadow-2xl overflow-hidden border border-industrial-200 z-[101]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-industrial-50 rounded-full transition-colors text-industrial-400 hover:text-berlin-red z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="p-8 md:p-12">
            {success ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-black text-industrial-900 mb-2">
                  Message Sent
                </h2>
                <p className="text-industrial-500">
                  Thank you for contacting us. We will respond within 2 business
                  days.
                </p>
              </div>
            ) : (
              <>
                <h2 className="text-2xl font-black text-industrial-900 mb-2">
                  Email Us
                </h2>
                <p className="text-industrial-500 mb-8">
                  Fill out the form below and our team will get back to you
                  shortly.
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-industrial-700 mb-2">
                        Name <span className="text-berlin-red">*</span>
                      </label>
                      <input
                        required
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        type="text"
                        placeholder="Your Name"
                        className="w-full px-4 py-3 border border-industrial-300 rounded-sm focus:outline-none focus:border-berlin-red focus:ring-1 focus:ring-berlin-red transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-industrial-700 mb-2">
                        Email <span className="text-berlin-red">*</span>
                      </label>
                      <input
                        required
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        type="email"
                        placeholder="email@company.com"
                        className="w-full px-4 py-3 border border-industrial-300 rounded-sm focus:outline-none focus:border-berlin-red focus:ring-1 focus:ring-berlin-red transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-industrial-700 mb-2">
                        Company
                      </label>
                      <input
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        type="text"
                        placeholder="Company Name"
                        className="w-full px-4 py-3 border border-industrial-300 rounded-sm focus:outline-none focus:border-berlin-red focus:ring-1 focus:ring-berlin-red transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-industrial-700 mb-2">
                        Phone
                      </label>
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        type="tel"
                        placeholder="(555) 123-4567"
                        className="w-full px-4 py-3 border border-industrial-300 rounded-sm focus:outline-none focus:border-berlin-red focus:ring-1 focus:ring-berlin-red transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-industrial-700 mb-2">
                      Message <span className="text-berlin-red">*</span>
                    </label>
                    <textarea
                      required
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      placeholder="How can we help you?"
                      className="w-full px-4 py-3 border border-industrial-300 rounded-sm focus:outline-none focus:border-berlin-red focus:ring-1 focus:ring-berlin-red transition-all resize-none"
                    />
                  </div>

                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-berlin-red text-white py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-lg shadow-berlin-red/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />{" "}
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" /> Send Message
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
