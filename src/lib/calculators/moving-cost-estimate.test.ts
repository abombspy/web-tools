import { describe, expect, it } from "vitest";
import { calculateMovingCostEstimate, type MovingCostRates } from "./moving-cost-estimate";

const rates: MovingCostRates = {
  pricePerPyeong: { general: 12000, semiPacked: 22000, fullPacked: 40000 },
  minimumCost: { general: 80000, semiPacked: 180000, fullPacked: 350000 },
  ladderTruckFeePerLocation: 150000,
  rangeLowerMultiplier: 0.8,
  rangeUpperMultiplier: 1.3,
};

describe("calculateMovingCostEstimate", () => {
  it("작은 평수는 평당 단가 대신 최소비용(출동비)이 적용된다(경계값)", () => {
    const result = calculateMovingCostEstimate(
      { pyeong: 5, method: "fullPacked", ladderTruckLocations: 0 },
      rates,
    );
    expect(result.baseCost).toBe(350000); // 5*40000=200,000 < 최소 350,000
  });

  it("평수가 커서 평당 단가가 최소비용을 넘으면 평당 단가가 적용된다", () => {
    const result = calculateMovingCostEstimate(
      { pyeong: 15, method: "fullPacked", ladderTruckLocations: 0 },
      rates,
    );
    expect(result.baseCost).toBe(600000); // 15*40000
  });

  it("사다리차는 개소당 가산된다", () => {
    const oneLocation = calculateMovingCostEstimate(
      { pyeong: 15, method: "fullPacked", ladderTruckLocations: 1 },
      rates,
    );
    const twoLocations = calculateMovingCostEstimate(
      { pyeong: 15, method: "fullPacked", ladderTruckLocations: 2 },
      rates,
    );
    expect(oneLocation.ladderTruckFee).toBe(150000);
    expect(twoLocations.ladderTruckFee).toBe(300000);
  });

  it("결과는 단일 숫자가 아니라 최소~최대 범위로 나온다", () => {
    const result = calculateMovingCostEstimate(
      { pyeong: 15, method: "fullPacked", ladderTruckLocations: 0 },
      rates,
    );
    expect(result.estimateLow).toBe(480000); // 600,000*0.8
    expect(result.estimateHigh).toBe(780000); // 600,000*1.3
    expect(result.estimateLow).toBeLessThan(result.estimateHigh);
  });

  it("일반이사(용달)는 포장이사보다 저렴하다", () => {
    const general = calculateMovingCostEstimate(
      { pyeong: 15, method: "general", ladderTruckLocations: 0 },
      rates,
    );
    const fullPacked = calculateMovingCostEstimate(
      { pyeong: 15, method: "fullPacked", ladderTruckLocations: 0 },
      rates,
    );
    expect(general.baseCost).toBeLessThan(fullPacked.baseCost);
  });
});
