import {
  Car,
  GlassWater,
  Utensils,
  Wine,
  Beer,
  Sparkles,
  Home,
  Container,
  Pill,
  Leaf,
  Dog,
  LucideIcon,
} from "lucide-react";

export interface Market {
  slug: string;
  title: string;
  tagline: string;
  desc: string;
  icon: LucideIcon;
  image: string;
  colSpan: string;
  fullDescription: string;
  problem?: {
    title: string;
    desc: string;
  };
  solution?: {
    title: string;
    desc: string;
  };
  stat?: {
    value: string;
    label: string;
  };
  gallery: {
    title: string;
    desc: string;
    image: string;
    imagePosition?: string;
  }[];
  features: string[];
  qcImage?: string;
  qcCopy?: {
    title?: string;
    highlight?: string;
    desc?: string;
  };
  browseCategories?: {
    title: string;
    image: string;
  }[];
  reports?: {
    title: string;
    category: string;
    date: string;
    image: string;
  }[];
}

export const MARKETS_DATA: Market[] = [
  {
    slug: "automotive",
    title: "Automotive",
    tagline: "Performance under pressure.",
    desc: "Aftermarket fluids & industrial lubricants.",
    icon: Car,
    image: "/images/markets/automotive.png",
    colSpan: "md:col-span-2",
    fullDescription:
      "In the automotive world, packaging failure isn't just a mess—it's a liability. We engineer containers that withstand aggressive chemical compounds, extreme temperature fluctuations, and the rigors of global logistics.",
    problem: {
      title: "The Chemical Aggression Problem",
      desc: "Standard HDPE bottles often structurally compromise when exposed to aggressive additives in brake fluids, synthetic oils, and octane boosters. This leads to paneling (wall collapse), stress cracking, and ultimately, shelf failure.",
    },
    solution: {
      title: "The Fluorinated Architecture",
      desc: "We deploy multi-layer co-extrusion and post-mold fluorination to create an impenetrable barrier. Our heavy-wall designs resist vacuum collapse, ensuring your brand looks as powerful on the shelf as it performs in the engine.",
    },
    stat: {
      value: "0%",
      label: "Permeation Failures",
    },
    gallery: [
      {
        title: "F-Style Quarts",
        desc: "Offset neck for easy pour.",
        image: "/images/markets/automotive_quart.png",
        imagePosition: "object-top",
      },
      {
        title: "Industrial Pails",
        desc: "UN-Rated for Hazmat.",
        image: "/images/markets/automotive_pail.png",
      },
      {
        title: "Precision Spouts",
        desc: "Anti-glug ventilation.",
        image: "/images/markets/automotive_spout.png",
      },
    ],
    features: ["Fluorinated Barriers", "Anti-Glug Necks", "Tamper Evident"],
  },
  {
    slug: "beverage",
    title: "Beverage",
    tagline: "Thirst for distinction.",
    desc: "Cold brew, juices, & energy.",
    icon: GlassWater,
    image: "/images/markets/beverage.png",
    colSpan: "md:col-span-1",
    fullDescription:
      "From cold brew at -38°F to hot-fill juices at 185°F, our beverage packaging is engineered for the thermal and pressure realities of the modern cold chain. We protect flavor integrity against oxygen ingress, UV light, and carbonation loss.",
    problem: {
      title: "The Pressure Point",
      desc: "Carbonated beverages in standard PET bottles often suffer from 'creep' (expansion) and CO2 loss, leaving drinks flat and bottles deformed on the shelf.",
    },
    solution: {
      title: "Pressure-Rated Architecture",
      desc: "Our beverage-specific performs feature reinforced bases and petaloid feet designed to withstand up to 5.0 volumes of carbonation without deformation.",
    },
    stat: {
      value: "5.0",
      label: "Vol. Carbonation",
    },
    gallery: [
      {
        title: "Cold Press Square",
        desc: "HPP Compatible PET.",
        image: "/images/markets/beverage_cold_press.png",
      },
      {
        title: "Energy Sleek",
        desc: "12oz Matte Finish.",
        image: "/images/markets/beverage_energy_sleek.png",
        imagePosition: "object-top",
      },
      {
        title: "Kombucha Amber",
        desc: "UV Protection.",
        image: "/images/markets/beverage_kombucha_amber.png",
      },
    ],
    features: ["HPP Compatible", "Crystal Clear PET", "Custom shapes"],
  },
  {
    slug: "food",
    title: "Gourmet Food",
    tagline: "Flavor integrity secured.",
    desc: "Sauces, spices, & shelf-stable.",
    icon: Utensils,
    image: "/images/markets/food.png",
    colSpan: "md:col-span-1",
    fullDescription:
      "Culinary excellence requires packaging that respects the recipe. From high-heat fill environments to oxidation-sensitive sauces, our portfolio ensures your product tastes exactly as the chef intended, month after month.",
    problem: {
      title: "Thermal Shock & Oxidation",
      desc: "Standard containers deform under 180°F+ hot-fill temps, while poor oxygen barriers turn vibrant sauces brown and stale before they leave the shelf.",
    },
    solution: {
      title: "Voridian Heat-Set Technology",
      desc: "Our heat-set PET bottles mimic the thermal stability of glass, withstanding fill temperatures up to 185°F while offering multi-layer EVOH barriers to lock out oxygen.",
    },
    stat: {
      value: "185°F",
      label: "Fill Rating",
    },
    gallery: [
      {
        title: "Artisan Mason",
        desc: "Heat-Set PET Technology.",
        image: "/images/markets/food_hot_fill_jar.png",
      },
      {
        title: "Precision Mill",
        desc: "Integrated Grinder Cap.",
        image: "/images/markets/food_spice_grinder.png",
      },
      {
        title: "Barrier Squeeze",
        desc: "Multi-Layer EVOH.",
        image: "/images/markets/food_barrier_squeeze.png",
      },
    ],
    features: [
      "Hot Fill Capable",
      "EVOH Oxygen Barriers",
      "FDA 21 CFR Compliant",
    ],
  },
  {
    slug: "spirits",
    title: "Spirits",
    tagline: "Distilled distinction.",
    desc: "Premium glass for distilleries.",
    icon: Wine,
    image: "/images/markets/spirits.png",
    colSpan: "md:col-span-1",
    fullDescription:
      "In the spirits aisle, the bottle is the brand. We supply heavyweight, cosmetic-grade flint glass that communicates value before the cork is even popped. From bespoke molds to rapid-launch stock programs.",
    problem: {
      title: "The Sea of Sameness",
      desc: "Stock bottles make your premium spirit look like every other startup brand on the shelf, killing your price-point authority.",
    },
    solution: {
      title: "Tactile Brand Equity",
      desc: "We utilize custom embossing, deep punts, and heavy-weight glass distribution to give your bottle a proprietary feel at a fraction of the cost of a full custom mold.",
    },
    stat: {
      value: "1.2kg",
      label: "Base Weight",
    },
    gallery: [
      {
        title: "The Heavyweight",
        desc: "Extra Flint Glass.",
        image: "/images/markets/spirits_heavy_whiskey.png",
      },
      {
        title: "Botanical Gin",
        desc: "Cosmetic Grade Flint.",
        image: "/images/markets/spirits_botanical_gin.png",
        imagePosition: "object-top",
      },
      {
        title: "Bar-Top Closures",
        desc: "Wood, Glass, & Cork.",
        image: "/images/markets/spirits_premium_closure.png",
      },
    ],
    features: ["Heavy Weight Glass", "Custom Embossing", "Premium Corks"],
    qcImage: "/images/markets/spirits_qc.png",
  },
  {
    slug: "beer",
    title: "Craft Beer",
    tagline: "Brewed for the bold.",
    desc: "Cans & bottles for local brews.",
    icon: Beer,
    image: "/images/markets/beer.png",
    colSpan: "md:col-span-1",
    fullDescription:
      "From mobile canning runs to regional distribution, we keep the taproom flowing. Our inventory programs ensure you never miss a release date due to a shortage.",
    problem: {
      title: "The Stock Shortage",
      desc: "Spot market aluminum shortages and long lead times can cripple a brewery's release schedule, leaving tanks full and taprooms empty.",
    },
    solution: {
      title: "Strategic Allocation",
      desc: "We leverage aggregate volume to secure guaranteed production slots from top manufacturers, ensuring your cans are on the line when you need them.",
    },
    stat: {
      value: "100%",
      label: "Allocation Secured",
    },
    gallery: [
      {
        title: "16oz Sleek Cans",
        desc: "Matte Black Finish.",
        image: "/images/markets/beer_sleek_can.png",
      },
      {
        title: "Amber Longnecks",
        desc: "Deep Amber UV Protection.",
        image: "/images/markets/beer_amber_bottle.png",
        imagePosition: "object-top",
      },
      {
        title: "Snap Carriers",
        desc: "PCR Recycled Plastic.",
        image: "/images/markets/beer_paktech_carrier.png",
      },
    ],
    features: ["Standard & Sleek Cans", "Amber Glass", "Crown Caps"],
    qcImage: "/images/markets/beer_qc.png",
  },
  {
    slug: "personal-care",
    title: "Beauty & Personal Care",
    tagline: "The science of allure.",
    desc: "High-performance airless & rigid packaging.",
    icon: Sparkles,
    image: "/images/markets/beauty.png",
    colSpan: "md:col-span-2",
    fullDescription:
      "Your formula is engineered for performance; your packaging should be too. From active ingredient protection to the tactile unboxing experience, we bridge the gap between clinical efficacy and luxury shelf appeal.",
    problem: {
      title: "The Retinol Risk",
      desc: "Bio-active ingredients like Retinol, Vitamin C, and Peptides degrade rapidly when exposed to oxygen and UV light, rendering expensive formulations ineffective before they finish the bottle.",
    },
    solution: {
      title: "Clinical Preservation",
      desc: "Our medical-grade Airless Pump systems utilize a rising piston mechanism to eliminate oxygen contact, while our double-wall acrylics provide a UV sanctuary for your most sensitive serums.",
    },
    stat: {
      value: "0.2cc",
      label: "Dosage Precision",
    },
    gallery: [
      {
        title: "Airless Serum Pump",
        desc: "Medical-grade protection.",
        image: "/images/markets/personal_care_airless_xray.png",
        imagePosition: "object-center",
      },
      {
        title: "Refillable System",
        desc: "Sustainable luxury architecture.",
        image: "/images/markets/personal_care_refill.png",
      },
      {
        title: "Soft-Touch Tube",
        desc: "Velvet tactile finish.",
        image: "/images/markets/personal_care_decoration.png",
      },
    ],
    browseCategories: [
      {
        title: "Skin & Face Care",
        image: "/images/markets/personal_care_skin.png",
      },
      { title: "Hair Care", image: "/images/markets/personal_care_hair.png" },
      {
        title: "Perfume & Fragrance",
        image: "/images/markets/personal_care_perfume.png",
      },
      { title: "Deodorant", image: "/images/markets/personal_care_deo.png" },
      {
        title: "Ointment",
        image: "/images/markets/personal_care_ointment.png",
      },
      { title: "Oral Care", image: "/images/markets/personal_care_oral.png" },
      {
        title: "Solution Bottles",
        image: "/images/markets/personal_care_solution.png",
      },
      {
        title: "Tablets & Capsules",
        image: "/images/markets/personal_care_tablets.png",
      },
    ],
    features: ["Airless Technology", "Heavy-Wall PETG", "Soft-Touch Finishes"],
  },
  {
    slug: "home-care",
    title: "Home Care",
    tagline: "Clean confidence.",
    desc: "Detergents & sanitizers.",
    icon: Home,
    image: "/images/markets/home.png",
    colSpan: "md:col-span-1",
    fullDescription:
      "Clean design for cleaning products. Ranging from trigger sprayers to bulk refill containers.",
    problem: {
      title: "Trigger Fatigue",
      desc: "Cheap sprayers leak, clog, and break, frustrating users and ruining brand perception.",
    },
    solution: {
      title: "High-Output Engines",
      desc: "Our pre-compression trigger engines deliver a consistent, powerful spray pattern every time, with zero leakage.",
    },
    stat: {
      value: "10k",
      label: "Cycle Durability",
    },
    gallery: [],
    features: ["High-Output Triggers", "Child Resistant", "Sustainable Resins"],
  },
  {
    slug: "industrial",
    title: "Industrial",
    tagline: "Built to endure.",
    desc: "Drums, pails, & bulk.",
    icon: Container,
    image: "/images/markets/industrial.png",
    colSpan: "md:col-span-1",
    fullDescription:
      "Built for the toughest jobs. UN-rated containers, tight-head drums, and pails for industrial applications.",
    problem: {
      title: "Transport Failure",
      desc: "Stacking strength issues leading to collapsed pallets and hazmat spills during transport.",
    },
    solution: {
      title: "Structural Reinforcement",
      desc: "Our drums and pails feature reinforced chime bands and load-bearing ribs designed for high-stack warehousing.",
    },
    stat: {
      value: "UN",
      label: "Safety Rated",
    },
    gallery: [],
    features: ["UN Rated", "Stackable", "Hazmat Ready"],
  },
  {
    slug: "pharmaceutical",
    title: "Pharma",
    tagline: "Precision protected.",
    desc: "Safety-sealed & compliant.",
    icon: Pill,
    image: "/images/markets/pharma.png",
    colSpan: "md:col-span-1",
    fullDescription:
      "Compliance meets reliability. Pharmaceutical grade packaging with full documentation and safety features.",
    problem: {
      title: "Child Safety vs. Access",
      desc: "Packaging must be secure enough to stop a child but accessible enough for seniors.",
    },
    solution: {
      title: "Push-and-Turn Engineering",
      desc: "Our CPSC-tested closures offer the perfect balance of regulatory compliance and consumer ergonomics.",
    },
    stat: {
      value: "100%",
      label: "CPSC Compliant",
    },
    gallery: [],
    features: ["CRC Closures", "Light Protecting", "DMF Available"],
  },
  {
    slug: "cannabis",
    title: "Cannabis",
    tagline: "Elevated standards.",
    desc: "Child-resistant solutions.",
    icon: Leaf,
    image: "/images/markets/cannabis.png",
    colSpan: "md:col-span-1",
    fullDescription:
      "Secure, compliant, and stylish. Packaging solutions designed specifically for the rapidly evolving cannabis market.",
    problem: {
      title: "Odor Leaks",
      desc: "Terpene escape not only ruins product quality but creates compliance and discretion issues for consumers.",
    },
    solution: {
      title: "Hermetic Smell-Proofing",
      desc: "Multi-seal gasket technology traps odors inside, ensuring freshness and discretion.",
    },
    stat: {
      value: "Zero",
      label: "Odor Escape",
    },
    gallery: [],
    features: ["Certified CR", "Odor Proof", "Flower & Edible Ready"],
  },
  {
    slug: "pet-care",
    title: "Pet Care",
    tagline: "Freshness unleashed.",
    desc: "Treats & veterinary supplies.",
    icon: Dog,
    image: "/images/markets/pet.png",
    colSpan: "md:col-span-2",
    fullDescription:
      "Only the best for our furry friends. Durable, safe, and attractive packaging for pet food, treats, and care products.",
    problem: {
      title: "Grease Strike-Through",
      desc: "High-fat treat formulations soak through standard paper packaging, creating unsightly stains.",
    },
    solution: {
      title: "Grease-Resistant Coatings",
      desc: "We use advanced barrier coatings and multi-ply laminates to keep fats in the food and off the package.",
    },
    stat: {
      value: "MAX",
      label: "Barrier Rating",
    },
    gallery: [],
    features: ["Wide Mouth Jars", "Freshness Seals", "Durable Materials"],
  },
];
