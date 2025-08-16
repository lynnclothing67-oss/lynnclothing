import Link from "next/link";
import { ShoppingBag } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary/50 border-t mt-12">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-7 h-7 text-primary" />
            <span className="text-xl font-bold font-headline text-primary">
              PetalCart
            </span>
          </div>
          <div className="flex gap-6 text-sm">
            <Link href="#" className="hover:text-primary transition-colors">
              About Us
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Shipping & Returns
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
        <div className="text-center text-muted-foreground text-sm mt-8 pt-8 border-t">
          <p>&copy; {new Date().getFullYear()} PetalCart. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
