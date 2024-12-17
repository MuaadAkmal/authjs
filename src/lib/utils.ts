import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import prisma from "./db";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getUserByEmail(email: string) {
  try {
    const user = prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch {
    return null;
  }
}

export function getUserById(id: string) {
  try {
    const user = prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch {
    return null;
  }
}
