"use client";

import { useMemo } from "react";
import { useServers } from "@/lib/hooks";

export default function ServerStatus() {
  const context = useServers();

  const { servers } = context;

  const { up, down, maintenance } = useMemo(() => {
    return servers.reduce(
      (acc, server) => {
        if (!server.pingStatus) {
          acc.maintenance++;
        } else if (server.pingStatus.status) {
          acc.up++;
        } else {
          acc.down++;
        }
        return acc;
      },
      { up: 0, down: 0, maintenance: 0 }
    );
  }, [servers]);

  return (
    <div className="container bg-white w-full h-96 ring-1 ring-gray-300 p-4 m-4 shadow-lg rounded-xl">
      <h1 className="text-lg font-bold mb-4 m-2">Server Status</h1>
      <div className="flex flex-wrap items-center gap-4 m-4">
        <div className="basis-20 grow bg-green-100 flex-col items-center justify-center px-6 py-4 rounded-md hover:scale-105 transition-transform">
          <p className="text-green-500 text-xl font-bold text-center">{up}</p>
          <p className="text-green-500 font-semibold text-sm text-center tracking-wider">
            Up
          </p>
        </div>
        <div className="basis-20 grow bg-red-100 flex-col items-center justify-center px-6 py-4 rounded-md hover:scale-105 transition-transform">
          <p className="text-red-500 text-xl font-bold text-center">{down}</p>
          <p className="text-red-500 font-semibold text-sm text-center tracking-wider">
            Down
          </p>
        </div>
        <div className="basis-20 grow bg-amber-100 flex-col items-center justify-center px-6 py-4 rounded-md hover:scale-105 transition-transform">
          <p className="text-amber-500 text-xl font-bold text-center">
            {maintenance}
          </p>
          <p className="text-amber-500 font-semibold text-sm text-center tracking-wider">
            Maintenance
          </p>
        </div>
      </div>
    </div>
  );
}
