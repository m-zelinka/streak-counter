export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US");
}

export function differenceInDays(dateLeft: Date, dateRight: Date): number {
  const differenceInTime = Math.abs(dateLeft.getTime() - dateRight.getTime());
  const differenceInDays = Math.ceil(differenceInTime / (1000 * 60 * 60 * 24));

  return differenceInDays;
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
