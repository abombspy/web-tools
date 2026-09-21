"use client";

import { useState } from "react";
import {
  calculateElectricityBill,
  type ElectricityRates,
} from "@/lib/calculators/electricity-bill";

type Props = {
  rates: ElectricityRates;
  vatRate: number;
  fundRate: number;
};

export default function Calculator({ rates, vatRate, fundRate }: Props) {
  const [usageKwh, setUsageKwh] = useState("350");
  const [month, setMonth] = useState("7");

  const usageKwhNum = Number(usageKwh);
  const monthNum = Number(month);

  const blockingErrors: string[] = [];
  if (!Number.isFinite(usageKwhNum) || usageKwhNum < 0) {
    blockingErrors.push("사용량은 0 이상의 숫자로 입력해 주세요.");
  }

  const result =
    blockingErrors.length === 0 ? calculateElectricityBill(usageKwhNum, monthNum, rates) : null;

  const estimatedVat = result ? Math.round(result.totalBeforeTax * vatRate) : 0;
  const estimatedFund = result ? Math.round(result.totalBeforeTax * fundRate) : 0;
  const estimatedTotal = result ? result.totalBeforeTax + estimatedVat + estimatedFund : 0;

  return (
    <div className="mt-8 rounded-2xl border-2 border-sky-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          이번 달 사용량 (kWh)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={usageKwh}
            onChange={(e) => setUsageKwh(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          사용 월
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {m}월{rates.summerMonths.includes(m) ? " (여름철 완화 구간)" : ""}
              </option>
            ))}
          </select>
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
        <div className="mt-6 space-y-3 border-t-2 border-sky-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">예상 청구액 (부가세·기금 포함, 추정)</p>
          <p className="text-3xl font-bold">{estimatedTotal.toLocaleString()}원</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>기본요금: {result.basicFee.toLocaleString()}원</li>
            {result.breakdown.map((row) => (
              <li key={row.tierUpTo ?? "top"}>
                {row.amountKwh}kWh × {row.unitPrice}원 = {row.charge.toLocaleString()}원
              </li>
            ))}
            <li>전기요금(기본+전력량): {result.totalBeforeTax.toLocaleString()}원</li>
            <li>부가세(추정): {estimatedVat.toLocaleString()}원</li>
            <li>전력산업기반기금(추정): {estimatedFund.toLocaleString()}원</li>
          </ul>
        </div>
      )}
    </div>
  );
}
