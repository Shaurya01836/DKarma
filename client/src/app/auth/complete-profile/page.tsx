'use client';

import { useRouter } from 'next/navigation';
import { useAccount } from 'wagmi';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { db } from '@/lib/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useAuth } from '@/context/AuthContext';

export default function CompleteProfile() {
  const { address, isConnected } = useAccount();
  const { user } = useAuth();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    wallet: '',
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Wait until address is available
    if (isConnected && address) {
      setForm((prev) => ({
        ...prev,
        email: user?.email || '',
        wallet: address,
      }));
    }
  }, [isConnected, address, user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.name) return alert('Name is required');
    if (!form.email && !form.wallet) return alert('Email or Wallet required');

    setLoading(true);
    try {
      const uid = user?.uid || address;
      if (!uid) {
        alert('User ID or wallet address is missing.');
        setLoading(false);
        return;
      }
      await setDoc(
        doc(db, 'users', uid),
        {
          ...form,
          displayName: form.name, // ✅ Add this line
          userType: 'freelancer', // <-- Fix: set to 'freelancer' instead of null
          createdAt: Date.now(),
        },
        { merge: true }
      );

      localStorage.setItem('userType', 'freelancer'); // optional
      router.replace('/dashboard');
    } catch (err) {
      console.error('Profile saving error', err);
      alert('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  if (!isConnected && !user) {
    return (
      <div className="text-center py-10">
        <p>Please connect a wallet or login first.</p>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 space-y-5">
      <h2 className="text-2xl font-bold text-center">Complete Your Profile</h2>

      <Input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <Input
        name="email"
        placeholder="Email (optional)"
        value={form.email}
        onChange={handleChange}
      />
      <Input
        name="phone"
        placeholder="Phone (optional)"
        value={form.phone}
        onChange={handleChange}
      />
      <Input
        name="wallet"
        placeholder="Wallet Address"
        value={form.wallet}
        disabled
      />

      <Button className="w-full" onClick={handleSubmit} disabled={loading}>
        {loading ? 'Saving...' : 'Continue'}
      </Button>
    </div>
  );
}
