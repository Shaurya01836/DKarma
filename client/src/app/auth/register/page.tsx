"use client";

import { useState } from "react";
import { signUp, signInWithGoogle } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import Image from "next/image";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      await signUp(form.email, form.password, form.name);
      router.push("/dashboard");
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
      await signInWithGoogle();
      router.push("/dashboard");
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Google registration failed";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 bg-surface rounded-2xl shadow-2xl border border-border">
        <div className="flex flex-col items-center mb-6">
          <Image src="/favicon.ico" alt="Logo" className="w-12 h-12 mb-2" width={48} height={48} />
          <h1 className="text-3xl font-extrabold text-[--color-foreground] mb-1">
            Create Account
          </h1>
          <p className="text-sm text-muted]">Sign up to get started</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
            className="bg-surface text-foreground] "
          />
          <Input
            name="email"
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="bg-surface text-foreground] "
          />
          <div className="relative">
            <Input
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
              className="bg-surface text-foreground] pr-10"
            />
            <button
              type="button"
              tabIndex={-1}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-primary-hover"
              onClick={() => setShowPassword((v) => !v)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {error && (
            <div className="text-error text-sm text-center">{error}</div>
          )}
          {success && (
            <div className="text-success text-sm text-center">{success}</div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary hover:bg-primary-hover1 text-white font-semibold py-2 rounded-lg transition"
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

        <div className="mt-4">
          <Button
            type="button"
            onClick={handleGoogleRegister}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-white text-black font-semibold py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
          >
            <FcGoogle size={22} /> Register with Google
          </Button>
        </div>

        <div className="mt-6 flex flex-col items-center">
          <span className="text-sm text-[--color-muted]">
            Already have an account?
          </span>
          <Button
            variant="secondary"
            className="mt-2 w-full bg-surface text-white border border-border hover:bg-border"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
