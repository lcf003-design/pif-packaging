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
  // Template: [capacity] [unit] [material] [shape] [type] - [color] ([neck] Neck)

  const parts: string[] = [];

  if (specs.capacity_value && specs.capacity_unit) {
    parts.push(`${specs.capacity_value} ${specs.capacity_unit}`);
  }

  if (specs.material_type) parts.push(specs.material_type);
  if (specs.shape) parts.push(specs.shape);

  // Use category (singularized if possible) as Item Type
  // Simple singularization mapping
  const singularCategory = category.endsWith("s")
    ? category.slice(0, -1)
    : category;
  parts.push(singularCategory);

  let title = parts.join(" ");

  if (specs.color) {
    title += ` - ${specs.color}`;
  }

  if (specs.neck_finish) {
    title += ` (${specs.neck_finish} Neck)`;
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
