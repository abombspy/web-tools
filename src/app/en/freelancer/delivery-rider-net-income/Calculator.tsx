"use client";

import { useState } from "react";
import { calculateDeliveryRiderNetIncome } from "@/lib/calculators/delivery-rider-net-income";
import type { WithholdingTaxRates } from "@/lib/calculators/withholding-tax-3-3";

export default function Calculator({ withholdingRates }: { withholdingRates: WithholdingTaxRates }) {
  const [feePerDelivery, setFeePerDelivery] = useState("4000");
  const [deliveryCount, setDeliveryCount] = useState("200");
  const [platformFeeRatePercent, setPlatformFeeRatePercent] = useState("10");
  const [monthlyExpenses, setMonthlyExpenses] = useState("300000");
  const [withholdingApplies, setWithholdingApplies] = useState(true);

  const feePerDeliveryNum = Number(feePerDelivery);
  const deliveryCountNum = Number(deliveryCount);
  const platformFeeRateNum = Number(platformFeeRatePercent) / 100;
  const monthlyExpensesNum = Number(monthlyExpenses);

  const blockingErrors: string[] = [];
  if (!Number.isFinite(feePerDeliveryNum) || feePerDeliveryNum < 0) {
    blockingErrors.push("Please enter a fee per delivery of 0 or more.");
  }
  if (!Number.isFinite(deliveryCountNum) || deliveryCountNum < 0) {
    blockingErrors.push("Please enter a delivery count of 0 or more.");
  }
  if (!Number.isFinite(platformFeeRateNum) || platformFeeRateNum < 0 || platformFeeRateNum > 1) {
    blockingErrors.push("Please enter a platform fee rate between 0 and 100.");
  }
  if (!Number.isFinite(monthlyExpensesNum) || monthlyExpensesNum < 0) {
    blockingErrors.push("Please enter monthly fixed costs of 0 or more.");
  }

  const result =
    blockingErrors.length === 0
      ? calculateDeliveryRiderNetIncome(
          {
            feePerDelivery: feePerDeliveryNum,
            deliveryCount: deliveryCountNum,
            platformFeeRate: platformFeeRateNum,
            monthlyExpenses: monthlyExpensesNum,
            withholdingApplies,
          },
          withholdingRates,
        )
      : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-rose-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Fee per delivery (before commission, ₩)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={feePerDelivery}
            onChange={(e) => setFeePerDelivery(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Deliveries per month
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={deliveryCount}
            onChange={(e) => setDeliveryCount(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Platform commission rate (%)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={platformFeeRatePercent}
            onChange={(e) => setPlatformFeeRatePercent(e.target.value)}
            min={0}
            max={100}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Monthly fixed costs (fuel, supplies, etc., ₩)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={monthlyExpenses}
            onChange={(e) => setMonthlyExpenses(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex items-center gap-2 text-sm sm:col-span-2">
          <input
            type="checkbox"
            checked={withholdingApplies}
            onChange={(e) => setWithholdingApplies(e.target.checked)}
          />
          The platform withholds 3.3% business income tax before paying out
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
          <p className="text-sm text-zinc-500">Estimated monthly net income</p>
          <p className="text-3xl font-bold">₩{result.netProfit.toLocaleString()}</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Total delivery income: ₩{result.grossIncome.toLocaleString()}</li>
            <li>Platform commission: -₩{result.platformFee.toLocaleString()}</li>
            {withholdingApplies && <li>Business income tax withheld: -₩{result.withholding.toLocaleString()}</li>}
            <li>Fixed costs: -₩{monthlyExpensesNum.toLocaleString()}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
