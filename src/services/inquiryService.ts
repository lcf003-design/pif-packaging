import { Inquiry, UniversalInquiry } from "@/types";
import { db } from "@/lib/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  where,
} from "firebase/firestore";

const USE_MOCK_DATA = false;

export async function submitInquiry(inquiry: Inquiry): Promise<boolean> {
  if (USE_MOCK_DATA) {
    console.log("Mock Inquiry Submitted:", inquiry);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  }

  try {
    const universalPayload: UniversalInquiry = {
      sourceType: "product_inquiry",
      status: "new",
      customer: {
        firstName: inquiry.customer.name.split(" ")[0] || "",
        lastName:
          inquiry.customer.name.substring(
            inquiry.customer.name.indexOf(" ") + 1,
          ) || "",
        email: inquiry.customer.email,
        phone: inquiry.customer.phone,
        company: inquiry.customer.company,
      },
      payload: inquiry,
      submittedAt: serverTimestamp(),
    };

    await addDoc(collection(db, "global_inquiries"), universalPayload);
    return true;
  } catch (error) {
    console.error("Error submitting inquiry to Firestore:", error);
    return false;
  }
}

export async function updateInquiryStatus(
  id: string,
  status: "new" | "contacted" | "quoted" | "closed" | "in_review",
): Promise<boolean> {
  if (USE_MOCK_DATA) return true;
  try {
    // Update the master collection
    const ref = doc(db, "global_inquiries", id);
    await updateDoc(ref, { status });
    return true;
  } catch (error) {
    console.error("Error updating inquiry status:", error);
    return false;
  }
}

export async function submitContactMessage(
  data: import("@/types").ContactMessage,
): Promise<boolean> {
  if (USE_MOCK_DATA) {
    console.log("Mock Contact Message:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  }

  try {
    const universalPayload: UniversalInquiry = {
      sourceType: "general_contact",
      status: "new",
      customer: {
        firstName: data.name.split(" ")[0] || "",
        lastName: data.name.substring(data.name.indexOf(" ") + 1) || "",
        email: data.email,
        phone: data.phone,
        company: data.company,
      },
      payload: data,
      submittedAt: serverTimestamp(),
    };

    await addDoc(collection(db, "global_inquiries"), universalPayload);
    return true;
  } catch (error) {
    console.error("Error submitting message to Firestore:", error);
    return false;
  }
}

export async function submitTruckloadQuote(
  data: import("@/types").TruckloadQuoteRequest,
): Promise<boolean> {
  if (USE_MOCK_DATA) {
    console.log("Mock Truckload Quote:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  }

  try {
    const universalPayload: UniversalInquiry = {
      sourceType: "truckload_quote",
      status: "new",
      customer: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company,
      },
      payload: data,
      submittedAt: serverTimestamp(),
    };

    await addDoc(collection(db, "global_inquiries"), universalPayload);
    return true;
  } catch (error) {
    console.error("Error submitting truckload quote to Firestore:", error);
    return false;
  }
}

export async function getAllInquiries(): Promise<UniversalInquiry[]> {
  if (USE_MOCK_DATA) {
    return [
      {
        id: "mock1",
        sourceType: "wine_quote",
        status: "new",
        customer: {
          firstName: "John",
          lastName: "Doe",
          email: "john@winebiz.com",
          company: "JD Vintners",
          phone: "555-123-4567",
        },
        payload: {
          companySize: "10-50",
          orderVolume: "10k - 50k",
          application: "premium_wine",
          address: "123 Vineyard Lane",
          zipCode: "94558",
        },
        submittedAt: { seconds: Math.floor(Date.now() / 1000) },
      },
      {
        id: "mock2",
        sourceType: "general_contact",
        status: "in_review",
        customer: {
          firstName: "Jane",
          lastName: "Smith",
          email: "jane@retailco.com",
        },
        payload: {
          message:
            "Looking for distribution details on the custom printed tote bags. Do you offer minimums under 5,000?",
        },
        submittedAt: { seconds: Math.floor(Date.now() / 1000) - 86400 },
      },
      {
        id: "mock3",
        sourceType: "product_inquiry",
        status: "new",
        customer: {
          firstName: "Alice",
          lastName: "Wong",
          email: "alice@chemtech.com",
          company: "ChemTech Labs",
        },
        payload: {
          message:
            "We need samples of these specific items before placing the bulk PO.",
          items: [
            { productName: "Boston Round 32oz HDPE", sku: "BR-32-HDPE-NAT" },
            {
              productName: "Child Resistant Cap 28-400",
              sku: "CRC-28-400-WHT",
            },
          ],
        },
        submittedAt: { seconds: Math.floor(Date.now() / 1000) - 172800 },
      },
    ];
  }
  const q = query(
    collection(db, "global_inquiries"),
    orderBy("submittedAt", "desc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as UniversalInquiry);
}

export async function getUserInquiries(
  userEmail: string,
): Promise<UniversalInquiry[]> {
  if (USE_MOCK_DATA) return [];
  const q = query(
    collection(db, "global_inquiries"),
    where("customer.email", "==", userEmail),
    orderBy("submittedAt", "desc"),
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }) as UniversalInquiry);
}

export async function submitQuoteRequest(
  data: import("@/types").QuoteRequest,
): Promise<boolean> {
  if (USE_MOCK_DATA) {
    console.log("Mock Quote Request Submitted:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  }

  try {
    // Map type to sourcetype if custom
    const mappedType =
      data.type === "wine-bulk" ? "wine_quote" : "custom_closure";

    const universalPayload: UniversalInquiry = {
      sourceType: mappedType as any,
      status: "new",
      customer: {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        company: data.company,
      },
      payload: data,
      submittedAt: serverTimestamp(),
    };

    await addDoc(collection(db, "global_inquiries"), universalPayload);
    return true;
  } catch (error) {
    console.error("Error submitting quote request to Firestore:", error);
    return false;
  }
}

export async function deleteInquiry(id: string): Promise<boolean> {
  if (USE_MOCK_DATA) return true;
  try {
    const docRef = doc(db, "global_inquiries", id);
    await deleteDoc(docRef);
    return true;
  } catch (error) {
    console.error("Failed to delete inquiry:", error);
    return false;
  }
}
