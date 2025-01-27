"use server";
import ping from "ping";
import { ipRegex } from "@/lib/utils";

export async function checkIp(ip: string) {
  try {
    if (!ip) {
      throw new Error("IP address is required.");
    }

    if (!ipRegex.test(ip)) {
      throw new Error("Invalid IP address.");
    }

    const result = await ping.promise.probe(ip);

    return {
      ip,
      status: result.alive,
      ping_time_ms: result.time,
    };
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : "Failed to ping IP",
    };
  }
}
