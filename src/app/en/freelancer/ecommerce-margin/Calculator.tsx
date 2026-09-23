"use client";

import { useState } from "react";
import content from "@content/tools/en/freelancer/ecommerce-margin.json";
import { EcommerceMarginError, calculateEcommerceMargin } from "@/lib/calculators/ecommerce-margin";

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
    blockingErrors.push("Please enter a sale price of 0 or more.");
  }
  if (mode === "fromTargetMargin" && (!Number.isFinite(targetMarginNum) || targetMarginNum < 0 || targetMarginNum >= 1)) {
    blockingErrors.push("Please enter a target margin between 0 and 100 (exclusive).");
  }
  if (!Number.isFinite(costPriceNum) || costPriceNum < 0) {
    blockingErrors.push("Please enter a cost of 0 or more.");
  }
  if (!Number.isFinite(commissionRateNum) || commissionRateNum < 0 || commissionRateNum > 1) {
    blockingErrors.push("Please enter a seller commission rate between 0 and 100.");
  }
  if (!Number.isFinite(paymentFeeRateNum) || paymentFeeRateNum < 0 || paymentFeeRateNum > 1) {
    blockingErrors.push("Please enter a payment fee rate between 0 and 100.");
  }
  if (!Number.isFinite(shippingCostNum) || shippingCostNum < 0) {
    blockingErrors.push("Please enter a shipping cost of 0 or more.");
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
      calcError = e instanceof EcommerceMarginError ? content.errors[e.code] : "Couldn't calculate a result.";
    }
  }

  return (
    <div className="mt-8 rounded-2xl border-2 border-rose-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <label className="mb-4 flex flex-col gap-1 text-sm">
        Calculation direction
        <select
          className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-rose-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
        >
          <option value="fromPrice">Enter sale price to check margin</option>
          <option value="fromTargetMargin">Enter target margin to find required price</option>
        </select>
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {mode === "fromPrice" ? (
          <label className="flex flex-col gap-1 text-sm">
            Sale price (₩)
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
            Target margin (%)
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
          Cost (₩)
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
          Seller commission rate (%)
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
          Payment fee rate (%)
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
          Shipping cost (₩, seller-paid portion)
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
              <p className="text-sm text-zinc-500">Required sale price</p>
              <p className="text-2xl font-bold">₩{result.salePrice.toLocaleString()}</p>
            </div>
          )}
          <p className="text-sm text-zinc-500">Net profit / margin</p>
          <p className="text-3xl font-bold">
            ₩{result.netProfit.toLocaleString()}{" "}
            <span className="text-xl text-rose-600 dark:text-rose-400">
              ({(result.marginRate * 100).toFixed(1)}%)
            </span>
          </p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Seller commission: ₩{result.commission.toLocaleString()}</li>
            <li>Payment fee: ₩{result.paymentFee.toLocaleString()}</li>
            <li>Shipping cost: ₩{result.shippingCost.toLocaleString()}</li>
          </ul>
        </div>
      )}
    </div>
  );
}
