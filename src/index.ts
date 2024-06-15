import { STREAK_KEY, shouldIncrementOrResetStreakCount } from "./lib";
import type { Streak } from "./types";
import { formatDate } from "./utils";

export function streakCounter(_localStorage: Storage, date: Date): Streak {
  const rawStreak = _localStorage.getItem(STREAK_KEY);

  if (rawStreak) {
    try {
      const streak = JSON.parse(rawStreak) as unknown as Streak;
      const state = shouldIncrementOrResetStreakCount(
        date,
        streak.lastLoginDate
      );

      if (state === "increment") {
        const updatedStreak: Streak = {
          ...streak,
          currentCount: streak.currentCount + 1,
          lastLoginDate: formatDate(date),
        };

        _localStorage.setItem(STREAK_KEY, JSON.stringify(updatedStreak));

        return updatedStreak;
      }

      if (state === "none") {
        const updatedStreak: Streak = {
          ...streak,
          lastLoginDate: formatDate(date),
        };

        _localStorage.setItem(STREAK_KEY, JSON.stringify(updatedStreak));

        return updatedStreak;
      }

      if (state === "reset") {
        const updatedStreak: Streak = {
          currentCount: 1,
          startDate: formatDate(date),
          lastLoginDate: formatDate(date),
        };

        _localStorage.setItem(STREAK_KEY, JSON.stringify(updatedStreak));

        return updatedStreak;
      }

      return streak;
    } catch (error) {
      console.error("Failed to parse streak from localStorage");
    }
  }

  const streak: Streak = {
    currentCount: 1,
    startDate: formatDate(date),
    lastLoginDate: formatDate(date),
  };

  _localStorage.setItem(STREAK_KEY, JSON.stringify(streak));

  return streak;
}
