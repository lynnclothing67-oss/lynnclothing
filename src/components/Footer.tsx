import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-secondary/20 border-t mt-12">
      <div className="container mx-auto py-12 px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-2xl font-bold font-headline text-primary tracking-[0.2em]">
              LYNN
            </span>
            <span className="text-[8px] font-body text-primary tracking-[0.4em] -mt-0.5 uppercase">
              Boutique
            </span>
          </div>
          <div className="flex gap-8 text-sm uppercase tracking-widest font-medium">
            <Link href="#" className="hover:text-primary transition-colors">
              About
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Shipping
            </Link>
            <Link href="#" className="hover:text-primary transition-colors">
              Privacy
            </Link>
            <Link href="/admin/login" className="hover:text-primary transition-colors">
              Admin
            </Link>
          </div>
        </div>
        <div className="text-center text-muted-foreground text-[10px] mt-12 pt-8 border-t tracking-widest uppercase">
          <p>&copy; {new Date().getFullYear()} LYNN Boutique. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
