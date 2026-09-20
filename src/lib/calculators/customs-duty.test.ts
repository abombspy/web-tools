import { describe, expect, it } from "vitest";
import { calculateCustomsDuty, type CustomsDutyRates } from "./customs-duty";

const rates: CustomsDutyRates = { generalLimitUsd: 150, usOriginLimitUsd: 200, vatRate: 0.1 };

const base = {
  exchangeRate: 1300,
  isUsOrigin: false,
  isListClearanceEligible: true,
  dutyRate: 0.08,
};

describe("calculateCustomsDuty", () => {
  it("면세한도 이하면 세금이 0원이다", () => {
    const result = calculateCustomsDuty(
      { ...base, itemPriceUsd: 100, shippingFeeUsd: 20 },
      rates,
    );
    expect(result.isDutyFree).toBe(true);
    expect(result.totalTax).toBe(0);
  });

  it("일반 물품은 150달러를 넘으면 전체 금액에 과세한다(공제 없음, 절벽 효과)", () => {
    const result = calculateCustomsDuty(
      { ...base, itemPriceUsd: 140, shippingFeeUsd: 20 }, // 합계 160달러
      rates,
    );
    expect(result.isDutyFree).toBe(false);
    expect(result.taxableValueKrw).toBe(208000); // 160 * 1300
    expect(result.duty).toBe(16640); // 208,000 * 0.08
    expect(result.vat).toBe(22464); // (208,000+16,640) * 0.1
    expect(result.totalTax).toBe(39104);
  });

  it("미국발 + 목록통관 가능 품목은 200달러까지 면세다", () => {
    const result = calculateCustomsDuty(
      { ...base, itemPriceUsd: 170, shippingFeeUsd: 10, isUsOrigin: true }, // 합계 180달러
      rates,
    );
    expect(result.dutyFreeLimit).toBe(200);
    expect(result.isDutyFree).toBe(true);
  });

  it("미국발이어도 목록통관 제외 품목(화장품 등)이면 150달러 기준이 적용된다", () => {
    const result = calculateCustomsDuty(
      {
        ...base,
        itemPriceUsd: 170,
        shippingFeeUsd: 10, // 합계 180달러
        isUsOrigin: true,
        isListClearanceEligible: false,
      },
      rates,
    );
    expect(result.dutyFreeLimit).toBe(150);
    expect(result.isDutyFree).toBe(false);
  });

  it("합계가 면세한도와 정확히 같으면 면세다(경계값)", () => {
    const result = calculateCustomsDuty(
      { ...base, itemPriceUsd: 150, shippingFeeUsd: 0 },
      rates,
    );
    expect(result.isDutyFree).toBe(true);
  });

  it("면세한도를 1달러라도 넘으면 과세로 전환된다(경계값)", () => {
    const result = calculateCustomsDuty(
      { ...base, itemPriceUsd: 151, shippingFeeUsd: 0 },
      rates,
    );
    expect(result.isDutyFree).toBe(false);
  });
});
