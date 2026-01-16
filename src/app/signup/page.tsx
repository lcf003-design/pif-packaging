"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-screen relative flex">
      {/* Full Screen Background Image (Same as Portal Login) */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/pif_portal_mixed_markets.png"
          alt="PIF Mixed Markets Collection - Black & Red"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content Overlay - Centered Panel */}
      <div className="relative z-10 w-full min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-sm shadow-2xl overflow-hidden border border-white/20">
          {/* Back Link */}
          <div className="absolute top-4 left-4 z-20">
            <Link
              href="/"
              className="flex items-center text-black hover:text-berlin-red transition-colors text-sm font-medium group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
          </div>

          <div className="p-8 md:p-12 pt-16">
            {" "}
            {/* Added pt-16 for back link clearance */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-black text-industrial-900 mb-2">
                Create Account
              </h1>
              <p className="text-industrial-600">
                Join the PIF Packaging network for exclusive access.
              </p>
            </div>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white px-4 rounded-sm shadow-sm border border-industrial-100">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full py-3 focus:outline-none bg-transparent placeholder-black text-black"
                  />
                </div>
                <div className="bg-white px-4 rounded-sm shadow-sm border border-industrial-100">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full py-3 focus:outline-none bg-transparent placeholder-black text-black"
                  />
                </div>
              </div>

              <div className="bg-white px-4 rounded-sm shadow-sm border border-industrial-100">
                <input
                  type="text"
                  placeholder="Company Name"
                  className="w-full py-3 focus:outline-none bg-transparent placeholder-black text-black"
                />
              </div>

              <div className="bg-white px-4 rounded-sm shadow-sm border border-industrial-100">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full py-3 focus:outline-none bg-transparent placeholder-black text-black"
                />
              </div>

              <div className="bg-white px-4 rounded-sm shadow-sm border border-industrial-100">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full py-3 focus:outline-none bg-transparent placeholder-black text-black"
                />
              </div>

              <div className="bg-white px-4 rounded-sm shadow-sm border border-industrial-100">
                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="w-full py-3 focus:outline-none bg-transparent placeholder-black text-black"
                />
              </div>

              <div className="pt-4">
                <button
                  type="button" // Change to submit when wiring up logic
                  className="w-full bg-berlin-red text-white py-4 rounded-sm font-bold uppercase tracking-widest hover:bg-red-700 transition-colors shadow-xl shadow-berlin-red/20 text-sm"
                >
                  Create Account
                </button>
              </div>

              <div className="text-center">
                <p className="text-black text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/portal/login"
                    className="text-berlin-blue font-bold hover:underline"
                  >
                    Log In
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
