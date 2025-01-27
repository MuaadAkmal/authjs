"use server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { redirect } from "next/navigation";

export const getMyProfile = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  try {
    const profile = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    return profile;
  } catch (error) {
    console.error("Get profile error:", error);
    return {
      message: error instanceof Error ? error.message : "Failed to get profile",
    };
  }
};

export const getMyEmpId = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  try {
    const empId = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      select: {
        emp_id: true,
      },
    });
    return empId;
  } catch (error) {
    console.error("Get emp_id error:", error);
    return {
      message: error instanceof Error ? error.message : "Failed to get emp_id",
    };
  }
};
