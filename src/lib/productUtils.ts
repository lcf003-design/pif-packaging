import { Product } from "@/types";

export interface ProductSpecs {
  capacity_value?: number;
  capacity_unit?: string;
  material_type?: string;
  shape?: string;
  item_type?: string; // Default to Category?
  color?: string;
  neck_finish?: string;
}

export function generateProductMetadata(
  specs: ProductSpecs,
  category: string
): { title: string; slug: string } {
  // 1. Construct Title
  // Template: [capacity] [unit] [color] [material] [shape] [type] - [neck]

  const parts: string[] = [];

  if (specs.capacity_value && specs.capacity_unit) {
    parts.push(`${specs.capacity_value} ${specs.capacity_unit}`);
  }

  if (specs.color) parts.push(specs.color);
  if (specs.material_type) parts.push(specs.material_type);
  if (specs.shape) parts.push(specs.shape);

  // Use category (singularized if possible) as Item Type
  const singularCategory = category.endsWith("s")
    ? category.slice(0, -1)
    : category;
  parts.push(singularCategory);

  let title = parts.join(" ");

  if (specs.neck_finish) {
    title += ` - ${specs.neck_finish}`; // " - CT" or " - ROPP"
  }

  // 2. Construct Slug
  // Rules: Lowercase, space->hyphen, remove special chars, NO SKU.

  const slug = title
    .toLowerCase()
    .replace(/\s+/g, "-") // Spaces to hyphens
    .replace(/[^\w-]+/g, "") // Remove special chars (keep letters, numbers, hyphens)
    .replace(/--+/g, "-") // Collapse multiple hyphens
    .replace(/^-+|-+$/g, ""); // Trim hyphens

  return { title, slug };
}

export function generateSmartSKU(product: Partial<Product>): string {
  const parts: string[] = [];

  // 1. Material (3-Letter Code)
  const matMap: Record<string, string> = {
    Aluminum: "AL",
    Glass: "GLS",
    "Glass (Type III)": "GLS3",
    Plastic: "PLA",
    PET: "PET",
    HDPE: "HDPE",
    PP: "PP",
    LDPE: "LDPE",
    PVC: "PVC",
    Tinplate: "TIN",
    "PCR PET": "PET",
    "PCR HDPE": "HDPE",
    "BPA-Free Plastic": "PLA",
  };
  if (product.material) {
    if (typeof product.material === "string") {
      parts.push(
        matMap[product.material] ||
          product.material.substring(0, 3).toUpperCase(),
      );
    }
  }

  // 2. Capacity & Unit
  if (product.capacity?.value) {
    const val = product.capacity.value.toString().replace(".", "-");
    const unit = product.capacity.unit
      ? product.capacity.unit.toUpperCase()
      : "";
    parts.push(val);
    if (unit) parts.push(unit);
  }

  // 3. Shape (3 Letter Codes)
  const shapeMap: Record<string, string> = {
    Round: "RND",
    Square: "SQR",
    Oval: "OVL",
    Oblong: "OBL",
    "Straight Sided": "STR",
    Bullet: "BLT",
    "Boston Round": "BOS",
    "Cosmo Round": "CSM",
    Packer: "PKR",
    "Wide Mouth": "WID",
    Cylinder: "CYL",
    "F-Style": "FST",
    Woozy: "WZY",
    Sauce: "SCE",
    Claret: "CLT",
    Burgundy: "BRG",
    Hock: "HCK",
    Champagne: "CHM",
    Sparkling: "SPK",
    "Ice Wine": "ICE",
    Bellissima: "BEL",
  };
  if (product.shape) {
    parts.push(
      shapeMap[product.shape] ||
        product.shape.substring(0, 3).toUpperCase(),
    );
  }

  // 4. Neck Finish (Smart Codes)
  const neckMap: Record<string, string> = {
    "Continuous Thread": "CT",
    "Lug (Twist-Off)": "LUG",
    Cork: "CRK",
    ROPP: "ROP",
    ROPE: "RPE",
    BVS: "BVS",
    "Snap-On": "SNP",
    Crimp: "CRM",
    Dropper: "DRP",
    Pump: "PMP",
    Sprayer: "SPR",
    "Spec / Custom": "SPC",
  };

  let neckCode = "";
  if (product.capSize) {
    neckCode = product.capSize.replace(/[^0-9-]/g, ""); // e.g. 28-410
  } else if (product.neckFinish) {
    if (neckMap[product.neckFinish]) {
      neckCode = neckMap[product.neckFinish];
    } else {
      const numeric = product.neckFinish.replace(/[^0-9]/g, "");
      neckCode = numeric || product.neckFinish.substring(0, 3).toUpperCase();
    }
  }
  if (neckCode) parts.push(neckCode);

  // 5. Color
  const colMap: Record<string, string> = {
    Silver: "SLV",
    Amber: "AMB",
    Clear: "CLR",
    Flint: "FLT",
    White: "WHT",
    Black: "BLK",
    Cobalt: "CBL",
    Green: "GRN",
    Natural: "NAT",
    Frosted: "FRS",
    Gold: "GLD",
  };
  if (product.color) {
    let colCode = colMap[product.color];
    if (!colCode) {
      colCode = product.color.substring(0, 3).toUpperCase();
    }
    parts.push(colCode);
  }

  // 6. Included Closure Context
  if (product.closure?.type || product.closure?.color) {
    const closureMap: Record<string, string> = {
      "Standard Cap": "CAP",
      "Lotion Pump": "PMP",
      "Fine Mist Sprayer": "SPR",
      "Trigger Sprayer": "TRG",
      "Disc Top Cap": "DSC",
      "Flip Top Cap": "FLP",
      Dropper: "DRP",
      Pump: "PMP",
      Sprayer: "SPR",
      Cap: "CAP",
    };

    if (product.closure.color) {
      let capCode = colMap[product.closure.color];
      if (!capCode) {
        capCode = product.closure.color.substring(0, 3).toUpperCase();
      }
      parts.push(capCode);
    }

    if (product.closure.type) {
      let typeCode = closureMap[product.closure.type];
      if (!typeCode) {
        typeCode = product.closure.type
          .replace(/[^a-zA-Z]/g, "")
          .substring(0, 3)
          .toUpperCase();
      }
      parts.push(typeCode);
    }
  }

  return parts.join("-");
}
