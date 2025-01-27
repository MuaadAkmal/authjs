"use client";
import { EllipsisVertical } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { ServerDetailModal } from "@/components/ServerDetailModal";
import { useState } from "react";
import DetailDialog from "./DetailDialog";
import type { ServerWithPingStatus } from "@/context/serverProvidor";
import { useServers } from "@/lib/hooks";

type ServerItemProps = {
  server: ServerWithPingStatus;
};

export default function ServerItem({ server }: ServerItemProps) {
  const [openEdit, setOpenEdit] = useState(false);
  const { setSelectedServer } = useServers();

  const getStatusColor = (status?: boolean) => {
    if (status === undefined) return "bg-gray-500";
    return status ? "bg-green-500" : "bg-red-500";
  };

  return (
    <li
      className="bg-white w-full h-full rounded-lg shadow-md p-2 ring-1 ring-black/10 hover:shadow-xl transition-all"
      onClick={() => setSelectedServer(server)}
    >
      <div className="flex w-full items-center">
        <div className="flex-col gap-y-4 w-full items-stretch">
          <div className="flex gap-3 items-center justify-between">
            <div className="flex gap-3 items-center">
              <div
                className={`w-4 h-4 rounded-full ${getStatusColor(
                  server.pingStatus?.status
                )}`}
              ></div>
              <Dialog>
                <DialogTrigger asChild>
                  <p className="cursor-pointer hover:scale-105 transition-transform">
                    {server.name}
                  </p>
                </DialogTrigger>
                <DialogContent>
                  <DetailDialog selectedServer={server} />
                </DialogContent>
              </Dialog>
            </div>
            <Dialog open={openEdit} onOpenChange={setOpenEdit}>
              <DialogTrigger asChild>
                <EllipsisVertical className="h-4 w-4 text-gray-400 hover:text-black hover:scale-105 transition-all" />
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <ServerDetailModal type="edit" closeModal={setOpenEdit} />
              </DialogContent>
            </Dialog>
          </div>
          <div>
            <p className="ml-6 mt-2 text-sm text-gray-600">{server.ip}</p>
            {server.pingStatus && (
              <p className="ml-6 mt-1 text-xs text-gray-500">
                Ping: {server.pingStatus.ping_time_ms.toFixed(2)} ms
              </p>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}
