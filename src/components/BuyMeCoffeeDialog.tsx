"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Coffee, Copy, Check } from "lucide-react";
// import Image from "next/image";

export default function BuyMeCoffeeDialog() {
  const [isCopied, setIsCopied] = useState(false);
  const upiId = "muaadkc2093@oksbi";

  const handleCopy = () => {
    navigator.clipboard.writeText(upiId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <Coffee className="h-5 w-5" />
          Buy me a coffee
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Buy me a Coffee</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col items-center space-y-4">
          {/* <Image
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(
              upiId
            )}`}
            alt="QR Code"
            width={200}
            height={200}
          /> */}
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="icon" onClick={handleCopy}>
              {isCopied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
