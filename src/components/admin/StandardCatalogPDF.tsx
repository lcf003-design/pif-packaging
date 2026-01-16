import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";
import { Product } from "@/types";
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
  productContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    paddingBottom: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  productImageColumn: {
    width: "15%",
    alignItems: "center",
    justifyContent: "center",
  },
  productImage: {
    width: 40,
    height: 40,
    objectFit: "contain",
  },
  productInfoColumn: {
    width: "40%",
    paddingLeft: 10,
  },
  productName: {
    fontSize: 11,
    fontWeight: "bold",
    color: "#111827",
  },
  productMeta: {
    fontSize: 9,
    color: "#6B7280",
    marginTop: 2,
  },
  detailsColumn: {
    width: "45%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  detailItem: {
    fontSize: 9,
    color: "#4B5563",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
});

interface StandardCatalogPDFProps {
  products: Product[];
}

const StandardCatalogPDF = ({ products }: StandardCatalogPDFProps) => {
  const currentDate = format(new Date(), "MMMM dd, yyyy");

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* Logo - Use window.location.origin to ensure absolute path if needed, though react-pdf typically handles relative if served correctly */}
            <Image
              src="/images/pif-logo-pdf.png"
              style={{
                width: 120,
                height: 40,
                objectFit: "contain",
                marginRight: 10,
              }}
            />
            <View>
              <Text
                style={{ fontSize: 14, fontWeight: "bold", color: "#111827" }}
              >
                PIF Packaging
              </Text>
              <Text style={styles.subtitle}>Industrial Packaging Catalog</Text>
            </View>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={{ fontSize: 8, color: "#6B7280" }}>Generated On</Text>
            <Text
              style={{ fontSize: 10, color: "#111827", fontWeight: "bold" }}
            >
              {currentDate}
            </Text>
          </View>
        </View>

        {/* Products List */}
        {products.map((product) => (
          <View key={product.id} wrap={false} style={styles.productContainer}>
            <View style={styles.productImageColumn}>
              {product.imageUrl && product.imageUrl.startsWith("http") ? (
                <Image src={product.imageUrl} style={styles.productImage} />
              ) : (
                <View
                  style={{
                    width: 40,
                    height: 40,
                    backgroundColor: "#F3F4F6",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 4,
                  }}
                >
                  <Text style={{ fontSize: 6, color: "#9CA3AF" }}>No IMG</Text>
                </View>
              )}
            </View>

            <View style={styles.productInfoColumn}>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productMeta}>SKU: {product.sku}</Text>
              <Text style={styles.productMeta}>{product.brand}</Text>
            </View>

            <View style={styles.detailsColumn}>
              <Text style={styles.detailItem}>{product.category}</Text>
              <Text style={styles.detailItem}>
                {typeof product.material === "string"
                  ? product.material
                  : "N/A"}
              </Text>
              {product.capacity && (
                <Text style={styles.detailItem}>
                  {product.capacity.value} {product.capacity.unit}
                </Text>
              )}
              {product.industry && product.industry.length > 0 && (
                <Text
                  style={[
                    styles.detailItem,
                    { backgroundColor: "#EEF2FF", color: "#4F46E5" },
                  ]}
                >
                  {product.industry[0]}
                </Text>
              )}
            </View>
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

export default StandardCatalogPDF;
