import Header from "@/components/Header";
import ProfileProvider from "@/context/profileProvider";
import QueryProvider from "@/context/queryProvider";
export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>
        <Header />
      </div>
      <div className="flex-grow">
        <QueryProvider>
          <ProfileProvider>{children}</ProfileProvider>
        </QueryProvider>
      </div>
    </>
  );
}
