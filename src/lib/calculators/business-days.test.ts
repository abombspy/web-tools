import { describe, expect, it } from "vitest";
import { calculateBusinessDays, type Holiday } from "./business-days";

const holidays2026: Holiday[] = [
  { date: "2026-01-01", name: "신정" }, // 목요일
  { date: "2026-08-15", name: "광복절" }, // 토요일(주말과 겹침)
];

describe("calculateBusinessDays", () => {
  it("평일 하루(공휴일 아님)는 근무일 1일이다(경계값)", () => {
    const result = calculateBusinessDays("2026-01-05", "2026-01-05", holidays2026); // 월요일
    expect(result.totalDays).toBe(1);
    expect(result.businessDays).toBe(1);
  });

  it("월~금 5일은 전부 근무일이다", () => {
    const result = calculateBusinessDays("2026-01-05", "2026-01-09", holidays2026);
    expect(result.totalDays).toBe(5);
    expect(result.businessDays).toBe(5);
    expect(result.weekendDays).toBe(0);
  });

  it("월~일 7일은 근무일 5일, 주말 2일이다", () => {
    const result = calculateBusinessDays("2026-01-05", "2026-01-11", holidays2026);
    expect(result.totalDays).toBe(7);
    expect(result.businessDays).toBe(5);
    expect(result.weekendDays).toBe(2);
  });

  it("평일에 낀 공휴일은 근무일에서 빠지고 공휴일로 집계된다", () => {
    const result = calculateBusinessDays("2025-12-30", "2026-01-02", holidays2026);
    // 12/30(화),31(수) 평일, 1/1(목) 신정, 1/2(금) 평일
    expect(result.businessDays).toBe(3);
    expect(result.holidayDays).toBe(1);
  });

  it("공휴일이 주말과 겹치면 주말로만 집계되고 공휴일로 중복 집계되지 않는다", () => {
    const result = calculateBusinessDays("2026-08-14", "2026-08-16", holidays2026);
    // 8/14(금) 평일, 8/15(토) 광복절+주말, 8/16(일) 주말
    expect(result.businessDays).toBe(1);
    expect(result.weekendDays).toBe(2);
    expect(result.holidayDays).toBe(0);
  });
});
