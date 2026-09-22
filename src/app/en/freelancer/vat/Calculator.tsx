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
    blockingErrors.push("Please enter an amount of 0 or more.");
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
    <div className="mt-8 rounded-2xl border-2 border-rose-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <label className="flex flex-col gap-1 text-sm">
          Input type
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={mode}
            onChange={(e) => setMode(e.target.value as Mode)}
          >
            <option value="fromSupply">Supply price (VAT excluded)</option>
            <option value="fromTotal">Total amount (VAT included)</option>
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
        <div className="mt-6 grid grid-cols-3 gap-4 border-t-2 border-rose-100 pt-6 dark:border-white/10">
          <div>
            <p className="text-sm text-zinc-500">Supply price</p>
            <p className="text-xl font-bold">₩{result.supplyAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">VAT ({Math.round(rates.rate * 100)}%)</p>
            <p className="text-xl font-bold">₩{result.vat.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">Total amount</p>
            <p className="text-xl font-bold text-rose-600 dark:text-rose-400">
              ₩{result.totalAmount.toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
