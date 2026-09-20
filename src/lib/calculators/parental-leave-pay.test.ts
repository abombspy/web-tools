import { describe, expect, it } from "vitest";
import { calculateParentalLeavePay, type ParentalLeavePayRates } from "./parental-leave-pay";

const rates: ParentalLeavePayRates = {
  tiers: [
    { maxMonth: 3, rate: 1.0, cap: 2500000 },
    { maxMonth: 6, rate: 1.0, cap: 2000000 },
    { maxMonth: 12, rate: 0.8, cap: 1600000 },
  ],
  floor: 700000,
};

describe("calculateParentalLeavePay", () => {
  it("저소득자는 하한액(70만원)이 매달 보장된다", () => {
    const result = calculateParentalLeavePay({ monthlyWage: 500000, durationMonths: 12 }, rates);
    expect(result.monthly.every((m) => m.pay === 700000)).toBe(true);
    expect(result.total).toBe(700000 * 12);
  });

  it("고소득자는 구간별 상한액이 각각 적용된다", () => {
    const result = calculateParentalLeavePay({ monthlyWage: 5000000, durationMonths: 12 }, rates);
    expect(result.monthly[0].pay).toBe(2500000); // 1개월차
    expect(result.monthly[3].pay).toBe(2000000); // 4개월차
    expect(result.monthly[6].pay).toBe(1600000); // 7개월차
  });

  it("3개월에서 4개월로 넘어가며 상한액이 낮아져 월 수령액이 줄어들 수 있다(경계값)", () => {
    // 월 통상임금 220만원: 3개월차는 상한 250만원 이내라 그대로, 4개월차는 상한 200만원에 걸린다
    const result = calculateParentalLeavePay({ monthlyWage: 2200000, durationMonths: 4 }, rates);
    expect(result.monthly[2].pay).toBe(2200000); // 3개월차: 상한 미적용
    expect(result.monthly[3].pay).toBe(2000000); // 4개월차: 상한 200만원 적용
  });

  it("7개월차부터는 80%만 지급되고 상한도 낮아진다", () => {
    const result = calculateParentalLeavePay({ monthlyWage: 1900000, durationMonths: 7 }, rates);
    expect(result.monthly[6].rate).toBe(0.8);
    expect(result.monthly[6].pay).toBe(1520000); // 1,900,000 * 0.8
  });

  it("12개월을 꽉 채우면 총 지급액은 각 달의 합과 같다", () => {
    const result = calculateParentalLeavePay({ monthlyWage: 2000000, durationMonths: 12 }, rates);
    const manualSum = result.monthly.reduce((sum, m) => sum + m.pay, 0);
    expect(result.total).toBe(manualSum);
    expect(result.total).toBe(21600000);
  });
});
