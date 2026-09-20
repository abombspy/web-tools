// 근로자퇴직급여보장법 제8조(퇴직금) + 근로기준법 제60조(연차) 기반.
// plan.md §4.1 "퇴사 시점 비교 계산기".
//
// 스코프 제한(간이 계산):
// - 평균임금은 "월급이 최근 3개월간 동일했다"고 가정하고, 그 3개월의 정확한 역일수(달력일수)로
//   나눠 계산한다. 상여금·미사용 연차수당 등 비정기 수입은 평균임금에 반영하지 않는다.
// - 연차는 발생 "일수"만 계산하고(annual-leave-days.ts), 미사용 연차수당 금액은
//   "연차수당 계산기"에서 별도로 계산하도록 안내한다(중복 로직 방지).
import { calculateAnnualLeaveDays } from "./annual-leave-days";
import { averageDailyWageFromMonthlyWage, daysBetween } from "./date-utils";

export type ResignationScenarioInput = {
  hireDate: string;
  resignationDate: string;
  monthlyWage: number;
};

export type ResignationScenarioResult = {
  resignationDate: string;
  continuousServiceDays: number;
  severancePayEligible: boolean;
  averageDailyWage: number;
  severancePay: number;
  annualLeaveDays: number;
};

export function calculateResignationScenario(
  input: ResignationScenarioInput,
): ResignationScenarioResult {
  const hire = new Date(input.hireDate);
  const resignation = new Date(input.resignationDate);

  const continuousServiceDays = daysBetween(hire, resignation);
  const severancePayEligible = continuousServiceDays >= 365;

  const averageDailyWage = averageDailyWageFromMonthlyWage(input.monthlyWage, resignation);

  const severancePay = severancePayEligible
    ? Math.round(averageDailyWage * 30 * (continuousServiceDays / 365))
    : 0;

  const annualLeaveDays = calculateAnnualLeaveDays(hire, resignation);

  return {
    resignationDate: input.resignationDate,
    continuousServiceDays,
    severancePayEligible,
    averageDailyWage,
    severancePay,
    annualLeaveDays,
  };
}
