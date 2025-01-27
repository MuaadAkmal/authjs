import React from "react";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  redirect("/app/dashboard");

  return <div></div>;
}
