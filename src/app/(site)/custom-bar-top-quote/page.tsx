import Image from "next/image";
import QuoteSidebarCard from "@/components/markets/QuoteSidebarCard";

export default function CustomBarTopQuotePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* 1. HERO SECTION */}
      <section className="relative h-[400px] w-full bg-slate-900 flex items-center justify-center overflow-hidden">
        <Image
          src="/images/markets/custom_closure_quote_hero.png"
          alt="Custom Bar Top Closures"
          fill
          className="object-cover opacity-60"
          priority
        />
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight drop-shadow-lg">
            Custom Bar Top Closures Quote Request
          </h1>
        </div>
      </section>

      {/* 2. MAIN LAYOUT (Form + Sidebar) */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4 flex flex-col lg:flex-row gap-12">
          {/* LEFT COLUMN: THE FORM */}
          <div className="w-full lg:w-2/3">
            <div className="bg-white p-8 lg:p-12 border border-neutral-200 shadow-sm relative">
              {/* 1. YOUR INFORMATION */}
              <div className="mb-12">
                <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">
                  Your Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* 2. COMPANY INFORMATION */}
              <div className="mb-12">
                <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">
                  Company Information
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Website
                    </label>
                    <input
                      type="url"
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Address *
                    </label>
                    <input
                      type="text"
                      placeholder="Enter a location"
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors placeholder:text-neutral-400"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Country *
                    </label>
                    <select className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors bg-white appearance-none">
                      <option value="">Select Country</option>
                      <option value="US">United States</option>
                      <option value="CA">Canada</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      State *
                    </label>
                    <select className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors bg-white appearance-none">
                      <option value="">Select State</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Zip Code/Postal Code *
                    </label>
                    <input
                      type="text"
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors"
                    />
                  </div>
                </div>
              </div>

              {/* 3. PROJECT INFORMATION */}
              <div className="mb-12">
                <h2 className="text-2xl font-black text-slate-900 mb-6 tracking-tight">
                  Project Information
                </h2>
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      I Would Like to Learn More About? *
                    </label>
                    <select className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors bg-white appearance-none">
                      <option value="">
                        Select I Would Like to Learn More About?
                      </option>
                      <option value="Packaging Quote">Packaging Quote</option>
                      <option value="Custom Decoration">
                        Custom Decoration
                      </option>
                      <option value="Studio One Eleven Custom Packaging Design">
                        Studio One Eleven Custom Packaging Design
                      </option>
                      <option value="Fluorination">Fluorination</option>
                      <option value="Hazardous Material Packaging">
                        Hazardous Material Packaging
                      </option>
                      <option value="Financial Services/Line of Credit">
                        Financial Services/Line of Credit
                      </option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Project Timeframe *
                    </label>
                    <select className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors bg-white appearance-none">
                      <option value="">Select Project Timeframe</option>
                      <option value="Under 6 Months">Under 6 Months</option>
                      <option value="6-12 Months">6-12 Months</option>
                      <option value="1-2 Years">1-2 Years</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Annual Packaging Purchase Volume *
                    </label>
                    <select className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors bg-white appearance-none">
                      <option value="">
                        Select Annual Packaging Purchase Volume
                      </option>
                      <option value="Less than $10k">Less than $10k</option>
                      <option value="$10k - $50k">$10k - $50k</option>
                      <option value="$50k - $100k">$50k - $100k</option>
                      <option value="$100k - $250k">$100k - $250k</option>
                      <option value="$250k - $500k">$250k - $500k</option>
                      <option value="$500k - $1MM">$500k - $1MM</option>
                      <option value="$1MM - $5MM">$1MM - $5MM</option>
                      <option value="$5MM - $10MM">$5MM - $10MM</option>
                      <option value="Over $10MM">Over $10MM</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-800 mb-2">
                      Tell us more *
                    </label>
                    <textarea
                      rows={5}
                      className="w-full border border-neutral-300 px-4 py-3 focus:border-red-600 focus:ring-1 focus:ring-red-600 outline-none transition-colors resize-y"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* SUBMIT BUTTON */}
              <div className="mt-12 pt-8 border-t border-neutral-200">
                <button
                  type="button"
                  className="w-full md:w-auto bg-red-600 hover:bg-black text-white font-bold uppercase tracking-wide px-10 py-4 transition-colors duration-300 shadow-md"
                >
                  Request Quote
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: THE SIDEBAR */}
          <div className="w-full lg:w-1/3 space-y-6 lg:sticky lg:top-8 self-start">
            <QuoteSidebarCard
              title="Bar Top Material Options"
              description="Design your perfect packaging with customized Bar Top Closures. We can help you design a stylish closure from a variety of material types including:"
              imageSrc="/images/markets/closure_materials.png"
              bulletPoints={[
                "Wood Head",
                "Aluminum Head",
                "Plastic Head",
                "Glass Head",
                "And many more!",
              ]}
            />

            <QuoteSidebarCard
              title="Cork & Stopper Options"
              description="Once you've chosen the material type for the bar top head, you can select from a variety of stopper options:"
              imageSrc="/images/markets/closure_stoppers.png"
              bulletPoints={[
                "Natural Cork",
                "Synthetic Cork",
                "Glass Stopper",
                "& More!",
              ]}
            />

            <QuoteSidebarCard
              title="Decoration Options"
              description="We offer a wide variety of decorating options to best suit your unique brand. Once you've chosen the shape and material type of the head and stopper, we can customize your closure with custom decoration. Some popular decorations options include:"
              imageSrc="/images/markets/closure_decorations.png"
              bulletPoints={["Printing", "Laser Etching", "Embossing", "Metal"]}
            />
          </div>
        </div>
      </section>
    </main>
  );
}
