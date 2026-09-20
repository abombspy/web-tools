// 주택임대차보호법 제7조의2·시행령 제9조(전월세전환율 상한). plan.md §4.3 "전월세 전환율 계산기".
// 법정 상한 = min(한국은행 기준금리 + 2%p, 연 10%).

export type JeonseToMonthlyRentInput = {
  jeonseDeposit: number;
  newDeposit: number;
  baseRatePercent: number;
  appliedRatePercent: number;
};

export type JeonseToMonthlyRentResult = {
  convertedAmount: number;
  legalMaxRatePercent: number;
  legalMaxMonthlyRent: number;
  appliedMonthlyRent: number;
  exceedsLegalMax: boolean;
};

const FIXED_CAP_PERCENT = 10;
const BASE_RATE_MARGIN_PERCENT = 2;

export function calculateJeonseToMonthlyRent(
  input: JeonseToMonthlyRentInput,
): JeonseToMonthlyRentResult {
  const convertedAmount = input.jeonseDeposit - input.newDeposit;

  const legalMaxRatePercent = Math.min(
    input.baseRatePercent + BASE_RATE_MARGIN_PERCENT,
    FIXED_CAP_PERCENT,
  );

  const legalMaxMonthlyRent = Math.round((convertedAmount * legalMaxRatePercent) / 100 / 12);
  const appliedMonthlyRent = Math.round((convertedAmount * input.appliedRatePercent) / 100 / 12);

  return {
    convertedAmount,
    legalMaxRatePercent,
    legalMaxMonthlyRent,
    appliedMonthlyRent,
    exceedsLegalMax: input.appliedRatePercent > legalMaxRatePercent,
  };
}
