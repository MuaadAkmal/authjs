import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Car, Home, BadgeIcon, Plane } from "lucide-react";

export function ServiceRequest() {
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Service Links</CardTitle>
        <CardDescription>Quick access to various service Forms</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button asChild variant="outline" className="w-full justify-start">
          <Link
            target="_blank"
            href="http://dbs.cdotb.ernet.in/travel/vehicle_booking.html"
            className="flex items-center"
          >
            <Car className="mr-2 h-4 w-4" />
            Vehicle Booking
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start">
          <Link
            target="_blank"
            href="http://dbs.cdotb.ernet.in/housekeeping/housekeeping.html"
            className="flex items-center"
          >
            <Home className="mr-2 h-4 w-4" />
            Housekeeping Request
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start">
          <Link
            target="_blank"
            href="http://dbs.cdotb.ernet.in/visitor/idform.html"
            className="flex items-center"
          >
            <BadgeIcon className="mr-2 h-4 w-4" />
            ID Card Request
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start">
          <Link
            target="_blank"
            href="http://traveladmin.cdotb.ernet.in:8080/Travel_Form/"
            className="flex items-center"
          >
            <Plane className="mr-2 h-4 w-4" />
            Travel Booking
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
