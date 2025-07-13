'use client';
import { useEffect } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';

export const WalletConnectButton = ({
  className = '',
  onSuccess,
}: {
  className?: string;
  onSuccess?: () => void;
}) => {
  const { isConnected, address } = useAccount();
  const router = useRouter();

  useEffect(() => {
    const saveUserToFirestore = async () => {
      if (!address) return;

      const userRef = doc(db, 'users', address);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          wallet: address,
          displayName: 'Anonymous', // Optional: trigger modal to ask name
          userType: 'freelancer',   // Or show role chooser
          createdAt: new Date().toISOString(),
        });
      }

      localStorage.setItem('userType', 'freelancer');
      if (onSuccess) onSuccess();
      else router.replace('/dashboard');
    };

    if (isConnected) {
      saveUserToFirestore();
    }
  }, [isConnected, address, onSuccess, router]);

  return (
    <div className={className}>
      <ConnectButton />
    </div>
  );
};
