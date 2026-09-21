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
    blockingErrors.push("건당 배달료는 0 이상의 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(deliveryCountNum) || deliveryCountNum < 0) {
    blockingErrors.push("배달 건수는 0 이상의 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(platformFeeRateNum) || platformFeeRateNum < 0 || platformFeeRateNum > 1) {
    blockingErrors.push("플랫폼 수수료율은 0~100 사이의 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(monthlyExpensesNum) || monthlyExpensesNum < 0) {
    blockingErrors.push("월 고정비용은 0 이상의 숫자로 입력해 주세요.");
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
          건당 배달료 (수수료 차감 전, 원)
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
          한 달 배달 건수
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
          플랫폼 수수료율 (%)
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
          한 달 고정비용 (유류비·소모품비 등, 원)
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
          플랫폼이 사업소득세 3.3%를 미리 떼고 입금한다
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
          <p className="text-sm text-zinc-500">예상 월 순수익</p>
          <p className="text-3xl font-bold">{result.netProfit.toLocaleString()}원</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>총 배달 수입: {result.grossIncome.toLocaleString()}원</li>
            <li>플랫폼 수수료: -{result.platformFee.toLocaleString()}원</li>
            {withholdingApplies && <li>사업소득세 원천징수: -{result.withholding.toLocaleString()}원</li>}
            <li>고정비용: -{monthlyExpensesNum.toLocaleString()}원</li>
          </ul>
        </div>
      )}
    </div>
  );
}
