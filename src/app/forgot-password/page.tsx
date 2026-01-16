"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Check, AlertCircle } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      // Logic to trigger password reset would go here
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center bg-industrial-50 px-4 py-24">
      <div className="w-full max-w-md bg-white rounded-sm shadow-xl p-8 md:p-12 border border-industrial-200">
        {/* Success State */}
        {submitted ? (
          <div className="text-center animate-fade-in">
            <div className="w-16 h-16 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-industrial-900 mb-4">
              Check Your Inbox
            </h1>
            <p className="text-industrial-600 mb-8 leading-relaxed">
              If an account exists for <strong>{email}</strong>, you will
              receive password reset instructions shortly.
            </p>
            <Link
              href="/"
              className="block w-full bg-industrial-900 text-white font-bold uppercase tracking-wide py-3 rounded-sm hover:bg-black transition-colors"
            >
              Return to Home
            </Link>
          </div>
        ) : (
          /* Form State */
          <div>
            <h1 className="text-3xl font-black text-industrial-900 mb-4 text-center">
              Forgot Password?
            </h1>
            <p className="text-industrial-600 mb-8 text-center leading-relaxed">
              Enter the email address associated with your account and we'll
              send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-industrial-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full px-4 py-3 border border-industrial-300 rounded-sm focus:outline-none focus:border-berlin-red focus:ring-1 focus:ring-berlin-red transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-berlin-red text-white px-8 py-3 rounded-sm font-bold uppercase tracking-wide hover:bg-red-700 transition-colors shadow-lg shadow-berlin-red/20"
              >
                Reset Password
              </button>
            </form>

            <div className="mt-8 pt-8 border-t border-industrial-100 text-center">
              <Link
                href="/"
                className="inline-flex items-center text-industrial-500 hover:text-berlin-blue font-medium transition-colors gap-2 group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
