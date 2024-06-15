import { differenceInDays } from "./utils";

export const STREAK_KEY = "streak";

export function shouldIncrementOrResetStreakCount(
  currentDate: Date,
  lastLoginDate: string
): "increment" | undefined {
  const diffInDays = differenceInDays(currentDate, new Date(lastLoginDate));

  if (diffInDays === 1) {
    // This means they logged in the day after the current date
    return "increment";
  }

  // Otherwise they logged in after a day, which would break the streak
  return undefined;
}
