"use client";

import { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { logIn } from "@/serverActions/actions";

const signInSchema = z.object({
  emp_id: z
    .string()
    .regex(/^\d+$/, "Employee ID must be a number")
    .transform((val) => parseInt(val, 10))
    .refine((val) => val >= 1000 && val <= 9999, {
      message: "Employee ID must be between 1000 and 9999",
    }),
  password: z.string().length(4, "Password must be exactly 4 characters"),
});

type SignInValues = z.infer<typeof signInSchema>;

export function SignInForm() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const callBackUrl = searchParams.get("callbackUrl") || "/app/dashboard";
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: SignInValues) {
    if (isLoading) return;
    setIsLoading(true);
    try {
      await logIn({ ...data, callBackUrl });
    } catch (error) {
      console.error("Sign in error:", error);
      if (error instanceof Error) {
        toast.error("Sign in failed: " + error.message);
      } else {
        toast.error("Sign in failed");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full max-w-md shadow-lg p-4">
      <CardHeader className="space-y-1">
        <CardTitle className="text-3xl font-bold text-center text-primary">
          Sign In
        </CardTitle>
        <CardDescription className="text-center text-muted-foreground">
          Use your MIS level II credentials
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="emp_id" className="text-sm font-medium">
              Employee ID
            </Label>
            <Input
              id="emp_id"
              type="text"
              placeholder="Enter your employee ID"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
              {...register("emp_id")}
            />
            {errors.emp_id && (
              <p className="text-sm text-destructive">
                {errors.emp_id.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-primary"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-sm text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" required />
              <Label htmlFor="terms" className="text-sm text-muted-foreground">
                I accept the{" "}
                <Link
                  href="/terms-and-conditions"
                  className="font-semibold text-primary hover:underline"
                >
                  terms and conditions
                </Link>
              </Label>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="newsletter" />
            <Label
              htmlFor="newsletter"
              className="text-sm text-muted-foreground"
            >
              I want to receive the newsletter
            </Label>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full text-lg font-semibold transition-all duration-300 ease-in-out transform hover:scale-105"
            type="button"
            disabled={isLoading}
            onClick={() => {
              handleSubmit(onSubmit)();
            }}
          >
            {isLoading ? (
              <>
                <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
