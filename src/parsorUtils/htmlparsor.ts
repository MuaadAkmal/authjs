import { TAttendance, TPunchRecords } from "@/lib/types";
import * as cheerio from "cheerio";

export function parseAttendanceData(html: string): TAttendance[] {
  const $ = cheerio.load(html);

  const attendanceRecords: TAttendance[] = [];

  $("table tr").each((index, element) => {
    if (index === 0) return;

    const date = $(element).find("td").eq(0).text().trim();
    const inTime = $(element).find("td").eq(1).text().trim();
    const outTime = $(element).find("td").eq(2).text().trim();
    const duration = $(element).find("td").eq(3).text().trim();
    const lateComing = $(element).find("td").eq(4).text().trim();
    const earlyGoing = $(element).find("td").eq(5).text().trim();
    const status = $(element).find("td").eq(6).text().trim();
    const punches = $(element).find("td").eq(7).text().trim();

    attendanceRecords.push({
      date,
      inTime,
      outTime,
      duration,
      lateComing,
      earlyGoing,
      status,
      punches,
    });
  });

  return attendanceRecords;
}

export function parsePunchRecords(html: string): TPunchRecords[] {
  const $ = cheerio.load(html);
  const punchRecord: TPunchRecords[] = [];
  $("table tr").each((index, element) => {
    if (index === 0) return;
    const cols = $(element).find("td");
    if (cols.length === 3) {
      const emp_id = $(cols[0]).text().trim();
      const logDate = $(cols[1]).text().trim();
      const deviceId = $(cols[2]).text().trim();

      const record = {
        emp_id,
        logDate,
        deviceId,
      };
      punchRecord.push(record);
    }
  });
  return punchRecord;
}

export function parseLeaveCard(html: string) {
  const $ = cheerio.load(html);

  // Extract basic information
  const name = $("th:contains('Name')").next().text().trim();
  const staffNo = $("th:contains('Staff No.')").next().text().trim();
  const dateOfJoining = $("th:contains('Date of joining')")
    .next()
    .text()
    .trim();
  const group = $("th:contains('Group')").next().text().trim();

  // Function to extract leave table data
  const extractLeaveTable = (headerText: string) => {
    const table = $(`h3:contains('${headerText}')`).next("table");
    const rows = table.find("tr").slice(1); // Skip the header row

    return rows
      .map((_, row) => {
        const cells = $(row)
          .find("td")
          .map((_, cell) => $(cell).text().trim())
          .get();
        return {
          from: cells[0] || null,
          to: cells[1] || null,
          purpose: cells[2] || null,
          type: cells[3] || null,
          days:
            (headerText == "HalfPay Leave"
              ? cells[5]
                ? parseInt(cells[5], 10)
                : null
              : cells[4]
              ? parseInt(cells[4], 10)
              : null) || null,
          balance:
            (headerText == "HalfPay Leave"
              ? cells[6]
                ? parseInt(cells[6], 10)
                : null
              : cells[5]
              ? parseInt(cells[5], 10)
              : null) || null,
        };
      })
      .get();
  };

  // Extract leave types
  const earnedLeave = extractLeaveTable("Earned Leave");
  const halfPayLeave = extractLeaveTable("HalfPay Leave");
  const rhLeave = extractLeaveTable("RH Leave");
  const casualLeave = extractLeaveTable("Casual Leave");
  const otherLeave = extractLeaveTable("Other Leave");

  // Extract balance
  const totalBalance =
    parseInt(
      $("h3[style='color: blue']").text().match(/\d+/)?.[0] ?? "0",
      10
    ) || 0;

  return {
    name,
    staffNo,
    dateOfJoining,
    group,
    leaves: {
      earnedLeave,
      halfPayLeave,
      rhLeave,
      casualLeave,
      otherLeave,
    },
    totalBalance,
  };
}
