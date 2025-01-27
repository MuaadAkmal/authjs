"use client";

import { useState } from "react";
import { Filter, RefreshCw, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useServers } from "@/lib/hooks";

export default function PingStatus() {
  const context = useServers();
  const [filterUp, setFilterUp] = useState(false);

  if (!context) {
    return null;
  }

  const { servers, pingAllServers, isPinging } = context;

  const handleFilter = () => {
    setFilterUp(!filterUp);
  };

  const filteredServers = filterUp
    ? servers.filter((server) => server.pingStatus?.status)
    : servers;

  return (
    <div
      className="container bg-white flex-col items-center justify-center w-full h-96 overflow-auto [&::-webkit-scrollbar]:w-1
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar]:rounded-full
      [&::-webkit-scrollbar-track]:scale-y-50
      [&::-webkit-scrollbar-thumb]:bg-gray-300 ring-1 ring-gray-300 p-4 m-4 shadow-lg rounded-xl"
    >
      <div className="flex justify-between mb-4 items-center">
        <h1 className="text-lg font-bold mb-4 m-2">Server Ping Status</h1>
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
          <Button
            variant="outline"
            size="icon"
            onClick={handleFilter}
            aria-pressed={filterUp}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="w-full">
        <table className="table-fixed w-full mx-auto text-sm font-normal">
          <thead className="space-y-2">
            <tr className="text-gray-400 tracking-wider">
              <th>Server</th>
              <th>Ping</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredServers.map((server) => (
              <tr
                key={server.id}
                className="hover:bg-gray-200 rounded-full transition-colors"
              >
                <td className="text-center p-4">{server.name}</td>
                <td className="text-center p-4">
                  {server.pingStatus?.status ? (
                    `${server.pingStatus.ping_time_ms.toFixed(2)}ms`
                  ) : (
                    <AlertCircle className="mx-auto" />
                  )}
                </td>
                <td className="text-center p-4">
                  <span
                    className={`inline-block w-3 h-3 rounded-full ${
                      server.pingStatus?.status
                        ? `bg-green-600 shadow-green-500`
                        : `bg-red-600 shadow-red-500`
                    }`}
                  ></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
