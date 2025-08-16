
'use client';

import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AuthProvider } from "@/hooks/use-auth";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage = pathname === '/admin/login';
  const isAdminPath = pathname.startsWith('/admin') && !isAuthPage;
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Return null on the server and initial client render
  }
  
  const shouldShowHeaderFooter = !isAdminPath && !isAuthPage;

  return (
    <AuthProvider>
      {shouldShowHeaderFooter && <Header />}
      <main className="flex-grow">{children}</main>
      {shouldShowHeaderFooter && <Footer />}
      {shouldShowHeaderFooter && <WhatsAppButton />}
      <Toaster />
    </AuthProvider>
  );
}
