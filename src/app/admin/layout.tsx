'use client';

import { useAuth } from '@/hooks/use-auth';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Loader2, LogOut, User as UserIcon } from 'lucide-react';
import { signOut } from '@/lib/auth-service';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If not loading, there's no user, and we are not on the login page, then redirect.
    if (!loading && !user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [user, loading, router, pathname]);
  
  const handleLogout = async () => {
    await signOut();
    router.push('/admin/login');
  };
  
  // Render children directly if on the login page to avoid the loader/redirect flash
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  // This check is important to prevent flashing the admin layout before redirecting.
  // The useEffect will handle the redirect.
  if (!user) {
    return null;
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-secondary/10">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Link href="/admin" className="flex flex-col items-start">
              <span className="text-xl font-bold font-headline text-primary tracking-[0.2em]">
                LYNN
              </span>
              <span className="text-[8px] font-body text-primary tracking-[0.4em] -mt-1 uppercase">
                Admin Portal
              </span>
          </Link>
          <div className="flex items-center gap-2">
            <Button asChild variant="outline" size="sm">
                <Link href="/admin/profile">
                    <UserIcon className="mr-2 h-4 w-4" />
                    Profile
                </Link>
            </Button>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            {children}
        </main>
      </div>
    </div>
  );
}
