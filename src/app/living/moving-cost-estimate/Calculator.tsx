"use client";

import { useState } from "react";
import {
  calculateMovingCostEstimate,
  type MovingCostRates,
  type MovingMethod,
} from "@/lib/calculators/moving-cost-estimate";

const methodLabels: Record<MovingMethod, string> = {
  general: "일반이사(용달, 직접 포장)",
  semiPacked: "반포장이사",
  fullPacked: "포장이사(전체 포장·정리 대행)",
};

export default function Calculator({ rates }: { rates: MovingCostRates }) {
  const [pyeong, setPyeong] = useState("15");
  const [method, setMethod] = useState<MovingMethod>("fullPacked");
  const [ladderTruckLocations, setLadderTruckLocations] = useState(0);

  const pyeongNum = Number(pyeong);

  const blockingErrors: string[] = [];
  if (!Number.isFinite(pyeongNum) || pyeongNum <= 0) {
    blockingErrors.push("평수는 0보다 큰 숫자로 입력해 주세요.");
  }

  const result =
    blockingErrors.length === 0
      ? calculateMovingCostEstimate({ pyeong: pyeongNum, method, ladderTruckLocations }, rates)
      : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-sky-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          평수 (전용면적 기준, 평)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={pyeong}
            onChange={(e) => setPyeong(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          이사 방식
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={method}
            onChange={(e) => setMethod(e.target.value as MovingMethod)}
          >
            {Object.entries(methodLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm sm:col-span-2">
          사다리차가 필요한 곳 (출발지·도착지 중)
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={ladderTruckLocations}
            onChange={(e) => setLadderTruckLocations(Number(e.target.value))}
          >
            <option value={0}>없음(엘리베이터 이용 가능)</option>
            <option value={1}>한 곳</option>
            <option value={2}>두 곳 모두</option>
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
          <p className="text-sm text-zinc-500">예상 이사 비용 (범위)</p>
          <p className="text-3xl font-bold">
            {result.estimateLow.toLocaleString()}원 ~ {result.estimateHigh.toLocaleString()}원
          </p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>기본 이사비: {result.baseCost.toLocaleString()}원</li>
            {result.ladderTruckFee > 0 && (
              <li>사다리차 비용: {result.ladderTruckFee.toLocaleString()}원</li>
            )}
          </ul>
          <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
            이 금액은 매우 거친 추정치입니다. 실제로는 업체·시즌(손 없는 날 등)·이동 거리·짐의
            양에 따라 크게 달라지니, 반드시 2~3곳 이상 실제 견적을 받아 비교하세요.
          </p>
        </div>
      )}
    </div>
  );
}
