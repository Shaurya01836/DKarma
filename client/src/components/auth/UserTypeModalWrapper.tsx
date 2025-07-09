"use client";

import React from "react";
import { useUserType } from "@/context/UserTypeContext";
import { UserTypeModal } from "./UserTypeModal";

export function UserTypeModalWrapper() {
  const { isUserTypeModalOpen, setIsUserTypeModalOpen, mode, setUserType } = useUserType();

  const handleUserTypeSelect = (userType: 'freelancer' | 'client') => {
    setUserType(userType);
    setIsUserTypeModalOpen(false);
  };

  return (
    <UserTypeModal
      isOpen={isUserTypeModalOpen}
      onSelect={handleUserTypeSelect}
      mode={mode}
    />
  );
} 