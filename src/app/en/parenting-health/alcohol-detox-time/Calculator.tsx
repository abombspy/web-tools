"use client";

import { useState } from "react";
import { calculateAlcoholDetoxTime } from "@/lib/calculators/alcohol-detox-time";
import type { Sex } from "@/lib/calculators/alcohol-detox-time";

export default function Calculator() {
  const [sex, setSex] = useState<Sex>("male");
  const [weightKg, setWeightKg] = useState("70");
  const [volumeMl, setVolumeMl] = useState("360");
  const [abvPercent, setAbvPercent] = useState("17");

  const weightNum = Number(weightKg);
  const volumeNum = Number(volumeMl);
  const abvNum = Number(abvPercent);

  const blockingErrors: string[] = [];
  if (!Number.isFinite(weightNum) || weightNum <= 0) {
    blockingErrors.push("Please enter a weight greater than 0.");
  }
  if (!Number.isFinite(volumeNum) || volumeNum < 0) {
    blockingErrors.push("Please enter a volume of 0 or more.");
  }
  if (!Number.isFinite(abvNum) || abvNum < 0 || abvNum > 100) {
    blockingErrors.push("Please enter an ABV between 0 and 100.");
  }

  const result =
    blockingErrors.length === 0
      ? calculateAlcoholDetoxTime({ sex, weightKg: weightNum, volumeMl: volumeNum, abvPercent: abvNum })
      : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-emerald-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Sex
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-emerald-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={sex}
            onChange={(e) => setSex(e.target.value as Sex)}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Weight (kg)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-emerald-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={weightKg}
            onChange={(e) => setWeightKg(e.target.value)}
            min={0}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Volume drunk (mL)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-emerald-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={volumeMl}
            onChange={(e) => setVolumeMl(e.target.value)}
            min={0}
          />
          <span className="text-xs text-zinc-500">E.g. a 360mL bottle of soju, or a 500mL can of beer</span>
        </label>
        <label className="flex flex-col gap-1 text-sm">
          ABV (%)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-emerald-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={abvPercent}
            onChange={(e) => setAbvPercent(e.target.value)}
            min={0}
            max={100}
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
        <div className="mt-6 space-y-3 border-t-2 border-emerald-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">Estimated time to fully sober up</p>
          <p className="text-3xl font-bold">About {result.hoursToSober} hours</p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>Pure alcohol: {result.alcoholGrams}g</li>
            <li>Estimated initial BAC: {result.initialBac}%</li>
          </ul>
        </div>
      )}
    </div>
  );
}
