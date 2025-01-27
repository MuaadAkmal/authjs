"use server";

import { TPunchRecords } from "@/lib/types";

function parseDateString(dateString: string) {
  const [datePart, timePart] = dateString.split(" ");
  const [day, month, year] = datePart.split("/").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);

  return new Date(year, month - 1, day, hours, minutes, 0); // Month is 0-indexed
}

const getLastSunday = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // Sunday is 0
  const lastSunday = new Date(today);
  lastSunday.setDate(today.getDate() - dayOfWeek); // Move back to last Sunday
  lastSunday.setHours(23, 0, 0, 0); // Start of the day
  return lastSunday;
};

const getPenultimateSunday = () => {
  const lastSunday = getLastSunday();
  const penultimateSunday = new Date(lastSunday);
  penultimateSunday.setDate(lastSunday.getDate() - 7);
  penultimateSunday.setHours(23, 0, 0, 0);
  return penultimateSunday;
};

function getAllPunchRecordsInCurrentWeek(records: TPunchRecords[]) {
  const parsedRecord = records.map((record) => ({
    ...record,
    logDate: parseDateString(record.logDate),
  }));
  const lastSunday = getLastSunday();
  const today = new Date();
  const recordsThisWeek = parsedRecord.filter((record) => {
    return record.logDate > lastSunday && record.logDate <= today;
  });

  // sort by date ir from last sunday to today
  recordsThisWeek.sort((a, b) => a.logDate.getTime() - b.logDate.getTime());

  return recordsThisWeek;
}

function getAllPunchRecordsInLastWeek(records: TPunchRecords[]) {
  const parsedRecord = records.map((record) => ({
    ...record,
    logDate: parseDateString(record.logDate),
  }));
  const lastLastSunday = getPenultimateSunday();
  const lastWeekFriday = getLastSunday();
  lastWeekFriday.setDate(lastWeekFriday.getDate() - 2); //from last sunday to last sunday - 2
  lastWeekFriday.setHours(23, 0, 0, 0);
  const recordsLastWeek = parsedRecord.filter((record) => {
    return record.logDate > lastLastSunday && record.logDate <= lastWeekFriday;
  });

  recordsLastWeek.sort(
    (
      a: { logDate: { getTime: () => number } },
      b: { logDate: { getTime: () => number } }
    ) => a.logDate.getTime() - b.logDate.getTime()
  );

  return recordsLastWeek;
}

export async function totalClockedInTimeInLastWeek(
  data: {
    emp_id: string;
    logDate: string;
    deviceId: string;
  }[]
) {
  const records = getAllPunchRecordsInLastWeek(data);
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

  const perDayHour = [];
  for (const [key, value] of modifiedRecord) {
    const dateList = value;

    if (dateList.length % 2 !== 0) {
      const lastDate = new Date(dateList[dateList.length - 1]);
      lastDate.setHours(17, 30, 0, 0);
      dateList.push(lastDate);
    }

    let policyTime = 0;
    let beyondPolicyTime = 0;
    const fivethirtyDate = new Date(dateList[0]);
    fivethirtyDate.setHours(17, 30, 0, 0);

    const eightDate = new Date(dateList[0]);
    eightDate.setHours(8, 0, 0, 0);

    if (dateList[0].getTime() < eightDate.getTime()) {
      beyondPolicyTime += eightDate.getTime() - dateList[0].getTime();
      dateList[0] = eightDate;
    }

    if (dateList[dateList.length - 1].getTime() > fivethirtyDate.getTime()) {
      beyondPolicyTime +=
        dateList[dateList.length - 1].getTime() - fivethirtyDate.getTime();
      dateList[dateList.length - 1] = fivethirtyDate;
    }

    for (let i = 0; i < dateList.length; i += 2) {
      policyTime += dateList[i + 1].getTime() - dateList[i].getTime();
    }
    perDayHour.push({
      date: key,
      policyTime,
      beyondPolicyTime,
    });
  }
  return perDayHour;
}

export async function totalClockedInTimeTillToday(
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
    let policyTime = 0;
    let beyondPolicyTime = 0;
    const fivethirtyDate = new Date(dateList[0]);
    fivethirtyDate.setHours(17, 30, 0, 0);

    const eightDate = new Date(dateList[0]);
    eightDate.setHours(8, 0, 0, 0);

    //    for (let i = 0; i < dateList.length; i += 1) {
    //console.log("<- ", key, dateList[i]);
    //}

    // check for the beyond policy time @ morning
    if (dateList[0].getTime() < eightDate.getTime()) {
      beyondPolicyTime += eightDate.getTime() - dateList[0].getTime();
      dateList[0] = eightDate;
    }

    // check for the beyond policy time @ evening
    if (dateList[dateList.length - 1].getTime() > fivethirtyDate.getTime()) {
      beyondPolicyTime +=
        dateList[dateList.length - 1].getTime() - fivethirtyDate.getTime();
      dateList[dateList.length - 1] = fivethirtyDate;
    }

    //    for (let i = 0; i < dateList.length; i += 1) {
    //console.log("-> ", key, dateList[i]);
    //}

    for (let i = 0; i < dateList.length; i += 2) {
      policyTime += dateList[i + 1].getTime() - dateList[i].getTime();
    }
    //console.log(key, policyTime, beyondPolicyTime);
    perDayHour.push({
      date: key,
      policyTime,
      beyondPolicyTime,
    });
 
  }
  return perDayHour;
}

// store the last week data in db that way we can reduce computation
