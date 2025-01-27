"use client";
import { createContext, useState } from "react";
import { User } from "@prisma/client";
export type RefinedUser = Omit<
  User,
  "hashedPassword" | "newsLetter" | "createdAt" | "updatedAt"
>;
type ContextType = {
  employees: RefinedUser[];
  setEmployees: (employees: RefinedUser[]) => void;
};

export const employeeSearchContext = createContext<ContextType | null>(null);

export function EmployeeContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [employees, setEmployees] = useState<RefinedUser[]>([]);

  return (
    <employeeSearchContext.Provider
      value={{
        employees,
        setEmployees,
      }}
    >
      {children}
    </employeeSearchContext.Provider>
  );
}
