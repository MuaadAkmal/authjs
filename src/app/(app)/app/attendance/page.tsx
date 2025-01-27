"use client";

import { useState } from "react";
import { Calendar } from "lucide-react";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isToday,
} from "date-fns";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useProfile } from "@/lib/hooks";
import { useAttendance } from "@/lib/queries";

type AttendanceRecord = {
  date: string;
  inTime: string;
  outTime: string;
  duration: string;
  lateComing: string;
  earlyGoing: string;
  status: string;
  punches: string;
};

export default function DetailedAttendancePage() {
  const currentYear = new Date().getFullYear();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { profile } = useProfile();

  const { data: attendanceData, isLoading } = useAttendance(
    profile?.emp_id || "",
    profile?.hashedPassword || "",
    selectedDate.getMonth() + 1,
    selectedDate.getFullYear()
  );

  const monthOptions = Array.from({ length: 12 }, (_, i) => {
    const date = new Date(currentYear, i, 1);
    return { value: i.toString(), label: format(date, "MMMM") };
  });

  const yearOptions = Array.from({ length: 5 }, (_, i) => {
    const year = currentYear - 2 + i;
    return { value: year.toString(), label: year.toString() };
  });

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(selectedDate),
    end: endOfMonth(selectedDate),
  });

  const handleMonthChange = (value: string) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), parseInt(value), 1));
  };

  const handleYearChange = (value: string) => {
    setSelectedDate(new Date(parseInt(value), selectedDate.getMonth(), 1));
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "present":
        return "bg-green-100 text-green-800";
      case "weeklyoff":
        return "bg-gray-100 text-gray-800";
      case "holiday":
        return "bg-blue-100 text-blue-800";
      case "on leave(cl)":
      case "present on leave(rhl)":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">Loading attendance records...</div>
    );
  }

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">
            Detailed Attendance
          </CardTitle>
          <div className="flex space-x-2">
            <Select
              onValueChange={handleYearChange}
              defaultValue={selectedDate.getFullYear().toString()}
            >
              <SelectTrigger className="w-[120px]">
                <SelectValue placeholder="Select year" />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((year) => (
                  <SelectItem key={year.value} value={year.value}>
                    {year.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              onValueChange={handleMonthChange}
              defaultValue={selectedDate.getMonth().toString()}
            >
              <SelectTrigger className="w-[160px]">
                <Calendar className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select month" />
              </SelectTrigger>
              <SelectContent>
                {monthOptions.map((month) => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>In Time</TableHead>
                <TableHead>Out Time</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Late/Early</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Punches</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {daysInMonth.map((day) => {
                const dateString = format(day, "dd/MM/yyyy");
                //console.log(attendanceData?.data);
                const record = (
                  (attendanceData?.data as AttendanceRecord[]) || []
                ).find((r) => r.date == dateString) || {
                  date: dateString,
                  inTime: "",
                  outTime: "",
                  duration: "",
                  lateComing: "",
                  earlyGoing: "",
                  status: "N/A",
                  punches: "",
                };

                return (
                  <TableRow
                    key={dateString}
                    className={isToday(day) ? "bg-muted/50" : ""}
                  >
                    <TableCell>{format(day, "d MMMM yyyy")}</TableCell>
                    <TableCell>{record.inTime || "-"}</TableCell>
                    <TableCell>{record.outTime || "-"}</TableCell>
                    <TableCell>{record.duration || "-"}</TableCell>
                    <TableCell>
                      {record.lateComing && record.lateComing !== "-" && (
                        <Badge
                          variant="outline"
                          className="mr-2 text-yellow-600"
                        >
                          Late: {record.lateComing}
                        </Badge>
                      )}
                      {record.earlyGoing && record.earlyGoing !== "-" && (
                        <Badge variant="outline" className="text-red-600">
                          Early: {record.earlyGoing}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="secondary"
                        className={getStatusBadgeColor(record.status)}
                      >
                        {record.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {record.punches ? (
                        <Badge variant="outline" title={record.punches}>
                          {record.punches}
                        </Badge>
                      ) : (
                        "-"
                      )}
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
