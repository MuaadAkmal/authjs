"use client";
import {
  Bell,
  BriefcaseBusiness,
  Building,
  Clock,
  FileText,
  Fingerprint,
  GraduationCap,
  Heart,
  Home,
  Mail,
  MapPin,
  Phone,
  PhoneCall,
  Receipt,
  Shield,
  Wallet,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";

import Link from "next/link";
import Notification from "./Notification";
import { redirect } from "next/navigation";
import dayjs from "dayjs";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useProfile } from "@/lib/hooks";

const quickLinks = [
  {
    icon: Wallet,
    title: "Salary",
    description: "View your salary details",
    gradient: "from-blue-400 to-blue-600",
    href: "http://eisn.cdotb.ernet.in/login.asp",
  },
  {
    icon: FileText,
    title: "Leave Card",
    description: "Manage your leaves",
    gradient: "from-green-400 to-green-600",
    href: "/app/leave-card",
  },
  {
    icon: Shield,
    title: "PF Card",
    description: "Check PF status",
    gradient: "from-purple-400 to-purple-600",
    href: "http://eisn.cdotb.ernet.in/login.asp",
  },
  {
    icon: Receipt,
    title: "Tax Declaration",
    description: "Submit tax documents",
    gradient: "from-yellow-400 to-yellow-600",
    href: "http://eisn.cdotb.ernet.in/login.asp",
  },
];

const toolLinks = [
  {
    icon: GraduationCap,
    title: "Level Change",
    description: "Career progression",
    gradient: "from-pink-400 to-pink-600",
    href: "http://eisn.cdotb.ernet.in/login.asp",
  },
  {
    icon: Heart,
    title: "Medical eCard",
    description: "Health benefits",
    gradient: "from-red-400 to-red-600",
    href: "http://eisn.cdotb.ernet.in/login.asp",
  },

  {
    icon: Fingerprint,
    title: "Biometrics",
    description: "Attendance records",
    gradient: "from-cyan-400 to-cyan-600",
    href: "/app/attendance",
  },
];

export default function ProfileSection({ user }: { user: User }) {
  const session = useSession();
  if (session.status !== "authenticated") {
    redirect("/sign-in");
  }

  const { setProfile } = useProfile();
  setProfile(user);

  return (
    <div className=" mx-auto , min-h-screen p-4 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <div className="rounded-lg bg-white p-6 shadow-sm">
          <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  alt="Employee"
                  src={"/emp_img/" + user.emp_id + ".jpg"}
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-3xl font-bold">{user?.name}</h2>
                {user?.designation && (
                  <p className="text-gray-600">{user.designation}</p>
                )}
                <div className="mt-2 flex gap-2">
                  <Badge variant="secondary">Full-time</Badge>
                  {user.joining_date && (
                    <Badge variant="outline">
                      {dayjs().diff(dayjs(user.joining_date), "year")}
                    </Badge>
                  )}
                </div>
              </div>
            </div>

            {/* btn */}
            <div className="flex items-center gap-4">
              <Button variant="outline">View Profile</Button>
              <Button>Edit Profile</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle> Personal Info </CardTitle>
                <CardDescription>
                  Your basic information and contacts (public)
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Group:</span> {user.group}
                </div>
                <div className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Designation:</span>{" "}
                  {user.designation}
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-gray-500" />
                  <span className="font-medium">Email:</span>
                  <span className="flex-1">{user.email}</span>
                </div>
                {user.mobile && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Mobile:</span> {user.mobile}
                  </div>
                )}
                {!!user.pbx && (
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">PBX :</span> {user.pbx}
                  </div>
                )}
                {!!user.residence_phone && (
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Residense Phone:</span>{" "}
                    {user.residence_phone}
                  </div>
                )}
                {!!user.direct_phone && (
                  <div className="flex items-center gap-2">
                    <PhoneCall className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Direct Phone:</span>{" "}
                    {user.direct_phone}
                  </div>
                )}
                {!!user.location && (
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Location:</span>{" "}
                    {user.location}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Links </CardTitle>
                <CardDescription>
                  Frequently used tools and services
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Notifications</span>
                  </div>
                  <Notification />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <span className="font-medium">Last Login:</span>{" "}
                    {dayjs(user?.updatedAt).format("DD MMM YYYY hh:mm A")}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* tabs section */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={`group relative overflow-hidden rounded-lg p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl
                    bg-gradient-to-br ${link.gradient}`}
            >
              <div className="relative z-10 flex flex-col gap-2 text-white">
                <link.icon className="h-8 w-8" />
                <h3 className="text-lg font-semibold">{link.title}</h3>
                <p className="text-sm opacity-90">{link.description}</p>
              </div>
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-10" />
            </Link>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {toolLinks.map((link) => (
            <Link
              key={link.title}
              href={link.href}
              className={`group relative overflow-hidden rounded-lg p-6 shadow-lg transition-all hover:-translate-y-1 hover:shadow-xl
                    bg-gradient-to-br ${link.gradient}`}
            >
              <div className="relative z-10 flex flex-col gap-2 text-white">
                <link.icon className="h-8 w-8" />
                <h3 className="text-lg font-semibold">{link.title}</h3>
                <p className="text-sm opacity-90">{link.description}</p>
              </div>
              <div className="absolute inset-0 bg-black opacity-0 transition-opacity group-hover:opacity-10" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
