"use client";
import { useCallback, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { FilterType } from "@/lib/types";
import { Search, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { searchQuery } from "@/serverActions/actions";
import { useEmployee, useDebouncedValue } from "@/lib/hooks";

export default function EmployeeSearchForm() {
  //state
  const [activeFilter, setActiveFilter] = useState<FilterType>("name");
  const [debouncedValue, setDebouncedValue] = useDebouncedValue("", 1000);
  const { setEmployees } = useEmployee();
  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    setDebouncedValue("");
  };
  //handlers
  const handleSubmit = useCallback(async () => {
    const query = debouncedValue;
    const filter = activeFilter;

    if (!query) return;
    const employees = await searchQuery(query, filter);
    if (employees instanceof Array) setEmployees(employees);
    //console.log("db queried", employees);
  }, [debouncedValue, activeFilter, setEmployees]);

  useEffect(() => {
    handleSubmit();
  }, [debouncedValue, activeFilter, handleSubmit]);

  return (
    <form className="relative">
      <Input
        type="text"
        placeholder="Search employees..."
        value={debouncedValue}
        onChange={(e) => setDebouncedValue(e.target.value)}
        className=" bg-white mb-4 pl-10 pr-4 py-2 w-full border border-gray-200 rounded-full text-lg focus:outline-none focus:ring-2 focus:ring-gray-200 focus:border-transparent"
        spellCheck="false"
      />
      <Search className="absolute left-3 top-[18px] transform -translate-y-1/2 text-gray-400" />
      {debouncedValue && (
        <button
          onClick={() => setDebouncedValue("")}
          className="absolute right-2 top-[17px] transform -translate-y-1/2 p-1  "
        >
          <X className="h-4 w-4 hover:text-red-600" />
        </button>
      )}
      <div className="flex space-x-2 mb-4">
        <Badge
          variant={activeFilter === "name" ? "default" : "outline"}
          className="cursor-pointer "
          onClick={() => handleFilterChange("name")}
        >
          Name
        </Badge>
        <Badge
          variant={activeFilter === "email" ? "default" : "outline"}
          className="cursor-pointer "
          onClick={() => handleFilterChange("email")}
        >
          Email
        </Badge>
        <Badge
          variant={activeFilter === "group" ? "default" : "outline"}
          className="cursor-pointer "
          onClick={() => handleFilterChange("group")}
        >
          Group
        </Badge>
        <Badge
          variant={activeFilter === "pbx" ? "default" : "outline"}
          className="cursor-pointer "
          onClick={() => handleFilterChange("pbx")}
        >
          PBX
        </Badge>
      </div>
    </form>
  );
}
