import EmployeeList from "@/components/EmployeeList";
import EmployeeSearchForm from "@/components/EmployeeSearchForm";
import React from "react";
import { EmployeeContextProvider } from "@/context/employeeSearchProvidor";
export default function Page() {
  return (
    <div className="max-w-7xl mx-auto bg-gray-50 m-4 p-8 rounded-md">
      <EmployeeContextProvider>
        <EmployeeSearchForm />
        <EmployeeList />
      </EmployeeContextProvider>
    </div>
  );
}
