"use client";

import { useState } from "react";
import { GitForkIcon, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import GeneralHeader from "@/components/GeneralHeader";
import Header from "@/components/Header";
import BuyMeCoffeeDialog from "@/components/BuyMeCoffeeDialog";
import { Session } from "next-auth";

export default function SupportPageContent({ session }: { session: Session }) {
  const [isSupported, setIsSupported] = useState(false);

  const handleSupport = () => {
    setIsSupported(!isSupported);
  };

  return (
    <>
      {session.user.id ? <Header /> : <GeneralHeader />}
      <Card className="w-full max-w-3xl mx-auto overflow-hidden mt-12 my-6">
        <div className="p-6 sm:p-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter">
                Support My Work
              </h2>
              <p className="text-muted-foreground">
                If you find this tool helpful, consider buying me a coffee 😊.
                The code is open-source and available on GitHub, so you can also
                contribute by submitting a PR. Thanks for your support!
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 min-w-[200px]">
              <BuyMeCoffeeDialog />
              <Button
                variant="outline"
                className="gap-2 relative overflow-hidden"
                onClick={handleSupport}
              >
                <Heart
                  className={`h-5 w-5 transition-all duration-300 ease-in-out ${
                    isSupported ? "scale-0" : "scale-100"
                  }`}
                />
                <Heart
                  className={`h-5 w-5 absolute left-4 text-red-500 fill-red-500 transition-all duration-300 ease-in-out ${
                    isSupported ? "scale-100" : "scale-0"
                  }`}
                />
                Support
              </Button>
            </div>
          </div>
        </div>
        <div className="border-t bg-muted/50 p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="text-sm text-muted-foreground">
                Made with ❤️ by mdak
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <GitForkIcon className="h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
