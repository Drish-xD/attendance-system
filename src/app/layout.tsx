import { NextUI } from '@/Provider/NextUi';
import { AuthProvider } from '@/Provider/auth';
import { Footer, Header } from '@/components';
import '@/styles/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';

// google font
const inter = Inter({ subsets: ['latin'] });

// seo Data
export const metadata: Metadata = {
  title: 'RollSync',
  description: 'Simplify Student Attendance Tracking'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <NextUI>
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
          <Footer />
        </NextUI>
      </body>
    </html>
  );
}
