// 고용보험법(구직급여) 기반. plan.md §4.1 "실업급여 모의 계산기".
//
// 스코프 제한: 이 계산기는 "자격이 있다고 가정했을 때 받을 금액"만 계산한다.
// 자발적 퇴사 여부 등 수급 자격 자체(고용보험법 제40조 등)는 판단하지 않는다(UI에 명시).
import { averageDailyWageFromMonthlyWage, fullYearsBetween } from "./date-utils";

export type UnemploymentBenefitRates = {
  rate: number;
  dailyCap: number;
  dailyFloorFormula: { minWageRatio: number; hoursPerDay: number };
  paymentDaysTable: {
    insuredYearsLessThan: number | null;
    under50Days: number;
    over50Days: number;
  }[];
};

export type UnemploymentBenefitInput = {
  birthDate: string;
  separationDate: string;
  insuredYears: number;
  monthlyWage: number;
};

export type UnemploymentBenefitResult = {
  age: number;
  averageDailyWage: number;
  dailyFloor: number;
  dailyBenefit: number;
  paymentDays: number;
  totalBenefit: number;
};

function findPaymentDays(
  table: UnemploymentBenefitRates["paymentDaysTable"],
  insuredYears: number,
  isOver50: boolean,
): number {
  const row =
    table.find((r) => r.insuredYearsLessThan !== null && insuredYears < r.insuredYearsLessThan) ??
    table[table.length - 1];
  return isOver50 ? row.over50Days : row.under50Days;
}

export function calculateUnemploymentBenefit(
  input: UnemploymentBenefitInput,
  rates: UnemploymentBenefitRates,
  minimumHourlyWage: number,
): UnemploymentBenefitResult {
  const birth = new Date(input.birthDate);
  const separation = new Date(input.separationDate);

  const age = fullYearsBetween(birth, separation);
  const averageDailyWage = averageDailyWageFromMonthlyWage(input.monthlyWage, separation);

  const dailyFloor = Math.round(
    minimumHourlyWage * rates.dailyFloorFormula.hoursPerDay * rates.dailyFloorFormula.minWageRatio,
  );

  const rawDailyBenefit = Math.round(averageDailyWage * rates.rate);
  const dailyBenefit = Math.min(Math.max(rawDailyBenefit, dailyFloor), rates.dailyCap);

  const paymentDays = findPaymentDays(rates.paymentDaysTable, input.insuredYears, age >= 50);
  const totalBenefit = dailyBenefit * paymentDays;

  return { age, averageDailyWage, dailyFloor, dailyBenefit, paymentDays, totalBenefit };
}
