export interface NavigationItem {
  label: string;
  href: string;
  image?: string; // Optional image path for desktop grid
}

export interface NavigationSubSection {
  label: string; // e.g. "Popular Jars", "Material"
  items: NavigationItem[];
}

export interface NavigationCategory {
  id: string; // unique id for active state logic
  label: string; // Display name "Jars"
  image?: string; // For Shop All grid
  subSections?: NavigationSubSection[]; // For nested lists (accordions/groups)
  flatItems?: NavigationItem[]; // For simple lists without groups
}

export const SHOP_NAVIGATION: NavigationCategory[] = [
  {
    id: "market",
    label: "Shop by Market",
    flatItems: [
      {
        label: "Automotive",
        href: "/markets/automotive",
        image: "/images/markets/automotive.png",
      },
      {
        label: "Food",
        href: "/markets/food",
        image: "/images/markets/food.png",
      },
      {
        label: "Pet Care & Veterinary",
        href: "/markets/pet-care",
        image: "/images/markets/pet.png",
      },
      {
        label: "Beer",
        href: "/markets/beer",
        image: "/images/markets/beer.png",
      },
      {
        label: "Home Care",
        href: "/markets/home-care",
        image: "/images/markets/home.png",
      },
      {
        label: "Pharma, Nutraceutical & Healthcare",
        href: "/markets/pharmaceutical",
        image: "/images/markets/pharma.png",
      },
      {
        label: "Beverage",
        href: "/markets/beverage",
        image: "/images/markets/beverage.png",
      },
      {
        label: "Industrial Chemical",
        href: "/markets/industrial",
        image: "/images/markets/industrial.png",
      },
      {
        label: "Spirits",
        href: "/markets/spirits",
        image: "/images/markets/spirits.png",
      },

      {
        label: "Personal Health & Beauty",
        href: "/markets/personal-care",
        image: "/images/markets/beauty.png",
      },
      {
        label: "Wine",
        href: "/markets/wine",
        image:
          "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?q=80&w=2670&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "function",
    label: "Shop by Function",
    flatItems: [
      {
        label: "Child-Resistant Solutions",
        href: "/products?function=Child-Resistant Solutions",
      },
      {
        label: "Leak-Resistant Design",
        href: "/products?function=Leak-Resistant Design",
      },
      {
        label: "Tamper-Evident Features",
        href: "/products?function=Tamper-Evident Features",
      },
      {
        label: "E-Commerce Ready",
        href: "/products?function=E-Commerce Ready",
      },
      {
        label: "Sustainable Options",
        href: "/products?function=Sustainable Options",
      },
    ],
  },
  {
    id: "bottles",
    label: "Bottles",
    image:
      "https://images.unsplash.com/photo-1602143407151-11115cd20ad4?q=80&w=2670&auto=format&fit=crop",
    subSections: [
      {
        label: "Material",
        items: [
          {
            label: "Aluminum Bottles",
            href: "/products/bottles?material=Aluminum",
          },
          {
            label: "Glass Bottles",
            href: "/products/bottles?material=Glass",
          },
          {
            label: "PET Bottles",
            href: "/products/bottles?material=PET",
          },
          {
            label: "Plastic Bottles",
            href: "/products/bottles?material=Plastic",
          },
          {
            label: "HDPE Bottles",
            href: "/products/bottles?material=HDPE",
          },
        ],
      },
      {
        label: "Popular Bottle Colors",
        items: [
          {
            label: "Amber Bottles",
            href: "/products/bottles?color=Amber",
          },
          {
            label: "Black Bottles",
            href: "/products/bottles?color=Black",
          },
          {
            label: "Blue Bottles",
            href: "/products/bottles?color=Blue",
          },
          {
            label: "Clear Bottles",
            href: "/products/bottles?color=Clear",
          },
          {
            label: "Green Bottles",
            href: "/products/bottles?color=Green",
          },
          {
            label: "White Bottles",
            href: "/products/bottles?color=White",
          },
        ],
      },
      {
        label: "Shop Popular Bottles",
        items: [
          {
            label: "Boston Round Bottles",
            href: "/products/bottles?style=Boston Round",
          },
          {
            label: "Decanter Bottles",
            href: "/products/bottles?style=Decanter",
          },
          {
            label: "Squeeze Bottles",
            href: "/products/bottles?style=Squeeze",
          },
          {
            label: "Bullet Bottles",
            href: "/products/bottles?style=Bullet",
          },
          {
            label: "Cylinder Bottles",
            href: "/products/bottles?style=Cylinder",
          },
        ],
      },
      {
        label: "Beverage Bottles",
        items: [
          {
            label: "Juice Bottles",
            href: "/products/bottles?search=Juice Bottles",
          },
          {
            label: "Milk Bottles",
            href: "/products/bottles?search=Milk Bottles",
          },
          {
            label: "Water Bottles",
            href: "/products/bottles?search=Water Bottles",
          },
        ],
      },
      {
        label: "Wine, Beer & Spirit Bottles",
        items: [
          {
            label: "Wine Bottles",
            href: "/products/bottles?search=Wine Bottles",
          },
          {
            label: "Beer Bottles",
            href: "/products/bottles?search=Beer Bottles",
          },
          {
            label: "Liquor Bottles",
            href: "/products/bottles?search=Liquor Bottles",
          },
        ],
      },
      {
        label: "Food Bottles",
        items: [
          {
            label: "Honey Bottles",
            href: "/products/bottles?search=Honey Bottles",
          },
          {
            label: "Sauce Bottles",
            href: "/products/bottles?search=Sauce Bottles",
          },
          {
            label: "Oil Bottles",
            href: "/products/bottles?search=Oil Bottles",
          },
          {
            label: "Plastic Food Bottles",
            href: "/products/bottles?search=Plastic Food Bottles",
          },
        ],
      },
      {
        label: "Health & Beauty Bottles",
        items: [
          {
            label: "Essential Oils & Aromatherapy Bottles",
            href: "/products/bottles?search=Essential Oils & Aromatherapy Bottles",
          },
          {
            label: "Perfume Bottles",
            href: "/products/bottles?search=Perfume Bottles",
          },
          {
            label: "Liquid Soap & Lotion Bottles",
            href: "/products/bottles?search=Liquid Soap & Lotion Bottles",
          },
        ],
      },
      {
        label: "Pharmaceutical & Healthcare",
        items: [
          {
            label: "Dropper Bottles",
            href: "/products/bottles?search=Dropper Bottles",
          },
          {
            label: "Pill & Vitamin Bottles",
            href: "/products/bottles?search=Pill & Vitamin Bottles",
          },
          {
            label: "Ointment Bottles",
            href: "/products/bottles?search=Ointment Bottles",
          },
        ],
      },
      {
        label: "Industrial & Chemical Bottles",
        items: [
          {
            label: "Bettix Bottles",
            href: "/products/bottles?search=Bettix Bottles",
          },
          {
            label: "Oil & Lubricant Bottles",
            href: "/products/bottles?search=Oil & Lubricant Bottles",
          },
          {
            label: "Leak Proof Bottles",
            href: "/products/bottles?search=Leak Proof Bottles",
          },
        ],
      },
    ],
  },
  {
    id: "jars",
    label: "Jars",
    image:
      "https://images.unsplash.com/photo-1622325377508-3165b6a7885b?q=80&w=2670&auto=format&fit=crop",
    subSections: [
      {
        label: "Material",
        items: [
          { label: "Glass Jars", href: "/products/jars?material=Glass" },
          { label: "Plastic Jars", href: "/products/jars?material=Plastic" },
          { label: "PET Jars", href: "/products/jars?material=PET" },
          { label: "HDPE Jars", href: "/products/jars?material=HDPE" },
        ],
      },
      {
        label: "Popular Colors",
        items: [
          { label: "Amber Jars", href: "/products/jars?color=Amber" },
          { label: "Blue Jars", href: "/products/jars?color=Blue" },
          { label: "Green Jars", href: "/products/jars?color=Green" },
          { label: "Clear Jars", href: "/products/jars?color=Clear" },
          { label: "Black Jars", href: "/products/jars?color=Black" },
        ],
      },
      {
        label: "Popular Jar Shapes",
        items: [{ label: "Round Jars", href: "/products/jars?shape=Round" }],
      },
      {
        label: "Shop Popular Jars",
        items: [
          { label: "Mason Jars", href: "/products/jars?search=Mason Jars" },
          { label: "Kilner Jars", href: "/products/jars?search=Kilner Jars" },
          { label: "Square Jars", href: "/products/jars?search=Square Jars" },
          {
            label: "Gripper Jars",
            href: "/products/jars?search=Gripper Jars",
          },
        ],
      },
      {
        label: "Food",
        items: [
          {
            label: "Jelly & Jam Jars",
            href: "/products/jars?search=Jelly & Jam Jars",
          },
          { label: "Spice Jars", href: "/products/jars?search=Spice Jars" },
          { label: "Honey Jars", href: "/products/jars?search=Honey Jars" },
          { label: "Pickle Jars", href: "/products/jars?search=Pickle Jars" },
          { label: "Salsa Jars", href: "/products/jars?search=Salsa Jars" },
          {
            label: "Spaghetti Jars",
            href: "/products/jars?search=Spaghetti Jars",
          },
        ],
      },
      {
        label: "Health & Beauty Jars",
        items: [
          {
            label: "Bath Salt & Body Scrub Jars",
            href: "/products/jars?search=Bath Salt & Body Scrub Jars",
          },
          {
            label: "Cosmetic Jars",
            href: "/products/jars?search=Cosmetic Jars",
          },
        ],
      },
      {
        label: "More Jars",
        items: [
          {
            label: "Lab & Science Jars",
            href: "/products/jars?search=Lab & Science Jars",
          },
          {
            label: "Pharmacy Jars",
            href: "/products/jars?search=Pharmacy Jars",
          },
          {
            label: "Marijuana Jars",
            href: "/products/jars?search=Marijuana Jars",
          },
        ],
      },
    ],
  },
  {
    id: "jugs",
    label: "Jugs",
    image:
      "https://images.unsplash.com/photo-1615486511484-92e172cc416d?q=80&w=2670&auto=format&fit=crop",
    subSections: [
      {
        label: "Material",
        items: [
          { label: "Glass Jugs", href: "/products/jugs?material=Glass" },
          { label: "Plastic Jugs", href: "/products/jugs?material=Plastic" },
        ],
      },
      {
        label: "Shop Jugs by Color",
        items: [
          { label: "White Jugs", href: "/products/jugs?color=White" },
          { label: "Black Jugs", href: "/products/jugs?color=Black" },
          { label: "Clear Jugs", href: "/products/jugs?color=Clear" },
          { label: "Natural Jugs", href: "/products/jugs?color=Natural" },
        ],
      },
      {
        label: "Utility Jugs",
        items: [
          { label: "Jerry Cans", href: "/products/jugs?search=Jerry Cans" },
          {
            label: "Plastic Carboys",
            href: "/products/jugs?search=Plastic Carboys",
          },
          {
            label: "Cleaners & Solvent Jugs",
            href: "/products/jugs?search=Cleaners & Solvent Jugs",
          },
          {
            label: "F-Style Jugs",
            href: "/products/jugs?search=F-Style Jugs",
          },
          {
            label: "Jugs with Caps",
            href: "/products/jugs?search=Jugs with Caps",
          },
        ],
      },
      {
        label: "Beverage Jugs",
        items: [
          { label: "Growlers", href: "/products/jugs?search=Growlers" },
          { label: "Juice Jugs", href: "/products/jugs?search=Juice Jugs" },
          { label: "Milk Jugs", href: "/products/jugs?search=Milk Jugs" },
        ],
      },
    ],
  },
  {
    id: "vials",
    label: "Vials",
    image:
      "https://images.unsplash.com/photo-1542315832-b7b134d1bc95?q=80&w=2670&auto=format&fit=crop",
    subSections: [
      {
        label: "Popular Vials",
        items: [
          { label: "Glass Vials", href: "/products/vials?search=Glass Vials" },
          {
            label: "Plastic Vials",
            href: "/products/vials?search=Plastic Vials",
          },
          {
            label: "Screw Cap Vials",
            href: "/products/vials?search=Screw Cap Vials",
          },
          {
            label: "Perfume Vials",
            href: "/products/vials?search=Perfume Vials",
          },
          {
            label: "Rollerball Vials",
            href: "/products/vials?search=Rollerball Vials",
          },
        ],
      },
      {
        label: "Popular Colors",
        items: [
          {
            label: "Amber Glass Vials",
            href: "/products/vials?color=Amber Glass",
          },
          {
            label: "Blue Glass Vials",
            href: "/products/vials?color=Blue Glass",
          },
          {
            label: "Clear Glass Vials",
            href: "/products/vials?color=Clear Glass",
          },
          {
            label: "Green Glass Vials",
            href: "/products/vials?color=Green Glass",
          },
          {
            label: "Clear Plastic Vials",
            href: "/products/vials?color=Clear Plastic",
          },
        ],
      },
    ],
  },
  {
    id: "cans",
    label: "Cans & Tins",
    image:
      "https://images.unsplash.com/photo-1579295325983-4a11b66fe853?q=80&w=2670&auto=format&fit=crop",
    subSections: [
      {
        label: "Popular Cans",
        items: [
          { label: "Paint Cans", href: "/products/cans?search=Paint Cans" },
          {
            label: "Industrial Cans",
            href: "/products/cans?search=Industrial Cans",
          },
          {
            label: "Open Top Cans",
            href: "/products/cans?search=Open Top Cans",
          },
          {
            label: "Coin Collection Cans",
            href: "/products/cans?search=Coin Collection Cans",
          },
          { label: "Safety Cans", href: "/products/cans?search=Safety Cans" },
          {
            label: "Stock Aluminum Cans",
            href: "/products/cans?search=Stock Aluminum Cans",
          },
          {
            label: "Special Order Aluminum Cans",
            href: "/products/cans?search=Special Order Aluminum Cans",
          },
        ],
      },
      {
        label: "Novelty Tins",
        items: [
          {
            label: "Popcorn Tins",
            href: "/products/cans?search=Popcorn Tins",
          },
        ],
      },
      {
        label: "Seamless Tins",
        items: [
          {
            label: "Clear Top Tins",
            href: "/products/cans?search=Clear Top Tins",
          },
          { label: "Hinged Tins", href: "/products/cans?search=Hinged Tins" },
          {
            label: "Screw Top Tins",
            href: "/products/cans?search=Screw Top Tins",
          },
          {
            label: "Slip Cover Tins",
            href: "/products/cans?search=Slip Cover Tins",
          },
        ],
      },
    ],
  },
  {
    id: "tubs",
    label: "Tubs",
    image:
      "https://images.unsplash.com/photo-1595246140625-573b715d11dc?q=80&w=2670&auto=format&fit=crop",
    subSections: [
      {
        label: "Popular Tubs",
        items: [
          {
            label: "Ice Cream Tubs",
            href: "/products/tubs?search=Ice Cream Tubs",
          },
          { label: "Butter Tubs", href: "/products/tubs?search=Butter Tubs" },
          { label: "Yogurt Tubs", href: "/products/tubs?search=Yogurt Tubs" },
          {
            label: "Food Grade Tubs",
            href: "/products/tubs?search=Food Grade Tubs",
          },
          {
            label: "Takeout Containers",
            href: "/products/tubs?search=Takeout Containers",
          },
          {
            label: "Deli Containers",
            href: "/products/tubs?search=Deli Containers",
          },
        ],
      },
    ],
  },
  {
    id: "buckets",
    label: "Buckets & Drums",
    image:
      "https://images.unsplash.com/photo-1563220464-9646452243f7?q=80&w=2574&auto=format&fit=crop",
    subSections: [
      {
        label: "Material",
        items: [
          {
            label: "Plastic Buckets",
            href: "/products/buckets?material=Plastic Buckets",
          },
          {
            label: "Steel Buckets",
            href: "/products/buckets?material=Steel Buckets",
          },
        ],
      },
      {
        label: "Popular Buckets",
        items: [
          {
            label: "5 Gallon Buckets",
            href: "/products/buckets?search=5 Gallon Buckets",
          },
          {
            label: "Carboys & Jerry Cans",
            href: "/products/buckets?search=Carboys & Jerry Cans",
          },
          {
            label: "Bucket & Pail Accessories",
            href: "/products/buckets?search=Bucket & Pail Accessories",
          },
        ],
      },
      {
        label: "Material",
        items: [
          {
            label: "Fiber Drums",
            href: "/products/buckets?material=Fiber Drums",
          },
          {
            label: "Plastic Drums",
            href: "/products/buckets?material=Plastic Drums",
          },
          {
            label: "Stainless Steel Drums",
            href: "/products/buckets?material=Stainless Steel Drums",
          },
          {
            label: "Steel Barrels",
            href: "/products/buckets?material=Steel Barrels",
          },
        ],
      },
      {
        label: "Popular Drums",
        items: [
          {
            label: "55 Gallon Drums",
            href: "/products/buckets?search=55 Gallon Drums",
          },
          {
            label: "Overpack Drums",
            href: "/products/buckets?search=Overpack Drums",
          },
        ],
      },
      {
        label: "Drum & Barrel Accessories",
        items: [
          {
            label: "Drum Faucets & Spouts",
            href: "/products/buckets?search=Drum Faucets & Spouts",
          },
          {
            label: "Drum Funnels",
            href: "/products/buckets?search=Drum Funnels",
          },
          {
            label: "Drum Liners",
            href: "/products/buckets?search=Drum Liners",
          },
          {
            label: "Drum Plugs & Closures",
            href: "/products/buckets?search=Drum Plugs & Closures",
          },
          {
            label: "Drum Pumps",
            href: "/products/buckets?search=Drum Pumps",
          },
        ],
      },
    ],
  },
  {
    id: "tubes",
    label: "Tubes",
    image:
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=2574&auto=format&fit=crop",
    subSections: [
      {
        label: "Health & Beauty Tubes",
        items: [
          {
            label: "Lip Balm Tubes",
            href: "/products/tubes?search=Lip Balm Tubes",
          },
          {
            label: "Mascara Tubes",
            href: "/products/tubes?search=Mascara Tubes",
          },
          {
            label: "Sunscreen & Lotion Tubes",
            href: "/products/tubes?search=Sunscreen & Lotion Tubes",
          },
          {
            label: "Deodorant Tubes",
            href: "/products/tubes?search=Deodorant Tubes",
          },
        ],
      },
      {
        label: "Popular",
        items: [
          {
            label: "Grease Cartridges",
            href: "/products/tubes?search=Grease Cartridges",
          },
        ],
      },
    ],
  },
  {
    id: "caps",
    label: "Caps & Closures",
    image:
      "https://images.unsplash.com/photo-1602867055041-9aee9cc5ea9e?q=80&w=2670&auto=format&fit=crop",
    subSections: [
      {
        label: "Popular Caps & Closures",
        items: [
          {
            label: "Beer Bottle Caps",
            href: "/products/caps?search=Beer Bottle Caps",
          },
          {
            label: "Dropper Caps",
            href: "/products/caps?search=Dropper Caps",
          },
          {
            label: "Dropper Fitments",
            href: "/products/caps?search=Dropper Fitments",
          },
          {
            label: "Spice & Sifter Caps",
            href: "/products/caps?search=Spice & Sifter Caps",
          },
          {
            label: "Bottle Pourer Caps",
            href: "/products/caps?search=Bottle Pourer Caps",
          },
          {
            label: "Flip Top Caps",
            href: "/products/caps?search=Flip Top Caps",
          },
          { label: "Spout Caps", href: "/products/caps?search=Spout Caps" },
          {
            label: "Brush & Dauber Caps",
            href: "/products/caps?search=Brush & Dauber Caps",
          },
          { label: "Mister Caps", href: "/products/caps?search=Mister Caps" },
          {
            label: "Tamper-Evident Caps",
            href: "/products/caps?search=Tamper-Evident Caps",
          },
          {
            label: "Child-Resistant Capable Caps",
            href: "/products/caps?search=Child-Resistant Capable Caps",
          },
          {
            label: "Orifice Reducers",
            href: "/products/caps?search=Orifice Reducers",
          },
          {
            label: "Threaded & Lug Caps",
            href: "/products/caps?search=Threaded & Lug Caps",
          },
          {
            label: "Corks & Stoppers",
            href: "/products/caps?search=Corks & Stoppers",
          },
          { label: "Pump Caps", href: "/products/caps?search=Pump Caps" },
          {
            label: "Trigger Sprayers",
            href: "/products/caps?search=Trigger Sprayers",
          },
          { label: "Disc Caps", href: "/products/caps?search=Disc Caps" },
          {
            label: "Shrink Bands & Cap Liners",
            href: "/products/caps?search=Shrink Bands & Cap Liners",
          },
          {
            label: "Closures for Industrial Cans",
            href: "/products/caps?search=Closures for Industrial Cans",
          },
        ],
      },
    ],
  },
  {
    id: "bottling-tools",
    label: "Bottling Tools",
    image:
      "https://images.unsplash.com/photo-1582806742013-43f657c6d66e?q=80&w=2670&auto=format&fit=crop",
    subSections: [
      {
        label: "Popular Bottling Tools",
        items: [
          {
            label: "Measuring Containers",
            href: "/products/bottling-tools?search=Measuring Containers",
          },
          {
            label: "Bottle Funnels",
            href: "/products/bottling-tools?search=Bottle Funnels",
          },
          {
            label: "Can Sealers",
            href: "/products/bottling-tools?search=Can Sealers",
          },
          {
            label: "Capping Tools",
            href: "/products/bottling-tools?search=Capping Tools",
          },
          {
            label: "Bottling Labels & Labeling Machines",
            href: "/products/bottling-tools?search=Bottling Labels & Labeling Machines",
          },
        ],
      },
    ],
  },
  {
    id: "boxes",
    label: "Boxes, Bags & Supplies",
    image:
      "https://images.unsplash.com/photo-1510511459019-5dda7724fd87?q=80&w=2670&auto=format&fit=crop",
    subSections: [
      {
        label: "Popular Boxes",
        items: [
          {
            label: "Shipping Boxes",
            href: "/products/boxes?search=Shipping Boxes",
          },
          {
            label: "Cardboard Storage Boxes",
            href: "/products/boxes?search=Cardboard Storage Boxes",
          },
          { label: "Mailers", href: "/products/boxes?search=Mailers" },
          {
            label: "Shipping Supplies",
            href: "/products/boxes?search=Shipping Supplies",
          },
          { label: "Labels", href: "/products/boxes?search=Labels" },
        ],
      },
      {
        label: "Popular Bags",
        items: [
          { label: "Poly Bags", href: "/products/boxes?search=Poly Bags" },
          {
            label: "Resealable Poly Bags",
            href: "/products/boxes?search=Resealable Poly Bags",
          },
          { label: "Custom Bags", href: "/products/boxes?search=Custom Bags" },
        ],
      },
    ],
  },
  {
    id: "hazmat",
    label: "Hazmat Packaging",
    image:
      "https://images.unsplash.com/photo-1617953141905-b27fb1f79eb9?q=80&w=2670&auto=format&fit=crop",
    subSections: [
      {
        label: "Popular Hazmat Packaging",
        items: [
          {
            label: "UN Rated Bottles",
            href: "/products/hazmat?search=UN Rated Bottles",
          },
          {
            label: "UN Rated Buckets",
            href: "/products/hazmat?search=UN Rated Buckets",
          },
          {
            label: "UN Rated Drums",
            href: "/products/hazmat?search=UN Rated Drums",
          },
          {
            label: "UN Rated Jerrycans & Kegs",
            href: "/products/hazmat?search=UN Rated Jerrycans & Kegs",
          },
        ],
      },
    ],
  },
];
