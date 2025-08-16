import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 z-40 border-b">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <Link href="/" className="flex items-center gap-2">
          <ShoppingBag className="w-8 h-8 text-primary" />
          <span className="text-2xl font-bold font-headline text-primary">
            PetalCart
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/">Home</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
