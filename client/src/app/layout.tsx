import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';
import { Inter, Sora } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import { UserTypeProvider } from '@/context/UserTypeContext';
import { UserTypeModalWrapper } from '@/components/auth/UserTypeModalWrapper';
import { WagmiProvider } from '@/components/providers/WagmiProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const sora = Sora({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-display',
  display: 'swap',
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <body className="bg-background text-foreground font-sans">
        <WagmiProvider>
          <AuthProvider>
            <UserTypeProvider>
              {children}
              <UserTypeModalWrapper />
            </UserTypeProvider>
          </AuthProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
