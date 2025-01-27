"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Cake } from "lucide-react";
import { getBdayEmployees } from "@/serverActions/bdayAction";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { type User } from "@prisma/client";

export function EmployeeBirthdayWidget() {
  const [birthdayEmployees, setBirthdayEmployees] = useState<User[]>([]);
  useEffect(() => {
    const fetchBirthdayEmployees = async () => {
      try {
        const employees = await getBdayEmployees();
        if (employees) {
          setBirthdayEmployees(employees);
        }
      } catch (error) {
        console.error("Error fetching birthday employees:", error);
        toast.error("Error in fetching birthday employees");
      }
    };

    fetchBirthdayEmployees();
  }, []);

  return (
    <div>
      <Card className="w-full max-w-md">
        <CardHeader className="  text-black rounded-t-lg">
          <CardTitle className="flex items-center gap-2">
            <Cake className="text-xl font-semibold" />
            Birthday Buddies
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <ScrollArea className=" pr-4">
            <AnimatePresence>
              {birthdayEmployees.length > 0 ? (
                birthdayEmployees.map((employee, index) => (
                  <motion.div
                    key={employee.emp_id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center space-x-4 mb-4 last:mb-0"
                  >
                    <Avatar className="h-12 w-12 border-2 border-purple-200">
                      <AvatarImage
                        src={"/emp_img/" + employee.emp_id + ".jpg"}
                        alt={employee.name}
                      />
                      <AvatarFallback>
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {employee.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {employee.group}
                      </p>
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        delay: index * 0.1 + 0.2,
                      }}
                    >
                      <Cake className="h-5 w-5 text-pink-500" />
                    </motion.div>
                  </motion.div>
                ))
              ) : (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-muted-foreground py-8"
                >
                  No birthdays today!
                </motion.p>
              )}
            </AnimatePresence>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
