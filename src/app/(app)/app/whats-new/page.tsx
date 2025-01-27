"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const majorChanges = [
  {
    title: "Widget Bugfixes",
    description: "We've addressed clockin not updating after login ",
    details:
      "we have resolved multiple bugs affecting widget functionality, including rendering issues, data synchronization problems, and performance bottlenecks. Users should now experience smoother widget interactions and more reliable data display.",
  },
  {
    title: "Birthday Buddies Feature",
    description:
      "Celebrate your colleagues' special days with the new Birthday Buddies widget.",
    details:
      "Birthday Buddies allows you to keep track of your team members' birthdays. You'll receive notifications for upcoming birthdays, and you can even send virtual birthday cards directly through the platform. This feature aims to foster a more connected and celebratory work environment. this feature is only available to early users.",
  },
  {
    title: "Enhanced Clock-in Time View",
    description:
      "we have a dedicated clock-in page to get more insights on your work hours.",
    details:
      "The new clock-in time view provides a detailed breakdown of your work hours, including daily, weekly, and monthly summaries. You can now visualize your work patterns, overtime, and breaks more effectively. This enhancement aims to help both employees and managers better understand work time distribution.",
  },
  {
    title: "Push Notifications for Regularization Reminders",
    description:
      "Early users will now receive push notifications to remind them about time regularization if needed.",
    details:
      "To help maintain clockin time , we've implemented push notifications that remind employees to regularize their clock-in times. ",
  },
  {
    title: "Responsive UI Layout",
    description: "Enjoy a seamless experience across all your devices",
    details:
      "We've redesigned our user interface to be fully responsive, ensuring a consistent and optimized experience whether you're using a desktop, tablet, or smartphone. The new layout adapts dynamically to different screen sizes, making it easier for you to access all features and information on the go.",
  },
];

const minorChanges = [
  {
    title: "Login Bug Fixes",
    description: "Resolved multiple login-related bugs",
    details: "",
  },
  {
    title: "UI Modifications",
    description: "We've made several small but impactful changes to our UI.",
    details: "Based on user feedback",
  },
];

const emojis = ["🎉", "🚀", "✨", "🔥", "💡", "🎈", "🌟", "💪", "🏆", "🙌"];

const getRandomEmoji = () => {
  return emojis[Math.floor(Math.random() * emojis.length)];
};

export default function WhatsNewContent() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            {"What's"} New in v1.1.0 {" " + emojis[0]}
          </CardTitle>
          <CardDescription>
            Check out our latest release! (
            <Link
              href="https://semver.org/"
              className="text-blue-500 hover:underline"
            >
              SemVer
            </Link>
            )
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="mb-4">
            I {"'m"} excited to bring you these awesome updates!{" "}
            {getRandomEmoji()} {"Don't"} forget, we love your input:
          </p>
          <ul className="list-disc list-inside mb-4">
            <li>
              Found a bug? Report it in{" "}
              <Link
                href="/app/support-senter"
                className="text-blue-500 hover:underline"
              >
                support section
              </Link>{" "}
              {getRandomEmoji()}
            </li>
            <li>Want to contribute? sent a PR {getRandomEmoji()}</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Major Changes {getRandomEmoji()}
          </CardTitle>
          <CardDescription>
            Significant updates and new features in this release
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {majorChanges.map((change, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>
                  <div className="flex items-center">
                    <Badge variant="default" className="mr-2">
                      New
                    </Badge>
                    {change.title} {getRandomEmoji()}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">{change.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {change.details}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">
            Minor Changes {getRandomEmoji()}
          </CardTitle>
          <CardDescription>Small improvements and bug fixes</CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            {minorChanges.map((change, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger>
                  <div className="flex items-center">
                    <Badge variant="secondary" className="mr-2">
                      Improved
                    </Badge>
                    {change.title} {getRandomEmoji()}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <p className="mb-2">{change.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {change.details}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
