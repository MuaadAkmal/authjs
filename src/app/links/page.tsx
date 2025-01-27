import {
  Book,
  BookOpen,
  Box,
  Building2,
  Car,
  FileText,
  HelpCircle,
  Info,
  LayoutDashboard,
  LibrarySquare,
  Link2,
  Plane,
  ScrollText,
  ShieldCheck,
  Store,
  Truck,
  UserCircle,
  Video,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import GeneralHeader from "@/components/GeneralHeader";
import Header from "@/components/Header";
import { auth } from "@/lib/auth";

export default async function Component() {
  const eofficeLinks = [
    {
      title: "eOffice Website",
      icon: LayoutDashboard,
      href: "https://eoffice.cdot.in/",
      isNew: true,
    },
    {
      title: "eOffice User Manual",
      icon: Book,
      href: "https://mis.cdot.in/portal/UserManualeFile7_0.pdf",
      isNew: true,
    },
    {
      title: "eOffice PHR User Manual",
      icon: UserCircle,
      href: "https://mis.cdot.in/portal/PIMSv3_EMDManager.pdf",
      isNew: true,
    },
    {
      title: "eOffice Video Tutorial",
      icon: Video,
      href: "https://www.youtube.com/watch?v=GNV6B1Dnmfc",
      isNew: true,
    },
  ];
  const erpLinks = [
    {
      title: "ERP Production Link",
      icon: Box,
      href: "http://erp-prod-dc-app.cdotb.ernet.in:8040/",
    },
    {
      title: "ERP Issue Tracker",
      icon: HelpCircle,
      href: "http://erp.cdotb.ernet.in/bugzilla/",
    },
    {
      title: "ERP FAQs",
      icon: Info,
      href: "http://erp.cdotb.ernet.in/faq.html",
    },
    {
      title: "ERP User Manuals",
      icon: BookOpen,
      href: "http://erp.cdotb.ernet.in/usermanual.html",
    },
    {
      title: "ERP BPS Distribution Sets",
      icon: LibrarySquare,
      href: "http://erp.cdotb.ernet.in/usermanuals/Distribution_Set_v2_0_0.pdf",
    },
    {
      title: "ERP Documents",
      icon: FileText,
      href: "http://erp.cdotb.ernet.in/",
    },
  ];
  const leaveLinks = [
    {
      title: "Leave/OD Entry",
      icon: ScrollText,
      href: "http://eisn.cdotb.ernet.in/bas_leave/login.asp",
    },
    {
      title: "Leave/OD Approval",
      icon: ShieldCheck,
      href: "http://eisn.cdotb.ernet.in/bas_leave/loginappr.asp",
    },
    {
      title: "Leave/OD Approval for Delhi",
      icon: Building2,
      href: "http://piano.cdotd.ernet.in/bas_leave/loginappr.asp",
    },
  ];
  const otherLinks = [
    {
      title: "Online System to apply for NOC for Vigilance Clearance",
      icon: ShieldCheck,
      href: "http://192.168.135.245/VigilanceClearance",
    },
    {
      title: "Internal Job Management Portal",
      icon: UserCircle,
      href: "http://eisn.cdotb.ernet.in/guidelines_ltc.pdf",
    },
    {
      title: "Online Request System for Courier services",
      icon: Truck,
      href: "http://192.168.118.181/cms/login_page.php",
      isNew: true,
    },
    {
      title: "Transfer Of Technology",
      icon: Link2,
      href: "http://tot.cdotb.ernet.in/",
      isNew: true,
    },
    {
      title: "Online Car Booking",
      icon: Car,
      href: "http://dbs.cdotb.ernet.in/travel/vehicle_booking.html",
    },
    {
      title: "Online Travel Booking Request",
      icon: Plane,
      href: "http://traveladmin.cdotb.ernet.in:8080/Travel_Form/",
    },
    {
      title: "CDOT Part MSL Info",
      icon: Info,
      href: "http://eisn.cdotb.ernet.in/getmsl.html",
    },
    {
      title: "Staff Claim Entry",
      icon: FileText,
      href: "http://eisn.cdotb.ernet.in/oraclaims/newclaims.html",
    },
    {
      title: "Request For Staying Beyond Office Hours",
      icon: Building2,
      href: "http://finmis.cdot.in/Overtime_management/login.php",
    },
    {
      title: "Canteen Feedback",
      icon: Store,
      href: "http://dbs.cdotb.ernet.in/canteen/canteen_feedback.html",
    },
  ];
  const guidelines = [
    {
      title: "Claims Guidelines",
      icon: ScrollText,
      href: "http://eisn.cdotb.ernet.in/Guidelines%20on%20submission%20of%20claims.pdf",
    },
    {
      title: "Guidelines for LTC",
      icon: FileText,
      href: "http://eisn.cdotb.ernet.in/guidelines_ltc.pdf",
    },
    {
      title: "GST Procedures",
      icon: FileText,
      href: "http://eisn.cdotb.ernet.in/gst_procedures.pdf",
    },
    {
      title: "Asset Verification Procedure",
      icon: ShieldCheck,
      href: "http://eisn.cdotb.ernet.in/gst_procedures.pdf",
    },
    {
      title: "Purchase Procedure",
      icon: Store,
      href: "http://eisn.cdotb.ernet.in/MM-PUR-PRC-GPP-V03.pdf",
    },
  ];

  const session = await auth();

  return (
    <>
      {session?.user ? <Header /> : <GeneralHeader />}
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="p-6 sm:p-8 md:p-10 space-y-8">
              <div className="text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-black">
                  Management Information System - Bangalore
                </h1>
                <p className="mt-2 text-base sm:text-lg text-gray-600">
                  Access all your enterprise resources in one place
                </p>
              </div>

              {/* Quick Access Section */}
              <div>
                <h2 className="text-xl sm:text-2xl font-semibold text-black mb-4">
                  Quick Access
                </h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {eofficeLinks.map((link) => (
                    <a
                      key={link.title}
                      href={link.href}
                      className="group flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:-translate-y-1"
                    >
                      <link.icon className="h-5 w-5 text-black flex-shrink-0" />
                      <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="font-semibold text-black text-sm">
                          {link.title}
                        </h3>
                        {link.isNew && (
                          <Badge variant="secondary" className="text-xs">
                            NEW
                          </Badge>
                        )}
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Tabs Section */}
              <Tabs defaultValue="erp" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 gap-2 ">
                  <TabsTrigger
                    value="erp"
                    className="data-[state=active]:bg-black data-[state=active]:text-white px-2 py-1 text-sm"
                  >
                    ERP Links
                  </TabsTrigger>
                  <TabsTrigger
                    value="leave"
                    className="data-[state=active]:bg-black data-[state=active]:text-white px-2 py-1 text-sm"
                  >
                    Leave System
                  </TabsTrigger>
                  <TabsTrigger
                    value="other"
                    className="data-[state=active]:bg-black data-[state=active]:text-white px-2 py-1 text-sm"
                  >
                    Other Links
                  </TabsTrigger>
                  <TabsTrigger
                    value="guidelines"
                    className="data-[state=active]:bg-black data-[state=active]:text-white px-2 py-1 text-sm"
                  >
                    Guidelines
                  </TabsTrigger>
                </TabsList>

                {/* ERP Links */}
                <TabsContent value="erp">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 ">
                    {erpLinks.map((link) => (
                      <LinkCard key={link.title} link={link} />
                    ))}
                  </div>
                </TabsContent>

                {/* Leave System Links */}
                <TabsContent value="leave">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {leaveLinks.map((link) => (
                      <LinkCard key={link.title} link={link} />
                    ))}
                  </div>
                </TabsContent>

                {/* Other Links */}
                <TabsContent value="other">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {otherLinks.map((link) => (
                      <LinkCard key={link.title} link={link} />
                    ))}
                  </div>
                </TabsContent>

                {/* Guidelines Links */}
                <TabsContent value="guidelines">
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {guidelines.map((link) => (
                      <LinkCard key={link.title} link={link} />
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface Link {
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  href: string;
  isNew?: boolean;
}

function LinkCard({ link }: { link: Link }) {
  return (
    <Link
      href={link.href}
      target="_blank"
      className="group flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md hover:-translate-y-1"
    >
      <link.icon className="h-5 w-5 text-black flex-shrink-0 mt-0.5" />
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-black text-sm">{link.title}</h3>
        {link.isNew && (
          <Badge variant="secondary" className="text-xs w-fit">
            NEW
          </Badge>
        )}
      </div>
    </Link>
  );
}
