import {
  Video,
  Laptop,
  MessageCircle,
  BookOpen,
  MoreHorizontal,
  Network,
  Shield,
  Lock,
  KeyRound,
  Building,
  FileSpreadsheet,
} from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const mainLinks = [
  { name: "VCMEET", icon: Video, href: "https://cdotmeet.cdot.in/vmeet" },
  { name: "CSG", icon: Laptop, href: "http://wwwcsg.cdotb.ernet.in/" },
  {
    name: "Samvad",
    icon: MessageCircle,
    href: "https://signupsamvad.cdot.in/",
  },
  {
    name: "Library",
    icon: BookOpen,
    href: "http://www.cdotb.ernet.in/library/index.html",
  },
];

const moreLinks = [
  {
    name: "CIS Service Request",
    icon: Network,
    href: "http://vdbs.cdotb.ernet.in/serreq.html",
  },
  {
    name: "Static IP Address Request Form",
    icon: Shield,
    href: "http://wwwcsg.cdotb.ernet.in/csg/netops/forms/static-ip-address-request-form.txt",
  },
  {
    name: "Firewall Access Request Form",
    icon: Lock,
    href: "http://wwwcsg.cdotb.ernet.in/csg/netops/forms/ext-access-request-through-fw-template-ver5.docx",
  },
  {
    name: "VPN Access Request",
    icon: KeyRound,
    href: "http://wwwcsg.cdotb.ernet.in/csg/netops/forms/VPN-access-request-template-ver2.docx",
  },
  {
    name: "Admin Work Request",
    icon: Building,
    href: "http://www.cdotb.ernet.in/admin/servicereq.html",
  },
  {
    name: "CAD Request",
    icon: FileSpreadsheet,
    href: "http://vdbs.cdotb.ernet.in/wrtest3.html",
  },
];

export default function LinkWidget() {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full ring-1 ring-black/5 ">
      <h2 className="text-black font-semibold mb-4">Quick Links</h2>
      <ul className="space-y-2">
        {mainLinks.map((link) => (
          <li key={link.name}>
            <Link
              href={link.href}
              className="flex items-center text-black hover:bg-gray-100 p-2 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105"
            >
              <link.icon className="w-5 h-5 mr-3" />
              <span>{link.name}</span>
            </Link>
          </li>
        ))}
        <li>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center text-black hover:bg-gray-100 p-2 rounded-md transition-all duration-200 ease-in-out transform hover:scale-105 w-full">
              <MoreHorizontal className="w-5 h-5 mr-3" />
              <span>More</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {moreLinks.map((link) => (
                <DropdownMenuItem key={link.name} asChild>
                  <Link
                    href={link.href}
                    className="flex items-center cursor-pointer"
                  >
                    <link.icon className="w-4 h-4 mr-2" />
                    <span>{link.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </div>
  );
}
