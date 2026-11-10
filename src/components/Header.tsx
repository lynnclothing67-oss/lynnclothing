'use client';

import Link from "next/link";
import { Button } from "./ui/button";
import { Search, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";

export default function Header() {
  const handleSearchClick = () => {
    const searchInput = document.querySelector('input[type="search"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
      searchInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
    } else {
      window.location.href = '/#collections';
    }
  };

  return (
    <header className="bg-background/90 backdrop-blur-md sticky top-0 z-50 border-b border-primary/5 transition-all duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20 md:h-24">
          {/* Mobile Menu */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground/80">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-background border-r-primary/5 w-[300px]">
                <SheetHeader className="sr-only">
                  <SheetTitle>LYNN Clothing Navigation</SheetTitle>
                  <SheetDescription>Access our curated collections and story.</SheetDescription>
                </SheetHeader>
                <div className="flex flex-col h-full py-12 px-4">
                  <div className="flex flex-col items-center mb-12">
                    <span className="text-3xl font-bold font-headline text-primary tracking-[0.1em]">
                      LYNN
                    </span>
                    <span className="text-[8px] font-body text-primary tracking-[0.3em] -mt-1 uppercase opacity-60">
                      Clothing
                    </span>
                  </div>
                  <nav className="flex flex-col gap-8 text-[11px] uppercase tracking-[0.25em] font-medium text-center">
                    <Link href="/#collections" className="hover:text-primary transition-colors">Collections</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Our Story</Link>
                    <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Left: Nav Links */}
          <nav className="hidden md:flex items-center gap-12 text-[10px] uppercase tracking-[0.4em] font-medium text-foreground/60">
            <Link href="/#collections" className="hover:text-primary transition-colors transition-all hover:tracking-[0.45em]">Collections</Link>
            <Link href="#" className="hover:text-primary transition-colors transition-all hover:tracking-[0.45em]">Our Story</Link>
            <Link href="#" className="hover:text-primary transition-colors transition-all hover:tracking-[0.45em]">Contact</Link>
          </nav>

          {/* Center: Logo */}
          <Link href="/" className="flex flex-col items-center absolute left-1/2 -translate-x-1/2 group">
            <span className="text-3xl md:text-4xl font-bold font-headline text-primary tracking-[0.2em] transition-all group-hover:tracking-[0.25em]">
              LYNN
            </span>
            <span className="text-[8px] md:text-[10px] font-body text-primary tracking-[0.45em] -mt-1 uppercase opacity-70">
              Clothing
            </span>
          </Link>

          {/* Right: Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-foreground/60 hover:text-primary transition-colors"
              onClick={handleSearchClick}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
