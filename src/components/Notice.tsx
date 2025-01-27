"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RefreshCw, ChevronRight } from "lucide-react";
import { getLatestNotifications } from "@/serverActions/actions";
import { notices } from "@prisma/client";
import { toast } from "sonner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { ImageDialog } from "./ImageDialog";

dayjs.extend(relativeTime);

export default function Notice() {
  const [notices, setNotices] = useState<notices[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function fetchNotices() {
    try {
      setIsRefreshing(true);
      const response = await getLatestNotifications();
      if ("message" in response) {
        toast.error(response.message);
        return;
      }
      setNotices(response);
    } catch (error) {
      toast.error("Failed to fetch notices , Server Busy !");
      console.error("Failed to fetch notices: ", error);
    } finally {
      setIsRefreshing(false);
    }
  }

  useEffect(() => {
    fetchNotices();
  }, []);

  const refreshNotices = () => {
    fetchNotices();
  };

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="border-b border-gray-200">
        <CardTitle className="text-lg font-semibold flex items-center justify-between">
          <span className="flex items-center text-black tracking-tight text-xl font-semibold">
            Important Notices
          </span>
          <div>
            <Button
              onClick={refreshNotices}
              variant="ghost"
              size="sm"
              disabled={isRefreshing}
              className="text-gray-600 hover:text-gray-800 hover:bg-gray-200 transition-colors duration-200"
            >
              <RefreshCw
                className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
              />
            </Button>
            <ImageDialog />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[300px]">
          {notices.map((notice, index) => {
            const isNew = dayjs().diff(dayjs(notice.createdAt), "minute") < 5;
            return (
              <div
                key={notice.id}
                className={`p-4 ${
                  index !== notices.length - 1 ? "border-b border-gray-100" : ""
                } hover:bg-gray-50 transition-colors duration-200`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-medium text-gray-800">
                    {notice.title}
                    {isNew && <Badge className="ml-2">New</Badge>}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {dayjs.unix(dayjs(notice.createdAt).unix()).fromNow()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{notice.message}</p>
                {notice.slug && (
                  <Link
                    href={notice.slug}
                    className="p-0 h-auto text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Read more <ChevronRight className="w-3 h-3 ml-1" />
                  </Link>
                )}
              </div>
            );
          })}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
