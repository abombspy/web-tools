"use client";

import { useState } from "react";
import { calculateAnnualLeavePay } from "@/lib/calculators/annual-leave-pay";

export default function Calculator() {
  const [hireDate, setHireDate] = useState("");
  const [asOfDate, setAsOfDate] = useState("");
  const [monthlyWage, setMonthlyWage] = useState("2500000");
  const [usedDays, setUsedDays] = useState("0");

  const monthlyWageNum = Number(monthlyWage);
  const usedDaysNum = Number(usedDays);
  const hire = hireDate ? new Date(hireDate) : null;
  const asOf = asOfDate ? new Date(asOfDate) : null;

  const blockingErrors: string[] = [];
  if (!hire || Number.isNaN(hire.getTime())) {
    blockingErrors.push("입사일을 입력해 주세요.");
  }
  if (!asOf || Number.isNaN(asOf.getTime())) {
    blockingErrors.push("기준일(연차를 정산할 날짜)을 입력해 주세요.");
  }
  if (hire && asOf && !Number.isNaN(hire.getTime()) && !Number.isNaN(asOf.getTime()) && asOf.getTime() < hire.getTime()) {
    blockingErrors.push("기준일이 입사일보다 빠릅니다.");
  }
  if (!Number.isFinite(monthlyWageNum) || monthlyWageNum <= 0) {
    blockingErrors.push("월 통상임금은 0보다 큰 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(usedDaysNum) || usedDaysNum < 0) {
    blockingErrors.push("이미 사용한 연차 일수는 0 이상의 숫자로 입력해 주세요.");
  }

  const result =
    blockingErrors.length === 0
      ? calculateAnnualLeavePay({
          hireDate,
          asOfDate,
          monthlyWage: monthlyWageNum,
          usedDays: usedDaysNum,
        })
      : null;

  const usedMoreThanAccrued = result !== null && usedDaysNum > result.accruedDays;

  return (
    <div className="mt-8 rounded-lg border border-black/10 p-6 dark:border-white/10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          입사일
          <input
            type="date"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          기준일 (연차를 정산할 날짜)
          <input
            type="date"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={asOfDate}
            onChange={(e) => setAsOfDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          월 통상임금 (세전, 원)
          <input
            type="number"
            inputMode="numeric"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={monthlyWage}
            onChange={(e) => setMonthlyWage(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          이미 사용한 연차 일수
          <input
            type="number"
            inputMode="decimal"
            step="0.5"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={usedDays}
            onChange={(e) => setUsedDays(e.target.value)}
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

      {usedMoreThanAccrued && (
        <p className="mt-4 text-sm text-amber-600 dark:text-amber-400">
          입력한 사용 연차({usedDaysNum}일)가 발생 연차({result?.accruedDays}일)보다 많아서,
          미사용 연차는 0일로 계산했습니다.
        </p>
      )}

      {result && (
        <div className="mt-6 space-y-3 border-t border-black/10 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">예상 연차수당</p>
          <p className="text-3xl font-bold">{result.annualLeavePay.toLocaleString()}원</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>발생 연차: {result.accruedDays}일</li>
            <li>미사용 연차: {result.unusedDays}일</li>
            <li>1일 통상임금: {result.dailyWage.toLocaleString()}원</li>
          </ul>
        </div>
      )}
    </div>
  );
}
