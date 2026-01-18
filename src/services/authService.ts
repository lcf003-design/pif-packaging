import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User,
  GoogleAuthProvider,
  OAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState, useEffect } from "react";
import { createUserProfile } from "@/services/userService";

// --- Types ---
export interface AuthState {
  user: User | null;
  loading: boolean;
}

export interface AuthError {
  code: string;
  message: string;
}

// --- Service Functions ---

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    // Create or check user profile
    await createUserProfile(result.user.uid, {
      email: result.user.email,
      displayName: result.user.displayName,
    });

    return { user: result.user, error: null };
  } catch (error: any) {
    return { user: null, error: error as AuthError };
  }
};

export const signInWithApple = async () => {
  try {
    const provider = new OAuthProvider("apple.com");
    const result = await signInWithPopup(auth, provider);

    // Create or check user profile
    await createUserProfile(result.user.uid, {
      email: result.user.email,
      displayName: result.user.displayName,
    });

    return { user: result.user, error: null };
  } catch (error: any) {
    return { user: null, error: error as AuthError };
  }
};

// --- Service Functions ---

export const signUpWithEmail = async (
  email: string,
  password: string,
  name: string,
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    // Update display name
    await updateProfile(userCredential.user, {
      displayName: name,
    });

    // Create user profile in Firestore
    await createUserProfile(userCredential.user.uid, {
      email: userCredential.user.email,
      displayName: name,
    });

    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error as AuthError };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error as AuthError };
  }
};

export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true, error: null };
  } catch (error: any) {
    return { success: false, error: error as AuthError };
  }
};

// Hook removed. Use import { useAuth } from "@/context/AuthContext" instead.
