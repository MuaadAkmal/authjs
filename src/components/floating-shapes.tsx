"use client";

import { motion } from "framer-motion";

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main color blobs */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-blue-200"
        style={{
          filter: "blur(80px)",
          top: "-10%",
          left: "-10%",
          opacity: 0.7,
        }}
      />
      <div
        className="absolute w-[600px] h-[600px] rounded-full bg-pink-200"
        style={{
          filter: "blur(80px)",
          bottom: "-20%",
          right: "-10%",
          opacity: 0.7,
        }}
      />
      <div
        className="absolute w-[400px] h-[400px] rounded-full bg-yellow-100"
        style={{
          filter: "blur(80px)",
          top: "40%",
          left: "50%",
          transform: "translateX(-50%)",
          opacity: 0.5,
        }}
      />

      {/* Floating shapes */}
      <motion.div
        className="absolute w-24 h-24 rounded-full border-4 border-gray-300"
        style={{
          top: "20%",
          left: "20%",
        }}
        animate={{
          y: [0, -20, 0],
          rotate: [0, 360],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute w-32 h-32 bg-gray-100"
        style={{
          top: "60%",
          right: "15%",
          borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
        }}
        animate={{
          rotate: [0, -360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute w-20 h-20 bg-gray-200"
        style={{
          bottom: "25%",
          left: "10%",
          borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
        }}
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
      <motion.div
        className="absolute w-16 h-16 rounded-full bg-gray-100 opacity-60"
        style={{
          top: "15%",
          right: "20%",
        }}
        animate={{
          y: [0, 30, 0],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
}
