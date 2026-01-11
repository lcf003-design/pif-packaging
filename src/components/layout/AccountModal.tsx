"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check } from "lucide-react";
import Link from "next/link";

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccountModal({ isOpen, onClose }: AccountModalProps) {
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
          className="absolute inset-0 bg-industrial-900/40 backdrop-blur-sm cursor-pointer"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-5xl bg-white rounded-sm shadow-2xl overflow-hidden border border-industrial-200 z-[101]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-industrial-50 rounded-full transition-colors text-industrial-400 hover:text-berlin-red z-10"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="grid md:grid-cols-2">
            {/* LEFT COLUMN: Existing Customer */}
            <div className="p-8 md:p-12 border-b md:border-b-0 md:border-r border-industrial-100">
              <h2 className="text-2xl font-black text-industrial-900 mb-8">
                Existing Customer?
              </h2>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-industrial-700 mb-2">
                    Email Address <span className="text-berlin-red">*</span>
                  </label>
                  <input
                    type="email"
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-industrial-300 rounded-sm focus:outline-none focus:border-berlin-red focus:ring-1 focus:ring-berlin-red transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-industrial-700 mb-2">
                    Password <span className="text-berlin-red">*</span>
                  </label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-3 border border-industrial-300 rounded-sm focus:outline-none focus:border-berlin-red focus:ring-1 focus:ring-berlin-red transition-all"
                  />
                </div>

                <div className="flex items-center gap-4 pt-2">
                  <button
                    type="button"
                    className="bg-berlin-red text-white px-8 py-2.5 rounded-sm font-bold uppercase text-sm tracking-wide hover:bg-red-700 transition-colors shadow-lg shadow-berlin-red/20"
                  >
                    Log In
                  </button>
                  <Link
                    href="/forgot-password"
                    onClick={onClose}
                    className="text-berlin-blue hover:underline text-sm font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
              </form>
            </div>

            {/* RIGHT COLUMN: Customer Portal & Sign Up */}
            <div className="p-8 md:p-12 bg-industrial-50/50">
              {/* Portal Login Section */}
              <div className="mb-12">
                <h2 className="text-xl font-bold text-industrial-900 mb-4">
                  Customer Portal Login
                </h2>
                <Link
                  href="/portal/login"
                  onClick={onClose}
                  className="inline-block bg-berlin-red text-white px-6 py-2.5 rounded-sm font-bold uppercase text-sm tracking-wide hover:bg-red-700 transition-colors"
                >
                  Click Here
                </Link>
              </div>

              {/* Sign Up Section */}
              <div>
                <h2 className="text-xl font-bold text-industrial-900 mb-4">
                  Don't have an Account?
                </h2>
                <p className="text-industrial-600 mb-6 text-sm">
                  Create an account with us and you'll be able to:
                </p>

                <ul className="space-y-3 mb-8">
                  {[
                    "Save multiple shipping addresses",
                    "Access your order history",
                    "Track new orders",
                    "Save items to your wish list",
                    "Re-order previously purchased items",
                  ].map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-industrial-700"
                    >
                      <div className="mt-0.5 w-4 h-4 rounded-full bg-industrial-200 flex items-center justify-center flex-shrink-0">
                        <div className="w-1.5 h-1.5 rounded-full bg-industrial-500" />
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>

                <button className="bg-berlin-red text-white px-8 py-2.5 rounded-sm font-bold uppercase text-sm tracking-wide hover:bg-red-700 transition-colors shadow-lg shadow-berlin-red/20">
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Footer Link */}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
