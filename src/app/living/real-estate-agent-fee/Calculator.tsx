"use client";

import { useState } from "react";
import {
  calculateRealEstateAgentFee,
  type RealEstateAgentFeeRates,
} from "@/lib/calculators/real-estate-agent-fee";

type TxType = "sale" | "lease";

export default function Calculator({ rates }: { rates: RealEstateAgentFeeRates }) {
  const [type, setType] = useState<TxType>("sale");
  const [price, setPrice] = useState("300000000");
  const [deposit, setDeposit] = useState("300000000");
  const [monthlyRent, setMonthlyRent] = useState("0");

  const priceNum = Number(price);
  const depositNum = Number(deposit);
  const monthlyRentNum = Number(monthlyRent);

  const blockingErrors: string[] = [];
  if (type === "sale" && (!Number.isFinite(priceNum) || priceNum < 0)) {
    blockingErrors.push("매매가는 0 이상의 숫자로 입력해 주세요.");
  }
  if (type === "lease" && (!Number.isFinite(depositNum) || depositNum < 0)) {
    blockingErrors.push("보증금은 0 이상의 숫자로 입력해 주세요.");
  }
  if (type === "lease" && (!Number.isFinite(monthlyRentNum) || monthlyRentNum < 0)) {
    blockingErrors.push("월세는 0 이상의 숫자로 입력해 주세요.");
  }

  const result =
    blockingErrors.length === 0
      ? calculateRealEstateAgentFee(
          type === "sale"
            ? { type: "sale", price: priceNum }
            : { type: "lease", deposit: depositNum, monthlyRent: monthlyRentNum },
          rates,
        )
      : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <label className="mb-4 flex flex-col gap-1 text-sm">
        거래 유형
        <select
          className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={type}
          onChange={(e) => setType(e.target.value as TxType)}
        >
          <option value="sale">매매</option>
          <option value="lease">전세·월세(임대차)</option>
        </select>
      </label>

      {type === "sale" ? (
        <label className="flex flex-col gap-1 text-sm">
          매매가 (원)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            min={0}
          />
        </label>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-sm">
            보증금 (원)
            <input
              type="number"
              inputMode="numeric"
              className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
              value={deposit}
              onChange={(e) => setDeposit(e.target.value)}
              min={0}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            월세 (원, 전세면 0)
            <input
              type="number"
              inputMode="numeric"
              className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
              value={monthlyRent}
              onChange={(e) => setMonthlyRent(e.target.value)}
              min={0}
            />
          </label>
        </div>
      )}

      {blockingErrors.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-red-600 dark:text-red-400">
          {blockingErrors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      {result && (
        <div className="mt-6 space-y-3 border-t-2 border-orange-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">중개수수료 상한액 (부가세 별도)</p>
          <p className="text-3xl font-bold">{result.fee.toLocaleString()}원</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            {type === "lease" && monthlyRentNum > 0 && (
              <li>환산보증금: {result.transactionAmount.toLocaleString()}원</li>
            )}
            <li>적용 요율: {result.appliedRatePercent}%</li>
            {result.cap !== null && <li>한도액: {result.cap.toLocaleString()}원</li>}
            {result.feeCapped && <li className="text-amber-600 dark:text-amber-400">한도액이 적용되었습니다.</li>}
          </ul>
        </div>
      )}
    </div>
  );
}
