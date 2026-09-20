import { describe, expect, it } from "vitest";
import { calculateAnnualLeavePay } from "./annual-leave-pay";

describe("calculateAnnualLeavePay", () => {
  // 2,612,500 / 209 * 8 = 100,000원 (깔끔한 숫자로 검증 용이)
  const monthlyWage = 2612500;

  it("1일 통상임금은 월급÷209×8이다", () => {
    const result = calculateAnnualLeavePay({
      hireDate: "2024-01-01",
      asOfDate: "2025-01-01", // 정확히 1년 -> 15일 발생
      monthlyWage,
      usedDays: 0,
    });
    expect(result.dailyWage).toBe(100000);
  });

  it("발생 연차에서 사용 연차를 뺀 만큼만 수당이 나온다", () => {
    const result = calculateAnnualLeavePay({
      hireDate: "2024-01-01",
      asOfDate: "2025-01-01",
      monthlyWage,
      usedDays: 5,
    });
    expect(result.accruedDays).toBe(15);
    expect(result.unusedDays).toBe(10);
    expect(result.annualLeavePay).toBe(1000000); // 10일 * 100,000원
  });

  it("사용 연차가 발생 연차보다 많아도 미사용 일수는 0 아래로 내려가지 않는다(경계값)", () => {
    const result = calculateAnnualLeavePay({
      hireDate: "2024-01-01",
      asOfDate: "2025-01-01",
      monthlyWage,
      usedDays: 20, // 발생(15일)보다 많이 입력
    });
    expect(result.unusedDays).toBe(0);
    expect(result.annualLeavePay).toBe(0);
  });

  it("연차를 전부 사용하면 수당이 0원이다", () => {
    const result = calculateAnnualLeavePay({
      hireDate: "2024-01-01",
      asOfDate: "2025-01-01",
      monthlyWage,
      usedDays: 15,
    });
    expect(result.unusedDays).toBe(0);
    expect(result.annualLeavePay).toBe(0);
  });
});
