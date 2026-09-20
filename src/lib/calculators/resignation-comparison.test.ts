import { describe, expect, it } from "vitest";
import { calculateResignationScenario } from "./resignation-comparison";

describe("calculateResignationScenario", () => {
  // 퇴사일 2026-07-01 기준 직전 3개월(2026-04-01~2026-07-01)은 91일(4월30+5월31+6월30)
  const resignationDate = "2026-07-01";
  const monthlyWage = 910000; // 910,000*3/91 = 30,000원 (깔끔한 숫자로 검증 용이)

  it("근속 365일이면 퇴직금 지급 대상이다(경계값)", () => {
    const result = calculateResignationScenario({
      hireDate: "2025-07-01", // 2026-07-01까지 정확히 365일
      resignationDate,
      monthlyWage,
    });
    expect(result.continuousServiceDays).toBe(365);
    expect(result.severancePayEligible).toBe(true);
    expect(result.averageDailyWage).toBe(30000);
    expect(result.severancePay).toBe(900000); // 30000 * 30 * (365/365)
  });

  it("근속 364일이면 퇴직금이 0원이다(경계값)", () => {
    const result = calculateResignationScenario({
      hireDate: "2025-07-02", // 하루 모자람
      resignationDate,
      monthlyWage,
    });
    expect(result.continuousServiceDays).toBe(364);
    expect(result.severancePayEligible).toBe(false);
    expect(result.severancePay).toBe(0);
  });

  it("근속 2년이면 퇴직금이 약 2배로 늘어난다", () => {
    const result = calculateResignationScenario({
      hireDate: "2024-07-01", // 2026-07-01까지 정확히 730일(윤년 2024 포함)
      resignationDate,
      monthlyWage,
    });
    expect(result.continuousServiceDays).toBe(730);
    expect(result.severancePay).toBe(Math.round(30000 * 30 * (730 / 365)));
  });

  it("연차 발생 일수도 함께 계산된다", () => {
    const result = calculateResignationScenario({
      hireDate: "2025-07-01", // 정확히 1년 근속 -> 연차 15일
      resignationDate,
      monthlyWage,
    });
    expect(result.annualLeaveDays).toBe(15);
  });
});
