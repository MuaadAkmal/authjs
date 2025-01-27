import Link from "next/link";
import {
  AlertCircle,
  Calendar,
  ChartNoAxesColumnDecreasing,
  Clock,
  Cloud,
 
  CreditCard,
  Keyboard,
  LifeBuoy,
  Lock,
  TentIcon,
  User,
} from "lucide-react";
import {
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import LogOutBtn from "./LogOutBtn";

export default function DropdownMenuDemo() {
  return (
    <DropdownMenuContent className="w-56">
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href="/app/profile">
            <User />
            <span>Profile</span>
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={"/app/dashboard"}>
            <ChartNoAxesColumnDecreasing />
            <span>Dashboard</span>
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Keyboard />
          <span>Keyboard shortcuts</span>
          <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          <Lock className="ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuGroup>
        <DropdownMenuItem asChild>
          <Link href="/app/punch-records">
            <Clock />
            <span>Punch Records</span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/app/attendance">
            <Calendar />
            <span>Attendance</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/app/leave-card">
            <TentIcon />
            <span>Leave Card</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <CreditCard />
          <span>Salary Slip</span>
          <Lock className="ml-auto" />
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <AlertCircle />
          <span>Attendance Shortage</span>
          <Lock className="ml-auto" />
        </DropdownMenuItem>
      </DropdownMenuGroup>
      <DropdownMenuSeparator />
      <DropdownMenuItem asChild>
        <Link href={"/support"}>
          <LifeBuoy />
          <span>Support</span>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem disabled>
        <Cloud />
        <span>API</span>
      </DropdownMenuItem>
      <DropdownMenuItem disabled>
        <CreditCard />
        <span>Billing</span>
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem>
        <LogOutBtn />
        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
      </DropdownMenuItem>
    </DropdownMenuContent>
  );
}
