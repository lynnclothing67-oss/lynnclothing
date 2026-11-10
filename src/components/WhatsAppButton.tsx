import Link from "next/link";
import { Button } from "@/components/ui/button";
import { WhatsappIcon } from "./icons/WhatsappIcon";

export default function WhatsAppButton() {
  return (
    <Button
      asChild
      className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-green-500 hover:bg-green-600 shadow-lg transition-transform transform hover:scale-110 p-0"
    >
      <Link href="https://wa.me/7907963091" target="_blank" aria-label="Contact support on WhatsApp">
        <WhatsappIcon className="h-6 w-6 text-white" />
      </Link>
    </Button>
  );
}
