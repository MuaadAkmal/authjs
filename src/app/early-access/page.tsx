"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Send, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FloatingShapes } from "@/components/floating-shapes";

export default function EarlyAccessPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <div className="min-h-screen  text-black  overflow-hidden absolute inset-0">
        {/* Static background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-pink-50" />

        {/* Floating shapes */}
        <FloatingShapes />

        <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-center gap-2 mb-4"
            >
              <Sparkles className="h-6 w-6 text-gray-500" />
              <span className="text-sm font-medium text-gray-500">
                Coming Soon
              </span>
            </motion.div>

            <motion.h1
              className="text-6xl md:text-8xl font-bold mb-6 text-gray-800"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              Reimagined.
            </motion.h1>
            <motion.p
              className="text-xl text-gray-700 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Get ready for a revolutionary experience. Sign up for early access
              and be the first to explore the future.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative w-full max-w-md mx-auto"
          >
            {/* Card backdrop blur */}
            <div className="absolute inset-0 bg-white/50 backdrop-blur-xl rounded-lg" />

            <Card className="relative bg-white/80 backdrop-blur-sm border-white/20 shadow-xl">
              <CardHeader>
                <CardTitle className="text-gray-800">
                  Get Early Access
                </CardTitle>
                <CardDescription>
                  Join the waitlist and be the first to know when we launch.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {!submitted ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                        className="bg-white/50"
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full group bg-black hover:bg-gray-800 text-white"
                    >
                      Request Access
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-center gap-2 text-green-600 py-4"
                  >
                    <Send className="h-5 w-5" />
                    <span>
                      Thanks for registering! {"We'll"} get back to you soon.
                    </span>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          <motion.footer
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="absolute bottom-8 left-0 right-0 text-center text-sm text-gray-500"
          >
            © 2023 Reimagined. All rights reserved.
          </motion.footer>
        </div>
      </div>
    </>
  );
}
