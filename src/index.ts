import {
  buildStreak,
  doesStreakExist,
  getNextCounterAction,
  getSavedStreak,
  saveStreak,
} from "./lib";
import type { Streak } from "./types";

export function streakCounter(localStorage_: Storage, date: Date): Streak {
  const isStreakSaved = doesStreakExist(localStorage_);
  if (isStreakSaved) {
    const streak = getSavedStreak(localStorage_);

    // We have a streak in localStorage
    // Find out the next step, based on the current date and the last login date
    const nextAction = getNextCounterAction(
      date,
      new Date(streak.lastLoginDate)
    );

    let updatedStreak = <Streak>{};

    if (nextAction === "increment") {
      // Here, login days are consecutive, so we update the currentCount
      // Start date is left from previous streak
      // Last login day is updated
      updatedStreak = buildStreak(date, {
        currentCount: streak.currentCount + 1,
        startDate: streak.startDate,
      });
    }

    if (nextAction === "none") {
      // Same-day login, keep the previous streak
      // Start date is left from previous streak
      updatedStreak = buildStreak(date, {
        currentCount: streak.currentCount,
        startDate: streak.startDate,
      });
    }

    if (nextAction === "reset") {
      // Login days are not consecutive
      // Create a new streak
      updatedStreak = buildStreak(date);
    }

    saveStreak(localStorage_, updatedStreak);

    return updatedStreak;
  }

  // We don't have a streak in localStorage
  // Create a new streak based on current date
  const streak = buildStreak(date);

  saveStreak(localStorage_, streak);

  return streak;
}
