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
    blockingErrors.push("물품가격은 0 이상의 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(shippingFeeUsdNum) || shippingFeeUsdNum < 0) {
    blockingErrors.push("국제배송료는 0 이상의 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(exchangeRateNum) || exchangeRateNum <= 0) {
    blockingErrors.push("환율은 0보다 큰 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(dutyRateNum) || dutyRateNum < 0 || dutyRateNum > 1) {
    blockingErrors.push("관세율은 0~100 사이의 숫자로 입력해 주세요.");
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
    <div className="mt-8 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          물품가격 (달러)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={itemPriceUsd}
            onChange={(e) => setItemPriceUsd(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          국제배송료 (달러)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={shippingFeeUsd}
            onChange={(e) => setShippingFeeUsd(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          환율 (원/달러)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={exchangeRate}
            onChange={(e) => setExchangeRate(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          관세율 (%, 면세한도 초과 시에만 사용)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
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
          미국에서 발송
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isListClearanceEligible}
            onChange={(e) => setIsListClearanceEligible(e.target.checked)}
          />
          목록통관 가능 품목 (건강기능식품·화장품·주류 등이 아님)
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
        <div className="mt-6 space-y-3 border-t-2 border-orange-100 pt-6 dark:border-white/10">
          {result.isDutyFree ? (
            <>
              <p className="text-sm text-zinc-500">
                면세한도(${result.dutyFreeLimit}) 이하라
              </p>
              <p className="text-3xl font-bold text-green-600 dark:text-green-400">면세 (0원)</p>
            </>
          ) : (
            <>
              <p className="text-sm text-zinc-500">
                면세한도(${result.dutyFreeLimit})를 넘어 전체 금액에 과세
              </p>
              <p className="text-3xl font-bold">{result.totalTax.toLocaleString()}원</p>
              <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
                <li>과세가격: {result.taxableValueKrw.toLocaleString()}원</li>
                <li>관세: {result.duty.toLocaleString()}원</li>
                <li>부가세: {result.vat.toLocaleString()}원</li>
              </ul>
            </>
          )}
        </div>
      )}
    </div>
  );
}
