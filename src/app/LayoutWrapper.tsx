
'use client';

import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPath = pathname.startsWith('/admin');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // On the server, and during the initial client render, return a placeholder or null.
    // This prevents the hydration mismatch.
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPath && <Header />}
      <main className="flex-grow">{children}</main>
      {!isAdminPath && <Footer />}
      {!isAdminPath && <WhatsAppButton />}
      <Toaster />
    </div>
  );
}
