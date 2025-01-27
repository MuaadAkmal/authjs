"use client";
import {
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import React from "react";
import { DialogHeader } from "./ui/dialog";
import { Copy, Lock } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";
import { Button } from "./ui/button";
import { Server } from "@prisma/client";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { Badge } from "./ui/badge";

type DetailDialogProps = {
  selectedServer: Server;
};

export default function DetailDialog({ selectedServer }: DetailDialogProps) {
  const handleCopyClick = () => {
    if (selectedServer?.sshcmd) {
      console.log("Copied to clipboard", selectedServer.sshcmd);
      copyToClipboard(selectedServer.sshcmd);
    } else {
      toast.error("No SSH command available");
    }
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="font-bold text-xl mb-2">
          {selectedServer?.name}{" "}
        </DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <p>
          <strong>IP:</strong> {selectedServer?.ip}
        </p>
        <p>
          <strong>CPU:</strong> {selectedServer?.cpu}
        </p>
        <p>
          <strong>Storage:</strong> {selectedServer?.storage}
        </p>
        <p>
          <strong>WAN:</strong> {selectedServer?.WAN}
        </p>
        <p>
          <strong>SSH Command:</strong> {selectedServer?.sshcmd}
        </p>
        <p>
          <strong>Memory:</strong> {selectedServer?.memory}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="flex-1 cursor-pointer hover:shadow-lg  "
            onClick={handleCopyClick}
          >
            <Copy className="h-4 w-4 mr-2" />
            Copy SSH
          </Button>
          <Button className="flex-1 bg-yellow-700">
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <p className="flex gap-2">
                    <Lock className="h-4 w-4 mr-2" />
                    <span>Connect (Premium)</span>
                  </p>
                </TooltipTrigger>
                <TooltipContent side="top" sideOffset={15}>
                  <Badge className="z-200 ">
                    Connect with the
                    <br />
                    Maintainers to get the Access
                  </Badge>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </Button>
        </div>
      </div>
    </DialogContent>
  );
}
