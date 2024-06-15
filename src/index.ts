import type { Streak } from "./types";
import { formatDate } from "./utils";

export function streakCounter(_localStorage: Storage, date: Date): Streak {
  return {
    currentCount: 1,
    startDate: formatDate(date),
    lastLoginDate: formatDate(date),
  };
}
