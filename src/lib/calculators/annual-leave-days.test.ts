import { describe, expect, it } from "vitest";
import { calculateAnnualLeaveDays } from "./annual-leave-days";

describe("calculateAnnualLeaveDays", () => {
  const hireDate = new Date("2024-01-01");

  it("11개월째에는 11일(1년 미만 상한)", () => {
    expect(calculateAnnualLeaveDays(hireDate, new Date("2024-12-01"))).toBe(11);
  });

  it("정확히 1년이 되면 15일로 전환된다(경계값)", () => {
    expect(calculateAnnualLeaveDays(hireDate, new Date("2025-01-01"))).toBe(15);
  });

  it("2년차까지는 그대로 15일", () => {
    expect(calculateAnnualLeaveDays(hireDate, new Date("2026-01-01"))).toBe(15);
  });

  it("3년차부터 16일로 가산된다(경계값)", () => {
    expect(calculateAnnualLeaveDays(hireDate, new Date("2027-01-01"))).toBe(16);
  });

  it("5년차에 17일로 다시 가산된다", () => {
    expect(calculateAnnualLeaveDays(hireDate, new Date("2029-01-01"))).toBe(17);
  });

  it("21년차에 상한 25일에 도달한다", () => {
    expect(calculateAnnualLeaveDays(hireDate, new Date("2045-01-01"))).toBe(25);
  });

  it("21년차를 넘어도 25일에서 더 늘지 않는다(상한)", () => {
    expect(calculateAnnualLeaveDays(hireDate, new Date("2050-01-01"))).toBe(25);
  });

  it("입사 당일에는 0일", () => {
    expect(calculateAnnualLeaveDays(hireDate, new Date("2024-01-01"))).toBe(0);
  });
});
