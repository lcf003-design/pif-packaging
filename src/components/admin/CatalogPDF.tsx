import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { PPEProduct } from "@/types/ppe";
import { format } from "date-fns";

// Define styles
const styles = StyleSheet.create({
  page: {
    padding: 40,
    backgroundColor: "#FFFFFF",
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 2,
    borderBottomColor: "#111827", // Slate 900
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  title: {
    fontSize: 24,
    fontWeight: "heavy",
    color: "#111827",
  },
  subtitle: {
    fontSize: 10,
    color: "#6B7280", // Gray 500
    marginTop: 4,
  },
  date: {
    fontSize: 10,
    color: "#9CA3AF", // Gray 400
  },
  table: {
    display: "flex",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableColHeader: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#E5E7EB",
    backgroundColor: "#F9FAFB",
    padding: 8,
  },
  tableCol: {
    width: "25%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    borderColor: "#E5E7EB",
    padding: 8,
  },
  tableCellHeader: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#374151",
  },
  tableCell: {
    fontSize: 10,
    color: "#1F2937",
  },
  productImage: {
    width: 40,
    height: 40,
    objectFit: "contain",
    borderRadius: 4,
  },
  productContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 15,
  },
  productMainInfo: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 8,
  },
  productTextInfo: {
    flex: 1,
  },
  productName: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#111827",
  },
  productMeta: {
    fontSize: 9,
    color: "#6B7280",
    marginTop: 2,
  },
  skuList: {
    marginTop: 8,
    backgroundColor: "#F3F4F6",
    padding: 8,
    borderRadius: 4,
  },
  skuRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingVertical: 4,
  },
  skuText: {
    fontSize: 9,
    fontFamily: "Helvetica", // Mono-like spacing
  },
  skuLabel: {
    fontSize: 9,
    color: "#4B5563",
    fontWeight: "bold",
  },
  skuCode: {
    fontSize: 9,
    fontFamily: "Courier",
    color: "#000000",
  },
});

interface CatalogPDFProps {
  products: PPEProduct[];
}

const CatalogPDF = ({ products }: CatalogPDFProps) => {
  const currentDate = format(new Date(), "MMMM dd, yyyy");

  // Helper to generate specific SKU from Master
  // This logic mimics the Admin Form logic but purely for display
  const generateSpecificSku = (product: PPEProduct, size: string) => {
    // Attempt to deconstruct Master SKU
    // e.g. PPE-GLV-NIT-4MIL-VAR-BLU -> PPE-GLV-NIT-4MIL-[SIZE]-BLU
    const parts = product.sku.split("-");
    if (parts.length < 5) return `${product.sku} (${size})`; // Fallback

    // Assume VAR is the 2nd to last or similar position?
    // Actually, in our logic it was: PPE-[CAT]-[MAT]-[SPEC]-[VAR]-[COL]
    // If we strictly follow that, `VAR` is index 4 (0-based)

    // Let's safe-replace "VAR" if present
    const varIndex = parts.indexOf("VAR");

    // Map Size to Code
    const sizeMap: Record<string, string> = {
      Small: "SM",
      Medium: "MD",
      Large: "LG",
      XL: "XL",
      XXL: "2XL",
      "3XL": "3XL",
      "4XL": "4XL",
    };

    const sizeCode = sizeMap[size] || size.substring(0, 2).toUpperCase();

    if (varIndex !== -1) {
      const newParts = [...parts];
      newParts[varIndex] = sizeCode;
      return newParts.join("-");
    }

    return `${product.sku}-${sizeCode}`;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* Logo */}
            <Image
              src="/images/pif-logo-pdf.png"
              style={{
                width: 120,
                height: 40,
                objectFit: "contain",
                marginRight: 10,
              }}
            />
            {/* Title removed, logo contains brand */}
            <View>
              <Text style={styles.subtitle}>Medical & PPE Catalog</Text>
            </View>
          </View>
          <Text style={styles.date}>{currentDate}</Text>
        </View>

        {/* Products List */}
        {products.map((product) => (
          <View key={product.id} wrap={false} style={styles.productContainer}>
            <View style={styles.productMainInfo}>
              {/* Thumbnail (if available and valid URL) */}
              {product.imageUrl && product.imageUrl.startsWith("http") ? (
                <Image src={product.imageUrl} style={styles.productImage} />
              ) : (
                <View
                  style={{
                    ...styles.productImage,
                    backgroundColor: "#F3F4F6",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 6, color: "#9CA3AF" }}>No IMG</Text>
                </View>
              )}

              <View style={styles.productTextInfo}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productMeta}>
                  {product.brand} • {product.category} • {product.material}
                </Text>
                <Text style={{ ...styles.productMeta, marginTop: 4 }}>
                  Master SKU: {product.sku}
                </Text>
              </View>
            </View>

            {/* Exploded SKU List */}
            {product.sizes && product.sizes.length > 0 && (
              <View style={styles.skuList}>
                <View
                  style={[
                    styles.skuRow,
                    { borderBottomWidth: 0, paddingBottom: 2 },
                  ]}
                >
                  <Text style={[styles.skuLabel, { width: "30%" }]}>Size</Text>
                  <Text style={[styles.skuLabel, { width: "70%" }]}>
                    Specific SKU
                  </Text>
                </View>
                {product.sizes.map((size) => (
                  <View key={size} style={styles.skuRow}>
                    <Text style={[styles.skuText, { width: "30%" }]}>
                      {size}
                    </Text>
                    <Text style={[styles.skuCode, { width: "70%" }]}>
                      {generateSpecificSku(product, size)}
                    </Text>
                  </View>
                ))}
              </View>
            )}
          </View>
        ))}

        {/* Footer */}
        <Text
          style={{
            position: "absolute",
            fontSize: 8,
            bottom: 30,
            left: 0,
            right: 0,
            textAlign: "center",
            color: "#9CA3AF",
          }}
          render={({ pageNumber, totalPages }) =>
            `${pageNumber} / ${totalPages}`
          }
          fixed
        />
      </Page>
    </Document>
  );
};

export default CatalogPDF;
