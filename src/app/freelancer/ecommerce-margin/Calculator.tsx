"use client";

import { useState } from "react";
import { calculateEcommerceMargin } from "@/lib/calculators/ecommerce-margin";

type Mode = "fromPrice" | "fromTargetMargin";

export default function Calculator() {
  const [mode, setMode] = useState<Mode>("fromPrice");
  const [salePrice, setSalePrice] = useState("30000");
  const [targetMarginPercent, setTargetMarginPercent] = useState("20");
  const [costPrice, setCostPrice] = useState("15000");
  const [commissionPercent, setCommissionPercent] = useState("10");
  const [paymentFeePercent, setPaymentFeePercent] = useState("3");
  const [shippingCost, setShippingCost] = useState("3000");

  const salePriceNum = Number(salePrice);
  const targetMarginNum = Number(targetMarginPercent) / 100;
  const costPriceNum = Number(costPrice);
  const commissionRateNum = Number(commissionPercent) / 100;
  const paymentFeeRateNum = Number(paymentFeePercent) / 100;
  const shippingCostNum = Number(shippingCost);

  const blockingErrors: string[] = [];
  if (mode === "fromPrice" && (!Number.isFinite(salePriceNum) || salePriceNum < 0)) {
    blockingErrors.push("판매가는 0 이상의 숫자로 입력해 주세요.");
  }
  if (mode === "fromTargetMargin" && (!Number.isFinite(targetMarginNum) || targetMarginNum < 0 || targetMarginNum >= 1)) {
    blockingErrors.push("목표 마진율은 0~100 미만 사이의 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(costPriceNum) || costPriceNum < 0) {
    blockingErrors.push("원가는 0 이상의 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(commissionRateNum) || commissionRateNum < 0 || commissionRateNum > 1) {
    blockingErrors.push("판매수수료율은 0~100 사이의 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(paymentFeeRateNum) || paymentFeeRateNum < 0 || paymentFeeRateNum > 1) {
    blockingErrors.push("결제수수료율은 0~100 사이의 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(shippingCostNum) || shippingCostNum < 0) {
    blockingErrors.push("배송비는 0 이상의 숫자로 입력해 주세요.");
  }

  let result = null;
  let calcError: string | null = null;
  if (blockingErrors.length === 0) {
    try {
      result = calculateEcommerceMargin(
        mode === "fromPrice"
          ? {
              mode: "fromPrice",
              salePrice: salePriceNum,
              costPrice: costPriceNum,
              commissionRate: commissionRateNum,
              paymentFeeRate: paymentFeeRateNum,
              shippingCost: shippingCostNum,
            }
          : {
              mode: "fromTargetMargin",
              targetMarginRate: targetMarginNum,
              costPrice: costPriceNum,
              commissionRate: commissionRateNum,
              paymentFeeRate: paymentFeeRateNum,
              shippingCost: shippingCostNum,
            },
      );
    } catch (e) {
      calcError = e instanceof Error ? e.message : "계산할 수 없습니다.";
    }
  }

  return (
    <div className="mt-8 rounded-2xl border-2 border-rose-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <label className="mb-4 flex flex-col gap-1 text-sm">
        계산 방향
        <select
          className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
        >
          <option value="fromPrice">판매가를 입력해서 마진율 확인</option>
          <option value="fromTargetMargin">목표 마진율을 입력해서 필요 판매가 확인</option>
        </select>
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {mode === "fromPrice" ? (
          <label className="flex flex-col gap-1 text-sm">
            판매가 (원)
            <input
              type="number"
              inputMode="numeric"
              className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
              value={salePrice}
              onChange={(e) => setSalePrice(e.target.value)}
              min={0}
            />
          </label>
        ) : (
          <label className="flex flex-col gap-1 text-sm">
            목표 마진율 (%)
            <input
              type="number"
              inputMode="decimal"
              className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
              value={targetMarginPercent}
              onChange={(e) => setTargetMarginPercent(e.target.value)}
              min={0}
              max={99}
            />
          </label>
        )}
        <label className="flex flex-col gap-1 text-sm">
          원가 (원)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={costPrice}
            onChange={(e) => setCostPrice(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          판매수수료율 (%)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={commissionPercent}
            onChange={(e) => setCommissionPercent(e.target.value)}
            min={0}
            max={100}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          결제수수료율 (%)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={paymentFeePercent}
            onChange={(e) => setPaymentFeePercent(e.target.value)}
            min={0}
            max={100}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          배송비 (원, 판매자 부담분)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={shippingCost}
            onChange={(e) => setShippingCost(e.target.value)}
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
      {calcError && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{calcError}</p>}

      {result && (
        <div className="mt-6 space-y-3 border-t-2 border-rose-100 pt-6 dark:border-white/10">
          {mode === "fromTargetMargin" && (
            <div>
              <p className="text-sm text-zinc-500">필요 판매가</p>
              <p className="text-2xl font-bold">{result.salePrice.toLocaleString()}원</p>
            </div>
          )}
          <p className="text-sm text-zinc-500">순이익 / 마진율</p>
          <p className="text-3xl font-bold">
            {result.netProfit.toLocaleString()}원{" "}
            <span className="text-xl text-rose-600 dark:text-rose-400">
              ({(result.marginRate * 100).toFixed(1)}%)
            </span>
          </p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>판매수수료: {result.commission.toLocaleString()}원</li>
            <li>결제수수료: {result.paymentFee.toLocaleString()}원</li>
            <li>배송비: {result.shippingCost.toLocaleString()}원</li>
          </ul>
        </div>
      )}
    </div>
  );
}
