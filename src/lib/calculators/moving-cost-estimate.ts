// plan.md §4.3 "이사 비용 견적 계산기". §6.4에서 이미 밝힌 대로 공식 요율표가 없어
// 이사 업체·비교 플랫폼 자료를 교차 검색해 얻은 대략적인 평당 단가로 추정한다.
// 편차가 크므로 단일 숫자가 아니라 범위(최소~최대)로 보여주고, 실제 견적을 받아보라고
// UI에서 강하게 안내한다(허위 정밀도 방지).

export type MovingMethod = "general" | "semiPacked" | "fullPacked";

export type MovingCostRates = {
  pricePerPyeong: Record<MovingMethod, number>;
  minimumCost: Record<MovingMethod, number>;
  ladderTruckFeePerLocation: number;
  rangeLowerMultiplier: number;
  rangeUpperMultiplier: number;
};

export type MovingCostInput = {
  pyeong: number;
  method: MovingMethod;
  ladderTruckLocations: number; // 0~2 (출발지·도착지)
};

export type MovingCostResult = {
  baseCost: number;
  ladderTruckFee: number;
  estimateLow: number;
  estimateHigh: number;
};

export function calculateMovingCostEstimate(
  input: MovingCostInput,
  rates: MovingCostRates,
): MovingCostResult {
  const rawCost = input.pyeong * rates.pricePerPyeong[input.method];
  const baseCost = Math.round(Math.max(rawCost, rates.minimumCost[input.method]));
  const ladderTruckFee = input.ladderTruckLocations * rates.ladderTruckFeePerLocation;

  const subtotal = baseCost + ladderTruckFee;

  return {
    baseCost,
    ladderTruckFee,
    estimateLow: Math.round(subtotal * rates.rangeLowerMultiplier),
    estimateHigh: Math.round(subtotal * rates.rangeUpperMultiplier),
  };
}
