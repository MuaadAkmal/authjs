"use client";

import { Calendar } from "@/components/ui/calendar";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMemo, useState } from "react";
import { events, TEvent } from "@/lib/constants";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const isOfficialLeave = (date: Date) => {
  const dayAfterDate = new Date(date);
  dayAfterDate.setDate(dayAfterDate.getDate() + 1);
  const dayAfterDateString = dayAfterDate.toISOString().split("T")[0];

  return !!events.find(
    (event) =>
      event.date === dayAfterDateString &&
      event.values.some((value) => value.status === "official")
  );
};

const isRestrictedLeave = (date: Date) => {
  const dayAfterDate = new Date(date);
  dayAfterDate.setDate(dayAfterDate.getDate() + 1);
  const dayAfterDateString = dayAfterDate.toISOString().split("T")[0];

  return !!events.find(
    (event) =>
      event.date === dayAfterDateString &&
      event.values.every((value) => value.status === "restricted")
  );
};

export const getUpcomingEvent = () => {
  const today = new Date().toISOString().split("T")[0];
  if (events.find((event) => event.date === today)) {
    const tdyEventIndex = events.findIndex((event) => event.date === today);
    const upcomingEvents = events.slice(tdyEventIndex + 1, tdyEventIndex + 3);
    return upcomingEvents;
  } else {
    const upcomingEvents = events.filter((event) => event.date > today);
    return upcomingEvents.slice(0, 2);
  }
};

export default function CalendarEvent() {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedEvent, setSelectedEvent] = useState<TEvent | null>(null);
  const upcomingEvent = useMemo(getUpcomingEvent, []);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const dayAfterDate = new Date(selectedDate);
      dayAfterDate.setDate(dayAfterDate.getDate() + 1);
      const dayAfterDateString = dayAfterDate.toISOString().split("T")[0];

      setSelectedEvent(
        events.find((event) => event.date === dayAfterDateString) || null
      );
    } else {
      setSelectedEvent(null);
    }
  };

  const handleDownload = () => {
    console.log("Download calendar");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <div className="space-y-4 max-w-sm mx-auto">
        <CardHeader className="py-1 px-1">
          <div className="flex justify-between items-center pt-3">
            <h2 className="text-xl font-semibold tracking-tight">Calendar</h2>

            <Button
              variant="ghost"
              size="icon"
              onClick={handleDownload}
              aria-label="Download calendar"
              asChild
            >
              <a href="/calendar.pdf" download>
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0 mx-1 md:mx-2 pb-8">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-md border shadow mx-auto [&_.rdp-day_button.rdp-day_selected]:!bg-black [&_.rdp-day_button.rdp-day_selected]:!text-white"
            modifiers={{
              sunday_saturday: (date: Date) =>
                date.getDay() === 0 || date.getDay() === 6,
              official: isOfficialLeave,
              restricted: isRestrictedLeave,
            }}
            modifiersStyles={{
              sunday_saturday: { color: "red" },
              official: { backgroundColor: "rgba(246, 59, 130, 0.25)" },
              restricted: { backgroundColor: "rgba(59, 130, 246, 0.25)" },
              selected: {
                outline: "2px solid #000",
                boxShadow:
                  "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px",
              },
            }}
          />

          <div className="mt-2 flex flex-col justify-center items-end gap-2 text-sm">
            <div className="flex items-center  mr-[17px]">
              <span className="w-3 h-3 inline-block mr-1 bg-[rgba(246,59,130,0.25)] border border-[rgba(246,59,130,0.5)] rounded-sm"></span>
              <span>Official</span>
            </div>
            <div className="flex items-center">
              <span className="w-3 h-3 inline-block mr-1 bg-[rgba(59,130,246,0.25)] border border-[rgba(59,130,246,0.5)] rounded-sm"></span>
              <span>Restricted </span>
            </div>
          </div>

          <div className="-mt-2">
            <h3 className="text-lg font-semibold mb-2">Events</h3>
            {selectedEvent ? (
              <div className="bg-primary text-primary-foreground p-2 rounded-sm shadow-md">
                <p className="text-sm font-medium">Selected Event:</p>
                <p className="text-sm flex gap-x-2">
                  <span>
                    {new Date(selectedEvent.date).toDateString() + " :"}
                  </span>
                  <span>
                    {selectedEvent.values.map((value, index) => (
                      <span key={index} className="">
                        {value.name}
                      </span>
                    ))}
                  </span>
                </p>
              </div>
            ) : null}
            <div>
              {upcomingEvent.map((event, idx) => (
                <div
                  className="bg-muted p-2 rounded-md shadow-md mt-2 ring-1 ring-gray-600/10"
                  key={idx}
                >
                  <p className="text-sm font-medium">Upcoming Event:</p>
                  <p className="text-sm flex gap-x-2">
                    <span>{new Date(event.date).toDateString() + " :"}</span>
                    <span>
                      {event.values.map((value, index) => (
                        <span key={index} className="">
                          {value.name}
                        </span>
                      ))}
                    </span>
                  </p>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}
