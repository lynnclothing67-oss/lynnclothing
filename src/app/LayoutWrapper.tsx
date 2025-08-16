
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
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);


  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPath && <Header />}
      <main className="flex-grow">{isClient ? children: null}</main>
      {!isAdminPath && <Footer />}
      {!isAdminPath && <WhatsAppButton />}
      <Toaster />
    </div>
  );
}
