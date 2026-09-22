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

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export default function Calculator({ rates, vatRate, fundRate }: Props) {
  const [usageKwh, setUsageKwh] = useState("350");
  const [month, setMonth] = useState("7");

  const usageKwhNum = Number(usageKwh);
  const monthNum = Number(month);

  const blockingErrors: string[] = [];
  if (!Number.isFinite(usageKwhNum) || usageKwhNum < 0) {
    blockingErrors.push("Please enter a usage of 0 or more.");
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
          This month&rsquo;s usage (kWh)
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
          Month
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
              <option key={m} value={m}>
                {MONTH_NAMES[m - 1]}{rates.summerMonths.includes(m) ? " (summer relaxed tiers)" : ""}
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
          <p className="text-sm text-zinc-500">Estimated bill (incl. VAT & fund levy, estimated)</p>
          <p className="text-3xl font-bold">₩{estimatedTotal.toLocaleString()}</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Basic fee: ₩{result.basicFee.toLocaleString()}</li>
            {result.breakdown.map((row) => (
              <li key={row.tierUpTo ?? "top"}>
                {row.amountKwh}kWh × ₩{row.unitPrice} = ₩{row.charge.toLocaleString()}
              </li>
            ))}
            <li>Electricity charge (basic + usage): ₩{result.totalBeforeTax.toLocaleString()}</li>
            <li>VAT (estimated): ₩{estimatedVat.toLocaleString()}</li>
            <li>Power industry fund levy (estimated): ₩{estimatedFund.toLocaleString()}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
