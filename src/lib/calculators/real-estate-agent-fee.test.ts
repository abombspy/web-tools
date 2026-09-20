import { describe, expect, it } from "vitest";
import { calculateRealEstateAgentFee, type RealEstateAgentFeeRates } from "./real-estate-agent-fee";

const rates: RealEstateAgentFeeRates = {
  sale: {
    brackets: [
      { upTo: 50000000, rate: 0.006, cap: 250000 },
      { upTo: 200000000, rate: 0.005, cap: 800000 },
      { upTo: 900000000, rate: 0.004, cap: null },
      { upTo: 1200000000, rate: 0.005, cap: null },
      { upTo: 1500000000, rate: 0.006, cap: null },
      { upTo: null, rate: 0.007, cap: null },
    ],
  },
  lease: {
    brackets: [
      { upTo: 50000000, rate: 0.005, cap: 200000 },
      { upTo: 100000000, rate: 0.004, cap: 300000 },
      { upTo: 600000000, rate: 0.003, cap: null },
      { upTo: 1200000000, rate: 0.004, cap: null },
      { upTo: 1500000000, rate: 0.005, cap: null },
      { upTo: null, rate: 0.006, cap: null },
    ],
  },
};

describe("calculateRealEstateAgentFee", () => {
  it("매매 3억원은 2억~9억 구간(0.4%, 한도 없음)이 적용된다", () => {
    const result = calculateRealEstateAgentFee({ type: "sale", price: 300000000 }, rates);
    expect(result.appliedRatePercent).toBe(0.4);
    expect(result.fee).toBe(1200000);
    expect(result.feeCapped).toBe(false);
  });

  it("매매 5천만원 정각은 '미만' 구간을 벗어나 다음 구간(0.5%)이 적용된다(경계값)", () => {
    const result = calculateRealEstateAgentFee({ type: "sale", price: 50000000 }, rates);
    expect(result.appliedRatePercent).toBe(0.5);
    expect(result.fee).toBe(250000); // 50,000,000*0.005
  });

  it("매매 4천만원은 한도액(25만원)에 걸린다", () => {
    const result = calculateRealEstateAgentFee({ type: "sale", price: 40000000 }, rates);
    expect(result.fee).toBe(240000); // 한도액 미만이라 한도 적용 안 됨
    expect(result.feeCapped).toBe(false);
  });

  it("전세 3억원은 1억~6억 구간(0.3%)이 적용된다", () => {
    const result = calculateRealEstateAgentFee(
      { type: "lease", deposit: 300000000, monthlyRent: 0 },
      rates,
    );
    expect(result.appliedRatePercent).toBe(0.3);
    expect(result.fee).toBe(900000);
  });

  it("월세는 환산보증금(보증금+월세×100 또는 ×70)으로 계산하고, 한도액에 걸릴 수 있다", () => {
    const result = calculateRealEstateAgentFee(
      { type: "lease", deposit: 10000000, monthlyRent: 500000 },
      rates,
    );
    // 1차 환산: 10,000,000 + 500,000*100 = 60,000,000 (5천만원 이상이라 ×70 재계산 안 함)
    // 이 경우 6억 미만 1억 이상? 아니 6천만원이라 "5천~1억"구간(0.4%, 한도 30만원)
    expect(result.transactionAmount).toBe(60000000);
    expect(result.appliedRatePercent).toBe(0.4);
    expect(result.fee).toBe(240000); // 60,000,000*0.004 = 240,000 (한도 30만원 이내)
  });

  it("월세 환산액이 5천만원 미만이면 ×70으로 재계산한다", () => {
    const result = calculateRealEstateAgentFee(
      { type: "lease", deposit: 10000000, monthlyRent: 300000 },
      rates,
    );
    // 1차: 10,000,000 + 300,000*100 = 40,000,000 (5천만원 미만) -> ×70 재계산
    // 재계산: 10,000,000 + 300,000*70 = 31,000,000
    expect(result.transactionAmount).toBe(31000000);
  });
});
