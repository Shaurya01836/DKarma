'use client';

import { useState, useEffect } from 'react';

// Temporary simplified WagmiProvider until dependencies are installed
export function WagmiProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      {children}
    </div>
  );
} 