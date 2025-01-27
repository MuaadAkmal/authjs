"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Clock,
  Calendar,
  ChevronDown,
  ChevronUp,
  ArrowLeft,
  ArrowRight,
  BarChart,
  Activity,
} from "lucide-react";
import { totalWeeklyHours, totalWeeklyHoursInLastWeek } from "@/lib/constants";
import { useProfile } from "@/lib/hooks";
import { motion, AnimatePresence } from "framer-motion";

export default function WeeklyTimeClock() {
  const { weeklyTime, lastWeekTime, lastPunch } = useProfile();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showLastWeek, setShowLastWeek] = useState(false);
  const selectedWeekData = showLastWeek ? lastWeekTime : weeklyTime;
  const clockedmilliSecond = selectedWeekData.reduce(
    (acc, { policyTime }) => acc + policyTime,
    0
  );

  const clockedHours = clockedmilliSecond / (1000 * 60 * 60);
  const totalWeeklyHour = showLastWeek
    ? totalWeeklyHoursInLastWeek()
    : totalWeeklyHours();
  const remainingMilliSeconds = showLastWeek
    ? 0
    : totalWeeklyHour * 60 * 60 * 1000 - clockedmilliSecond;

  const remainingHours = Math.floor(remainingMilliSeconds / (1000 * 60 * 60));
  const remainingMinutes = (Math.abs(remainingMilliSeconds) / (1000 * 60)) % 60;

  const percentVal = (clockedHours / totalWeeklyHour) * 100;
  const progressPercentage = percentVal > 100 ? 100 : percentVal;

  const totalBeyondPolicyTime = selectedWeekData.reduce(
    (acc, { beyondPolicyTime }) => acc + beyondPolicyTime,
    0
  );

  const dayOfWeek = (date: string) => {
    const [dayStr, monthStr, yearStr] = date.split("/");
    const month = parseInt(monthStr, 10) + 1;
    const formattedDateStr = `${month}/${dayStr}/${yearStr}`;
    const dayOfWeek = new Date(formattedDateStr).toLocaleDateString("en-US", {
      weekday: "long",
    });
    return dayOfWeek;
  };

  const formatTime = (milliseconds: number) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds / (1000 * 60)) % 60);
    return `${hours}h ${minutes}m`;
  };

  let totalResidualTime = 0;
  const totalPolicyTimeInMilliSeconds = 504 * 60 * 1000;
  let averageClockInTime = 0;

  return (
    <Card className="w-full max-h-sm h-full mx-auto">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-semibold flex items-center justify-between">
          <div className="flex items-center">
            <span>Weekly Time Clock</span>
            <button
              onClick={() => setShowLastWeek(!showLastWeek)}
              className="ml-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showLastWeek ? (
                <ArrowRight className="w-4 h-4" />
              ) : (
                <ArrowLeft className="w-4 h-4" />
              )}
            </button>
          </div>
          <Badge variant="outline" className="text-sm font-normal">
            <Clock className="w-3 h-3 mr-1" />
            {showLastWeek ? "Last Week" : "This Week"}:{" "}
            {clockedHours.toFixed(1)} / {totalWeeklyHour.toFixed(1)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Progress value={progressPercentage} className="h-2 mb-4" />
        <div className="space-y-2 flex-grow">
          {selectedWeekData.map((item, index) => {
            if (index !== selectedWeekData.length - 1) {
              totalResidualTime +=
                item.policyTime - totalPolicyTimeInMilliSeconds;
              averageClockInTime =
                (averageClockInTime * index + item.policyTime) / (index + 1);
            }

            return (
              <div key={index} className="text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-medium">{dayOfWeek(item.date)}</span>
                  <span>{formatTime(item.policyTime)}</span>
                </div>
                <AnimatePresence key={`expand-${index}-${item.date}`}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="text-xs text-muted-foreground mt-1"
                    >
                      Beyond Policy: {formatTime(item.beyondPolicyTime)}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
        <div className="mt-4 pt-4 border-t flex flex-col space-y-2">
          {!showLastWeek && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium flex items-center">
                <Activity className="w-4 h-4 mr-2" />
                Last Punch
              </span>
              <Badge variant="secondary">{lastPunch?.logDate.split(" ")[1]} </Badge>
            </div>
          )}
          {!showLastWeek && (
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Remaining this week
              </span>
              <Badge variant="secondary">
                {remainingHours.toFixed(0)}h {remainingMinutes.toFixed(0)}m
              </Badge>
            </div>
          )}

          <div className="flex justify-between items-center">
            <span className="text-sm font-medium flex items-center">
              <Clock className="w-4 h-4 mr-2" />
              Total beyond policy
            </span>
            <Badge variant="secondary">
              {formatTime(totalBeyondPolicyTime)}
            </Badge>
          </div>
          {!showLastWeek && (
            <>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  Policy excess (till yesterday)
                </span>
                <Badge
                  variant="secondary"
                  className={
                    totalResidualTime >= 0 ? "text-green-600" : "text-red-600"
                  }
                >
                  {totalResidualTime >= 0 ? "+ " : "- "}
                  {formatTime(Math.abs(totalResidualTime))}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium flex items-center">
                  <BarChart className="w-4 h-4 mr-2" />
                  Avg. policy durations
                </span>
                <Badge
                  variant="secondary"
                  className={
                    averageClockInTime >= totalBeyondPolicyTime
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {formatTime(Math.abs(averageClockInTime))}
                </Badge>
              </div>
            </>
          )}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4 mr-1" /> Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4 mr-1" /> Show Details
              </>
            )}
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
