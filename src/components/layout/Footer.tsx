import Link from "next/link";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  ShieldCheck,
  Award,
  Leaf,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-industrial-900 text-white pt-16 pb-8 border-t-4 border-berlin-red">
      <div className="container mx-auto px-4">
        {/* Top Section: Brand & Newsletter */}
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 mb-16">
          <div className="max-w-md">
            <h2 className="text-2xl font-black uppercase tracking-tighter mb-4">
              PIF Packaging
            </h2>
            <p className="text-industrial-400 mb-6 leading-relaxed">
              Global leaders in packaging solutions. We combine manufacturing
              power with distribution flexibility to drive your supply chain
              forward.
            </p>
            <div className="flex items-center gap-4 text-industrial-400">
              <div className="flex items-center gap-1.5">
                <Award className="w-5 h-5 text-berlin-red" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  ISO 9001 Certified
                </span>
              </div>
              <div className="flex items-center gap-1.5">
                <Leaf className="w-5 h-5 text-action" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Sustainable
                </span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-auto p-6 bg-industrial-800 rounded-lg border border-industrial-700">
            <h3 className="text-lg font-bold mb-2">Join the PIF Network</h3>
            <p className="text-industrial-400 text-sm mb-4">
              Get packaging news and company updates.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-industrial-900 border border-industrial-600 text-white px-4 py-2 rounded-sm text-sm flex-1 focus:outline-none focus:border-berlin-blue placeholder:text-industrial-600"
              />
              <button className="bg-berlin-red hover:bg-red-700 text-white px-4 py-2 rounded-sm text-sm font-bold uppercase tracking-wide transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-industrial-800 pt-12 mb-12">
          <div>
            <h4 className="font-bold text-lg mb-6">Solutions</h4>
            <ul className="space-y-3 text-industrial-400 text-sm">
              <li>
                <Link
                  href="/services/design"
                  className="hover:text-white transition-colors"
                >
                  Custom Design
                </Link>
              </li>
              <li>
                <Link
                  href="/services/supply-chain"
                  className="hover:text-white transition-colors"
                >
                  Supply Chain Services
                </Link>
              </li>
              <li>
                <Link
                  href="/services/quality"
                  className="hover:text-white transition-colors"
                >
                  Quality Assurance
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Markets</h4>
            <ul className="space-y-3 text-industrial-400 text-sm">
              <li>
                <Link
                  href="/markets/food"
                  className="hover:text-white transition-colors"
                >
                  Food & Beverage
                </Link>
              </li>
              <li>
                <Link
                  href="/markets/personal-care"
                  className="hover:text-white transition-colors"
                >
                  Personal Care
                </Link>
              </li>
              <li>
                <Link
                  href="/markets/pharmaceutical"
                  className="hover:text-white transition-colors"
                >
                  Pharmaceutical
                </Link>
              </li>
              <li>
                <Link
                  href="/markets/industrial"
                  className="hover:text-white transition-colors"
                >
                  Industrial
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Company</h4>
            <ul className="space-y-3 text-industrial-400 text-sm">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  href="/locations"
                  className="hover:text-white transition-colors"
                >
                  Locations
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="hover:text-white transition-colors"
                >
                  News & Events
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Support</h4>
            <ul className="space-y-3 text-industrial-400 text-sm">
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/faqs"
                  className="hover:text-white transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="hover:text-white transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="hover:text-white transition-colors"
                >
                  T&C
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-industrial-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-industrial-500">
          <p>
            &copy; {new Date().getFullYear()} PIF Packaging. All rights
            reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="#" className="hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </Link>
            <Link href="#" className="hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
