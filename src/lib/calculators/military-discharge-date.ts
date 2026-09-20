// 병역법 시행령상 복무기간(2026년 기준). plan.md §4.5 "군 전역일 계산기".
// 복무기간은 병역법 개정으로 바뀔 수 있어 값 자체는 verified 표기와 함께 다시 확인이 필요하다.
import { daysBetween } from "./date-utils";

export type MilitaryBranch = "army" | "navy" | "airforce" | "socialService";

export const SERVICE_MONTHS: Record<MilitaryBranch, number> = {
  army: 18,
  navy: 20,
  airforce: 21,
  socialService: 21,
};

export type MilitaryDischargeDateResult = {
  dischargeDate: string;
  daysRemaining: number;
  totalServiceDays: number;
  daysServed: number;
  progressPercent: number;
};

export function calculateMilitaryDischargeDate(
  enlistmentDate: string,
  branch: MilitaryBranch,
  asOfDate: string,
): MilitaryDischargeDateResult {
  const enlistment = new Date(enlistmentDate);
  const asOf = new Date(asOfDate);

  const discharge = new Date(enlistment);
  discharge.setUTCMonth(discharge.getUTCMonth() + SERVICE_MONTHS[branch]);

  const totalServiceDays = daysBetween(enlistment, discharge);
  const daysServed = Math.min(Math.max(daysBetween(enlistment, asOf), 0), totalServiceDays);
  const daysRemaining = daysBetween(asOf, discharge);
  const progressPercent = Math.round((daysServed / totalServiceDays) * 1000) / 10;

  return {
    dischargeDate: discharge.toISOString().slice(0, 10),
    daysRemaining,
    totalServiceDays,
    daysServed,
    progressPercent,
  };
}
