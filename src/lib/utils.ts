import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import CryptoJS from "crypto-js";
import { TPunchRecords } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const ipRegex =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const copyToClipboard = async (text: string) => {
  try {
    if (!document.hasFocus()) {
      toast.error("Please focus the window to copy text");
      return false;
    }

    await navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard!");
    return true;
  } catch (error) {
    console.error("Failed to copy:", error);
    toast.error("Failed to copy to clipboard. Please try again.");
  }
};

export const handleError = (error: unknown, defaultMessage: string) => {
  if (error instanceof Error) {
    toast.error(error.message);
  } else if (typeof error === "string") {
    toast.error(error);
  } else if (error && typeof error === "object" && "message" in error) {
    toast.error((error as { message: string }).message);
  } else {
    toast.error(defaultMessage);
  }
};

const secretKey = process.env.NEXT_PUBLIC_ENCRYPTION_SECRET_KEY as string;

export function encrypt(text: string): string {
  if (!secretKey) {
    throw new Error(
      "NEXT_PUBLIC_CRYPTO_SECRET_KEY is not set in environment variables"
    );
  }
  try {
    const ciphertext = CryptoJS.AES.encrypt(text, secretKey).toString();
    return ciphertext;
  } catch (error) {
    console.error("Encryption error:", error);
    throw new Error("Failed to encrypt the text.");
  }
}

export function decrypt(ciphertext: string): string {
  if (!secretKey) {
    throw new Error(
      "NEXT_PUBLIC_CRYPTO_SECRET_KEY is not set in environment variables"
    );
  }
  try {
    if (!ciphertext || typeof ciphertext !== "string") {
      throw new Error("Invalid ciphertext provided.");
    }

    // Ensure the ciphertext is properly encoded
    const encodedCiphertext = ciphertext.replace(/\s/g, "+");

    const bytes = CryptoJS.AES.decrypt(encodedCiphertext, secretKey);
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);

    if (!plaintext) {
      throw new Error("Decryption failed: The result is empty.");
    }

    return plaintext;
  } catch (error) {
    console.error("Decryption error:", error);
    throw new Error(
      "Failed to decrypt the ciphertext. Ensure the secret key and ciphertext are correct."
    );
  }
}

function parseDateString(dateString: string) {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hours, minutes, seconds] = timePart.split(":").map(Number);

  return new Date(year, month - 1, day, hours, minutes, seconds); // Month is 0-indexed
}

const getLastSunday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // Sunday is 0
  const lastSunday = new Date(today);
  lastSunday.setDate(today.getDate() - dayOfWeek); // Move back to last Sunday
  lastSunday.setHours(0, 0, 0, 0); // Start of the day
  return lastSunday;
};

export function getAllPunchRecordsInCurrentWeek(records: TPunchRecords[]) {
  const parsedRecord = records.map((record) => ({
    ...record,
    logDate: parseDateString(record.logDate),
  }));
  const lastSunday = getLastSunday();
  const today = new Date();
  const recordsThisWeek = parsedRecord.filter((record) => {
    return record.logDate >= lastSunday && record.logDate <= today;
  });

  // sort by date ir from last sunday to today
  recordsThisWeek.sort((a, b) => a.logDate.getTime() - b.logDate.getTime());

  return recordsThisWeek;
}

export function totalClockedInTimeTillToday(
  data: {
    emp_id: string;
    logDate: string;
    deviceId: string;
  }[]
) {
  const records = getAllPunchRecordsInCurrentWeek(data);

  let i = 0;
  let j = 1;
  const n = records.length;
  const finalRecord = [];
  finalRecord.push(records[i]);
  while (i < n && j < n) {
    // check the difference between the i and j logDate if its less than 2 minute skip the j
    if (records[j].logDate.getTime() - records[i].logDate.getTime() < 120000) {
      j++;
    } else {
      i = j;
      finalRecord.push(records[i]);
      j++;
    }
  }

  // now make an array of object this format key as day and value as list of all the logdate in that day
  const modifiedRecord = new Map<string, Date[]>();
  for (let i = 0; i < finalRecord.length; i++) {
    const date = finalRecord[i].logDate;
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const key = `${day}/${month}/${year}`;

    if (modifiedRecord.has(key)) {
      const dateList = modifiedRecord.get(key);
      if (dateList) {
        dateList.push(date);
        modifiedRecord.set(key, dateList);
      }
    } else {
      modifiedRecord.set(key, [date]);
    }
  }


  const currentDate = new Date();
  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const currentKey = `${currentDay}/${currentMonth}/${currentYear}`;
  const perDayHour = [];
  for (const [key, value] of modifiedRecord) {
    const dateList = value;

    if (key === currentKey) {
      dateList.push(currentDate);
    } else {
      if (dateList.length % 2 !== 0) {
        const lastDate = new Date(dateList[dateList.length - 1]);
        lastDate.setHours(17, 30, 0, 0);
        dateList.push(lastDate);
      }
    }
    let x = 0;
    for (let i = 0; i < dateList.length; i += 2) {
      x += dateList[i + 1].getTime() - dateList[i].getTime();
    }
    perDayHour.push({
      key,
      time: x,
    });
  }
  return perDayHour;
}
