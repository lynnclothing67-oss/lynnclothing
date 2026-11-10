
import Link from "next/link";
import { Button } from "./ui/button";
import { Search, ShoppingBag, User, Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function Header() {
  return (
    <header className="bg-background/95 backdrop-blur-md sticky top-0 z-40 border-b border-primary/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-24">
          {/* Mobile Menu */}
          <div className="flex md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-foreground/70">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="bg-background border-r-primary/10">
                <nav className="flex flex-col gap-6 mt-12 text-[12px] uppercase tracking-[0.3em] font-medium">
                  <Link href="/#collections" className="hover:text-primary transition-colors">Collections</Link>
                  <Link href="#" className="hover:text-primary transition-colors">Our Story</Link>
                  <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
                  <Link href="/admin/login" className="hover:text-primary transition-colors pt-4 border-t border-primary/10">Admin Portal</Link>
                </nav>
              </SheetContent>
            </Sheet>
          </div>

          {/* Desktop Left: Nav Links */}
          <nav className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.3em] font-medium text-foreground/70">
            <Link href="/#collections" className="hover:text-primary transition-colors">Collections</Link>
            <Link href="#" className="hover:text-primary transition-colors">Our Story</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
          </nav>

          {/* Center: Logo */}
          <Link href="/" className="flex flex-col items-center absolute left-1/2 -translate-x-1/2 group">
            <span className="text-4xl font-bold font-headline text-primary tracking-[0.2em] transition-all group-hover:tracking-[0.25em]">
              LYNN
            </span>
            <span className="text-[10px] font-body text-primary tracking-[0.4em] -mt-1 uppercase opacity-80">
              Boutique
            </span>
          </Link>

          {/* Right: Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-primary transition-colors">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-primary transition-colors hidden sm:flex" asChild title="Admin Portal">
              <Link href="/admin/login">
                <User className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground/70 hover:text-primary transition-colors relative group">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-primary rounded-full border border-background transition-transform group-hover:scale-125"></span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
