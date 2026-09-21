"use client";

import { useState } from "react";
import {
  calculateWithholdingTax,
  type WithholdingTaxRates,
} from "@/lib/calculators/withholding-tax-3-3";

type Mode = "fromGross" | "fromNet";

export default function Calculator({ rates }: { rates: WithholdingTaxRates }) {
  const [mode, setMode] = useState<Mode>("fromGross");
  const [amount, setAmount] = useState("1000000");

  const amountNum = Number(amount);

  const blockingErrors: string[] = [];
  if (!Number.isFinite(amountNum) || amountNum < 0) {
    blockingErrors.push("금액은 0 이상의 숫자로 입력해 주세요.");
  }

  const result =
    blockingErrors.length === 0
      ? calculateWithholdingTax(
          mode === "fromGross"
            ? { mode: "fromGross", grossAmount: amountNum }
            : { mode: "fromNet", netAmount: amountNum },
          rates,
        )
      : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-rose-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <label className="flex flex-col gap-1 text-sm">
          입력 기준
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
          >
            <option value="fromGross">세전 금액(계약서상 금액)</option>
            <option value="fromNet">세후 금액(실제 입금액)</option>
          </select>
        </label>
        <label className="flex flex-1 flex-col gap-1 text-sm">
          금액 (원)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
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
        <div className="mt-6 space-y-3 border-t-2 border-rose-100 pt-6 dark:border-white/10">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-zinc-500">세전 금액</p>
              <p className="text-2xl font-bold">{result.grossAmount.toLocaleString()}원</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">세후 실지급액</p>
              <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                {result.netAmount.toLocaleString()}원
              </p>
            </div>
          </div>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              소득세({Math.round(rates.businessIncomeRate * 100)}%):{" "}
              {result.incomeTax.toLocaleString()}원
            </li>
            <li>
              지방소득세(소득세의 {Math.round(rates.localIncomeTaxRateOfIncomeTax * 100)}%):{" "}
              {result.localIncomeTax.toLocaleString()}원
            </li>
            <li>원천징수 합계: {result.totalWithholding.toLocaleString()}원</li>
          </ul>
          {result.isApproximateReverse && (
            <p className="text-xs text-zinc-500">
              세후 금액에서 역산한 값이라 반올림으로 인해 실제 지급 내역과 1~2원 차이가 날 수
              있습니다.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
