import Header from '@/components/header';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/footer';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';
import ScrollToTop from '@/components/ScrollToTop';
import MaintenancePage from '@/components/MaintenancePage';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Game Phổ Biến - Mua Bán Tài Khoản Game Uy Tín #1 Việt Nam',
  description: 'Nền tảng mua bán tài khoản game hàng đầu Việt Nam...',
  // phần metadata khác của bạn giữ nguyên
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMaintenance = process.env.MAINTENANCE_MODE === "true";

  return (
    <html lang="vi" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        {isMaintenance ? (
          <MaintenancePage />
        ) : (
          <AuthProvider>
            <ScrollToTop />
            <Header />
            {children}
            <Footer />
            <Toaster richColors position="bottom-right" />
          </AuthProvider>
        )}
      </body>
    </html>
  );
}
