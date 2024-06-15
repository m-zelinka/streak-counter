import { describe, expect, it } from "vitest";
import { getNextCounterAction } from "../src/lib";

describe("getNextCounterAction", () => {
  it("returns none on same-day login", () => {
    const date = new Date(
      "Mon Mar 04 2024 12:02:39 GMT+0100 (Central European Standard Time)"
    );
    const lastLoginDate = new Date("03/04/2024");
    const nextAction = getNextCounterAction(date, lastLoginDate);

    expect(nextAction).toBe("none");
  });
});
