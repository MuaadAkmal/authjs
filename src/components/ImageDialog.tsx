"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { InfoIcon } from "lucide-react";
import Image from "next/image";

export function ImageDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <InfoIcon className="h-4 w-4" />
          <span className="sr-only">Open image dialog</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[575px]">
        <DialogHeader>
          <DialogTitle>Image Preview</DialogTitle>
          <DialogDescription>Weekly time Clock widget info</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <Image
            // src="/https://jam.dev/c/2f5a5d09-fdbe-457e-94a6-732aef486bd2"
            src="https://jam.dev/cdn-cgi/image/width=1600,quality=100,dpr=1/https://cdn-jam-screenshots.jam.dev/be078ef45b1a09d352e9ad7f7d7b614a/screenshot/0ceb0743-087b-4c87-ac75-cfec73035674.png"
            alt="Example image"
            width={800}
            height={600}
            className="rounded-md"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
