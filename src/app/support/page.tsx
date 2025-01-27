import SupportPageContent from "@/components/SupportPageContent";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function SupportPage() {
  const session = await auth();
  if (!session?.user.id) {
    redirect("/sign-in");
  }

  return <SupportPageContent session={session} />;
}
