"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { InquiryItem, Product } from "@/types";

interface InquiryContextType {
  items: InquiryItem[];
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearInquiry: () => void;
  totalItems: number;
}

const InquiryContext = createContext<InquiryContextType | undefined>(undefined);

export function InquiryProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<InquiryItem[]>([]);

  // Optional: Load from local storage
  useEffect(() => {
    const saved = localStorage.getItem("inquiry-cart");
    if (saved) {
      try {
        setItems(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse inquiry cart", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("inquiry-cart", JSON.stringify(items));
  }, [items]);

  const addItem = (product: Product, quantity: number) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id
            ? { ...i, quantity: i.quantity + quantity }
            : i
        );
      }
      return [...prev, { product, quantity }];
    });
  };

  const removeItem = (productId: string) => {
    setItems((prev) => prev.filter((i) => i.product.id !== productId));
  };

  const clearInquiry = () => setItems([]);

  const totalItems = items.length;

  return (
    <InquiryContext.Provider
      value={{ items, addItem, removeItem, clearInquiry, totalItems }}
    >
      {children}
    </InquiryContext.Provider>
  );
}

export function useInquiry() {
  const context = useContext(InquiryContext);
  if (context === undefined) {
    throw new Error("useInquiry must be used within an InquiryProvider");
  }
  return context;
}
