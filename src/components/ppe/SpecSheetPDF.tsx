import React from "react";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { PPEProduct } from "@/types/ppe";

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 40,
    fontFamily: "Helvetica",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 40,
    borderBottom: "1 solid #E2E8F0",
    paddingBottom: 20,
  },
  logo: {
    width: 150,
  },
  headerText: {
    fontSize: 10,
    color: "#64748B",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "bold",
  },
  titleSection: {
    marginBottom: 20,
  },
  productName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0F172A",
    marginBottom: 8,
  },
  sku: {
    fontSize: 12,
    color: "#475569",
    fontFamily: "Helvetica-Bold",
    backgroundColor: "#F1F5F9",
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: "flex-start",
    borderRadius: 4,
  },
  content: {
    flexDirection: "row",
    gap: 40,
    marginBottom: 40,
  },
  leftCol: {
    width: "40%",
  },
  rightCol: {
    width: "60%",
  },
  productImage: {
    width: "100%",
    height: 250,
    objectFit: "contain",
    borderRadius: 8,
    border: "1 solid #E2E8F0",
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#334155",
    marginBottom: 12,
    borderBottom: "2 solid #0EA5E9", // Sky blue underline
    paddingBottom: 4,
    alignSelf: "flex-start",
  },
  specRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
    borderBottom: "1 dashed #E2E8F0",
    paddingBottom: 4,
  },
  specLabel: {
    fontSize: 10,
    color: "#64748B",
    fontWeight: "bold",
  },
  specValue: {
    fontSize: 10,
    color: "#0F172A",
    textAlign: "right",
  },
  badgeContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  badge: {
    fontSize: 8,
    color: "#0EA5E9",
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 10,
    fontWeight: "bold",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    borderTop: "1 solid #E2E8F0",
    paddingTop: 20,
  },
  disclaimer: {
    fontSize: 8,
    color: "#94A3B8",
    marginBottom: 4,
  },
  companyInfo: {
    fontSize: 8,
    color: "#0F172A",
    fontWeight: "bold",
  },
});

interface SpecSheetProps {
  product: PPEProduct;
}

const SpecSheetPDF: React.FC<SpecSheetProps> = ({ product }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={{ fontSize: 20, fontWeight: "heavy", color: "#0F172A" }}>
          BERLIN<Text style={{ color: "#2563EB" }}>HEALTH</Text>
        </Text>
        <Text style={styles.headerText}>Technical Data Sheet</Text>
      </View>

      {/* Title */}
      <View style={styles.titleSection}>
        <Text style={styles.productName}>{product.name}</Text>
        <Text style={styles.sku}>SKU: {product.sku}</Text>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {/* Left: Image */}
        <View style={styles.leftCol}>
          {product.imageUrl ? (
            // eslint-disable-next-line jsx-a11y/alt-text
            <Image src={product.imageUrl} style={styles.productImage} />
          ) : (
            <View
              style={[
                styles.productImage,
                {
                  backgroundColor: "#F8FAFC",
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Text style={{ color: "#CBD5E1" }}>No Image</Text>
            </View>
          )}

          <View style={styles.badgeContainer}>
            {product.sterility === "Sterile" && (
              <Text
                style={[
                  styles.badge,
                  { color: "#15803D", backgroundColor: "#DCFCE7" },
                ]}
              >
                STERILE
              </Text>
            )}
            {product.certifications?.map((c) => (
              <Text key={c} style={styles.badge}>
                {c}
              </Text>
            ))}
          </View>
        </View>

        {/* Right: Specs */}
        <View style={styles.rightCol}>
          <Text style={styles.sectionTitle}>Product Specifications</Text>

          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Material</Text>
            <Text style={styles.specValue}>{product.material || "N/A"}</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Thickness</Text>
            <Text style={styles.specValue}>{product.thickness || "N/A"}</Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Sterility</Text>
            <Text style={styles.specValue}>{product.sterility}</Text>
          </View>
          {(product.specifications?.color ||
            product.specifications?.texture) && (
            <>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Color</Text>
                <Text style={styles.specValue}>
                  {product.specifications?.color || "Standard"}
                </Text>
              </View>
              <View style={styles.specRow}>
                <Text style={styles.specLabel}>Texture</Text>
                <Text style={styles.specValue}>
                  {product.specifications?.texture || "Standard"}
                </Text>
              </View>
            </>
          )}

          <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
            Logistics & Packaging
          </Text>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Case Quantity</Text>
            <Text style={styles.specValue}>
              {product.caseQty?.toLocaleString() || "Upon Request"}
            </Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Pallet Quantity</Text>
            <Text style={styles.specValue}>
              {product.palletQty?.toLocaleString() || "Upon Request"}
            </Text>
          </View>
          <View style={styles.specRow}>
            <Text style={styles.specLabel}>Stock Status</Text>
            <Text style={styles.specValue}>
              {product.stockStatus || "In Stock"}
            </Text>
          </View>

          {(product.upc || product.mpn) && (
            <>
              <Text style={[styles.sectionTitle, { marginTop: 20 }]}>
                Identification
              </Text>
              {product.upc && (
                <View style={styles.specRow}>
                  <Text style={styles.specLabel}>UPC / GTIN</Text>
                  <Text style={styles.specValue}>{product.upc}</Text>
                </View>
              )}
              {product.mpn && (
                <View style={styles.specRow}>
                  <Text style={styles.specLabel}>MPN (Part #)</Text>
                  <Text style={styles.specValue}>{product.mpn}</Text>
                </View>
              )}
            </>
          )}
        </View>
      </View>

      {/* Description */}
      <View style={{ marginBottom: 20 }}>
        <Text
          style={[styles.sectionTitle, { borderBottom: 0, marginBottom: 4 }]}
        >
          Description
        </Text>
        <Text style={{ fontSize: 10, lineHeight: 1.5, color: "#475569" }}>
          {product.description}
        </Text>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.disclaimer}>
          DISCLAIMER: This document provides general product information. Berlin
          Health makes no warranties regarding use for specific applications.
          User assumes all responsibility for compliance.
        </Text>
        <Text style={styles.companyInfo}>
          Berlin Health | Medical Supply Division | www.berlinpackaging.com
        </Text>
      </View>
    </Page>
  </Document>
);

export default SpecSheetPDF;
