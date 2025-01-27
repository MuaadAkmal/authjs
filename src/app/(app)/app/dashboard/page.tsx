import Calendar from "@/components/CalendarEvent";
import ClockIn from "@/components/ClockIn";
// import GridLayout from "react-grid-layout";
// import "react-grid-layout/css/styles.css";
// import "react-resizable/css/styles.css";
import Notice from "@/components/Notice";
import TaskNoteWidget from "@/components/TaskNoteWidget";
import { CanteenMenuWidget } from "@/components/CanteenMenuWidget";
import LinkWidget from "@/components/LinkWidget";
import { EmployeeBirthdayWidget } from "@/components/BdayWidget";
import { ServiceRequest } from "@/components/ServiceRequest";
import ConfettiComp from "@/components/Confetti";

export default function Home() {
  // const layout = [
  //   { i: "clockin", x: 1, y: 0, w: 1, h: 1, minW: 1, maxW: 2 },
  //   { i: "calendar", x: 2, y: 0, w: 1, h: 2.05, static: true },
  //   { i: "notice", x: 0, y: 0, w: 1, h: 1.4 },
  // ];

  return (
    <div>
      <ConfettiComp />
      <div className=" max-w-7xl mx-auto ">
        {/* <GridLayout
        className="layout"
        layout={layout}
        cols={3}
        rowHeight={270}
        width={1280}
        > */}

        <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 auto-rows-min">
          {/* First Column */}
          <div className="md:col-span-3 lg:col-span-4 flex flex-col gap-4">
            <div className="h-fit">
              <Notice />
            </div>
            <div className="h-fit w-full">
              <CanteenMenuWidget />
            </div>
            <div className="h-fit w-full">
              <ServiceRequest />
            </div>
          </div>

          {/* Middle Column */}
          <div className="md:col-span-3 lg:col-span-4 flex flex-col gap-4">
            <div className="h-fit">
              <ClockIn />
            </div>
            <div className="h-fit">
              <TaskNoteWidget />
            </div>
            <div className="h-fit">
              <LinkWidget />
            </div>
          </div>

          {/* Last Column */}
          <div className="md:col-span-6 lg:col-span-4 flex flex-col  h-fit gap-4">
            <div className="h-fit">
              <EmployeeBirthdayWidget />
            </div>
            <div className="h-fit">
              <Calendar />
            </div>
          </div>
        </div>

        {/* </GridLayout> */}
      </div>
    </div>
  );
}
