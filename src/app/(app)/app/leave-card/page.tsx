"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  CalendarDays,
  ChevronDown,
  ChevronUp,
  FileText,
  LockIcon,
  User,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { Lock } from "lucide-react";
import { useProfile } from "@/lib/hooks";
import { useLeaveCard } from "@/lib/queries";
import { LeaveType, TLeaveCard } from "@/lib/types";
import { useState } from "react";

export default function EnhancedLeaveCard() {
  const { profile } = useProfile();
  const {
    data: leaveCardData,
    isLoading,
    error,
  } = useLeaveCard(profile?.emp_id || "", profile?.hashedPassword || "");

  const [expandedTypes, setExpandedTypes] = useState<Record<string, boolean>>(
    {}
  );

  if (isLoading) {
    return <div className="text-center py-8">Loading leave card data...</div>;
  }

  if (error || !leaveCardData?.success) {
    return (
      <div className="text-center py-8 text-red-500">
        Error loading leave card data. Please try again later.
      </div>
    );
  }

  let data: TLeaveCard | null = null;
  if (leaveCardData.data) data = leaveCardData.data;

  if (!data) {
    return (
      <div className="text-center py-8">No leave card data available.</div>
    );
  }

  const calculateLeaveMetrics = (leave: LeaveType[], leaveType: string) => {
    if (leaveType === "rhLeave") {
      const consumed = leave.reduce(
        (acc, curr) => acc + parseInt(curr.type || "0"),
        0
      );
      return {
        consumed: consumed,
        balance: 2 - consumed,
        showProgress: false,
      };
    }

    if (leaveType === "casualLeave") {
      const last = leave[leave.length - 1];
      return {
        consumed: last?.type || 0,
        balance: data.totalBalance,
        showProgress: false,
      };
    } else if (leaveType === "earnedLeave") {
      const balance = leave[leave.length - 1]?.balance || 0;
      const consumed = leave[0]?.days || 0;
      return {
        consumed,
        balance,
        showProgress: true,
        percentage: false,
      };
    } else if (leaveType === "halfPayLeave") {
      const balance = leave[leave.length - 1]?.balance || 0;
      const consumed = leave[0]?.days || 0;
      return {
        consumed,
        balance,
        showProgress: true,
        percentage: false,
      };
    } else {
      return {
        consumed: 0,
        balance: 0,
        showProgress: false,
      };
    }
  };

  const leaveTypes = [
    {
      name: "Earned Leave",
      data: data.leaves.earnedLeave,
      color: "bg-blue-500",
      type: "earnedLeave",
    },
    {
      name: "Half Pay Leave",
      data: data.leaves.halfPayLeave,
      color: "bg-green-500",
      type: "halfPayLeave",
    },
    {
      name: "Casual Leave",
      data: data.leaves.casualLeave,
      color: "bg-yellow-500",
      type: "casualLeave",
    },
    {
      name: "RH Leave",
      data: data.leaves.rhLeave,
      color: "bg-purple-500",
      type: "rhLeave",
    },
    {
      name: "Other Leave",
      data: data.leaves.otherLeave,
      color: "bg-gray-500",
      type: "otherLeave",
    },
  ];

  const toggleExpand = (type: string) => {
    setExpandedTypes((prev) => ({ ...prev, [type]: !prev[type] }));
  };
  return (
    <div className="min-h-screen  py-8">
      <Card className="max-w-7xl mx-auto shadow-lg">
        <CardHeader className="pb-0">
          <div className="flex justify-between items-start">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={"/emp_img/" + data.staffNo + ".jpg"}
                  alt={data.name}
                />
                <AvatarFallback>
                  {data.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-3xl font-bold">
                  Leave Dashboard
                </CardTitle>
                <p className="text-lg text-muted-foreground">
                  {data.name} - #{data.staffNo}
                </p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="outline">{data.group}</Badge>
                  <Badge variant="secondary">
                    <User className="mr-1 h-3 w-3" />
                    Joined: {new Date(data.dateOfJoining).toLocaleDateString()}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="mt-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="history">Leave History</TabsTrigger>
              <TabsTrigger value="apply">Apply for Leave</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Leave Balance Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {leaveTypes.map((leave, index) => {
                      if (leave.name === "Other Leave") return null;

                      const leaveBreakdown = calculateLeaveMetrics(
                        leave.data,
                        leave.type
                      );
                      return (
                        <div key={index} className="flex items-center ">
                          <div
                            className={`w-3 h-3 rounded-full ${leave.color} mr-2`}
                          ></div>

                          <span className="text-sm">
                            {leave.name}: {leaveBreakdown.balance + " "}days
                          </span>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Casual Leave Breakdown</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {data.leaves.casualLeave
                        .filter((leave) => leave.from !== "Total")
                        .map((leave, index) => (
                          <div
                            key={index}
                            className="flex justify-between items-center"
                          >
                            <span className="text-sm">
                              {leave.purpose?.replace(/"/g, "") || "N/A"}
                            </span>
                            <Badge variant="secondary">
                              {leave.type || "0"} days
                            </Badge>
                          </div>
                        ))}
                      <Separator />
                      <div className="flex justify-between items-center font-semibold">
                        <span>Balance Available</span>
                        <span>{data.totalBalance} days</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            <TabsContent value="history" className="mt-6">
              <div className="space-y-4">
                {leaveTypes.map((leaveType) => (
                  <Card key={leaveType.type} className="overflow-hidden">
                    <CardHeader className="bg-gray-100 ring-1 ring-black/5">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-2xl font-bold text-black">
                          {leaveType.name}
                        </CardTitle>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleExpand(leaveType.type)}
                          aria-label={
                            expandedTypes[leaveType.type]
                              ? "Collapse"
                              : "Expand"
                          }
                          className="text-black hover:bg-primary/90"
                        >
                          {expandedTypes[leaveType.type] ? (
                            <ChevronUp className="h-6 w-6" />
                          ) : (
                            <ChevronDown className="h-6 w-6" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    {expandedTypes[leaveType.type] && (
                      <CardContent className="p-0">
                        <div className="overflow-x-auto">
                          <Table>
                            <TableHeader>
                              <TableRow>
                                <TableHead>From</TableHead>
                                <TableHead>To</TableHead>
                                <TableHead>Purpose</TableHead>
                                {leaveType.name !== "RH Leave" &&
                                  leaveType.name !== "Casual Leave" && (
                                    <TableHead>Type</TableHead>
                                  )}
                                <TableHead>Days</TableHead>
                                {(leaveType.name === "Earned Leave" ||
                                  leaveType.name === "Half Pay Leave") && (
                                  <TableHead>Balance</TableHead>
                                )}
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {leaveType.data.length > 0 ? (
                                leaveType.data.map((leave, index) => (
                                  <TableRow key={`${leaveType.type}-${index}`}>
                                    <TableCell>{leave.from || "N/A"}</TableCell>
                                    <TableCell>{leave.to || "N/A"}</TableCell>
                                    <TableCell>
                                      {leave.purpose || "N/A"}
                                    </TableCell>
                                    {leaveType.name !== "RH Leave" &&
                                      leaveType.name !== "Casual Leave" && (
                                        <TableCell>
                                          {leave.type || "N/A"}
                                        </TableCell>
                                      )}
                                    <TableCell>
                                      {leaveType.type === "rhLeave" ||
                                      leaveType.type === "casualLeave"
                                        ? leave.type
                                        : leave.days || "N/A"}
                                    </TableCell>
                                    {(leaveType.name === "Earned Leave" ||
                                      leaveType.name === "Half Pay Leave") && (
                                      <TableCell>
                                        {leave.balance || "N/A"}
                                      </TableCell>
                                    )}
                                  </TableRow>
                                ))
                              ) : (
                                <TableRow>
                                  <TableCell
                                    colSpan={
                                      leaveType.name === "RH Leave" ||
                                      leaveType.name === "Casual Leave"
                                        ? 4
                                        : leaveType.name === "Earned Leave" ||
                                          leaveType.name === "Half Pay Leave"
                                        ? 6
                                        : 5
                                    }
                                    className="text-center h-24"
                                  >
                                    No data available
                                  </TableCell>
                                </TableRow>
                              )}
                            </TableBody>
                          </Table>
                        </div>
                      </CardContent>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="apply" className="mt-6 relative">
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm z-10 flex items-center justify-center">
                <div className="text-center">
                  <Lock className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    Premium Feature
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Upgrade to Pro to apply for leave
                  </p>
                  <Button>Upgrade to Pro</Button>
                </div>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    Apply for Leave
                    <LockIcon className="ml-2 h-4 w-4" />
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">From</label>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal mt-1"
                              disabled
                            >
                              <CalendarDays className="mr-2 h-4 w-4" />
                              Pick a date
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="p-0">
                            <Calendar mode="single" initialFocus />
                          </DialogContent>
                        </Dialog>
                      </div>
                      <div>
                        <label className="text-sm font-medium">To</label>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button
                              variant="outline"
                              className="w-full justify-start text-left font-normal mt-1"
                              disabled
                            >
                              <CalendarDays className="mr-2 h-4 w-4" />
                              Pick a date
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="p-0">
                            <Calendar mode="single" initialFocus />
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Reason for Leave
                      </label>
                      <textarea
                        className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        rows={4}
                        placeholder="Enter your reason for leave"
                        disabled
                      ></textarea>
                    </div>
                    <div className="flex justify-end">
                      <Button disabled>
                        <FileText className="mr-2 h-4 w-4" />
                        Submit Leave Request
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
