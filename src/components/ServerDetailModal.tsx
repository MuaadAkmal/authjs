"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useServers } from "@/lib/hooks";
import { ServerSchema, TServerDetails } from "@/lib/types";

type ServerDetailModalProps = {
  type: "edit" | "add";
  closeModal: (value: boolean) => void;
};

export function ServerDetailModal({
  type,
  closeModal,
}: ServerDetailModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    selectedServer,
    handleAddServer,
    handleUpdateServer,
    handleDeleteServer,
  } = useServers();

  const {
    register,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<TServerDetails>({
    resolver: zodResolver(ServerSchema),
    defaultValues: {
      name: selectedServer?.name || "",
      ip: selectedServer?.ip || "",
      WAN: selectedServer?.WAN || "",
      sshcmd: selectedServer?.sshcmd || "",
      cpu: selectedServer?.cpu || "",
      storage: selectedServer?.storage || "",
      memory: selectedServer?.memory || "",
    },
  });

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const isValid = await trigger();

      if (!isValid) {
        toast.error("Please check the form for errors");
        return;
      }

      const data = {
        ...getValues(),
        WAN: getValues().WAN || null,
        sshcmd: getValues().sshcmd || null,
        cpu: getValues().cpu || null,
        storage: getValues().storage || null,
        memory: getValues().memory || null,
      };

      if (type === "edit") {
        if (!selectedServer?.id) {
          throw new Error("No server selected for editing");
        }
        await handleUpdateServer(selectedServer.id, data).then(() => {
          closeModal(false);
        });
      } else if (type === "add") {
        await handleAddServer(data).then(() => {
          closeModal(false);
        });
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "An unexpected error occurred";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>
          {type === "edit" ? "Edit Server" : "Add Server"}
        </DialogTitle>
        <DialogDescription>
          Make changes to your server configuration here.
        </DialogDescription>
      </DialogHeader>

      <form action={handleSubmit} className="space-y-4">
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <div className="col-span-3">
              <Input {...register("name")} id="name" />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="ip" className="text-right">
              IP Address
            </Label>
            <div className="col-span-3">
              <Input {...register("ip")} id="ip" />
              {errors.ip && (
                <span className="text-red-500 text-sm">
                  {errors.ip.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="WAN" className="text-right">
              WAN IP
            </Label>
            <div className="col-span-3">
              <Input {...register("WAN")} id="WAN" />
              {errors.WAN && (
                <span className="text-red-500 text-sm">
                  {errors.WAN.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="sshcmd" className="text-right">
              SSH
            </Label>
            <div className="col-span-3">
              <Input {...register("sshcmd")} id="sshcmd" />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="cpu" className="text-right">
              CPU
            </Label>
            <div className="col-span-3">
              <Input {...register("cpu")} id="cpu" />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="storage" className="text-right">
              Storage
            </Label>
            <div className="col-span-3">
              <Input {...register("storage")} id="storage" />
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="memory" className="text-right">
              Memory
            </Label>
            <div className="col-span-3">
              <Input {...register("memory")} id="memory" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-x-3">
          {type === "edit" && (
            <Button
              variant="destructive"
              onClick={() => {
                handleDeleteServer(selectedServer!.id);
              }}
            >
              Delete Server
            </Button>
          )}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer"
          >
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {type === "edit" ? "Update Server" : "Add Server"}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
}
