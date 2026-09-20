"use client";

import { useState } from "react";
import {
  calculateUnemploymentBenefit,
  type UnemploymentBenefitRates,
} from "@/lib/calculators/unemployment-benefit";

type Props = {
  rates: UnemploymentBenefitRates;
  minimumHourlyWage: number;
};

export default function Calculator({ rates, minimumHourlyWage }: Props) {
  const [birthDate, setBirthDate] = useState("");
  const [separationDate, setSeparationDate] = useState("");
  const [insuredYears, setInsuredYears] = useState("2");
  const [monthlyWage, setMonthlyWage] = useState("2500000");

  const insuredYearsNum = Number(insuredYears);
  const monthlyWageNum = Number(monthlyWage);
  const birth = birthDate ? new Date(birthDate) : null;
  const separation = separationDate ? new Date(separationDate) : null;

  const blockingErrors: string[] = [];
  if (!birth || Number.isNaN(birth.getTime())) {
    blockingErrors.push("생년월일을 입력해 주세요.");
  }
  if (!separation || Number.isNaN(separation.getTime())) {
    blockingErrors.push("이직일을 입력해 주세요.");
  }
  if (birth && separation && !Number.isNaN(birth.getTime()) && !Number.isNaN(separation.getTime()) && separation.getTime() < birth.getTime()) {
    blockingErrors.push("이직일이 생년월일보다 빠릅니다.");
  }
  if (!Number.isFinite(insuredYearsNum) || insuredYearsNum < 0) {
    blockingErrors.push("고용보험 가입기간은 0 이상의 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(monthlyWageNum) || monthlyWageNum <= 0) {
    blockingErrors.push("월급은 0보다 큰 숫자로 입력해 주세요.");
  }

  const result =
    blockingErrors.length === 0
      ? calculateUnemploymentBenefit(
          { birthDate, separationDate, insuredYears: insuredYearsNum, monthlyWage: monthlyWageNum },
          rates,
          minimumHourlyWage,
        )
      : null;

  return (
    <div className="mt-8 rounded-lg border border-black/10 p-6 dark:border-white/10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          생년월일
          <input
            type="date"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          이직일 (마지막 근무일 다음날)
          <input
            type="date"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={separationDate}
            onChange={(e) => setSeparationDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          고용보험 가입기간 (년)
          <input
            type="number"
            inputMode="decimal"
            step="0.1"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={insuredYears}
            onChange={(e) => setInsuredYears(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          이직 전 월급 (세전, 최근 3개월 동일 가정)
          <input
            type="number"
            inputMode="numeric"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={monthlyWage}
            onChange={(e) => setMonthlyWage(e.target.value)}
            min={0}
          />
        </label>
      </div>

      {blockingErrors.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-red-600 dark:text-red-400">
          {blockingErrors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      {result && (
        <div className="mt-6 space-y-3 border-t border-black/10 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">예상 구직급여 총액 (자격이 있다고 가정)</p>
          <p className="text-3xl font-bold">{result.totalBenefit.toLocaleString()}원</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>만 나이(이직일 기준): {result.age}세</li>
            <li>평균임금(1일): {result.averageDailyWage.toLocaleString()}원</li>
            <li>
              구직급여일액: {result.dailyBenefit.toLocaleString()}원
              {result.dailyBenefit === result.dailyFloor && " (하한액 적용)"}
              {result.dailyBenefit === rates.dailyCap && " (상한액 적용)"}
            </li>
            <li>소정급여일수: {result.paymentDays}일</li>
          </ul>
        </div>
      )}
    </div>
  );
}
