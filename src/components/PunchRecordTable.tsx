import { CalendarDays, Clock, MapPin } from "lucide-react";
import { TPunchRecords } from "@/lib/types";

type PunchRecordTableProps = {
  records: TPunchRecords[];
};

export function PunchRecordTable({ records }: PunchRecordTableProps) {
  const formatDate = (dateString: string) => {
    const [datePart] = dateString.split(" ");
    const [day, month, year] = datePart.split("/");
    return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
  };

  const formatTime = (dateString: string) => {
    return dateString.split(" ")[1];
  };

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
      <div className="grid grid-cols-4 gap-4 bg-gray-50 p-4 font-medium">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-5 w-5" />
          Date
        </div>
        <div className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Punch Time
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Location
        </div>
      </div>
      {records.map((record, index) => (
        <div
          key={index}
          className="grid grid-cols-4 gap-4 border-t border-gray-200 p-4 transition-colors hover:bg-gray-50"
        >
          <div>{formatDate(record.logDate)}</div>
          <div>{formatTime(record.logDate)}</div>
          <div>{`${record.deviceId} (${record.deviceId})`}</div>
        </div>
      ))}
    </div>
  );
}
