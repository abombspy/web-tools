"use client";

import { useState } from "react";
import { calculateJeonseToMonthlyRent } from "@/lib/calculators/jeonse-to-monthly-rent";

export default function Calculator() {
  const [jeonseDeposit, setJeonseDeposit] = useState("300000000");
  const [newDeposit, setNewDeposit] = useState("100000000");
  const [baseRatePercent, setBaseRatePercent] = useState("2.75");
  const [appliedRatePercent, setAppliedRatePercent] = useState("4.75");

  const jeonseDepositNum = Number(jeonseDeposit);
  const newDepositNum = Number(newDeposit);
  const baseRateNum = Number(baseRatePercent);
  const appliedRateNum = Number(appliedRatePercent);

  const blockingErrors: string[] = [];
  if (!Number.isFinite(jeonseDepositNum) || jeonseDepositNum < 0) {
    blockingErrors.push("전세보증금은 0 이상의 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(newDepositNum) || newDepositNum < 0) {
    blockingErrors.push("전환 후 보증금은 0 이상의 숫자로 입력해 주세요.");
  }
  if (newDepositNum > jeonseDepositNum) {
    blockingErrors.push("전환 후 보증금이 기존 전세보증금보다 클 수 없습니다.");
  }
  if (!Number.isFinite(baseRateNum) || baseRateNum < 0) {
    blockingErrors.push("기준금리는 0 이상의 숫자로 입력해 주세요.");
  }
  if (!Number.isFinite(appliedRateNum) || appliedRateNum < 0) {
    blockingErrors.push("적용 전환율은 0 이상의 숫자로 입력해 주세요.");
  }

  const result =
    blockingErrors.length === 0
      ? calculateJeonseToMonthlyRent({
          jeonseDeposit: jeonseDepositNum,
          newDeposit: newDepositNum,
          baseRatePercent: baseRateNum,
          appliedRatePercent: appliedRateNum,
        })
      : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          기존 전세보증금 (원)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={jeonseDeposit}
            onChange={(e) => setJeonseDeposit(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          월세 전환 후 보증금 (원)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={newDeposit}
            onChange={(e) => setNewDeposit(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          한국은행 기준금리 (%)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={baseRatePercent}
            onChange={(e) => setBaseRatePercent(e.target.value)}
            min={0}
          />
          <span className="text-xs text-zinc-500">
            현재 값은 한국은행 홈페이지에서 확인하세요(자주 바뀝니다).
          </span>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          실제 적용할 전환율 (%)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={appliedRatePercent}
            onChange={(e) => setAppliedRatePercent(e.target.value)}
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
        <div className="mt-6 space-y-3 border-t-2 border-orange-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">적용 전환율 기준 월세</p>
          <p className="text-3xl font-bold">{result.appliedMonthlyRent.toLocaleString()}원</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>전환 금액: {result.convertedAmount.toLocaleString()}원</li>
            <li>
              법정 상한 전환율: 연 {result.legalMaxRatePercent}% (법정 상한 기준 월세:{" "}
              {result.legalMaxMonthlyRent.toLocaleString()}원)
            </li>
          </ul>
          {result.exceedsLegalMax && (
            <p className="text-sm font-medium text-red-600 dark:text-red-400">
              입력한 적용 전환율({appliedRateNum}%)이 법정 상한({result.legalMaxRatePercent}%)을
              넘습니다. 초과분은 세입자가 반환을 요구할 수 있습니다.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
