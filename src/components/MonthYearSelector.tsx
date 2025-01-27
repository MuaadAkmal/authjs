"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface MonthYearSelectorProps {
  initialMonth: number;
  initialYear: number;
  onSelect: (month: number, year: number) => void;
}

export function MonthYearSelector({
  initialMonth,
  initialYear,
  onSelect,
}: MonthYearSelectorProps) {
  const [month, setMonth] = useState(initialMonth);
  const [year, setYear] = useState(initialYear);

  useEffect(() => {
    onSelect(month, year);
  }, [month, year, onSelect]);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 5 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className="flex space-x-2">
      <Select
        value={month.toString()}
        onValueChange={(value) => setMonth(parseInt(value))}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((monthName, index) => (
            <SelectItem key={index + 1} value={(index + 1).toString()}>
              {monthName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select
        value={year.toString()}
        onValueChange={(value) => setYear(parseInt(value))}
      >
        <SelectTrigger className="w-[120px]">
          <SelectValue placeholder="Select year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
