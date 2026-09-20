// 고용보험법 시행령(육아휴직급여). plan.md §4.1 "육아휴직 급여 계산기".
//
// 스코프 제한: 부모 모두 육아휴직을 쓰는 "6+6 부모육아휴직제" 특례는 별도 제도라 다루지 않는다
// (일반 육아휴직급여만 계산, UI에 명시). 2025년 1월부터 사후지급금(25%) 제도가 폐지되어
// 매월 전액을 지급하는 것으로 반영한다.

export type ParentalLeavePayRates = {
  tiers: { maxMonth: number; rate: number; cap: number }[];
  floor: number;
};

export type ParentalLeavePayInput = {
  monthlyWage: number;
  durationMonths: number;
};

export type ParentalLeavePayMonthlyBreakdown = {
  month: number;
  rate: number;
  pay: number;
};

export type ParentalLeavePayResult = {
  monthly: ParentalLeavePayMonthlyBreakdown[];
  total: number;
};

function findTier(tiers: ParentalLeavePayRates["tiers"], month: number) {
  return tiers.find((t) => month <= t.maxMonth) ?? tiers[tiers.length - 1];
}

export function calculateParentalLeavePay(
  input: ParentalLeavePayInput,
  rates: ParentalLeavePayRates,
): ParentalLeavePayResult {
  const monthly: ParentalLeavePayMonthlyBreakdown[] = [];

  for (let month = 1; month <= input.durationMonths; month += 1) {
    const tier = findTier(rates.tiers, month);
    const computed = input.monthlyWage * tier.rate;
    const pay = Math.round(Math.min(Math.max(computed, rates.floor), tier.cap));
    monthly.push({ month, rate: tier.rate, pay });
  }

  const total = monthly.reduce((sum, m) => sum + m.pay, 0);

  return { monthly, total };
}
