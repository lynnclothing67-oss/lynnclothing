import Link from "next/link";
import { Button } from "./ui/button";

export default function Header() {
  return (
    <header className="bg-background/80 backdrop-blur-md sticky top-0 z-40 border-b">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <Link href="/" className="flex flex-col items-center">
          <span className="text-3xl font-bold font-headline text-primary tracking-[0.2em]">
            LYNN
          </span>
          <span className="text-[10px] font-body text-primary tracking-[0.4em] -mt-1 uppercase">
            Clothing
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