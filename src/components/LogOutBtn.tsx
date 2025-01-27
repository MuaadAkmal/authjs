"use client";
import { logOut } from "@/serverActions/actions";
import { LoaderCircle, LogOut } from "lucide-react";
import { useTransition } from "react";

export default function LogOutBtn() {
  const [isPending, startTransition] = useTransition();
  async function handleClick() {
    startTransition(async () => {
      await logOut();
    });
  }

  return (
    <>
      <button className="flex gap-2 items-center w-full " onClick={handleClick}>
        {isPending ? (
          <LoaderCircle className="w-[15px] h-[15px] animate-spin" />
        ) : (
          <LogOut className="w-[15px] h-[15px]" />
        )}
        <span>Log out</span>
      </button>
    </>
  );
}
