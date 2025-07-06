"use client";

import { useState } from "react";
import { signUp } from "@/lib/auth";
import { UserService } from "@/services/userService";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    walletAddress: "",
    OCID: "",
    skills: "",
    role: "freelancer",
    profileImage: "",
  });
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, role: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileImageFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      // Register with Firebase Auth
      const userCredential = await signUp(form.email, form.password, form.name);
      const user = userCredential.user;

      // Prepare additional profile data
      let profileImageUrl = "";
      if (profileImageFile) {
        profileImageUrl = await UserService.uploadProfilePicture(user.uid, profileImageFile);
      }
      const skillsArray = form.skills.split(",").map((s) => s.trim()).filter(Boolean);
      await UserService.createUserProfile(user, {
        name: form.name,
        walletAddress: form.walletAddress,
        OCID: form.OCID,
        skills: skillsArray,
        role: form.role as "freelancer" | "organization",
        profileImage: profileImageUrl,
        stats: { jobsDone: 0, ratings: 0 },
        verified: false,
      });
      setSuccess("Registration successful! You can now log in.");
      setForm({
        name: "",
        email: "",
        password: "",
        walletAddress: "",
        OCID: "",
        skills: "",
        role: "freelancer",
        profileImage: "",
      });
      setProfileImageFile(null);
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <Input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <Input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <Input name="walletAddress" placeholder="Wallet Address" value={form.walletAddress} onChange={handleChange} required />
        <Input name="OCID" placeholder="OCID (for organizations)" value={form.OCID} onChange={handleChange} />
        <Textarea name="skills" placeholder="Skills (comma separated)" value={form.skills} onChange={handleChange} />
        <select name="role" value={form.role} onChange={handleRoleChange} className="w-full border rounded px-3 py-2">
          <option value="freelancer">Freelancer</option>
          <option value="organization">Organization</option>
        </select>
        <Input name="profileImage" type="file" accept="image/*" onChange={handleImageChange} />
        {error && <div className="text-red-500 text-sm">{error}</div>}
        {success && <div className="text-green-600 text-sm">{success}</div>}
        <Button type="submit" disabled={loading}>{loading ? "Registering..." : "Register"}</Button>
      </form>
    </div>
  );
}
