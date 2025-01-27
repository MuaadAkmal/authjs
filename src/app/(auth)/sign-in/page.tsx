import { Suspense } from "react";
import { SignInForm } from "@/components/SignInForm";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center h-screen p-6">
      <Suspense fallback={<LoadingSpinner />}>
        <SignInForm />
      </Suspense>
    </div>
  );
}
