import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "./icons/WhatsappIcon";

export default function WhatsAppButton() {
  return (
    <Button
      asChild
      className="fixed bottom-6 right-6 h-8 w-8 rounded-full bg-green-500 hover:bg-green-600 shadow-lg transition-transform transform hover:scale-110 p-0 z-50 border-none"
    >
      <Link href="https://wa.me/7306815248" target="_blank" aria-label="Contact support on WhatsApp">
        <WhatsappIcon className="h-4 w-4 text-white" />
      </Link>
    </Button>
  );
}
