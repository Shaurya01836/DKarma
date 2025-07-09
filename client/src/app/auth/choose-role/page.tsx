"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { UserTypeModal } from "@/components/auth/UserTypeModal";
import { useUserType } from "@/context/UserTypeContext";
import { UserService } from "@/services/userService";

export default function ChooseRolePage() {
  const router = useRouter();
  const { setUserType } = useUserType();
  const [showModal, setShowModal] = useState(true);
  const [loading, setLoading] = useState(false);

  // Get the current user from Firebase auth
  // (You may need to adjust this if you use a different auth context)
  const user = typeof window !== "undefined" ? JSON.parse(localStorage.getItem("firebaseUser") || "null") : null;

  const handleSelect = async (userType: 'freelancer' | 'client') => {
    setLoading(true);
    setUserType(userType);
    localStorage.setItem('userType', userType);
    if (user && user.uid) {
      await UserService.updateUserProfile(user.uid, { userType });
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