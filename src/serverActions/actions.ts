"use server";

import { signIn, signOut, auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { FilterType, ServerSchema, TComplaint } from "@/lib/types";
import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Prisma, Server } from "@prisma/client";

// auth actions
export const logIn = async (data: {
  emp_id: number;
  password: string;
  callBackUrl: string;
}) => {
  console.log("signing in", data);
  try {
    await signIn("credentials", {
      empId: data.emp_id.toString(),
      password: data.password,
      redirectTo: data.callBackUrl,
    });
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { success: false, message: "Invalid credentials" };
        default:
          return { success: false, message: "Error in signing in" };
      }
    }
    console.error("Sign in error:", error);
    throw error;
  }
};

export const logOut = async () => {
  await signOut({
    redirectTo: "/",
  });
};

export const searchQuery = async (query: string, filter: FilterType) => {
  try {
    console.log("searching", query, filter);
    const result = await prisma.user.findMany({
      where: {
        [filter]: {
          contains: query,
          mode: "insensitive",
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        emp_id: true,
        group: true,
        pbx: true,
        mobile: true,
        designation: true,
        direct_phone: true,
        joining_date: true,
        dob: true,
        location: true,
        residence_phone: true,
      },
    });
    return result;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return {
          message: "Invalid filter type",
        };
      }
    }
    console.error("Search query error:", error);
    return {
      message: "Error in executing search query",
    };
  }
};

export const getServers = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  try {
    const servers = await prisma.server.findMany({
      where: {
        userId: session.user?.id,
      },
    });
    return servers;
  } catch (error) {
    console.error("Get servers error:", error);
    return {
      message: "Error in fetching servers",
    };
  }
};

export const addServer = async (
  data: Omit<Server, "id" | "createdAt" | "updatedAt" | "userId">
) => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const validatedServer = ServerSchema.safeParse(data);
  if (!validatedServer.success) {
    return {
      message: "Invalid Server data",
    };
  }

  try {
    await prisma.server.create({
      data: {
        ...validatedServer.data,
        User: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
    revalidatePath("/app/server");
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return {
          message: "Server with same IP already exists",
        };
      }
    }
    console.error("Add server error:", error);
    return {
      message: "Error in creating server",
    };
  }
};

export const updateServer = async (
  id: string,
  data: Omit<Server, "id" | "createdAt" | "updatedAt" | "userId">
) => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const validatedServer = ServerSchema.safeParse(data);
  if (!validatedServer.success) {
    return {
      message: "Invalid Server data",
    };
  }

  try {
    const serverExists = await prisma.server.findUnique({
      where: { id },
    });

    if (!serverExists) {
      return {
        success: false,
        message: `Server with id ${id} not found`,
      };
    }

    await prisma.server.update({
      where: {
        id,
        User: {
          id: session.user.id,
        },
      },
      data: validatedServer.data,
    });

    revalidatePath("/app/server");
  } catch (error) {
    console.error("Update server error:", error);
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to update server",
    };
  }
};

export const deleteServer = async (id: string) => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  try {
    await prisma.server.delete({
      where: {
        id,
        userId: session.user.id,
      },
    });
    revalidatePath("/app/server");
  } catch (error) {
    console.error("Delete server error:", error);
    return {
      message: "Error in deleting server",
    };
  }
};

export const registerComplaint = async (data: TComplaint) => {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  try {
    await fetch("https://ntfy.sh/cms_server_app", {
      method: "POST",
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.error("Register complaint error:", error);
    return {
      message: "Error in registering complaint",
    };
  }
};

export async function addTask(message: string) {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }
  try {
    return prisma.taskNote.create({
      data: {
        message,
        createdAt: new Date(),
        checked: false,
        User: {
          connect: {
            id: session.user.id,
          },
        },
      },
    });
  } catch (error) {
    console.error("Add task error:", error);
    return {
      message: "Error in adding task",
    };
  }
}

export async function getTasks() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  try {
    return prisma.taskNote.findMany({
      where: {
        userId: session.user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Get tasks error:", error);
    return {
      message: "Error in fetching tasks",
    };
  }
}

export async function toggleTask(id: string) {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }
  try {
    const task = await prisma.taskNote.findUnique({
      where: { id, userId: session.user.id },
    });
    if (!task) throw new Error("Task not found");

    return prisma.taskNote.update({
      where: { id },
      data: { checked: !task.checked },
    });
  } catch (error) {
    console.error("Toggle task error:", error);
    return {
      message: "Error in toggling task",
    };
  }
}

export async function deleteTask(id: string) {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  try {
    return prisma.taskNote.delete({
      where: { id, userId: session.user.id },
    });
  } catch (error) {
    console.error("Delete task error:", error);
    return {
      message: "Error in deleting task",
    };
  }
}

export async function getLatestNotifications() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  try {
    return prisma.notices.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
    });
  } catch (error) {
    console.error("Get notifications error:", error);
    return {
      message: "Error in fetching notifications",
    };
  }
}

// menu actions

export async function getTodaysMenu() {
  // todays data time at mmorning 6 am
  const today = new Date();
  today.setHours(6, 0, 0, 0);
  const tomrrow = new Date(today);
  tomrrow.setDate(tomrrow.getDate() + 1);

  try {
    const response = await prisma.canteenMenu.findFirst({
      where: {
        updatedAt: {
          gte: today,
          lt: tomrrow,
        },
      },
      take: 1,
      orderBy: {
        updatedAt: "desc",
      },
    });
    return response;
  } catch (error) {
    console.error("Get todays menu error:", error);
    return {
      message: "Error in fetching todays menu",
    };
  }
}
