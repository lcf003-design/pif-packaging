"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Factory,
  Truck,
  Store,
  Trash2,
  AlertTriangle,
  Clock,
  CheckCircle2,
  DollarSign,
  ArrowRight,
  X,
} from "lucide-react";

type Stage = {
  id: string;
  label: string;
  icon: React.ReactNode;
  waste: {
    label: string;
    description: string;
    icon: React.ReactNode;
    value: string;
  };
  solution: {
    label: string;
    description: string;
    icon: React.ReactNode;
    value: string;
  };
};

const stages: Stage[] = [
  {
    id: "manufacturing",
    label: "Production",
    icon: <Factory size={32} />,
    waste: {
      label: "Defect Rate",
      description: "Post-production sorting failures",
      icon: <AlertTriangle size={20} className="text-red-500" />,
      value: "Avg 3-5% Rejection",
    },
    solution: {
      label: "Source Audit",
      description: "In-line quality control",
      icon: <CheckCircle2 size={20} className="text-green-500" />,
      value: "99.8% Acceptance",
    },
  },
  {
    id: "logistics",
    label: "Logistics",
    icon: <Truck size={32} />,
    waste: {
      label: "Inefficient Freight",
      description: "Shipping 'air' and poor density",
      icon: <Trash2 size={20} className="text-red-500" />,
      value: "$$$ Wasted Space",
    },
    solution: {
      label: "Payload Optimization",
      description: "Density-balanced palletization",
      icon: <DollarSign size={20} className="text-green-500" />,
      value: "-15% Freight Cost",
    },
  },
  {
    id: "distribution",
    label: "Distribution",
    icon: <Store size={32} />,
    waste: {
      label: "Middleman Markups",
      description: "Factory → Broker → Distributor → You",
      icon: <DollarSign size={20} className="text-red-500" />,
      value: "+20% Added Cost",
    },
    solution: {
      label: "Factory Direct",
      description: "Global Stock → Your Dock",
      icon: <CheckCircle2 size={20} className="text-green-500" />,
      value: "Zero Touchpoints",
    },
  },
];

export default function InteractiveValueChain() {
  const [activeStage, setActiveStage] = useState<string | null>(null);

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-8">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold mb-2 text-industrial-900">
          The Efficiency X-Ray
        </h3>
        <p className="text-industrial-600">
          Hover over a stage to see the PIF Performance Delta.
        </p>
      </div>

      {/* Main Pipeline Container */}
      <div className="relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 transform -translate-y-1/2" />

        <div className="grid md:grid-cols-3 gap-8">
          {stages.map((stage) => {
            const isActive = activeStage === stage.id;

            return (
              <div
                key={stage.id}
                className="relative cursor-pointer group perspective-1000"
                onMouseEnter={() => setActiveStage(stage.id)}
                onMouseLeave={() => setActiveStage(null)}
              >
                {/* Connector Arrow (Desktop) */}
                <div className="hidden md:block absolute -right-6 top-1/2 transform -translate-y-1/2 text-gray-300 z-0">
                  <ArrowRight size={24} />
                </div>

                {/* Card Container */}
                <motion.div
                  layout
                  className={`
                    relative bg-white rounded-lg shadow-xl p-6 border-2 transition-all duration-300 h-[320px] flex flex-col items-center justify-center text-center overflow-hidden
                    ${
                      isActive
                        ? "border-berlin-blue shadow-2xl scale-105"
                        : "border-gray-100"
                    }
                  `}
                >
                  {/* Stage Icon */}
                  <div
                    className={`
                        p-4 rounded-full mb-6 transition-colors duration-300
                        ${
                          isActive
                            ? "bg-berlin-blue text-white"
                            : "bg-gray-100 text-gray-400"
                        }
                    `}
                  >
                    {stage.icon}
                  </div>

                  <h4 className="text-xl font-bold text-industrial-900 mb-4">
                    {stage.label}
                  </h4>

                  {/* Content Switcher */}
                  <div className="relative w-full h-[120px]">
                    <AnimatePresence mode="wait">
                      {!isActive ? (
                        <motion.div
                          key="waste"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                          <div className="flex items-center gap-2 text-red-500 font-bold mb-2">
                            {stage.waste.icon}
                            <span>TRADITIONAL PAIN</span>
                          </div>
                          <p className="text-lg font-bold text-gray-800 mb-1">
                            {stage.waste.label}
                          </p>
                          <p className="text-sm text-gray-500 mb-2">
                            {stage.waste.description}
                          </p>
                          <div className="inline-block bg-red-100 text-red-700 text-xs font-bold px-2 py-1 rounded">
                            {stage.waste.value}
                          </div>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="solution"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute inset-0 flex flex-col items-center justify-center"
                        >
                          <div className="flex items-center gap-2 text-berlin-blue font-bold mb-2">
                            {stage.solution.icon}
                            <span>PIF SOLUTION</span>
                          </div>
                          <p className="text-lg font-bold text-industrial-900 mb-1">
                            {stage.solution.label}
                          </p>
                          <p className="text-sm text-gray-600 mb-2">
                            {stage.solution.description}
                          </p>
                          <div className="inline-block bg-green-100 text-green-700 text-xs font-bold px-2 py-1 rounded">
                            {stage.solution.value}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Decorative Background Flash */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-blue-50/30 pointer-events-none z-[-1]"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 text-center">
        <div className="inline-flex gap-8 text-sm font-medium text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>Traditional Waste</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-berlin-blue"></div>
            <span>PIF Optimization</span>
          </div>
        </div>
      </div>
    </div>
  );
}
