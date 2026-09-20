import { describe, expect, it } from "vitest";
import { calculateElectricityBill, type ElectricityRates } from "./electricity-bill";

const rates: ElectricityRates = {
  general: {
    tiers: [
      { upTo: 200, basicFee: 910, unitPrice: 120.0 },
      { upTo: 400, basicFee: 1600, unitPrice: 214.6 },
      { upTo: null, basicFee: 7300, unitPrice: 307.3 },
    ],
  },
  summer: {
    tiers: [
      { upTo: 300, basicFee: 910, unitPrice: 120.0 },
      { upTo: 450, basicFee: 1600, unitPrice: 214.6 },
      { upTo: null, basicFee: 7300, unitPrice: 307.3 },
    ],
  },
  summerMonths: [7, 8],
};

describe("calculateElectricityBill", () => {
  it("일반 기간 350kWh는 2단계까지 걸친다", () => {
    const result = calculateElectricityBill(350, 5, rates);
    expect(result.isSummer).toBe(false);
    expect(result.basicFee).toBe(1600);
    expect(result.energyCharge).toBe(56190); // 200*120 + 150*214.6
    expect(result.totalBeforeTax).toBe(57790);
  });

  it("3단계까지 넘어가면 기본요금도 3단계 요금으로 바뀐다", () => {
    const result = calculateElectricityBill(500, 5, rates);
    expect(result.basicFee).toBe(7300);
    expect(result.energyCharge).toBe(97650); // 200*120 + 200*214.6 + 100*307.3
    expect(result.totalBeforeTax).toBe(104950);
  });

  it("여름철(7~8월)은 같은 사용량이라도 더 낮은 구간이 적용되어 요금이 싸다", () => {
    const generalResult = calculateElectricityBill(350, 5, rates);
    const summerResult = calculateElectricityBill(350, 7, rates);
    expect(summerResult.isSummer).toBe(true);
    expect(summerResult.totalBeforeTax).toBeLessThan(generalResult.totalBeforeTax);
    expect(summerResult.totalBeforeTax).toBe(48330); // 300*120 + 50*214.6 + 1600
  });

  it("정확히 구간 경계(200kWh)에서는 1단계 요금만 적용된다(경계값)", () => {
    const result = calculateElectricityBill(200, 5, rates);
    expect(result.basicFee).toBe(910);
    expect(result.energyCharge).toBe(24000); // 200*120
  });

  it("사용량 0이면 기본요금만 부과된다(경계값)", () => {
    const result = calculateElectricityBill(0, 5, rates);
    expect(result.energyCharge).toBe(0);
    expect(result.totalBeforeTax).toBe(result.basicFee);
  });
});
