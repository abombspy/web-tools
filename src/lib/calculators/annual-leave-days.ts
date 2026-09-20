// 근로기준법 제60조. plan.md §4.1 "연차수당 계산기" · "퇴사 시점 비교 계산기"가 공유하는 로직.
// - 계속근로기간 1년 미만: 1개월 개근 시 1일 (최대 11일)
// - 1년 이상(80% 이상 출근 가정): 15일, 최초 1년을 초과하는 매 2년마다 1일 가산 (최대 25일)
//
// 단순화: 매달 개근·매해 80% 이상 출근했다고 가정한다(실제로는 결근이 있으면 줄어들 수 있음).
import { fullMonthsBetween } from "./date-utils";

export function calculateAnnualLeaveDays(hireDate: Date, asOfDate: Date): number {
  const months = fullMonthsBetween(hireDate, asOfDate);
  const years = Math.floor(months / 12);

  if (years < 1) {
    return Math.min(months, 11);
  }
  return Math.min(15 + Math.floor((years - 1) / 2), 25);
}
