"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Utensils, Coffee, Pizza, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { getTodaysMenu } from "@/serverActions/actions";
import { toast } from "sonner";
import { canteenMenu } from "@prisma/client";

export function CanteenMenuWidget() {
  const [menu, setMenu] = useState<canteenMenu | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const data = await getTodaysMenu();
        if (data && "message" in data) {
          toast.error(data.message);
          throw new Error(data.message);
        }
        if (!data) throw new Error("No data found");
        setMenu(data);
      } catch (error) {
        toast.error("Failed to fetch menu");
        console.error("Failed to fetch menu:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  if (loading) {
    return (
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-semibold mb-2">
            {"Today's"} Menu
          </CardTitle>
          <Utensils className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent className="flex justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  if (!menu) {
    return null;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-lg font-semibold mb-2">
          {"Today's"} Menu
        </CardTitle>
        <Utensils className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent className="space-y-4">
        <AnimatePresence>
          {/* Breakfast Section */}
          <motion.div
            key="breakfast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <Coffee className="h-4 w-4" />
              <span>Breakfast</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {menu.breakfast?.split(",").map((item, i) => (
                <Badge
                  key={`breakfast-${i}`}
                  variant="secondary"
                  className="text-xs ring-1 ring-black/10 pointer-events-none"
                >
                  {item.trim()}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Lunch Section */}
          <motion.div
            key="lunch"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <Utensils className="h-4 w-4" />
              <span>Lunch</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {menu.lunch?.split(",").map((item, i) => (
                <Badge
                  key={`lunch-${i}`}
                  variant="secondary"
                  className="text-xs ring-1 ring-black/10 pointer-events-none"
                >
                  {item.trim()}
                </Badge>
              ))}
            </div>
          </motion.div>

          {/* Snacks Section */}
          <motion.div
            key="snacks"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <div className="flex items-center gap-2 text-sm font-medium">
              <Pizza className="h-4 w-4" />
              <span>Evening Snacks</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {menu.snacks?.split(",").map((item, i) => (
                <Badge
                  key={`snacks-${i}`}
                  variant="secondary"
                  className="text-xs ring-1 ring-black/10 pointer-events-none"
                >
                  {item.trim()}
                </Badge>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
