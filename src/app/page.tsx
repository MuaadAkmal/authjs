"use client";
import LogingBtn from "@/components/auth/login-btn";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };

  return (
    <main className="flex flex-col justify-center items-center bg-sky-500 h-full w-full">
      <div className="space-y-6">
        <h1
          className={cn(
            "text-6xl font-semibold text-white drop-shadow-md  ",
            font.className
          )}
        >
          🔒 Auth
        </h1>
        <p className="text-white text-lg text-center">
          A auth setup with authjs
        </p>
        <LogingBtn mode="modal">
          <Button
            variant={"outline"}
            size={"lg"}
            onClick={handleClick}
            className="w-full mt-5"
          >
            Sign in
          </Button>
        </LogingBtn>
      </div>
    </main>
  );
}
