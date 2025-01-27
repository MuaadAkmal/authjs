"use client";

import { useEffect, useRef, useCallback } from "react";
import confetti from "canvas-confetti";
import { getDate } from "@/serverActions/dateAction";

export default function ConfettiComp() {
  const fireworksIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const triggerFireworks = useCallback(() => {
    const duration = 1 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) =>
      Math.random() * (max - min) + min;

    fireworksIntervalRef.current = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        if (fireworksIntervalRef.current) {
          clearInterval(fireworksIntervalRef.current);
        }
        return;
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  }, []);

  useEffect(() => {
    const checkAndShowConfetti = async () => {
      const date = await getDate();
      const currentDate = new Date(date);
      const date27 = new Date("2025-01-27T00:00:00Z");
      const date28 = new Date("2025-01-28T23:59:59Z");

      if (currentDate >= date27 && currentDate <= date28) {
        triggerFireworks();
      }
    };

    checkAndShowConfetti();

    return () => {
      if (fireworksIntervalRef.current) {
        clearInterval(fireworksIntervalRef.current);
      }
    };
  }, [triggerFireworks]);

  return null; // This component doesn't render anything visible
}
