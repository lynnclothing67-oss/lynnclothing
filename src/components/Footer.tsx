
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary/10 border-t border-primary/10 mt-24">
      <div className="container mx-auto py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-2 flex flex-col items-center md:items-start">
            <div className="flex flex-col items-center md:items-start mb-6">
              <span className="text-3xl font-bold font-headline text-primary tracking-[0.2em]">
                LYNN
              </span>
              <span className="text-[10px] font-body text-primary tracking-[0.4em] -mt-0.5 uppercase">
                Boutique
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs text-center md:text-left leading-relaxed">
              Elevating the everyday through curated sophistication and timeless style. Designed for the modern individual who appreciates the finer details.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-2">Shopping</h4>
            <Link href="/#collections" className="text-sm text-muted-foreground hover:text-primary transition-colors">Latest Arrivals</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Best Sellers</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Gift Cards</Link>
          </div>

          {/* Support */}
          <div className="flex flex-col items-center md:items-start gap-4">
            <h4 className="text-[10px] uppercase tracking-[0.3em] font-bold text-primary mb-2">Customer Care</h4>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Shipping & Returns</Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="/admin/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">Admin Portal</Link>
          </div>
        </div>

        <div className="text-center text-muted-foreground text-[10px] mt-20 pt-8 border-t border-primary/5 tracking-[0.3em] uppercase">
          <p>&copy; {new Date().getFullYear()} LYNN Boutique. Crafted for Elegance.</p>
        </div>
      </div>
    </footer>
  );
}
