"use client";

import { TPunchRecords } from "@/lib/types";
import { getPunchRecordWrapper } from "@/serverActions/eisnAction";
import { getMyProfile } from "@/serverActions/profileActions";
import {
  totalClockedInTimeInLastWeek,
  totalClockedInTimeTillToday,
} from "@/serverActions/timeActions";
import { User } from "@prisma/client";
import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from "react";
import { toast } from "sonner";

type TProfile = {
  profile: User | null;
  setProfile: (profile: User | null) => void;
  isLoading: boolean;
  refetchProfile: () => Promise<void>;
  currentMonthPunchRecords: TPunchRecords[] | null;
  isLoadingPunchRecords: boolean;
  weeklyTime: TWeeklyTime;
  lastWeekTime: TWeeklyTime;
  lastPunch: TPunchRecords | null;
};

type TWeeklyTime = {
  date: string;
  policyTime: number;
  beyondPolicyTime: number;
}[];

export const profileContext = createContext<TProfile | null>(null);

export default function ProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lastPunch, setLastPunch] = useState<TPunchRecords | null>(null);
  const [profile, setProfile] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentMonthPunchRecords, setCurrentMonthPunchRecords] = useState<
    TPunchRecords[] | null
  >(null);
  const [weeklyTime, setWeeklyTime] = useState<TWeeklyTime>([]);
  const [lastWeekTime, setLastWeekTime] = useState<TWeeklyTime>([]);
  const [isLoadingPunchRecords, setIsLoadingPunchRecords] = useState(false);
  // profile handling part
  const fetchProfile = useCallback(async () => {
    setIsLoading(true);
    try {
      const user = await getMyProfile();
      if (!user) {
        throw new Error("Failed to fetch profile");
      } else if ("message" in user) {
        throw new Error(user.message);
      }
      setProfile(user);
    } catch (error) {
      console.error("Failed to fetch profile:", error);
      toast.error("Failed to fetch profile");
      setProfile(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refetchProfile = useCallback(() => fetchProfile(), [fetchProfile]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const getCurrentMonthPunchRecords = useCallback(async () => {
    if (!profile?.emp_id || !profile?.hashedPassword) return;

    setIsLoadingPunchRecords(true);
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();

    // Get the previous month and year for edge cases where weeks cross over into the next month
    let previousMonth = currentMonth - 1;
    let previousYear = currentYear;
    if (previousMonth === 0) {
      previousMonth = 12; // December
      previousYear -= 1; // Adjust year for December
    }

    try {
      // Fetch records for the current month
      const currentMonthResult = await getPunchRecordWrapper(
        profile.emp_id,
        profile.hashedPassword,
        currentMonth,
        currentYear
      );

      // Fetch records for the previous month
      const previousMonthResult = await getPunchRecordWrapper(
        profile.emp_id,
        profile.hashedPassword,
        previousMonth,
        previousYear
      );

      if (currentMonthResult.success && previousMonthResult.success) {
        const result = [
          ...(currentMonthResult.data || []),
          ...(previousMonthResult.data || []),
        ];
        setCurrentMonthPunchRecords(result);
        const timeClockedIn = await totalClockedInTimeTillToday(result);
        const lastWeekClockedInTime = await totalClockedInTimeInLastWeek(
          result
        );
        setLastPunch(result[0]);
        setLastWeekTime(lastWeekClockedInTime);
        setWeeklyTime(timeClockedIn);
      } else {
        throw new Error(
          currentMonthResult.message ||
            "Failed to fetch current month punch records"
        );
      }
    } catch (error) {
      console.error("Failed to fetch punch records:", error);
      toast.error("Failed to fetch punch records");
    } finally {
      setIsLoadingPunchRecords(false);
    }
  }, [profile?.emp_id, profile?.hashedPassword]);

  useEffect(() => {
    getCurrentMonthPunchRecords();
  }, [profile, getCurrentMonthPunchRecords]);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (currentMonthPunchRecords) {
        const timeLeft = await totalClockedInTimeTillToday(
          currentMonthPunchRecords
        );
        setWeeklyTime(timeLeft);
      }
    }, 180000); // 3 minutes in milliseconds

    return () => clearInterval(interval);
  }, [currentMonthPunchRecords]);

  const contextValue = useMemo(
    () => ({
      profile,
      setProfile,
      isLoading,
      refetchProfile,
      currentMonthPunchRecords,
      isLoadingPunchRecords,
      weeklyTime,
      lastWeekTime,
      lastPunch,
    }),
    [
      profile,
      isLoading,
      refetchProfile,
      currentMonthPunchRecords,
      isLoadingPunchRecords,
      weeklyTime,
      lastWeekTime,
      lastPunch,
    ]
  );

  return (
    <profileContext.Provider value={contextValue}>
      {children}
    </profileContext.Provider>
  );
}
