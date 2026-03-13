import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  query,
  where,
  writeBatch,
  serverTimestamp,
  doc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "dummy",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "dummy",
  projectId:
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "packaging-catalog-demo",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 1. The 10 Unique New Lip Balm Products
const NEW_LIP_BALM_PRODUCTS = [
  {
    name: "0.5oz Silver Aluminum Lip Balm Tin",
    sku: "TIN-ALU-0.5",
    brand: "Berlin Cosmetics",
    categories: ["Lip Balm & Lip Gloss Containers"],
    industry: ["Cosmetics", "Personal Health & Beauty"],
    material: "Aluminum",
    color: "Silver",
    shape: "Round",
    dimensions: {
      height: "0.6 in",
      diameter: "1.5 in",
    },
    capacity: {
      value: 0.5,
      unit: "oz",
    },
    closure: {
      type: "Solid Lid",
      color: "Silver",
      liner: "Unlined",
    },
    caseQty: 500,
    palletQty: 25000,
    isClosure: false,
    labelPanel: {
      dimensions: "1 in D",
      shape: "Round",
    },
    description:
      "Sleek, lightweight silver aluminum tin perfect for poured solid lip balms, salves, or solid perfumes.",
    features: [
      "Lightweight aluminum",
      "Rust resistant",
      "Seamless construction",
    ],
    imageUrl: "/images/lip_balm_tin_01.png",
  },
  {
    name: "0.15oz Standard White Lip Tube",
    sku: "TUBE-WHT-0.15",
    brand: "Berlin Cosmetics",
    categories: ["Lip Balm & Lip Gloss Containers"],
    industry: ["Cosmetics", "Personal Health & Beauty"],
    material: "Polypropylene",
    color: "White",
    shape: "Cylinder",
    dimensions: {
      height: "2.6 in",
      diameter: "0.6 in",
    },
    capacity: {
      value: 0.15,
      unit: "oz",
    },
    closure: {
      type: "Cap",
      color: "White",
      liner: "Unlined",
    },
    caseQty: 1000,
    palletQty: 50000,
    isClosure: false,
    labelPanel: {
      dimensions: "1.75 in x 1.75 in",
      shape: "Wrap Around",
    },
    description:
      "Classic white twist-up tube, the industry standard for SPF, medicated, or flavored lip balms.",
    features: ["Ribbed turning wheel", "Snap-fit cap", "BPA-Free PR plastic"],
    imageUrl: "/images/lip_balm_tube_02.png",
  },
  {
    name: "0.15oz Matte Black Lip Tube",
    sku: "TUBE-BLK-0.15",
    brand: "Berlin Cosmetics",
    categories: ["Lip Balm & Lip Gloss Containers"],
    industry: ["Cosmetics", "Personal Health & Beauty"],
    material: "Polypropylene",
    color: "Black",
    shape: "Cylinder",
    dimensions: {
      height: "2.6 in",
      diameter: "0.6 in",
    },
    capacity: {
      value: 0.15,
      unit: "oz",
    },
    closure: {
      type: "Cap",
      color: "Black",
      liner: "Unlined",
    },
    caseQty: 1000,
    palletQty: 50000,
    isClosure: false,
    labelPanel: {
      dimensions: "1.75 in x 1.75 in",
      shape: "Wrap Around",
    },
    description:
      "Modern matte black twist-up tube for premium or men's lip care lines.",
    features: [
      "Matte soft-touch feel",
      "Ribbed turning wheel",
      "Opaque UV protection",
    ],
    imageUrl: "/images/lip_balm_black_tube_03.png",
  },
  {
    name: "10ml Matte Pink Squeeze Tube",
    sku: "TUBE-SQZ-PNK-10",
    brand: "Berlin Cosmetics",
    categories: ["Lip Balm & Lip Gloss Containers"],
    industry: ["Cosmetics", "Personal Health & Beauty"],
    material: "LDPE",
    color: "Pink",
    shape: "Squeeze Tube",
    dimensions: {
      height: "3.2 in",
      diameter: "0.75 in",
    },
    capacity: {
      value: 10,
      unit: "ml",
    },
    closure: {
      type: "Slant Tip Applicator",
      color: "Pink",
      liner: "Unlined",
    },
    caseQty: 800,
    palletQty: 40000,
    isClosure: false,
    labelPanel: {
      dimensions: "2 in x 1.5 in",
      shape: "Wrap Around",
    },
    description:
      "Soft touch 10ml squeeze tube perfectly shaded in blush pink. Angled tip provides smooth lip gloss application.",
    features: ["Soft LDPE squeeze", "Angled spreading tip", "Matte finish"],
    imageUrl: "/images/lip_gloss_squeeze_pink_04.png",
  },
  {
    name: "10ml Clear Glass Roll-on",
    sku: "ROLL-GLS-10",
    brand: "Berlin Cosmetics",
    categories: ["Lip Balm & Lip Gloss Containers"],
    industry: ["Cosmetics", "Personal Health & Beauty"],
    material: "Glass",
    color: "Clear",
    shape: "Cylinder",
    dimensions: {
      height: "3.4 in",
      diameter: "0.8 in",
    },
    capacity: {
      value: 10,
      unit: "ml",
    },
    closure: {
      type: "Rollerball",
      color: "Black Cap",
      liner: "Unlined",
    },
    caseQty: 500,
    palletQty: 25000,
    isClosure: false,
    labelPanel: {
      dimensions: "1.5 x 2 in",
      shape: "Wrap Around",
    },
    description:
      "Thick walled pure clear glass roll-on bottle with stainless steel or glass rollerball insert for premium lip oils.",
    features: [
      "Thick glass base",
      "Tall aesthetic",
      "Leak proof roller insert",
    ],
    imageUrl: "/images/lip_roll_on_glass_05.png",
  },
  {
    name: "10ml Frosted Glass Roll-on",
    sku: "ROLL-GLS-FRST-10",
    brand: "Berlin Cosmetics",
    categories: ["Lip Balm & Lip Gloss Containers"],
    industry: ["Cosmetics", "Personal Health & Beauty"],
    material: "Glass",
    color: "Frosted",
    shape: "Cylinder",
    dimensions: {
      height: "3.4 in",
      diameter: "0.8 in",
    },
    capacity: {
      value: 10,
      unit: "ml",
    },
    closure: {
      type: "Rollerball",
      color: "Silver Cap",
      liner: "Unlined",
    },
    caseQty: 500,
    palletQty: 25000,
    isClosure: false,
    labelPanel: {
      dimensions: "1.5 x 2 in",
      shape: "Wrap Around",
    },
    description:
      "Elegant frosted glass rollerball bottle paired with a shiny silver cap for high-end serums or lip tinctures.",
    features: [
      "Frosted semi-opaque finish",
      "Silver aluminized cap",
      "Stainless rollerball",
    ],
    imageUrl: "/images/lip_roll_on_frosted_06.png",
  },
  {
    name: "5g Clear Acrylic Pot",
    sku: "JAR-ACR-05",
    brand: "Berlin Cosmetics",
    categories: ["Lip Balm & Lip Gloss Containers"],
    industry: ["Cosmetics", "Personal Health & Beauty"],
    material: "Acrylic",
    color: "Clear",
    shape: "Round",
    dimensions: {
      height: "0.8 in",
      diameter: "1.2 in",
    },
    capacity: {
      value: 5,
      unit: "ml",
    },
    closure: {
      type: "Screw Cap",
      color: "Black",
      liner: "F217",
    },
    caseQty: 1000,
    palletQty: 48000,
    isClosure: false,
    labelPanel: {
      dimensions: "0.8 in D",
      shape: "Round",
    },
    description:
      "Small 5-gram thick-walled acrylic pot with a jet black lid. Excellent for premium lip scrubs or luxury solid balms.",
    features: [
      "Thick premium wall",
      "High clarity acrylic",
      "Tight seal screw cap",
    ],
    imageUrl: "/images/lip_balm_jar_clear_07.png",
  },
  {
    name: "15ml Frosted Oval Squeeze Tube",
    sku: "TUBE-SQZ-FRST-15",
    brand: "Berlin Cosmetics",
    categories: ["Lip Balm & Lip Gloss Containers"],
    industry: ["Cosmetics", "Personal Health & Beauty"],
    material: "LDPE",
    color: "Frosted",
    shape: "Oval Squeeze Tube",
    dimensions: {
      height: "3.8 in",
      diameter: "1.0 in",
    },
    capacity: {
      value: 15,
      unit: "ml",
    },
    closure: {
      type: "Slant Tip Applicator",
      color: "Clear",
      liner: "Unlined",
    },
    caseQty: 750,
    palletQty: 30000,
    isClosure: false,
    labelPanel: {
      dimensions: "2.5 in x 1.5 in",
      shape: "Wrap Around",
    },
    description:
      "Slightly larger 15ml frosted squeeze tube highlighting the product color inside while offering a soft, velvety touch.",
    features: ["Frosted translucency", "Angled applicator tip", "Oval profile"],
    imageUrl: "/images/lip_gloss_squeeze_frosted_08.png",
  },
  {
    name: "0.15oz Bamboo Twist Tube",
    sku: "TUBE-BAM-0.15",
    brand: "Berlin Cosmetics",
    categories: ["Lip Balm & Lip Gloss Containers"],
    industry: ["Cosmetics", "Personal Health & Beauty"],
    material: "Bamboo / PP",
    color: "Natural Wood",
    shape: "Cylinder",
    dimensions: {
      height: "2.8 in",
      diameter: "0.7 in",
    },
    capacity: {
      value: 0.15,
      unit: "oz",
    },
    closure: {
      type: "Cap",
      color: "Bamboo",
      liner: "Unlined",
    },
    caseQty: 500,
    palletQty: 20000,
    isClosure: false,
    labelPanel: {
      dimensions: "1.5 in x 1.5 in",
      shape: "Wrap Around",
    },
    description:
      "Eco-friendly natural bamboo casing around a standard inner PP lip balm mechanism. Highly sustainable aesthetic.",
    features: [
      "Real bamboo casing",
      "Sustainable packaging look",
      "Interior PP safety sleeve",
    ],
    imageUrl: "/images/lip_balm_bamboo_09.png",
  },
  {
    name: "Dual Ended Clear Wand Tube",
    sku: "WAND-DUAL-CLR-10",
    brand: "Berlin Cosmetics",
    categories: ["Lip Balm & Lip Gloss Containers"],
    industry: ["Cosmetics", "Personal Health & Beauty"],
    material: "PETG",
    color: "Clear",
    shape: "Cylinder",
    dimensions: {
      height: "5.0 in",
      diameter: "0.6 in",
    },
    capacity: {
      value: 10,
      unit: "ml",
    },
    closure: {
      type: "Doe Foot Wand",
      color: "Silver Center",
      liner: "Wiper",
    },
    caseQty: 400,
    palletQty: 18000,
    isClosure: false,
    labelPanel: {
      dimensions: "1.5 in x 1 in",
      shape: "Wrap Around (Per Side)",
    },
    description:
      "Premium dual-ended clear PETG wand tube connected by a sleek silver center band. Perfect for dual colors or gloss/plumper combos.",
    features: [
      "Two separate 5ml reservoirs",
      "Soft doe foot applicators",
      "Center silver grip",
    ],
    imageUrl: "/images/lip_gloss_dual_wand_10.png",
  },
];

