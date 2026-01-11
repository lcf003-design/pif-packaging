import { Inquiry } from "@/types";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

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
      submittedAt: serverTimestamp(),
    });
    return true;
  } catch (error) {
    console.error("Error submitting inquiry to Firestore:", error);
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
