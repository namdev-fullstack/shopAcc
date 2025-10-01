
import Header from '@/components/header';
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Footer from '@/components/footer';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/context/AuthContext';
import ScrollToTop from '@/components/ScrollToTop';


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Game Phổ Biến - Mua Bán Tài Khoản Game Uy Tín #1 Việt Nam',
  description: 'Nền tảng mua bán tài khoản game hàng đầu Việt Nam. Cung cấp tài khoản Liên Quân Mobile, LMHT, Valorant, PUBG với giá tốt nhất. Bảo hành trọn đời, uy tín 100%.',
  keywords: 'mua tài khoản game, bán tài khoản game, liên quân mobile, lmht, valorant, pubg mobile, tài khoản vip, game việt nam',
  authors: [{ name: 'Game Phổ Biến Team' }],
  creator: 'Game Phổ Biến',
  publisher: 'Game Phổ Biến',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Game Phổ Biến - Mua Bán Tài Khoản Game Uy Tín #1 Việt Nam',
    description: 'Nền tảng mua bán tài khoản game hàng đầu Việt Nam. Cung cấp tài khoản Liên Quân Mobile, LMHT, Valorant, PUBG với giá tốt nhất.',
    url: 'https://gamephobian.com',
    siteName: 'Game Phổ Biến',
    images: [
      {
        url: 'https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg',
        width: 1200,
        height: 630,
        alt: 'Game Phổ Biến - Mua Bán Tài Khoản Game',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Game Phổ Biến - Mua Bán Tài Khoản Game Uy Tín #1 Việt Nam',
    description: 'Nền tảng mua bán tài khoản game hàng đầu Việt Nam. Cung cấp tài khoản Liên Quân Mobile, LMHT, Valorant, PUBG với giá tốt nhất.',
    images: ['https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
  },
  category: 'gaming',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <head>
        <link rel="canonical" href="https://gamephobian.com" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#8B5CF6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Game Phổ Biến" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        
        {/* JSON-LD Schema for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Game Phổ Biến',
              alternateName: 'GamePhoBien',
              description: 'Nền tảng mua bán tài khoản game hàng đầu Việt Nam',
              url: 'https://gamephobian.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: {
                  '@type': 'EntryPoint',
                  urlTemplate: 'https://gamephobian.com/search?q={search_term_string}'
                },
                'query-input': 'required name=search_term_string'
              }
            })
          }}
        />
        
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Game Phổ Biến',
              description: 'Nền tảng mua bán tài khoản game uy tín hàng đầu Việt Nam',
              url: 'https://gamephobian.com',
              logo: 'https://gamephobian.com/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '1900-1234',
                contactType: 'customer service',
                areaServed: 'VN',
                availableLanguage: 'Vietnamese'
              },
              sameAs: [
                'https://facebook.com/gamephobian',
                'https://twitter.com/gamephobian',
                'https://instagram.com/gamephobian'
              ]
            })
          }}
        />
      </head>
      <body className={`${inter.className} antialiased`}>
      <AuthProvider>
      <ScrollToTop />
      <Header />

        {children}
        <Footer />
        <Toaster richColors position="bottom-right" />
        </AuthProvider>
      </body>
    </html>
  );
}