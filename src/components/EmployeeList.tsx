"use client";
import EmployeeCard from "./EmployeeCard";
import { ScrollArea } from "./ui/scroll-area";
import { useEmployee } from "@/lib/hooks";

export default function EmployeeList() {
  const { employees } = useEmployee();

  return (
    <ScrollArea className="h-[calc(100vh-250px)] rounded-md border border-gray-150 bg-zinc-100 p-4">
      {employees.length === 0 ? (
        <p className="text-center text-gray-500">No Employee found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {employees.map((employee) => (
            <EmployeeCard key={employee.name} employee={employee} />
          ))}
        </div>
      )}
    </ScrollArea>
  );
}
