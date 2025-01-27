import GeneralHeader from "@/components/GeneralHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LayoutDashboard, Maximize, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { auth } from "@/lib/auth";
import Header from "@/components/Header";

export default async function LandingPage() {
  const features = [
    {
      icon: LayoutDashboard,
      title: "Streamlined Design",
      description:
        "Navigate effortlessly with our fresh, user-friendly layout.",
    },
    {
      icon: Maximize,
      title: "Optimized for Productivity",
      description: "All the functionality you need, minus the visual clutter.",
    },
    {
      icon: ShieldCheck,
      title: "Enhanced Accessibility",
      description:
        "Enjoy improved readability and intuitive controls for smoother management.",
    },
  ];

  const session = await auth();

  return (
    <>
      {session?.user ? <Header /> : <GeneralHeader />}
      <div className="min-h-screen bg-white text-black max-w-7xl mx-auto shadow rounded-lg">
        <main className="container mx-auto px-4 py-12">
          <section className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight">
              MIS Mirror
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-600">
              A sleek new interface designed for a seamless employee management
              journey.
            </p>
            <p className="mx-auto mb-8 max-w-3xl text-gray-600">
              Managing your workday {"shouldn't "} feel like a chore.{" "}
              {"That's "} why {" we've "}
              reimagined the EISN platform with a modern, intuitive
              design—without changing the tools you already know.
            </p>
            <div className="flex justify-center space-x-4">
              <Button size="lg" asChild>
                <Link href="/app/dashboard">Explore Dashboard</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/early-access">Get Early Access</Link>
              </Button>
            </div>
          </section>

          <section className="mb-16">
            <h3 className="mb-8 text-center text-2xl font-bold">
              {"What's"} New in This Skin?
            </h3>
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="transition-all hover:shadow-lg"
                >
                  <CardHeader>
                    <feature.icon className="h-10 w-10 text-blue-600" />
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <p className="mt-8 text-center text-sm text-gray-500">
              Note: All data is redirected to the original EISN platform,
              ensuring reliability and familiarity.
            </p>
          </section>

          <section className="mb-16 rounded-lg bg-gray-50 p-6 ring-1 ring-black/20">
            <h3 className="mb-4 text-xl font-bold text-red-500">Disclaimer</h3>
            <p className="text-gray-600">
              This site is a redesigned interface for the official EISN
              platform, acting as a mirror that fetches data from the original
              website to enhance your experience. While not affiliated with the
              official EISN developers, we aim to make daily management simpler.
              All requests are redirected to the official site, and we are not
              responsible for any issues arising from this service. For core
              functionality, please use the{" "}
              <Link
                href="https://eis.cdot.in"
                className="text-blue-600 hover:underline"
              >
                official EIS website
              </Link>
            </p>
          </section>

          <section className="text-center">
            <h2 className="mb-4 text-3xl font-bold">
              Ready to Experience the New MIS ?
            </h2>
            <p className="mx-auto mb-8 max-w-2xl text-gray-600">
              Dive into a more intuitive, streamlined employee management
              experience without losing the familiarity of the tools you rely
              on.
            </p>
            <Button size="lg" asChild>
              <Link href="/sign-in">Log In</Link>
            </Button>

            <p className="mt-8 text-sm text-gray-500">
              The username and password are the same as your EISN Level II
              credentials.
            </p>
          </section>
        </main>
      </div>
    </>
  );
}
