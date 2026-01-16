import { Inquiry } from "@/types";
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
    await addDoc(collection(db, "inquiries"), {
      ...inquiry,
      status: "new",
      submittedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error submitting inquiry to Firestore:", error);
    return false;
  }
}

export async function updateInquiryStatus(
  id: string,
  status: "new" | "contacted" | "quoted" | "closed"
): Promise<boolean> {
  if (USE_MOCK_DATA) return true;
  try {
    const ref = doc(db, "inquiries", id);
    await updateDoc(ref, { status });
    return true;
  } catch (error) {
    console.error("Error updating inquiry status:", error);
    return false;
  }
}

export async function submitContactMessage(
  data: import("@/types").ContactMessage
): Promise<boolean> {
  if (USE_MOCK_DATA) {
    console.log("Mock Contact Message:", data);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return true;
  }

  try {
    await addDoc(collection(db, "messages"), {
      ...data,
      submittedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error submitting message to Firestore:", error);
    return false;
  }
}

export async function getAllInquiries(): Promise<Inquiry[]> {
  if (USE_MOCK_DATA) return [];
  const q = query(collection(db, "inquiries"), orderBy("submittedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Inquiry));
}

export async function getUserInquiries(userEmail: string): Promise<Inquiry[]> {
  if (USE_MOCK_DATA) return [];
  // Note: Searching by customer.email requires an index in Firestore typically,
  // but for small datasets it might work. If index required, console will scream.
  const q = query(
    collection(db, "inquiries"),
    where("customer.email", "==", userEmail),
    orderBy("submittedAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as Inquiry));
}

export async function getAllMessages(): Promise<
  import("@/types").ContactMessage[]
> {
  if (USE_MOCK_DATA) return [];
  const q = query(collection(db, "messages"), orderBy("submittedAt", "desc"));
  const snap = await getDocs(q);
  return snap.docs.map(
    (d) =>
      ({
        id: d.id,
        ...(d.data() as Omit<import("@/types").ContactMessage, "id">),
      } as import("@/types").ContactMessage)
  );
}
