"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { UserTypeModal } from "@/components/auth/UserTypeModal";
import { useUserType } from "@/context/UserTypeContext";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default function ChooseRolePage() {
  const router = useRouter();
  const { setUserType } = useUserType();
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (!user) {
        router.push("/auth/login");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleSelect = async (userType: 'freelancer' | 'client') => {
    setLoading(true);
    setUserType(userType);
    localStorage.setItem('userType', userType);
    
    if (user && user.uid) {
      try {
        // Update user profile in Firestore
        const userRef = doc(db, "users", user.uid);
        await setDoc(userRef, { userType }, { merge: true });
      } catch (error) {
        console.error("Error updating user profile:", error);
      }
    }
    
    setShowModal(false);
    setLoading(false);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
      <UserTypeModal
        isOpen={showModal}
        onSelect={handleSelect}
        mode="register"
      />
      {loading && <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 text-white text-xl">Saving...</div>}
    </div>
  );
} 