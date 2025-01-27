"use client";
import { Plus, RefreshCw } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Dialog, DialogTrigger } from "./ui/dialog";
import { ServerDetailModal } from "@/components/ServerDetailModal";
import { useState } from "react";
import { Button } from "./ui/button";
import ServerItem from "./ServerItem";
import { useServers } from "@/lib/hooks";

export default function ServerList() {
  const [openAdd, setOpenAdd] = useState(false);
  const { servers, pingAllServers, isPinging }  = useServers();

   
 

  return (
    <Card className="max-w-6xl mx-auto">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <div>Server List</div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={pingAllServers}
              disabled={isPinging}
            >
              <RefreshCw
                className={`h-4 w-4 ${isPinging ? "animate-spin" : ""}`}
              />
            </Button>
            <Dialog open={openAdd} onOpenChange={setOpenAdd}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <ServerDetailModal type="add" closeModal={setOpenAdd} />
            </Dialog>
          </div>
        </CardTitle>
        <CardDescription>Manage and monitor your servers</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {servers.map((server) => (
            <ServerItem key={server.id} server={server} />
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
