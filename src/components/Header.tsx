"use client";

import { useState } from "react";
import Link from "next/link";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "./ui/avatar";
import { DropdownMenu, DropdownMenuTrigger } from "./ui/dropdown-menu";
import ProfileDropDown from "@/components/ProfileDropDown";
import { User, Menu, X } from "lucide-react";

const routes = [
  { path: "http://192.168.48.122:4000/", name: "Chat" },
  { path: "/links", name: "Links" },
  { path: "/app/employees", name: "Employees" },
  { path: "/app/server", name: "Servers" },
  { path: "https://universe.cdot.in/", name: "Email" },
  { path: "/app/support-center", name: "Help" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="w-full p-4">
      <nav className="max-w-7xl mx-auto bg-white bg-opacity-90 backdrop-filter backdrop-blur-lg rounded-lg shadow-[0_4px_20px_0_rgba(0,0,0,0.1)] border border-gray-200 p-4">
        <div className="flex justify-between items-center">
          <div className="text-3xl font-extrabold text-gray-800">
            <Link href="/app/dashboard">MIS</Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>

          {/* Desktop menu */}
          <ul className="hidden md:flex items-center space-x-6">
            {routes.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className="text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out transform hover:scale-105 relative group"
                  target={item.path.startsWith("http") ? "_blank" : ""}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-800 transition-all duration-300 ease-in-out group-hover:w-full"></span>
                </Link>
              </li>
            ))}

            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar>
                    <AvatarFallback>
                      <User />
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <ProfileDropDown />
              </DropdownMenu>
            </li>
          </ul>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4">
            <ul className="flex flex-col space-y-4">
              {routes.map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out block"
                    target={item.path.startsWith("http") ? "_blank" : ""}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-all duration-300 ease-in-out">
                      <Avatar>
                        <AvatarFallback>
                          <User />
                        </AvatarFallback>
                      </Avatar>
                      <span>Profile</span>
                    </div>
                  </DropdownMenuTrigger>
                  <ProfileDropDown />
                </DropdownMenu>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </div>
  );
}
