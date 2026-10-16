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
        label: "Cosmetics",
        href: "/markets/cosmetics",
        image: "/images/markets/cosmetics_hero.png",
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
    image: "/images/shop-all/cat_bottles.png",
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
            label: "Water Bottles",
            href: "/products/bottles?search=Water Bottles",
          },
        ],
      },
      {
        label: "Wine & Spirits Bottles",
        items: [
          {
            label: "Wine Bottles",
            href: "/products/bottles?search=Wine Bottles",
          },
          {
            label: "Liquor Bottles",
            href: "/products/bottles?search=Liquor Bottles",
          },
        ],
      },
    ],
  },
  {
    id: "jars",
    label: "Jars",
    image: "/images/shop-all/cat_jars.png",
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
        items: [
          { label: "Round Jars", href: "/products/jars?shape=Round" },
          { label: "Square Jars", href: "/products/jars?search=Square Jars" },
          { label: "Mason Jars", href: "/products/jars?search=Mason Jars" },
        ],
      },
    ],
  },
  {
    id: "caps",
    label: "Caps & Closures",
    image: "/images/shop-all/cat_caps.png",
    subSections: [
      {
        label: "Types of Caps",
        items: [
          {
            label: "Continuous Thread Caps",
            href: "/products/caps?search=Continuous Thread",
          },
          {
            label: "Dropper Assemblies",
            href: "/products/caps?search=Dropper",
          },
          {
            label: "Fine Mist Sprayers",
            href: "/products/caps?search=Sprayer",
          },
          {
            label: "Treatment Pumps",
            href: "/products/caps?search=Pump",
          },
          {
            label: "Child-Resistant Caps",
            href: "/products/caps?search=Child-Resistant",
          },
          {
            label: "Dispensing Caps",
            href: "/products/caps?search=Dispensing",
          },
        ],
      },
    ],
  },
  {
    id: "tubes",
    label: "Tubes",
    image: "/images/shop-all/cat_tubes.png",
    subSections: [
      {
        label: "Popular Tube Types",
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
            label: "Deodorant Tubes",
            href: "/products/tubes?search=Deodorant Tubes",
          },
        ],
      },
    ],
  },
  {
    id: "jugs",
    label: "Jugs",
    image: "/images/shop-all/cat_jugs.png",
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
        label: "Popular Jug Styles",
        items: [
          { label: "Jerry Cans", href: "/products/jugs?search=Jerry Cans" },
          {
            label: "Plastic Carboys",
            href: "/products/jugs?search=Plastic Carboys",
          },
          {
            label: "F-Style Jugs",
            href: "/products/jugs?search=F-Style Jugs",
          },
          { label: "Growlers", href: "/products/jugs?search=Growlers" },
        ],
      },
    ],
  },
  {
    id: "vials",
    label: "Vials",
    image: "/images/shop-all/cat_vials.png",
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
    id: "buckets",
    label: "Buckets",
    image: "/images/shop-all/cat_buckets.png",
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
    ],
  },
  {
    id: "drums",
    label: "Drums",
    image: "/images/markets/ind_drums.png",
    subSections: [
      {
        label: "Materials",
        items: [
          { label: "Steel Drums", href: "/products/drums?material=Steel" },
          { label: "Plastic Drums", href: "/products/drums?material=Plastic" },
          { label: "Fiber Drums", href: "/products/drums?material=Fiber" },
        ],
      },
      {
        label: "Popular Drums",
        items: [
          { label: "55 Gallon Drums", href: "/products/drums?search=55 Gallon Drums" },
          { label: "Overpack Drums", href: "/products/drums?search=Overpack Drums" },
        ],
      },
    ],
  },
  {
    id: "hazmat",
    label: "Hazmat Packaging",
    image: "/images/shop-all/cat_hazmat.png",
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
  {
    id: "tins",
    label: "Tins",
    image: "/images/shop-all/cat_tins.png",
    subSections: [
      {
        label: "Popular Tin Styles",
        items: [
          {
            label: "Clear Top Tins",
            href: "/products/tins?search=Clear Top Tins",
          },
          { label: "Hinged Tins", href: "/products/tins?search=Hinged Tins" },
          {
            label: "Screw Top Tins",
            href: "/products/tins?search=Screw Top Tins",
          },
          {
            label: "Slip Cover Tins",
            href: "/products/tins?search=Slip Cover Tins",
          },
        ],
      },
    ],
  },
  {
    id: "cans",
    label: "Cans",
    image: "/images/shop-all/cat_cans.png",
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
    ],
  },
  {
    id: "tubs",
    label: "Tubs",
    image: "/images/shop-all/cat_tubs.png",
    subSections: [
      {
        label: "Popular Tubs",
        items: [
          {
            label: "Ice Cream Tubs",
            href: "/products/tubs?search=Ice Cream Tubs",
          },
          { label: "Butter Tubs", href: "/products/tubs?search=Butter Tubs" },
          {
            label: "Food Grade Tubs",
            href: "/products/tubs?search=Food Grade Tubs",
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
    id: "bottling-tools",
    label: "Bottling Tools",
    image: "/images/shop-all/cat_bottling_tools.png",
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
];

