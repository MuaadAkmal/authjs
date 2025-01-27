import ServerStatus from "@/components/ServerStatus";
import ServerPingStatus from "@/components/ServerPingStatus";
import ServerList from "@/components/ServerList";
import ServerContextProvider from "@/context/serverProvidor";
import { getServers } from "@/serverActions/actions";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function page() {
  const session = await auth();
  if (!session?.user) {
    redirect("/sign-in");
  }

  const servers = await getServers();

  if ("message" in servers) {
    return (
      <div className="max-w-6xl mx-auto   space-y-4">
        Error: {servers.message}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto   space-y-4">
      <ServerContextProvider>
        <div className="flex flex-col md:flex-row w-full grow justify-evenly">
          <ServerStatus />
          <ServerPingStatus />
        </div>
        <div>
          <ServerList />
        </div>
      </ServerContextProvider>
    </div>
  );
}
