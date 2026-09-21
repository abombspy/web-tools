"use client";

import { useState } from "react";
import { calculateVat, type VatRates } from "@/lib/calculators/vat";

type Mode = "fromSupply" | "fromTotal";

export default function Calculator({ rates }: { rates: VatRates }) {
  const [mode, setMode] = useState<Mode>("fromSupply");
  const [amount, setAmount] = useState("1000000");

  const amountNum = Number(amount);

  const blockingErrors: string[] = [];
  if (!Number.isFinite(amountNum) || amountNum < 0) {
    blockingErrors.push("금액은 0 이상의 숫자로 입력해 주세요.");
  }

  const result =
    blockingErrors.length === 0
      ? calculateVat(
          mode === "fromSupply"
            ? { mode: "fromSupply", supplyAmount: amountNum }
            : { mode: "fromTotal", totalAmount: amountNum },
          rates,
        )
      : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <label className="flex flex-col gap-1 text-sm">
          입력 기준
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
          >
            <option value="fromSupply">공급가액(부가세 제외)</option>
            <option value="fromTotal">합계금액(부가세 포함)</option>
          </select>
        </label>
        <label className="flex flex-1 flex-col gap-1 text-sm">
          금액 (원)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
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
        <div className="mt-6 grid grid-cols-3 gap-4 border-t-2 border-orange-100 pt-6 dark:border-white/10">
          <div>
            <p className="text-sm text-zinc-500">공급가액</p>
            <p className="text-xl font-bold">{result.supplyAmount.toLocaleString()}원</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">부가세({Math.round(rates.rate * 100)}%)</p>
            <p className="text-xl font-bold">{result.vat.toLocaleString()}원</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">합계금액</p>
            <p className="text-xl font-bold text-orange-600 dark:text-orange-400">
              {result.totalAmount.toLocaleString()}원
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
