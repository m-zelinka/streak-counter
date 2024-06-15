import { JSDOM } from "jsdom";
import { beforeEach, describe, expect, it } from "vitest";
import { streakCounter } from "../src";
import { formatDate } from "../src/utils";

describe("streakCounter", () => {
  let mockLocalStorage: Storage;

  beforeEach(() => {
    const mockJSDOM = new JSDOM("", { url: "https://localhost" });

    mockLocalStorage = mockJSDOM.window.localStorage;
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
});
