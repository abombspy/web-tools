"use client";

import { useState } from "react";
import { calculateCustomsDuty } from "@/lib/calculators/customs-duty";
import type { CustomsDutyRates } from "@/lib/calculators/customs-duty";

export default function Calculator({ rates }: { rates: CustomsDutyRates }) {
  const [itemPriceUsd, setItemPriceUsd] = useState("120");
  const [shippingFeeUsd, setShippingFeeUsd] = useState("20");
  const [exchangeRate, setExchangeRate] = useState("1400");
  const [isUsOrigin, setIsUsOrigin] = useState(false);
  const [isListClearanceEligible, setIsListClearanceEligible] = useState(true);
  const [dutyRatePercent, setDutyRatePercent] = useState("8");

  const itemPriceUsdNum = Number(itemPriceUsd);
  const shippingFeeUsdNum = Number(shippingFeeUsd);
  const exchangeRateNum = Number(exchangeRate);
  const dutyRateNum = Number(dutyRatePercent) / 100;

  const blockingErrors: string[] = [];
  if (!Number.isFinite(itemPriceUsdNum) || itemPriceUsdNum < 0) {
    blockingErrors.push("Please enter an item price of 0 or more.");
  }
  if (!Number.isFinite(shippingFeeUsdNum) || shippingFeeUsdNum < 0) {
    blockingErrors.push("Please enter international shipping of 0 or more.");
  }
  if (!Number.isFinite(exchangeRateNum) || exchangeRateNum <= 0) {
    blockingErrors.push("Please enter an exchange rate greater than 0.");
  }
  if (!Number.isFinite(dutyRateNum) || dutyRateNum < 0 || dutyRateNum > 1) {
    blockingErrors.push("Please enter a duty rate between 0 and 100.");
  }

  const result =
    blockingErrors.length === 0
      ? calculateCustomsDuty(
          {
            itemPriceUsd: itemPriceUsdNum,
            shippingFeeUsd: shippingFeeUsdNum,
            exchangeRate: exchangeRateNum,
            isUsOrigin,
            isListClearanceEligible,
            dutyRate: dutyRateNum,
          },
          rates,
        )
      : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-rose-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Item price (USD)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={itemPriceUsd}
            onChange={(e) => setItemPriceUsd(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          International shipping (USD)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={shippingFeeUsd}
            onChange={(e) => setShippingFeeUsd(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Exchange rate (₩/$)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={exchangeRate}
            onChange={(e) => setExchangeRate(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Duty rate (%, used only if over the duty-free limit)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={dutyRatePercent}
            onChange={(e) => setDutyRatePercent(e.target.value)}
            min={0}
            max={100}
          />
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isUsOrigin}
            onChange={(e) => setIsUsOrigin(e.target.checked)}
          />
          Shipped from the US
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isListClearanceEligible}
            onChange={(e) => setIsListClearanceEligible(e.target.checked)}
          />
          Eligible for list clearance (not health supplements/cosmetics/alcohol, etc.)
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
          {result.isDutyFree ? (
            <>
              <p className="text-sm text-zinc-500">
                Under the duty-free limit (${result.dutyFreeLimit})
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">Duty-free (₩0)</p>
            </>
          ) : (
            <>
              <p className="text-sm text-zinc-500">
                Over the duty-free limit (${result.dutyFreeLimit}) — the full amount is taxed
              </p>
              <p className="text-3xl font-bold">₩{result.totalTax.toLocaleString()}</p>
              <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                <li>Taxable value: ₩{result.taxableValueKrw.toLocaleString()}</li>
                <li>Duty: ₩{result.duty.toLocaleString()}</li>
                <li>VAT: ₩{result.vat.toLocaleString()}</li>
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
