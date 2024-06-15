import type { Streak } from "./types";
import {
  differenceInDays,
  formatDate,
  parseCurrentCount,
  parseLastLoginDate,
  parseStartDate,
} from "./utils";

/** Used when saving the streak to localStorage */
export const STREAK_KEY = "streak";

export function doesStreakExist(localStorage_: Storage): boolean {
  return localStorage_.getItem(STREAK_KEY) !== null;
}

export function getSavedStreak(localStorage_: Storage) {
  try {
    const rawStreak = localStorage_.getItem(STREAK_KEY);
    const streakObject = JSON.parse(rawStreak ?? "") as unknown;
    const streak = toStreak(streakObject);

    return streak;
  } catch {
    console.error("Failed to parse streak from localStorage");
    console.info("Initializing a new streak based on current date");

    const today = new Date();
    const newStreak = buildStreak(today);

    return newStreak;
  }
}

function toStreak(object: unknown): Streak {
  if (!object || typeof object !== "object") {
    throw new Error("Invalid streak or missing");
  }

  if (
    "currentCount" in object &&
    "startDate" in object &&
    "lastLoginDate" in object
  ) {
    const streak: Streak = {
      currentCount: parseCurrentCount(object.currentCount),
      startDate: parseStartDate(object.startDate),
      lastLoginDate: parseLastLoginDate(object.lastLoginDate),
    };

    return streak;
  }

  throw new Error("Invalid streak: some fields are missing");
}

export function getNextCounterAction(
  currentDate: Date,
  lastLoginDate: Date
): "increment" | "none" | "reset" {
  const diffInDays = differenceInDays(currentDate, lastLoginDate);

  if (diffInDays === 1) {
    // Last login date is one day after the current date
    return "increment";
  }

  if (diffInDays === 0) {
    // Last login date is the same day as the current date
    return "none";
  }

  // Last login datee is two or more days after the current date
  return "reset";
}

export function buildStreak(
  date: Date,
  overrideDefaults?: Partial<Streak>
): Streak {
  const defaultStreak: Streak = {
    currentCount: 1,
    startDate: formatDate(date),
    lastLoginDate: formatDate(date),
  };

  return {
    ...defaultStreak,
    ...overrideDefaults,
  };
}

export function saveStreak(localStorage_: Storage, streak: Streak) {
  localStorage_.setItem(STREAK_KEY, JSON.stringify(streak));
}
