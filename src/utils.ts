export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US");
}

const MS_PER_DAY = 1000 * 60 * 60 * 24;

// Inspired by https://stackoverflow.com/a/15289883
export function differenceInDays(dateLeft: Date, dateRight: Date): number {
  // Discard the time and time-zone information.
  const dateLeftUTC = Date.UTC(
    dateLeft.getFullYear(),
    dateLeft.getMonth(),
    dateLeft.getDate()
  );
  const dateRightUTC = Date.UTC(
    dateRight.getFullYear(),
    dateRight.getMonth(),
    dateRight.getDate()
  );

  const diffInDays = Math.floor((dateRightUTC - dateLeftUTC) / MS_PER_DAY);

  return Math.abs(diffInDays);
}

export function parseCurrentCount(currentCount: unknown): number {
  if (!currentCount || !isNumber(currentCount)) {
    throw new Error("Incorrect or missing currentCount: " + currentCount);
  }

  return currentCount;
}

export function parseStartDate(startDate: unknown): string {
  if (!startDate || !isString(startDate) || !isDate(startDate)) {
    throw new Error("Incorrect or missing start date: " + startDate);
  }

  return startDate;
}

export function parseLastLoginDate(lastLoginDate: unknown): string {
  if (!lastLoginDate || !isString(lastLoginDate) || !isDate(lastLoginDate)) {
    throw new Error("Incorrect or missing last login date: " + lastLoginDate);
  }

  return lastLoginDate;
}

function isNumber(number: unknown): number is number {
  return typeof number === "number" || !isNaN(Number(number));
}

function isString(text: unknown): text is string {
  return typeof text === "string" || text instanceof String;
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date));
}