const seedLipBalms = async () => {
  try {
    console.log("Starting Lip Balm Seeding Script with Admin SDK...");
    const productsRef = collection(db, "products");

    // --- A. Query and Update the 16 Overlapping Eyeshadow Containers ---
    const q = query(
      productsRef,
      where("categories", "array-contains", "Eyeshadow Containers"),
    );
    const snapshot = await getDocs(q);

    let overlapCount = 0;
    const batch = writeBatch(db);

    snapshot.docs.forEach((docSnap) => {
      const data = docSnap.data();
      overlapCount++;
      const currentCategories: string[] = data.categories || [];
      if (!currentCategories.includes("Lip Balm & Lip Gloss Containers")) {
        currentCategories.push("Lip Balm & Lip Gloss Containers");
        batch.update(docSnap.ref, { categories: currentCategories });
      }
    });

    if (overlapCount > 0) {
      console.log(
        `Found ${overlapCount} existing Eyeshadow products. Appending Lip Balm category...`,
      );
      await batch.commit();
      console.log("✅ Successfully updated overlapping products.");
    } else {
      console.log("⚠️ No overlapping Eyeshadow products found.");
    }

    // --- B. Insert the 10 New Lip Balm Products ---
    console.log(
      `Inserting ${NEW_LIP_BALM_PRODUCTS.length} new Lip Balm specific containers...`,
    );
    const newBatch = writeBatch(db);

    NEW_LIP_BALM_PRODUCTS.forEach((product) => {
      const slug = product.sku.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const docRef = doc(productsRef); // Auto-ID
      newBatch.set(docRef, {
        ...product,
        id: docRef.id,
        slug,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });

    await newBatch.commit();
    console.log("✅ Successfully seeded 10 new Lip Balm products.");

    console.log("Migration Complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error running script:", error);
    process.exit(1);
  }
};

seedLipBalms();
