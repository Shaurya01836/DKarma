"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { 
  User, 
  Briefcase, 
  Code, 
  Building, 
  CheckCircle, 
  Sparkles,
  ArrowRight,
  Users,
  FileText,
  DollarSign,
  Shield,
  Zap
} from "lucide-react";

interface UserTypeModalProps {
  isOpen: boolean;
  onSelect: (userType: 'freelancer' | 'client') => void;
  mode: 'login' | 'register';
}

export function UserTypeModal({ isOpen, onSelect, mode }: UserTypeModalProps) {
  const [selectedType, setSelectedType] = useState<'freelancer' | 'client' | null>(null);
  const [isConfirming, setIsConfirming] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    if (selectedType) {
      setIsConfirming(true);
      setTimeout(() => {
        onSelect(selectedType);
        setIsConfirming(false);
        // Redirect to dashboard after selection
        router.push("/dashboard");
      }, 500);
    }
  };

  const freelancerFeatures = [
    { icon: Code, text: "Find Web3 Projects" },
    { icon: DollarSign, text: "Earn Crypto Payments" },
    { icon: Shield, text: "Secure Smart Contracts" },
    { icon: Users, text: "Connect with DAOs" },
  ];

  const clientFeatures = [
    { icon: Building, text: "Post Project Requirements" },
    { icon: FileText, text: "Manage Freelancers" },
    { icon: Shield, text: "Escrow Protection" },
    { icon: Zap, text: "Fast Project Delivery" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="relative w-full max-w-4xl mx-4"
          >
            {/* Background Sparkles */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[var(--color-primary)] via-transparent to-transparent opacity-20 animate-pulse rounded-3xl" />
            
            <div className="relative bg-[var(--color-surface)]/95 backdrop-blur-xl border border-[var(--color-border)] rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="text-center p-8 border-b border-[var(--color-border)]">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <Sparkles className="w-8 h-8 text-[var(--color-primary)] animate-pulse" />
                  <h1 className="text-4xl font-bold text-[var(--color-foreground)]">
                    Welcome to DKarma
                  </h1>
                  <Sparkles className="w-8 h-8 text-[var(--color-primary)] animate-pulse" />
                </div>
                <p className="text-xl text-[var(--color-muted)]">
                  Choose your role to continue
                </p>
                <Badge className="mt-3 bg-[var(--color-primary)]/20 text-[var(--color-primary)] border-[var(--color-primary)]/30">
                  {mode === 'login' ? 'Login' : 'Register'} as
                </Badge>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-8">
                {/* Freelancer Option */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 ${
                    selectedType === 'freelancer'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                      : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-primary)]/5'
                  }`}
                  onClick={() => setSelectedType('freelancer')}
                >
                  {selectedType === 'freelancer' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-[var(--color-primary)] text-white rounded-full p-1"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </motion.div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Code className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-2">
                      Freelancer
                    </h3>
                    <p className="text-[var(--color-muted)]">
                      Find and complete Web3 projects
                    </p>
                  </div>

                  <div className="space-y-3">
                    {freelancerFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <feature.icon className="w-5 h-5 text-[var(--color-primary)]" />
                        <span className="text-sm text-[var(--color-foreground)]">
                          {feature.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Client Option */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative cursor-pointer rounded-2xl p-6 border-2 transition-all duration-300 ${
                    selectedType === 'client'
                      ? 'border-[var(--color-primary)] bg-[var(--color-primary)]/10'
                      : 'border-[var(--color-border)] hover:border-[var(--color-primary)]/50 hover:bg-[var(--color-primary)]/5'
                  }`}
                  onClick={() => setSelectedType('client')}
                >
                  {selectedType === 'client' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-[var(--color-primary)] text-white rounded-full p-1"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </motion.div>
                  )}
                  
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Building className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-[var(--color-foreground)] mb-2">
                      Client
                    </h3>
                    <p className="text-[var(--color-muted)]">
                      Post projects and hire freelancers
                    </p>
                  </div>

                  <div className="space-y-3">
                    {clientFeatures.map((feature, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="flex items-center gap-3"
                      >
                        <feature.icon className="w-5 h-5 text-[var(--color-success)]" />
                        <span className="text-sm text-[var(--color-foreground)]">
                          {feature.text}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Footer */}
              <div className="p-8 border-t border-[var(--color-border)]">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-center sm:text-left">
                    <p className="text-sm text-[var(--color-muted)]">
                      You can change your role later in settings
                    </p>
                  </div>
                  
                  <Button
                    onClick={handleConfirm}
                    disabled={!selectedType || isConfirming}
                    className="bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white px-8 py-3 rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isConfirming ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          />
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                          />
                        </svg>
                        Continuing...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        Continue as {selectedType === 'freelancer' ? 'Freelancer' : selectedType === 'client' ? 'Client' : 'User'}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 