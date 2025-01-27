"use client";

import { useState, useEffect } from "react";
import {
  CalendarDays,
  Clock,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getPunchRecordWrapper } from "@/serverActions/eisnAction";
import { useProfile } from "@/lib/hooks";
import { TPunchRecords } from "@/lib/types";

export default function PunchRecord() {
  const { profile } = useProfile();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [punchRecords, setPunchRecords] = useState<TPunchRecords[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function fetchPunchRecords() {
      if (profile?.emp_id && profile?.hashedPassword) {
        setIsLoading(true);
        try {
          const result = await getPunchRecordWrapper(
            profile.emp_id,
            profile.hashedPassword,
            selectedDate.getMonth() + 1,
            selectedDate.getFullYear()
          );
          if (result.success && result.data) {
            setPunchRecords(result.data);
          } else {
            console.error("Failed to fetch punch records:", result.message);
          }
        } catch (error) {
          console.error("Error fetching punch records:", error);
        } finally {
          setIsLoading(false);
        }
      }
    }

    fetchPunchRecords();
  }, [profile, selectedDate]);

  const changeMonth = (increment: number) => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + increment);
      return newDate;
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 ease-in-out">
      <div className="max-w-5xl mx-auto pt-8 px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-gray-800 shadow-xl rounded-lg overflow-hidden transition-colors duration-300 ease-in-out">
          <div className="p-6 sm:p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                Punch Records
              </h2>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => changeMonth(-1)}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                  {selectedDate.toLocaleString("default", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button
                  onClick={() => changeMonth(1)}
                  className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="text-center py-4 text-gray-600 dark:text-gray-400">
                  Loading...
                </div>
              ) : punchRecords.length > 0 ? (
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200">
                      <th className="px-4 py-3 text-left">
                        <div className="flex items-center gap-2">
                          <CalendarDays className="h-5 w-5" />
                          Date
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          Punch Time
                        </div>
                      </th>
                      <th className="px-4 py-3 text-left">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-5 w-5" />
                          Machine
                        </div>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {punchRecords.map((record, index) => (
                      <tr
                        key={index}
                        className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors duration-150"
                      >
                        <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                          {record.logDate.split(" ")[0]}
                        </td>
                        <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                          {"  "}
                          {record.logDate.split(" ")[1]}
                        </td>
                        <td className="px-4 py-3 text-gray-800 dark:text-gray-200">
                          {record.deviceId}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="text-center py-4 text-gray-600 dark:text-gray-400">
                  No records found for this month.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
