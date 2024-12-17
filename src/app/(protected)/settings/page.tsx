import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import React from "react";

export default async function page() {
  const session = await auth();

  const handleFormSubmit = async () => {
    "use server";
    await signOut();
  };

  return (
    <>
      <div>{JSON.stringify(session)}</div>
      <div>
        <form action={handleFormSubmit}>
          <Button type="submit">Sign Out</Button>
        </form>
      </div>
    </>
  );
}
