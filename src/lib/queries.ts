import {
  getAttendanceWrapper,
  getLeaveCardWrapper,
  getPunchRecordWrapper,
} from "@/serverActions/eisnAction";
import { useQuery } from "@tanstack/react-query";

export const useAttendance = (
  empid: string,
  hashedPassword: string,
  month: number,
  year: number
) => {
  return useQuery({
    queryKey: ["attendance", empid, hashedPassword, month, year],
    queryFn: async () => {
      return getAttendanceWrapper(empid, hashedPassword, month, year);
    },
  });
};

export const usePunchRecords = (
  empId: string | undefined,
  hashedPassword: string | undefined | null,
  month: number,
  year: number
) => {
  return useQuery({
    queryKey: ["punch", empId, hashedPassword, month, year],
    queryFn: async () => {
      if (!empId || !hashedPassword) {
        throw new Error("Employee ID or password is missing");
      }
      return getPunchRecordWrapper(empId, hashedPassword, month, year);
    },
    enabled: !!empId && !!hashedPassword,
  });
};

export const useLeaveCard = (
  empId: string | undefined,
  hashedPassword: string | undefined | null
) => {
  return useQuery({
    queryKey: ["leaveCard", empId, hashedPassword],
    queryFn: async () => {
      if (!empId || !hashedPassword) {
        throw new Error("Employee ID or password is missing");
      }
      return getLeaveCardWrapper(empId, hashedPassword);
    },
    enabled: !!empId && !!hashedPassword,
  });
};
