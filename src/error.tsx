"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
          >
            <AlertTriangle className="w-16 h-16 text-black mx-auto" />
          </motion.div>
          <CardTitle className="text-2xl font-bold text-center mt-4 text-black">
            Oops! Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent>
          <motion.p
            className="text-center text-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            We apologize for the inconvenience. Our team has been notified and
            is working on fixing the issue.
          </motion.p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => reset()}
              className="bg-black text-white hover:bg-gray-800 transition-colors duration-200"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </div>
  );
}
