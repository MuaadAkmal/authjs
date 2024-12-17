"use client";
import React from "react";
import { Button } from "../ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/lib/routeRule";

export default function Social() {
  return (
    <div className=" flex items-center w-full gap-x-2">
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={async () => {
          signIn("google", {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
          });
        }}
      >
        <FcGoogle className="w-5 h-5" />
      </Button>
      <Button
        size={"lg"}
        className="w-full"
        variant={"outline"}
        onClick={async () => {
          signIn("github", {
            callbackUrl: DEFAULT_LOGIN_REDIRECT,
          });
        }}
      >
        <FaGithub className="w-5 h-5" />
      </Button>
    </div>
  );
}
