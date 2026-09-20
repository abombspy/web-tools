"use client";

import { useState } from "react";
import { calculateLoanRepayment } from "@/lib/calculators/loan-repayment";

export default function Calculator() {
  const [principal, setPrincipal] = useState("100000000");
  const [annualRatePercent, setAnnualRatePercent] = useState("4.5");
  const [years, setYears] = useState("30");

  const principalNum = Number(principal);
  const annualRateNum = Number(annualRatePercent);
  const yearsNum = Number(years);
  const monthsNum = Math.round(yearsNum * 12);

  const blockingErrors: string[] = [];
  if (!Number.isFinite(principalNum) || principalNum <= 0) {
    blockingErrors.push("대출금은 0보다 큰 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(annualRateNum) || annualRateNum < 0) {
    blockingErrors.push("연이자율은 0 이상의 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(yearsNum) || yearsNum <= 0 || monthsNum > 600) {
    blockingErrors.push("대출 기간은 0년 초과 50년(600개월) 이하로 입력해 주세요.");
  }

  const result =
    blockingErrors.length === 0
      ? calculateLoanRepayment({
          principal: principalNum,
          annualRatePercent: annualRateNum,
          months: monthsNum,
        })
      : null;

  return (
    <div className="mt-8 rounded-lg border border-black/10 p-6 dark:border-white/10">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <label className="flex flex-col gap-1 text-sm">
          대출금 (원)
          <input
            type="number"
            inputMode="numeric"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={principal}
            onChange={(e) => setPrincipal(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          연이자율 (%)
          <input
            type="number"
            inputMode="decimal"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={annualRatePercent}
            onChange={(e) => setAnnualRatePercent(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          대출 기간 (년)
          <input
            type="number"
            inputMode="decimal"
            className="rounded border border-black/20 px-3 py-2 dark:border-white/20 dark:bg-transparent"
            value={years}
            onChange={(e) => setYears(e.target.value)}
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
        <div className="mt-6 grid grid-cols-1 gap-6 border-t border-black/10 pt-6 sm:grid-cols-2 dark:border-white/10">
          <div>
            <p className="text-sm font-semibold">원리금균등상환</p>
            <p className="mt-1 text-xs text-zinc-500">매달 갚는 금액이 항상 동일</p>
            <p className="mt-2 text-2xl font-bold">
              {result.equalPayment.schedule[0].payment.toLocaleString()}원
              <span className="text-sm font-normal text-zinc-500"> /월</span>
            </p>
            <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
              <li>총 상환액: {result.equalPayment.totalPayment.toLocaleString()}원</li>
              <li>총 이자: {result.equalPayment.totalInterest.toLocaleString()}원</li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold">원금균등상환</p>
            <p className="mt-1 text-xs text-zinc-500">매달 갚는 원금은 동일, 이자는 점점 감소</p>
            <p className="mt-2 text-2xl font-bold">
              {result.equalPrincipal.schedule[0].payment.toLocaleString()}원
              <span className="text-sm font-normal text-zinc-500"> /월 (첫 달)</span>
            </p>
            <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                마지막 달:{" "}
                {result.equalPrincipal.schedule.at(-1)?.payment.toLocaleString()}원
              </li>
              <li>총 상환액: {result.equalPrincipal.totalPayment.toLocaleString()}원</li>
              <li>총 이자: {result.equalPrincipal.totalInterest.toLocaleString()}원</li>
            </ul>
          </div>
          <p className="text-sm text-zinc-600 sm:col-span-2 dark:text-zinc-400">
            원금균등상환이 총 이자{" "}
            {(result.equalPayment.totalInterest - result.equalPrincipal.totalInterest).toLocaleString()}
            원 더 적지만, 초반 상환 부담(첫 달 {result.equalPrincipal.schedule[0].payment.toLocaleString()}
            원)이 원리금균등보다 큽니다.
          </p>
        </div>
      )}
    </div>
  );
}
