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
    blockingErrors.push("Please enter an amount of 0 or more.");
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
          Input type
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
          >
            <option value="fromGross">Pre-tax amount (contract amount)</option>
            <option value="fromNet">Post-tax amount (actual deposit)</option>
          </select>
        </label>
        <label className="flex flex-1 flex-col gap-1 text-sm">
          Amount (₩)
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
              <p className="text-sm text-zinc-500">Pre-tax amount</p>
              <p className="text-2xl font-bold">₩{result.grossAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-zinc-500">Post-tax amount</p>
              <p className="text-2xl font-bold text-rose-600 dark:text-rose-400">
                ₩{result.netAmount.toLocaleString()}
              </p>
            </div>
          </div>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              Income tax ({Math.round(rates.businessIncomeRate * 100)}%): ₩
              {result.incomeTax.toLocaleString()}
            </li>
            <li>
              Local income tax ({Math.round(rates.localIncomeTaxRateOfIncomeTax * 100)}% of
              income tax): ₩{result.localIncomeTax.toLocaleString()}
            </li>
            <li>Total withheld: ₩{result.totalWithholding.toLocaleString()}</li>
          </ul>
          {result.isApproximateReverse && (
            <p className="text-xs text-zinc-500">
              This was derived backward from the post-tax amount, so rounding may cause a 1–2 won
              difference from the actual payment.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
