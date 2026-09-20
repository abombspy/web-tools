import { describe, expect, it } from "vitest";
import { calculateDDay } from "./d-day";

describe("calculateDDay", () => {
  it("기준일과 목표일이 같으면 D-day 당일이다(경계값)", () => {
    const result = calculateDDay("2026-01-01", "2026-01-01");
    expect(result.daysDiff).toBe(0);
    expect(result.isToday).toBe(true);
    expect(result.isPast).toBe(false);
  });

  it("목표일이 미래면 양수로 남은 일수를 반환한다", () => {
    const result = calculateDDay("2026-01-11", "2026-01-01");
    expect(result.daysDiff).toBe(10);
    expect(result.isPast).toBe(false);
  });

  it("목표일이 과거면 음수를 반환한다", () => {
    const result = calculateDDay("2025-12-22", "2026-01-01");
    expect(result.daysDiff).toBe(-10);
    expect(result.isPast).toBe(true);
  });
});
