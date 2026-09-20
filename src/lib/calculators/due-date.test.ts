import { describe, expect, it } from "vitest";
import { calculateDueDate } from "./due-date";
import { daysBetween } from "./date-utils";

describe("calculateDueDate", () => {
  it("예정일은 마지막 생리 시작일로부터 정확히 280일 후다", () => {
    const result = calculateDueDate("2026-01-01", "2026-01-01");
    const lmp = new Date("2026-01-01");
    const due = new Date(result.dueDate);
    expect(daysBetween(lmp, due)).toBe(280);
  });

  it("기준일이 마지막 생리일과 같으면 임신 주수는 0주 0일이다(경계값)", () => {
    const result = calculateDueDate("2026-01-01", "2026-01-01");
    expect(result.gestationalWeeks).toBe(0);
    expect(result.gestationalDays).toBe(0);
    expect(result.daysUntilDue).toBe(280);
  });

  it("70일이 지나면 정확히 10주 0일이다(경계값)", () => {
    const result = calculateDueDate("2026-01-01", "2026-03-12"); // 1월1일+70일
    expect(result.gestationalWeeks).toBe(10);
    expect(result.gestationalDays).toBe(0);
  });

  it("73일이 지나면 10주 3일이다", () => {
    const result = calculateDueDate("2026-01-01", "2026-03-15"); // 1월1일+73일
    expect(result.gestationalWeeks).toBe(10);
    expect(result.gestationalDays).toBe(3);
  });

  it("예정일이 지나면 남은 일수가 음수로 표시된다", () => {
    const result = calculateDueDate("2026-01-01", "2026-12-01");
    expect(result.daysUntilDue).toBeLessThan(0);
  });
});
