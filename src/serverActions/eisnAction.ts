"use server";

import { TAttendance, TPunchRecords, TLeaveCard } from "@/lib/types";
import { decrypt } from "@/lib/utils";
import {
  parseAttendanceData,
  parseLeaveCard,
  parsePunchRecords,
} from "@/parsorUtils/htmlparsor";

export async function checkAuth(empid: string, password: string) {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("mempno", empid);
  urlencoded.append("mpass", password);
  urlencoded.append("mlevel", "2");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "manual" as RequestRedirect,
  };

  try {
    const res = await fetch(
      "http://eisn.cdotb.ernet.in/blogin.asp",
      requestOptions
    );
    const htmlContent = await res.text();

    // Get cookies from response
    const cookiesHeader = res.headers.get("set-cookie");
    const cookies = cookiesHeader ? cookiesHeader.split(",") : [];

    // Check for error message in HTML
    if (
      htmlContent.includes("No match found") ||
      htmlContent.includes("Access is disabled")
    ) {
      return {
        success: false,
        message: "Invalid credentials or account disabled",
      };
    }

    return {
      success: true,
      message: "Authentication successful",
      cookies,
    };
  } catch (error) {
    console.error("Authentication error:", error);
    return {
      success: false,
      message: "Failed to authenticate",
    };
  }
}

export async function getAttendanceWrapper(
  empid: string,
  hashedPassword: string,
  month: number,
  year: number
): Promise<{
  success: boolean;
  message: string;
  data?: TAttendance[];
}> {
  const password = decrypt(hashedPassword);
  const { cookies } = await checkAuth(empid, password);
  if (!cookies) {
    return {
      success: false,
      message: "Failed to authenticate",
    };
  }

  const result = await getAttendance(cookies, month, year);
  return result;
}

export async function getAttendance(
  cookie: string[],
  month: number,
  year: number
): Promise<{
  success: boolean;
  message: string;
  data?: TAttendance[];
}> {
  const myHeaders = new Headers();
  myHeaders.append("Cookie", cookie.join(";"));
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  const lastDay = new Date(year, month, 0);
  const tday = lastDay.getDate();

  urlencoded.append("fday", "01");
  urlencoded.append("fmonth", month.toString());
  urlencoded.append("fyear", year.toString());
  urlencoded.append("tday", tday.toString());
  urlencoded.append("tmonth", month.toString());
  urlencoded.append("tyear", year.toString());
  urlencoded.append("pno", "1");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
  };

  try {
    const result = await fetch(
      "http://eisn.cdotb.ernet.in/assstsv.asp",
      requestOptions
    );
    const htmlContent = await result.text();
    const parsedJson = parseAttendanceData(htmlContent);
    return {
      success: true,
      message: "Attendance fetched successfully",
      data: parsedJson,
    };
  } catch (error) {
    console.error("Attendance fetch error:", error);
    return {
      success: false,
      message: "Failed to fetch attendance",
    };
  }
}

export async function getPunchRecordWrapper(
  empid: string,
  hashedPassword: string,
  month: number,
  year: number
): Promise<{
  success: boolean;
  message: string;
  data?: TPunchRecords[];
}> {
  const password = decrypt(hashedPassword);

  const { cookies } = await checkAuth(empid, password);

  if (!cookies) {
    return {
      success: false,
      message: "Failed to authenticate",
    };
  }

  const result = await getPunchRecord(cookies, month, year);

  return result;
}

export async function getPunchRecord(
  cookie: string[],
  month: number,
  year: number
): Promise<{
  success: boolean;
  message: string;
  data?: TPunchRecords[];
}> {
  const myHeaders = new Headers();
  myHeaders.append("Cookie", cookie[0]);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  const urlencoded = new URLSearchParams();
  urlencoded.append("Month", month.toString());
  urlencoded.append("year", year.toString());

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    next: {
      revalidate: 5 * 60,
    },
  };

  try {
    const response = await fetch(
      "http://eisn.cdotb.ernet.in/punch.asp",
      requestOptions
    );
    const htmlContent = await response.text();
    const parsedJson = parsePunchRecords(htmlContent);
    return {
      success: true,
      message: "Punch Records fetched successfully",
      data: parsedJson,
    };
  } catch (error) {
    console.error("Punch Records fetch error:", error);
    return {
      success: false,
      message: "Failed to fetch punch records",
    };
  }
}

export async function getLeaveCardWrapper(
  empid: string,
  hashedPassword: string
): Promise<{
  success: boolean;
  message: string;
  data?: TLeaveCard;
}> {
  const password = decrypt(hashedPassword);
  const { cookies } = await checkAuth(empid, password);

  if (!cookies) {
    return {
      success: false,
      message: "Failed to authenticate",
    };
  }

  const result = await getLeaveCard(cookies);

  return result;
}

export async function getLeaveCard(cookie: string[]) {
  const myHeaders = new Headers();
  myHeaders.append("Cookie", cookie[0]);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    body: null,
  };

  try {
    const response = await fetch(
      "http://eisn.cdotb.ernet.in/leave.asp",
      requestOptions
    );
    const htmlContent = await response.text();
    const parsedJson = parseLeaveCard(htmlContent);
    return {
      success: true,
      message: "Leave Card fetched successfully",
      data: parsedJson,
    };
  } catch (error) {
    console.error("Leave Card fetch error:", error);
    return {
      success: false,
      message: "Failed to fetch leave card",
    };
  }
}
