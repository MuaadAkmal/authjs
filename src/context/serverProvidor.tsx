"use client";
import {
  addServer,
  deleteServer,
  getServers,
  updateServer,
} from "@/serverActions/actions";
import { checkIp } from "@/serverActions/pingAction";
import { Server } from "@prisma/client";
import { createContext, useState, useEffect, useCallback } from "react";
import { toast } from "sonner";
import { handleError } from "@/lib/utils";

export type TServerDetails = Omit<
  Server,
  "id" | "createdAt" | "updatedAt" | "userId"
>;

export type ServerWithPingStatus = Server & {
  pingStatus?: {
    status: boolean;
    ping_time_ms: number;
  };
};

type ServerContextType = {
  servers: ServerWithPingStatus[];
  setServers: React.Dispatch<React.SetStateAction<ServerWithPingStatus[]>>;
  selectedServer: ServerWithPingStatus | null;
  setSelectedServer: React.Dispatch<
    React.SetStateAction<ServerWithPingStatus | null>
  >;
  handleAddServer: (server: TServerDetails) => Promise<void>;
  handleGetAllServers: () => Promise<void>;
  handleUpdateServer: (id: string, server: TServerDetails) => Promise<void>;
  handleDeleteServer: (id: string) => Promise<void>;
  pingAllServers: () => Promise<void>;
  isPinging: boolean;
};

export const serverContext = createContext<ServerContextType | null>(null);

export default function ServerContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [servers, setServers] = useState<ServerWithPingStatus[]>([]);
  const [selectedServer, setSelectedServer] =
    useState<ServerWithPingStatus | null>(null);
  const [isPinging, setIsPinging] = useState(false);

  const handleAddServer = async (server: TServerDetails) => {
    const error = await addServer(server);
    if (error) {
      handleError(error, "Error in adding server");
      return;
    } else {
      toast.success("Server added successfully");
      await handleGetAllServers();
    }
  };

  const handleGetAllServers = async () => {
    const result = await getServers();
    if ("message" in result) {
      handleError(result, "Error in fetching servers");
      toast.error("Error in fetching servers");

      return;
    }
    setServers(result);
  };

  const handleUpdateServer = async (id: string, server: TServerDetails) => {
    const error = await updateServer(id, server);
    if (error) {
      handleError(error, "Error in updating server");
      return;
    } else {
      toast.success("Server updated successfully");
      await handleGetAllServers();
    }
  };

  const handleDeleteServer = async (id: string) => {
    const error = await deleteServer(id);
    if (error) {
      handleError(error, "Error in deleting server");
      return;
    } else {
      toast.success("Server deleted successfully");
      await handleGetAllServers();
    }
  };

  const pingServer = useCallback(async (server: ServerWithPingStatus) => {
    const result = await checkIp(server.ip);
    if ("message" in result) {
      return { ...server, pingStatus: { status: false, ping_time_ms: 0 } };
    }
    const ping_time_ms =
      typeof result.ping_time_ms === "number" ? result.ping_time_ms : 0;
    return {
      ...server,
      pingStatus: { status: result.status, ping_time_ms },
    };
  }, []);

  const pingAllServers = useCallback(async () => {
    setIsPinging(true);
    try {
      const updatedServers = await Promise.all(servers.map(pingServer));
      setServers(updatedServers);
    } catch (error) {
      handleError(error, "Error pinging servers");
    } finally {
      setIsPinging(false);
    }
  }, [servers, pingServer]);

  useEffect(() => {
    const interval = setInterval(() => {
      pingAllServers();
    }, 5 * 60 * 1000); // 5 minutes

    return () => clearInterval(interval);
  }, [pingAllServers]);

  useEffect(() => {
    handleGetAllServers();
  }, []);

  return (
    <serverContext.Provider
      value={{
        servers,
        setServers,
        selectedServer,
        setSelectedServer,
        handleAddServer,
        handleGetAllServers,
        handleUpdateServer,
        handleDeleteServer,
        pingAllServers,
        isPinging,
      }}
    >
      {children}
    </serverContext.Provider>
  );
}
