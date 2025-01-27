import ProfileSection from "@/components/ProfileSection";
import { getMyProfile } from "@/serverActions/profileActions";
import { notFound, redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function page() {
  const session = await auth();
  if (!session?.user.id) {
    redirect("/sign-in");
  }

  const user = await getMyProfile();

  if (!user || "message" in user) {
    notFound();
  }

  return <div>{user && <ProfileSection user={user} />}</div>;
}
