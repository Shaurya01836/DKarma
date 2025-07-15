"use client";

import { useState } from "react";
import { signUp, signInWithGoogle } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";
import { useUserType } from "@/context/UserTypeContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { WalletConnectButton } from "@/components/auth/WalletConnectButton";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const { setIsUserTypeModalOpen, setMode } = useUserType();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const result = await signUp(form.email, form.password, form.name);
      if (!result) {
        throw new Error("Registration failed");
      }
      const { user } = result;
      
      // Check if user already has a userType
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      
      if (!userData || !userData.userType) {
        // User doesn't have a role, show role selection modal
        setMode('register');
        setIsUserTypeModalOpen(true);
      } else {
        // User already has a role, go to dashboard
        router.replace("/dashboard");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleRegister = async () => {
    setLoading(true);
    setError("");
    try {
      const result = await signInWithGoogle();
      if (!result) {
        throw new Error("Google registration failed");
      }
      const user = result.userCredential.user;
      
      // Check if user already has a userType
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      
      if (!userData || !userData.userType) {
        // User doesn't have a role, show role selection modal
        setMode('register');
        setIsUserTypeModalOpen(true);
      } else {
        // User already has a role, go to dashboard
        router.replace("/dashboard");
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Google registration failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-background)]">
      {/* Animated background sparkles */}
      <div className="pointer-events-none fixed inset-0 z-0 opacity-20 animate-pulse bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-[var(--color-primary)] via-transparent to-transparent" />
      
      <div className="relative w-full max-w-md p-8 bg-[var(--color-surface)]/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-[var(--color-border)]">
        <div className="flex flex-col items-center mb-6">
          <Image src="/favicon.ico" alt="Logo" className="w-12 h-12 mb-2" width={48} height={48} />
          <h1 className="text-3xl font-extrabold text-[var(--color-foreground)] mb-1">
            Create Account
          </h1>
          <p className="text-sm text-[var(--color-muted)]">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="bg-[var(--color-surface)]/50 border-[var(--color-border)] text-[var(--color-foreground)] focus:border-[var(--color-primary)]"
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="bg-[var(--color-surface)]/50 border-[var(--color-border)] text-[var(--color-foreground)] focus:border-[var(--color-primary)]"
          />
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="bg-[var(--color-surface)]/50 border-[var(--color-border)] text-[var(--color-foreground)] focus:border-[var(--color-primary)] pr-10"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-primary-hover)]"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div className="text-[var(--color-error)] text-sm text-center">{error}</div>
          )}
          {success && (
            <div className="text-[var(--color-success)] text-sm text-center">{success}</div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary)] hover:bg-[var(--color-primary-hover)] text-white font-semibold py-2 rounded-lg transition"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  ></path>
                </svg>
                Registering...
              </span>
            ) : (
              "Register"
            )}
          </Button>
        </form>

        <div className="mt-4 space-y-3">
          <Button
            type="button"
            onClick={handleGoogleRegister}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            <FcGoogle size={22} /> Register with Google
          </Button>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-[var(--color-border)]" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[var(--color-surface)] px-2 text-[var(--color-muted)]">Or continue with</span>
            </div>
          </div>
          
               <WalletConnectButton
  className="w-full"
  onSuccess={() => router.replace('/dashboard')}
/>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <span className="text-sm text-[var(--color-muted)]">
            Already have an account?
          </span>
          <Button
            variant="secondary"
            className="mt-2 w-full bg-[var(--color-surface)] text-[var(--color-foreground)] border border-[var(--color-border)] hover:bg-[var(--color-border)] hover:text-white transition"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
