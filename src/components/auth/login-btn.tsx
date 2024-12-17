"use client";
import React from "react";

type LogginBtnProps = {
  children: React.ReactNode;
  mode: "redirect" | "modal";
  asChild?: boolean;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const LogingBtn = ({ children, mode, asChild }: LogginBtnProps) => {
  const handleClick = () => {
    if (mode === "modal") {
      return <span>TODO: Implement modal</span>;
    }
  };

  return (
    <span onClick={handleClick} className="cursor-pointer">
      {children}
    </span>
  );
};

export default LogingBtn;
