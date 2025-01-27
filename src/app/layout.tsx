import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";
export const metadata: Metadata = {
  title: "EISN",
  description: "Employee management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-b from-gray-100 to-gray-200 flex flex-col min-h-screen  mx-auto">
        <div className="flex-grow">
          <SessionProvider>{children}</SessionProvider>
        </div>
        <div>
          <Footer />
        </div>
        <Toaster position="top-right" duration={1000} />
      </body>
    </html>
  );
}
