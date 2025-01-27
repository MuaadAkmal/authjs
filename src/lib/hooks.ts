"use client";
import { useContext, useEffect, useState } from "react";
import { employeeSearchContext } from "@/context/employeeSearchProvidor";
import { serverContext } from "@/context/serverProvidor";
import { useQueries } from "@tanstack/react-query";
 
import { checkIp } from "@/serverActions/pingAction";
import { profileContext } from "@/context/profileProvider";

export const useEmployee = () => {
  const context = useContext(employeeSearchContext);
  if (!context) {
    throw new Error("useEmployee must be used within a EmployeeProvider");
  }
  return context;
};

export const useServers = () => {
  const context = useContext(serverContext);
  if (!context) {
    throw new Error("useServers must be used within a ServerProvider");
  }
  return context;
};

export const useDebouncedValue = <T>(initialValue: T, delay: number) => {
  const [value, setValue] = useState<T>(initialValue);
  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(initialValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [initialValue, delay]);

  return [value, setValue] as const;
};

// tansctack/react-query
export const useServerPingStatus = (ip: string[]) => {
  return useQueries({
    queries: ip.map((ipAddress) => ({
      queryKey: ["ping", ipAddress],
      queryFn: async () => {
        const response = await checkIp(ipAddress);
        return response;
      },
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
    })),
  });
};

export const useProfile = () => {
  const context = useContext(profileContext);
  if (!context) {
    throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
