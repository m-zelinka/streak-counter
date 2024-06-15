import { JSDOM } from "jsdom";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { streakCounter } from "../src";
import type { Streak } from "../src/types";
import { STREAK_KEY, formatDate } from "../src/utils";

describe("streakCounter", () => {
  let mockLocalStorage: Storage;

  beforeEach(() => {
    const mockJSDOM = new JSDOM("", { url: "https://localhost" });

    mockLocalStorage = mockJSDOM.window.localStorage;
  });

  afterEach(() => {
    mockLocalStorage.clear();
  });

  it("returns a streak object with currentCount, startDate and lastLoginDate", () => {
    const date = new Date();
    const streak = streakCounter(mockLocalStorage, date);

    expect(streak).toHaveProperty("currentCount");
    expect(streak).toHaveProperty("startDate");
    expect(streak).toHaveProperty("lastLoginDate");
  });

  it("returns a streak with currentCount starting at 1 and keep track of lastLoginDate", () => {
    const date = new Date();
    const streak = streakCounter(mockLocalStorage, date);

    const formattedDate = formatDate(date);

    expect(streak.currentCount).toBe(1);
    expect(streak.lastLoginDate).toBe(formattedDate);
  });

  it("stores the streak in localStorage", () => {
    const date = new Date();
    streakCounter(mockLocalStorage, date);

    const rawStreak = mockLocalStorage.getItem(STREAK_KEY);
    expect(rawStreak).not.toBeNull();
  });

  describe("with a pre-populated streak", () => {
    let mockLocalStorage: Storage;

    beforeEach(() => {
      const mockJSDOM = new JSDOM("", { url: "https://localhost" });

      mockLocalStorage = mockJSDOM.window.localStorage;

      const date = new Date("12/12/2021");
      const streak: Streak = {
        currentCount: 1,
        startDate: formatDate(date),
        lastLoginDate: formatDate(date),
      };

      mockLocalStorage.setItem(STREAK_KEY, JSON.stringify(streak));
    });

    afterEach(() => {
      mockLocalStorage.clear();
    });

    it("returns the streak from localStorage", () => {
      const date = new Date();
      const streak = streakCounter(mockLocalStorage, date);

      expect(streak.startDate).toBe("12/12/2021");
    });
  });
});
