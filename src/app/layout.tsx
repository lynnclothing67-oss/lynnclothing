
'use client';
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const [isClient, setIsClient] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Render nothing on the server to avoid mismatch
    return null;
  }

  const isAdminLogin = pathname === '/admin/login';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminLogin && <Header />}
      <main className="flex-grow">{children}</main>
      {!isAdminLogin && <Footer />}
      {!isAdminLogin && <WhatsAppButton />}
      <Toaster />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
