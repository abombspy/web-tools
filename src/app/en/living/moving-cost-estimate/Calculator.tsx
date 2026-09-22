"use client";

import { useState } from "react";
import {
  calculateMovingCostEstimate,
  type MovingCostRates,
  type MovingMethod,
} from "@/lib/calculators/moving-cost-estimate";

const methodLabels: Record<MovingMethod, string> = {
  general: "Basic move (truck rental, you pack)",
  semiPacked: "Semi-packing service",
  fullPacked: "Full-packing service (packing & unpacking included)",
};

export default function Calculator({ rates }: { rates: MovingCostRates }) {
  const [pyeong, setPyeong] = useState("15");
  const [method, setMethod] = useState<MovingMethod>("fullPacked");
  const [ladderTruckLocations, setLadderTruckLocations] = useState(0);

  const pyeongNum = Number(pyeong);

  const blockingErrors: string[] = [];
  if (!Number.isFinite(pyeongNum) || pyeongNum <= 0) {
    blockingErrors.push("Please enter a size greater than 0.");
  }

  const result =
    blockingErrors.length === 0
      ? calculateMovingCostEstimate({ pyeong: pyeongNum, method, ladderTruckLocations }, rates)
      : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-sky-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Size (pyeong, exclusive area)
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
          Service type
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
          Ladder truck needed at (origin/destination)
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-sky-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={ladderTruckLocations}
            onChange={(e) => setLadderTruckLocations(Number(e.target.value))}
          >
            <option value={0}>Not needed (elevator available)</option>
            <option value={1}>One location</option>
            <option value={2}>Both locations</option>
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
          <p className="text-sm text-zinc-500">Estimated cost (range)</p>
          <p className="text-3xl font-bold">
            ₩{result.estimateLow.toLocaleString()} – ₩{result.estimateHigh.toLocaleString()}
          </p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Base cost: ₩{result.baseCost.toLocaleString()}</li>
            {result.ladderTruckFee > 0 && (
              <li>Ladder truck fee: ₩{result.ladderTruckFee.toLocaleString()}</li>
            )}
          </ul>
          <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
            This is a very rough estimate. Actual prices vary a lot by company, season (auspicious
            dates, etc.), distance, and how much you&rsquo;re moving — always get 2–3 real quotes.
          </p>
        </div>
      )}
    </div>
  );
}
