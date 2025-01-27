import { z } from "zod";
import { ipRegex } from "./utils";

export type FilterType = "name" | "email" | "pbx" | "group";

export const ServerSchema = z.object({
  name: z.string().min(1, "Name is required"),
  ip: z
    .string()
    .min(1, "IP address is required")
    .refine((val) => ipRegex.test(val), {
      message: "Invalid IP address format",
    }),
  WAN: z
    .string()
    .nullable()
    .optional()
    .refine((val) => !val || ipRegex.test(val), {
      message: "Invalid WAN IP address format",
    }),
  sshcmd: z.string().nullable().optional(),
  cpu: z.string().nullable().optional(),
  storage: z.string().nullable().optional(),
  memory: z.string().nullable().optional(),
});

export type TServerDetails = z.infer<typeof ServerSchema>;

export type TComplaint = {
  name: string;
  email: string;
  message: string;
  supportType: "complaint" | "assistance";
};

export type TAttendance = {
  date: string;
  inTime: string;
  outTime: string;
  duration: string;
  lateComing: string;
  earlyGoing: string;
  status: string;
  punches: string;
};

export type TPunchRecords = {
  emp_id: string;
  logDate: string;
  deviceId: string;
};

export type LeaveType = {
  from: string | null;
  to: string | null;
  purpose: string | null;
  type: string | null;
  days: number | null;
  balance: number | null;
};

export type TLeaveCard = {
  name: string;
  staffNo: string;
  dateOfJoining: string;
  group: string;
  leaves: {
    earnedLeave: LeaveType[];
    halfPayLeave: LeaveType[];
    rhLeave: LeaveType[];
    casualLeave: LeaveType[];
    otherLeave: LeaveType[];
  };
  totalBalance: number;
};
