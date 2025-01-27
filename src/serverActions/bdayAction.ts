"use server";

import prisma from "@/lib/db";
import { toast } from "sonner";

export async function getBdayEmployees() {
  try {
    const today = new Date();
    const employees = await prisma.user.findMany({
      where: {
        dob: {
          gte: new Date(today.setHours(0, 0, 0, 0)),
          lt: new Date(today.setHours(24, 0, 0, 0)),
        },
      },
    });
    return employees;
  } catch (error) {
    console.error("Get bday employees error:", error);
    toast.error("Error in fetching birthday employees");
  }
}
