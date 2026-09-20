import { describe, expect, it } from "vitest";
import { calculateMilitaryDischargeDate } from "./military-discharge-date";

describe("calculateMilitaryDischargeDate", () => {
  it("육군은 입대일로부터 18개월 후 전역한다", () => {
    const result = calculateMilitaryDischargeDate("2026-01-01", "army", "2026-01-01");
    expect(result.dischargeDate).toBe("2027-07-01");
  });

  it("입대 당일에는 복무율이 0%다(경계값)", () => {
    const result = calculateMilitaryDischargeDate("2026-01-01", "army", "2026-01-01");
    expect(result.daysServed).toBe(0);
    expect(result.progressPercent).toBe(0);
  });

  it("전역일 당일에는 복무율이 100%고 남은 날이 0이다(경계값)", () => {
    const result = calculateMilitaryDischargeDate("2026-01-01", "army", "2027-07-01");
    expect(result.progressPercent).toBe(100);
    expect(result.daysRemaining).toBe(0);
  });

  it("전역일을 지나도 복무일수는 총 복무일수를 넘지 않는다(상한 클램프)", () => {
    const result = calculateMilitaryDischargeDate("2026-01-01", "army", "2030-01-01");
    expect(result.daysServed).toBe(result.totalServiceDays);
    expect(result.daysRemaining).toBeLessThan(0);
  });

  it("입대 전 날짜를 기준일로 넣어도 복무일수가 음수로 내려가지 않는다(하한 클램프)", () => {
    const result = calculateMilitaryDischargeDate("2026-06-01", "army", "2026-01-01");
    expect(result.daysServed).toBe(0);
  });

  it("병종마다 총 복무기간이 다르다(해군 > 육군)", () => {
    const army = calculateMilitaryDischargeDate("2026-01-01", "army", "2026-01-01");
    const navy = calculateMilitaryDischargeDate("2026-01-01", "navy", "2026-01-01");
    expect(navy.totalServiceDays).toBeGreaterThan(army.totalServiceDays);
  });
});
