// 근로기준법 제60조(연차) + 통상임금 산정 방식. plan.md §4.1 "연차수당 계산기".
// 연차 발생 일수 계산은 annual-leave-days.ts를 재사용한다(퇴사 시점 비교 계산기와 공유).
//
// 스코프 제한: 주 40시간 근무 정규직 기준. 단시간근로자(파트타임)는 소정근로시간 비율로
// 연차가 별도 조정되며 이 계산기는 다루지 않는다(UI에 명시).
import { calculateAnnualLeaveDays } from "./annual-leave-days";

// 1일 통상임금 = 월 통상임금 ÷ 월 소정근로시간(209) × 8시간.
// 209시간 = (주 40시간 + 유급주휴 8시간) × 52주 ÷ 12개월.
const STANDARD_MONTHLY_HOURS = 209;
const STANDARD_DAILY_HOURS = 8;

export type AnnualLeavePayInput = {
  hireDate: string;
  asOfDate: string;
  monthlyWage: number;
  usedDays: number;
};

export type AnnualLeavePayResult = {
  accruedDays: number;
  unusedDays: number;
  dailyWage: number;
  annualLeavePay: number;
};

export function calculateAnnualLeavePay(input: AnnualLeavePayInput): AnnualLeavePayResult {
  const hire = new Date(input.hireDate);
  const asOf = new Date(input.asOfDate);

  const accruedDays = calculateAnnualLeaveDays(hire, asOf);
  const unusedDays = Math.max(accruedDays - input.usedDays, 0);

  const dailyWage = Math.round((input.monthlyWage / STANDARD_MONTHLY_HOURS) * STANDARD_DAILY_HOURS);
  const annualLeavePay = unusedDays * dailyWage;

  return { accruedDays, unusedDays, dailyWage, annualLeavePay };
}
