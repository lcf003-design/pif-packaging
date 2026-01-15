"use client";

import React, { useState } from "react";
import { Product } from "@/types";
import { useInquiry } from "@/context/InquiryContext";
import {
  Check,
  ArrowRight,
  ShieldCheck,
  Layers,
  FileText,
  Download,
  Info,
  ZoomIn,
  Heart,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductDetailClient({
  product,
  recommendedClosures,
  variants = [],
}: {
  product: Product;
  recommendedClosures: Product[];
  variants?: Product[];
}) {
  const { addItem } = useInquiry();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false); // Used inside lightbox for zoom state
  const [zoomPos, setZoomPos] = useState({ x: 50, y: 50 });
  const [isFavorite, setIsFavorite] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isZoomed) return;
    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const touch = e.touches[0];
    const x = ((touch.clientX - left) / width) * 100;
    const y = ((touch.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  // Gallery Logic
  // Trust 'images' array if it exists, but deduplicate aggressively
  const uniqueImages = Array.from(new Set(product.images || []));
  const allImages =
    uniqueImages.length > 0 ? uniqueImages : [product.imageUrl].filter(Boolean);

  const [selectedImage, setSelectedImage] = useState(
    allImages[0] || product.imageUrl
  );

  const handleAddToInquiry = () => {
    addItem(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  // formatting
  let capacityDisplay = "N/A";
  if (product.capacity) {
    const { value, unit } = product.capacity;
    if (unit === "oz") {
      const ml = Math.round(value * 29.5735);
      capacityDisplay = `${value} oz (${ml} ml)`;
    } else if (unit === "ml") {
      const oz = (value / 29.5735).toFixed(1);
      capacityDisplay = `${value} ml (${oz} oz)`;
    } else if (unit === "gal") {
      const liters = (value * 3.78541).toFixed(2);
      capacityDisplay = `${value} gal (${liters} L)`;
    } else {
      capacityDisplay = `${value} ${unit}`;
    }
  }

  // Determine Case Qty Label
  const quantityUnitLabel = product.caseQty ? "Cases" : "Units";
  const quantityHelpText = product.caseQty
    ? `${product.caseQty} pieces per case`
    : "Sold individually";

  // --- REFACTORED COMPONENTS (Safety Extraction) ---
  const ProductHeader = () => (
    <div className="pb-6 border-b border-gray-100">
      <div className="mb-4 flex items-center gap-2">
        <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-wider rounded-sm">
          Industrial Grade
        </span>
        {product.material && (
          <span className="px-2 py-1 bg-gray-50 text-gray-600 text-[10px] font-bold uppercase tracking-wider rounded-sm border border-gray-100">
            {product.material}
          </span>
        )}
      </div>

      <h1 className="text-2xl lg:text-3xl xl:text-4xl font-black text-slate-900 leading-none mb-6 tracking-tighter">
        {product.name}
      </h1>

      <div className="flex items-center gap-4 text-sm text-gray-500">
        <span className="font-bold text-gray-400">
          Item # <span className="text-slate-900">{product.sku || "N/A"}</span>
        </span>
      </div>
    </div>
  );

  const QuoteCard = () => (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-xl shadow-slate-200/50 p-6 space-y-5 relative overflow-hidden">
      {/* Decorative Top Line */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-berlin-blue to-berlin-red opacity-10"></div>

      <div className="text-center pb-4 border-b border-gray-50">
        <div className="flex items-center justify-between mb-2">
          <p className="text-green-600 text-[10px] uppercase tracking-widest font-bold flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            Volume Pricing
          </p>
          <span className="text-xs text-gray-400 font-medium">
            Bulk Discounts
          </span>
        </div>

        {/* Compact Header */}
        <div className="text-center relative">
          <div className="text-2xl font-black text-slate-900 tracking-tight drop-shadow-sm decoration-berlin-blue/30 underline decoration-4 underline-offset-4">
            Request Quote
          </div>
        </div>
      </div>

      {/* Size / Capacity Variants */}
      {variants.length > 0 && (
        <div className="space-y-3 pt-4 border-t border-gray-100">
          <label className="text-xs font-bold text-gray-900 uppercase tracking-wider pl-1 block">
            Select Capacity
          </label>
          <div className="flex flex-wrap gap-2">
            {/* Current Product */}
            <button
              disabled
              className="px-4 py-2 bg-berlin-blue text-white text-sm font-bold rounded-lg shadow-md ring-2 ring-berlin-blue ring-offset-1 cursor-default"
            >
              {capacityDisplay}
            </button>

            {/* Variant Products */}
            {variants.map((v) => {
              let vDisplay = "N/A";
              if (v.capacity) {
                const { value, unit } = v.capacity;
                if (unit === "oz") {
                  vDisplay = `${value} oz`;
                } else {
                  vDisplay = `${value} ${unit}`;
                }
              }
              return (
                <Link
                  key={v.id}
                  href={`/product/${v.slug || v.id}`}
                  className="px-4 py-2 bg-white text-industrial-600 border border-gray-200 hover:border-berlin-blue hover:text-berlin-blue text-sm font-bold rounded-lg transition-all shadow-sm hover:shadow"
                >
                  {vDisplay}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Quantity Input */}
      <div className="space-y-3 pt-0">
        <label className="text-xs font-bold text-gray-900 uppercase tracking-wider pl-1 block">
          Start an order
        </label>
        <div className="flex items-center gap-2">
          <div className="flex-1 flex border border-gray-200 rounded-xl overflow-hidden focus-within:ring-4 focus-within:ring-berlin-blue/10 focus-within:border-berlin-blue transition-all h-14 bg-gray-50/50">
            <input
              type="number"
              min="1"
              value={qty}
              onChange={(e) =>
                setQty(Math.max(1, parseInt(e.target.value) || 1))
              }
              placeholder="Qty"
              className="flex-1 px-4 font-mono font-bold text-xl text-slate-900 focus:outline-none bg-transparent placeholder-gray-300"
            />
            <div className="bg-white border-l border-gray-200 px-6 flex items-center text-xs font-bold text-gray-500 uppercase tracking-wider">
              {quantityUnitLabel}
            </div>
          </div>
        </div>
        <p className="text-xs text-gray-400 pl-1 font-medium">
          {quantityHelpText}
        </p>
      </div>

      {/* Action Buttons Row */}
      <div className="flex gap-3">
        {/* Add to Inquiry (Primary) */}
        <button
          onClick={handleAddToInquiry}
          className={`flex-1 py-5 rounded-xl font-bold text-sm uppercase tracking-widest flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-[0.98] ${
            added
              ? "bg-green-600 text-white shadow-lg shadow-green-600/30 ring-2 ring-green-600 ring-offset-2"
              : "bg-berlin-red hover:bg-red-700 text-white shadow-xl shadow-red-600/20 hover:shadow-2xl hover:shadow-red-600/30 hover:-translate-y-1"
          }`}
        >
          {added ? (
            <>
              <Check className="w-5 h-5" /> Added to Quote
            </>
          ) : (
            <>
              Add to Inquiry <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>

        {/* Wishlist Heart (Secondary) */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`aspect-square h-auto rounded-xl flex items-center justify-center border-2 transition-all duration-200 active:scale-90 ${
            isFavorite
              ? "border-berlin-red bg-red-50 text-berlin-red shadow-inner"
              : "border-gray-200 hover:border-berlin-red hover:text-berlin-red text-gray-400 bg-white shadow-sm hover:shadow-md"
          }`}
          title={isFavorite ? "Remove from Wishlist" : "Add to Wishlist"}
        >
          <Heart
            className={`w-6 h-6 transition-all duration-300 ${
              isFavorite ? "fill-current scale-110" : "scale-100"
            }`}
          />
        </button>
      </div>

      {/* Pricing Tiers - Moved to Bottom & Compacted */}
      <div className="pt-4 border-t border-gray-100">
        <div className="grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-wide font-medium text-gray-500">
          <div className="p-2 bg-gray-50 rounded">
            <div className="block text-gray-900 font-bold mb-0.5">1-4</div>
            Cases
          </div>
          <div className="p-2 bg-blue-50 text-blue-700 rounded border border-blue-100">
            <div className="block font-bold mb-0.5">5-49</div>
            15% Off
          </div>
          <div className="p-2 bg-green-50 text-green-700 rounded border border-green-100">
            <div className="block font-bold mb-0.5">50+</div>
            Quote
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 font-medium pt-2 opacity-80">
        <ShieldCheck className="w-3 h-3 text-green-500" />
        <span>Secure SSL Inquiry</span>
        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
        <span>No Payment Info Required</span>
      </div>
    </div>
  );

  /* --- LIGHTBOX (FRAMER MOTION PHYSICS) --- */
  const Lightbox = () => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center backdrop-blur-md"
      >
        {/* Close Button */}
        <button
          onClick={() => {
            setIsLightboxOpen(false);
            setIsZoomed(false);
          }}
          className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 rounded-full text-white transition-all z-50 backdrop-blur-md active:scale-95 px-4"
        >
          Close
        </button>

        {/* Image Container */}
        <div
          className="relative w-full h-full flex items-center justify-center p-0 overflow-hidden"
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <motion.div
            className={`relative w-full h-full flex items-center justify-center ${
              isZoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
            }`}
            animate={{
              scale: isZoomed ? 2 : 1,
            }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag={isZoomed}
            dragConstraints={{
              top: -600,
              left: -600,
              right: 600,
              bottom: 600,
            }}
            dragElastic={0.1}
          >
            <div className="relative w-full h-full md:w-[90vw] md:h-[90vh]">
              <Image
                src={selectedImage}
                alt={product.name}
                fill
                className="object-contain pointer-events-none select-none"
                draggable={false}
                quality={100}
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Hint Badge at Bottom */}
        <AnimatePresence>
          {!isZoomed && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/10 border border-white/20 text-white px-6 py-2.5 rounded-full text-sm font-medium backdrop-blur-md pointer-events-none"
            >
              Tap to Zoom
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );

  return (
    <div className="bg-white min-h-screen font-sans">
      {/* Layer 2: Breadcrumb - Industrial Utility Bar */}
      <div className="border-b border-industrial-200 bg-industrial-50 sticky top-16 z-30">
        <div className="container mx-auto px-4 py-2 text-[10px] uppercase tracking-widest text-industrial-500 font-bold flex items-center gap-2">
          <Link href="/shop-all" className="hover:text-berlin-blue">
            Catalog
          </Link>
          <span className="text-industrial-300">/</span>
          <Link
            href={`/products/${product.category.toLowerCase()}`}
            className="hover:text-berlin-blue"
          >
            {product.category}
          </Link>
          <span className="text-industrial-300">/</span>
          <span className="text-industrial-900">{product.name}</span>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 lg:py-16">
        {/* Main Grid: Gallery | Content | Quote */}
        {/* We use a 12-col grid. 
            On Desktop (lg): 
            - Gallery: 5 cols (Sticky)
            - Content: 4 cols (Scrolls) -> actually, we merge Content & Quote logic carefully.
            
            Revised "Sticky Scroll Grid Stability" Pattern:
            Grid: splits into [Left Rail] and [Right Rail].
            But actually, the best pattern for e-commerce is:
            [Gallery (Sticky)] [Details + Specs (Long)] [Quote Card (Sticky)]
             OR 
            [Gallery (Sticky)] [Details + Quote (Sticky)] -> Doesnt work for long specs.

            Let's use the layout from the KI:
            [Gallery (Sticky)] [Primary Content (Long)]
            Wait, the KI suggests "Primary Column Extension": "Move all detailed content... inside the first column... This extends the vertical height... quote card remains visible".
            
            Actually, commonly: 
            Left: Gallery (Sticky)
            Middle: Content (Scrolls)
            Right: Quote (Sticky)
            
            For this specific request, let's stick to the 2-column split (Standard E-com) but refined:
            Col 1 (Left 60%): Gallery + Description + Specs + Downloads
            Col 2 (Right 40%): Quote Card (Sticky)
            
            BUT, usually Gallery needs to be sticky too if it's on the left.
            
            Let's go with the Side-by-Side (5/7) layout where:
            Left Col (5): Gallery (Sticky)
            Right Col (7): 
              Header
              Grid Inner:
                Col A (Content): Specs, Description
                Col B (Quote): Sticky Card
            
            This allows Gallery to stick on left.
            And Quote to stick on right relative to content.
        */}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* LEFT COLUMN: Gallery (Sticky on Desktop) */}
          <div className="lg:col-span-6 xl:col-span-7 h-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
              {/* MOBILE: Product Title (Top of Page on Mobile) */}
              <div className="md:col-span-12 lg:hidden mb-4">
                <ProductHeader />
              </div>

              {/* Gallery Rail - Sticky */}
              <div className="md:col-span-12 lg:col-span-12 xl:col-span-12 relative">
                {/* Mobile/Tablet: Gallery is just normal flow. Desktop: We want it sticky IF the content on right is long? 
                    Actually, if we put specs on the left adjacent to gallery, the gallery can't be sticky easily unless it's in a separate track.
                    
                    Let's use the specific KI recommendation: "Move all detailed content... inside the first column".
                    So:
                    [ Gallery ]
                    [ Specs   ] 
                    [ Details ]
                    ---------------- (Vertical Line)
                    [ Quote Card ] (Sticky)
                    
                    This ensures the Left Column is TALL.
                    The Right Column (Quote) is sticky.
                */}

                {/* PRODUCT GALLERY */}
                <div className="space-y-4 mb-16">
                  <div
                    className="bg-white border border-industrial-200 rounded-lg overflow-hidden aspect-[4/3] flex items-center justify-center p-8 relative group shadow-sm cursor-zoom-in"
                    onClick={() => setIsLightboxOpen(true)}
                  >
                    <div className="absolute top-4 left-4 z-10 flex gap-2">
                      {product.material && (
                        <span className="bg-industrial-100 text-industrial-900 border border-industrial-200 text-[10px] font-bold px-2 py-1 rounded-sm uppercase tracking-wider">
                          {product.material}
                        </span>
                      )}
                    </div>

                    {/* Hint */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur text-gray-400 p-2 rounded-full opacity-100 transition-opacity z-10 shadow-sm border border-gray-200 pointer-events-none">
                      <ZoomIn className="w-5 h-5" />
                    </div>

                    <div className="relative w-full h-full overflow-hidden">
                      <Image
                        src={selectedImage}
                        alt={product.name}
                        fill
                        className="object-contain mix-blend-multiply transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                  {/* Thumbnails */}
                  {allImages.length > 1 && (
                    <div className="grid grid-cols-6 gap-3">
                      {allImages.map((img, i) => (
                        <button
                          key={i}
                          onClick={() => setSelectedImage(img)}
                          className={`aspect-square bg-white border rounded-md cursor-pointer hover:border-berlin-blue transition-all flex items-center justify-center relative overflow-hidden ${
                            selectedImage === img
                              ? "border-berlin-blue ring-1 ring-berlin-blue shadow-md"
                              : "border-industrial-100 hover:bg-gray-50"
                          }`}
                        >
                          <Image
                            src={img}
                            alt={`Thumbnail ${i + 1}`}
                            fill
                            className="object-contain p-1 mix-blend-multiply"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* MOBILE: Quote Card (Below Images on Mobile) */}
                <div className="lg:hidden mb-12">
                  <QuoteCard />
                </div>

                {/* PRODUCT DETAILS (About & Specs) - formerly on the right, now stacked below gallery to make this column tall */}
                <div className="space-y-10">
                  {/* About Section */}
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">
                      Product Description
                    </h3>
                    <p className="text-industrial-600 text-base leading-relaxed text-justify prose-slate">
                      {product.description
                        ? product.description.split("\n").map((line, idx) => (
                            <React.Fragment key={idx}>
                              {line.split(/(\*\*.*?\*\*)/).map((part, i) =>
                                part.startsWith("**") && part.endsWith("**") ? (
                                  <strong
                                    key={i}
                                    className="font-bold text-gray-900"
                                  >
                                    {part.slice(2, -2)}
                                  </strong>
                                ) : (
                                  <span key={i}>{part}</span>
                                )
                              )}
                              {idx <
                                product.description!.split("\n").length - 1 && (
                                <br />
                              )}
                            </React.Fragment>
                          ))
                        : "High-quality packaging solution designed for commercial applications. Features durable construction and industry-standard finish."}
                    </p>
                  </div>

                  {/* Key Features Grid */}
                  {product.features && product.features.length > 0 && (
                    <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                      <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                        <Check className="w-4 h-4 text-berlin-blue" />
                        Key Features
                      </h3>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {product.features.map((feature, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-sm text-industrial-700 font-medium"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-berlin-blue flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Technical Specs Table - Revamped */}
                  <div>
                    <div className="flex items-center gap-2 mb-6">
                      <Layers className="w-5 h-5 text-berlin-blue" />
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                        Technical Specifications
                      </h3>
                    </div>

                    <div className="overflow-hidden border border-gray-100 rounded-lg">
                      <table className="w-full text-sm">
                        <tbody className="divide-y divide-gray-100 bg-white">
                          {[
                            {
                              label: "Capacity",
                              value: capacityDisplay,
                              help: "Fill volume",
                            },
                            { label: "Material", value: product.material },
                            {
                              label: "Color",
                              value: product.color,
                              hide: !product.color,
                            },
                            {
                              label: "Shape",
                              value: product.shape,
                              hide: !product.shape,
                            },
                            {
                              label: "Neck Finish",
                              value: product.neckFinish || "-",
                            },
                            {
                              label: "Cap Size",
                              value: product.capSize,
                              hide: !product.capSize,
                            },
                            {
                              label: "Weight",
                              value: product.weight,
                              hide: !product.weight,
                            },
                            {
                              label: "Dimensions",
                              value: product.dimensions
                                ? `${product.dimensions.height}H x ${product.dimensions.diameter}D`
                                : "-",
                            },
                            {
                              label: "Case Qty",
                              value: product.caseQty || "Bulk",
                            },
                            {
                              label: "Pallet Qty",
                              value: product.palletQty || "Contact for details",
                            },
                            ...(product.specifications
                              ? Object.entries(product.specifications).map(
                                  ([key, val]) => ({ label: key, value: val })
                                )
                              : []),
                            {
                              label: "Included Closure",
                              value: product.closure
                                ? `${product.closure.color} ${product.closure.type}`
                                : "N/A",
                              hide: !product.closure?.type,
                            },
                            {
                              label: "Liner",
                              value: product.closure?.liner || "N/A",
                              hide: !product.closure?.liner,
                            },
                            {
                              label: "Label Panel",
                              value: product.labelPanel
                                ? `${product.labelPanel.dimensions} (${product.labelPanel.shape})`
                                : "N/A",
                              hide: !product.labelPanel?.dimensions,
                            },
                          ].map((row, i) =>
                            row.hide ? null : (
                              <tr
                                key={i}
                                className="group hover:bg-gray-50 transition-colors"
                              >
                                <td className="py-4 px-6 text-gray-500 font-medium w-1/3 flex items-center gap-2">
                                  {row.label}
                                  {row.help && (
                                    <Info className="w-3 h-3 text-gray-300" />
                                  )}
                                </td>
                                <td className="py-4 px-6 text-gray-900 font-bold text-right sm:text-left">
                                  {row.value}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Downloads Section */}
                  {product.downloads && product.downloads.length > 0 && (
                    <div className="pt-6 border-t border-industrial-100">
                      <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4 flex items-center gap-2">
                        <FileText className="w-4 h-4 text-berlin-blue" />
                        Downloads & Documentation
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {product.downloads.map((doc, i) => (
                          <a
                            key={i}
                            href={doc.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-between p-4 border border-industrial-200 rounded-lg hover:border-berlin-blue hover:bg-blue-50/30 transition-all font-medium text-sm text-industrial-700"
                          >
                            <span className="flex items-center gap-2">
                              <FileText className="w-4 h-4 text-industrial-400 group-hover:text-berlin-blue" />
                              {doc.label}
                            </span>
                            <Download className="w-4 h-4 text-industrial-300 group-hover:text-berlin-blue" />
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Header & Quote Card (Sticky) */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-5 relative h-full">
            <div className="sticky top-32 space-y-8">
              <ProductHeader />
              <QuoteCard />
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Overlay */}
      {isLightboxOpen && <Lightbox />}
    </div>
  );
}
