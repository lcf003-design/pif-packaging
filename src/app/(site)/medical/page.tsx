"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function MedicalPage() {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    organization: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your inquiry.");
  };

  // Replicating colors exactly from reference
  const primaryNavy = "#001e42"; // Deep navy blue from headers
  const linkBlue = "#0055b8"; // Brighter blue from links/buttons
  const lightBg = "#f4f7f9"; // the light gray background bands

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      
      {/* 1. HERO SECTION */}
      {/* Reference shows a diagonal cut on the right image. */}
      <section className="relative bg-white pt-24 pb-16 lg:pt-32 lg:pb-32 overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center">
            
            {/* Text Side */}
            <div className="w-full lg:w-1/2 pr-0 lg:pr-16 z-10 space-y-6">
              <h1 className="text-[2.75rem] md:text-[3.5rem] font-bold tracking-tight text-[#001e42] leading-[1.1]">
                PPE supplies
              </h1>
              <p className="text-xl md:text-[1.35rem] text-slate-700 leading-relaxed font-normal max-w-lg">
                Find reliable, high-quality PPE for every level of protection.
              </p>
            </div>
            
            {/* Image Side - Diagonal Cut mimicking reference */}
            <div className="w-full lg:w-1/2 mt-12 lg:mt-0 relative h-[400px] lg:h-[450px]">
              {/* White overlay creating the diagonal wedge from left */}
              <div className="absolute top-0 bottom-0 -left-16 w-32 bg-white skew-x-[-15deg] z-10 hidden lg:block transform origin-bottom border-r-4 border-white"></div>
              
              <div className="relative w-full h-full overflow-hidden">
                <img
                  src="/ppe_hero_display.png"
                  alt="Medical Professional in PPE"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROP TEXT (Light Gray Band) */}
      <section className="py-20" style={{ backgroundColor: lightBg }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl text-center md:text-left">
          <h2 className="text-2xl md:text-[1.75rem] font-bold text-[#001e42] leading-tight mb-4 tracking-tight">
            Count on us to meet all PPE needs across your entire organization
          </h2>
          <p className="text-slate-600 text-base md:text-[1.05rem] leading-relaxed max-w-5xl">
            From emergency responders to clinical professionals, our comprehensive range of high-quality PPE ensures the safety and well-being of your teams. We provide reliable sourcing, robust supply chain management, and dedicated support to help you navigate periods of high demand seamlessly.
          </p>
        </div>
      </section>

      {/* 3. SUPPLY CHAIN RESILIENCE (4-Column) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest mb-3">
              SUPPLY CHAIN RESILIENCE
            </h2>
            <h3 className="text-3xl md:text-[2.1rem] font-bold tracking-tight text-[#001e42] leading-tight">
              Get the PPE supplies you need—safeguarded by supply chain resilience
            </h3>
            <p className="text-slate-600 text-sm mt-3 max-w-4xl">
              Offering inventory optimization, dedicated account management, and logistics expertise designed to support high volume facilities.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
            {[
              {
                title: "End-to-end supply chain control and diversification",
                description: "Our domestic facility network enables rapid response times and reduces risk associated with global shipping bottlenecks or international supply interruptions.",
                img: "/ppe_supply_chain.png",
              },
              {
                title: "Distribution and delivery",
                description: "We navigate complex logistics through our robust domestic network of over 30 facilities, ensuring precise and reliable deliveries.",
                img: "/ppe_global_distribution.png"
              },
              {
                title: "Data-driven demand planning",
                description: "Predictive analytics help forecasting future demands, allowing proactive procurement and planning for unexpected surges.",
                img: "/ppe_demand_planning.png"
              },
              {
                title: "Backup inventory",
                description: "We maintain dedicated backup stockpile programs to assure priority access when routine supply networks face extreme constraints or disruption.",
                img: "/ppe_backup_inventory.png"
              },
            ].map((item, i) => (
              <div key={i} className="flex flex-col group text-left">
                {/* Reference exactly shows sharp corners, no rounded edges here */}
                <div className="relative h-40 w-full mb-4 bg-slate-100 overflow-hidden">
                   <img src={item.img} alt={item.title} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-[1.1rem] font-bold text-[#001e42] mb-3 leading-tight">{item.title}</h4>
                <p className="text-slate-600 text-[0.85rem] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. COMPREHENSIVE PORTFOLIO (Split Layout, Light Gray) */}
      {/* Replicating the distinct image collage layout from the reference */}
      <section className="py-24" style={{ backgroundColor: lightBg }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">
            
            {/* Left Image Collage (matching reference grids) */}
            <div className="w-full lg:w-[45%]">
               <div className="grid grid-cols-2 gap-2 h-[450px]">
                 {/* Top Left */}
                 <div className="bg-slate-200 w-full h-full">
                    <img src="/ppe_hero_display.png" alt="PPE" className="w-full h-full object-cover grayscale opacity-80" />
                 </div>
                 {/* Top Right */}
                 <div className="bg-slate-300 w-full h-full">
                    <img src="/ppe_portfolio_team.png" alt="PPE" className="w-full h-full object-cover" />
                 </div>
                 {/* Bottom Left */}
                 <div className="bg-slate-300 w-full h-full">
                    <img src="/ppe_training.png" alt="PPE" className="w-full h-full object-cover" />
                 </div>
                 {/* Bottom Right */}
                 <div className="bg-slate-200 w-full h-full">
                    <img src="/ppe_supply_chain.png" alt="PPE" className="w-full h-full object-cover" />
                 </div>
               </div>
            </div>

            {/* Right Text Side */}
            <div className="w-full lg:w-[55%] space-y-5">
              <span className="inline-block text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest">
                COMPREHENSIVE DESKTOP PORTFOLIO
              </span>
              <h3 className="text-3xl md:text-[2.2rem] font-bold text-[#001e42] leading-[1.15]">
                Equip your teams with the best PPE protection possible
              </h3>
              <p className="text-slate-600 leading-relaxed text-[0.95rem]">
                Our comprehensive range covers N95 respirators, surgical masks, isolation gowns, primary facility protection, and specialized hand hygiene essentials for extensive operational support.
              </p>
              <p className="text-slate-600 leading-relaxed text-[0.95rem]">
                Our network facilitates sourcing strategies directly with FDA registered and certified manufacturing plants, ensuring quality products that perform when needed.
              </p>
              <p className="text-slate-600 leading-relaxed text-[0.95rem] pb-4">
                Assure compliance across all regulatory and quality metrics within healthcare infrastructure.
              </p>
              
              {/* PILL BUTTON matching reference exactly (Rounded Full, Outline Style) */}
              <button
                className="inline-flex items-center justify-center px-8 py-2.5 border-[1.5px] border-[#0055b8] text-[#0055b8] font-bold rounded-full hover:bg-blue-50 transition-colors text-sm"
              >
                View all products
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. EFFICIENCY & PROFICIENCY (3-Column Grid) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
          <div className="mb-12 text-left">
            <h2 className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest mb-3">
              EDUCATION AND STAFF TRAINING
            </h2>
            <h3 className="text-3xl md:text-[2.1rem] font-bold text-[#001e42] leading-tight">
              Partner with us to improve efficiency and staff PPE proficiency
            </h3>
            <p className="text-slate-600 text-sm mt-3 max-w-4xl">
              Our PPE trainings empower facility directors to manage inventory tracking methods and optimize employee protection standards throughout your organization.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-10">
            {[
              {
                title: "PPE evaluations and recommendations",
                description: "Formal assessments of facility protocols to standardize supply usage and consolidate redundancy via deep data analysis.",
                img: "/ppe_evaluations.png",
                link: "Request an evaluation >"
              },
              {
                title: "PPE education and training",
                description: "On-site and digital modules covering proper donning and doffing techniques to satisfy vital compliance requirements.",
                img: "/ppe_training.png",
                link: "Explore digital sessions >"
              },
              {
                title: "PPE SKU reduction",
                description: "Streamlined inventory strategies designed to minimize your total active SKU count, driving cost savings and freeing up vital space.",
                img: "/ppe_sku_reduction.png",
                link: "Compare plans >"
              },
            ].map((service, i) => (
              <div key={i} className="flex flex-col group text-left">
                {/* Sharp corner images matching reference */}
                <div className="relative h-48 w-full mb-5 bg-slate-100 overflow-hidden">
                  <img src={service.img} alt={service.title} className="w-full h-full object-cover" />
                </div>
                <h4 className="text-[1.2rem] font-bold text-[#001e42] mb-3 leading-tight">{service.title}</h4>
                <p className="text-slate-600 leading-relaxed text-[0.85rem] flex-grow mb-4">{service.description}</p>
                <a href="#contact" className="text-[#0055b8] font-bold text-[0.8rem] hover:underline">
                    {service.link}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. DARK BLUE COMMITMENT BANNER */}
      {/* Background is Navy, Text is White. Full width. */}
      <section className="bg-[#001e42] py-20 text-white">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
            <h2 className="text-[0.65rem] font-bold text-blue-300 uppercase tracking-widest mb-3">
              QUALITY ASSURANCE
            </h2>
            <h3 className="text-2xl md:text-[2.2rem] font-bold leading-tight mb-4 tracking-tight max-w-4xl">
              We’re committed to quality and leadership in all supplies
            </h3>
            <p className="text-blue-100 max-w-4xl text-[0.95rem] leading-relaxed">
              Brand integrity, product reliability, and regulatory compliance are built into all PPE supplies we source. We employ rigorous quality inspection standards across every node in our global supply chain to proactively mitigate vulnerabilities.
            </p>
        </div>
      </section>

      {/* 7. LEAD GENERATION / CONTACT FORM (Light Gray Band) */}
      <section id="contact" className="py-24" style={{ backgroundColor: lightBg }}>
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl">
            <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Left Image + Text */}
            <div className="w-full lg:w-1/3 space-y-6">
                <h2 className="text-3xl md:text-[2.2rem] font-bold text-[#001e42] leading-tight tracking-tight">
                    How can we help you keep everyone in your organization protected?
                </h2>
                <p className="text-slate-600 text-[0.9rem] leading-relaxed">
                  We're committed to protecting professionals in the most demanding environments. Reach out to our PPE specialists today to secure an audit of your supplies.
                </p>
                {/* Reference has a single sharp-corner image here */}
                <div className="relative w-full aspect-[4/3] bg-slate-200 mt-6 overflow-hidden">
                    <img 
                        src="/logistics_port.png" 
                        alt="Hospital Hallway" 
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>
            
            {/* Right Side Form */}
            <div className="w-full lg:w-2/3">
                <div className="bg-transparent">
                    <p className="text-[0.7rem] text-slate-500 mb-6 font-medium uppercase">* Indicates a required field</p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[0.8rem] font-bold text-[#001e42]">First name *</label>
                                <input required name="firstName" type="text" className="w-full px-3 py-2 border border-slate-300 outline-none text-sm bg-white" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[0.8rem] font-bold text-[#001e42]">Last name *</label>
                                <input required name="lastName" type="text" className="w-full px-3 py-2 border border-slate-300 outline-none text-sm bg-white" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1.5">
                                <label className="text-[0.8rem] font-bold text-[#001e42]">Email address *</label>
                                <input required name="email" type="email" className="w-full px-3 py-2 border border-slate-300 outline-none text-sm bg-white" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[0.8rem] font-bold text-[#001e42]">Phone *</label>
                                <input required name="phone" type="tel" className="w-full px-3 py-2 border border-slate-300 outline-none text-sm bg-white" />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-1.5">
                                <label className="text-[0.8rem] font-bold text-[#001e42]">Organization name *</label>
                                <input required name="organization" type="text" className="w-full px-3 py-2 border border-slate-300 outline-none text-sm bg-white" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[0.8rem] font-bold text-[#001e42]">Position *</label>
                                <input required name="position" type="text" className="w-full px-3 py-2 border border-slate-300 outline-none text-sm bg-white" />
                            </div>
                        </div>

                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                             <div className="space-y-1.5">
                                <label className="text-[0.8rem] font-bold text-[#001e42]">Facility Count *</label>
                                <input required name="facilities" type="number" className="w-full px-3 py-2 border border-slate-300 outline-none text-sm bg-white" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[0.8rem] font-bold text-[#001e42]">Primary Interest *</label>
                                <select required name="interest" className="w-full px-3 py-2 border border-slate-300 outline-none text-sm bg-white">
                                    <option value="">Select...</option>
                                    <option value="Masks">Masks</option>
                                    <option value="Gloves">Gloves</option>
                                    <option value="Gowns">Gowns</option>
                                </select>
                            </div>
                        </div>

                        <div className="space-y-3 pt-4 border-t border-slate-200 mt-6">
                            <div className="flex items-start gap-3">
                                <input type="checkbox" className="mt-1" />
                                <label className="text-[0.8rem] text-slate-700 leading-snug">
                                    By supplying my personal information, I agree to receive communications regarding products aligned with my interests.
                                </label>
                            </div>
                            <div className="flex items-start gap-3">
                                <input type="checkbox" className="mt-1" />
                                <label className="text-[0.8rem] text-slate-700 leading-snug">
                                    I agree to the <a href="#" className="text-[#0055b8] underline">terms and conditions</a> and <a href="#" className="text-[#0055b8] underline">privacy policy</a>.
                                </label>
                            </div>
                        </div>

                        {/* Reference shows a solid blue pill button for Submit */}
                        <div className="pt-4">
                            <button className="px-10 py-2.5 bg-[#0055b8] text-white font-bold rounded-full hover:bg-blue-800 transition-colors text-sm">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </div>
      </section>

      {/* 8. VIRUS ICON FOOTER CTA (White) */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="w-full md:w-1/2">
                    <h2 className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-widest mb-3">
                        INFECTION PREVENTION SOLUTIONS
                    </h2>
                    <h3 className="text-3xl md:text-[2.2rem] font-bold text-[#001e42] mb-6 leading-tight tracking-tight">
                        Are your teams well protected from infection risk?
                    </h3>
                    <p className="text-slate-600 mb-8 max-w-lg text-[0.95rem]">
                        We offer a comprehensive portfolio of diagnostic and preventative supplies to ensure environmental safety across your operation lines.
                    </p>
                    
                    {/* Outline pill button */}
                    <button
                        className="inline-flex items-center justify-center px-8 py-2.5 bg-transparent border-[1.5px] border-[#0055b8] rounded-full text-[#0055b8] font-bold hover:bg-blue-50 transition-colors text-sm"
                    >
                        Explore solutions &gt;
                    </button>
                </div>

                <div className="w-full md:w-1/2 relative h-[350px] flex justify-center items-center">
                    {/* The Green Abstract Virus Shapes from reference - Circular Polka Dots */}
                    <div className="absolute top-10 right-10 w-24 h-24 bg-[#00bd56] rounded-full opacity-80 z-0"></div>
                    <div className="absolute bottom-10 right-20 w-16 h-16 bg-[#00bd56] rounded-full opacity-80 z-0"></div>
                    <div className="absolute top-[40%] left-[20%] w-10 h-10 bg-[#00bd56] rounded-full opacity-80 z-0"></div>
                    <div className="absolute bottom-0 left-[30%] w-32 h-32 bg-[#00bd56] rounded-full opacity-80 z-0"></div>

                    {/* Masked doctor figure overlapping shapes */}
                    <div className="relative w-64 h-full z-10 flex items-end justify-center">
                      <img 
                        src="/ppe_hero_display.png" 
                        alt="Masked Professional" 
                        className="w-full h-auto object-contain drop-shadow-2xl"
                        style={{ clipPath: 'circle(50% at 50% 50%)' }}
                      />
                    </div>
                </div>
            </div>
        </div>
      </section>

    </div>
  );
}
