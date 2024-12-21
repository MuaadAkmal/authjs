"use client";

import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/hooks/auth";
import { signOut } from "next-auth/react";
import React from "react";

export default function Setting() {
  const handleClick = () => {
    signOut();
  };
  const user = useCurrentUser();

  return (
    <>
      <div>{JSON.stringify(user)}</div>
      <div>
        <Button onClick={handleClick}>Sign Out</Button>
      </div>
    </>
  );
}
