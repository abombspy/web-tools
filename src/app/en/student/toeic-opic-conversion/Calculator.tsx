"use client";

import { useState } from "react";
import {
  findOpicLevelForToeic,
  findToeicRangeForOpic,
  OPIC_TO_TOEIC_TABLE,
  type OpicLevel,
} from "@/lib/calculators/toeic-opic-conversion";

type Mode = "opicToToeic" | "toeicToOpic";

export default function Calculator() {
  const [mode, setMode] = useState<Mode>("opicToToeic");
  const [opicLevel, setOpicLevel] = useState<OpicLevel>("IH");
  const [toeicScore, setToeicScore] = useState("900");

  const toeicScoreNum = Number(toeicScore);

  const blockingErrors: string[] = [];
  if (mode === "toeicToOpic" && (!Number.isFinite(toeicScoreNum) || toeicScoreNum < 0 || toeicScoreNum > 990)) {
    blockingErrors.push("Please enter a TOEIC score between 0 and 990.");
  }

  const toeicResult = mode === "opicToToeic" ? findToeicRangeForOpic(opicLevel) : null;
  const opicResult =
    mode === "toeicToOpic" && blockingErrors.length === 0 ? findOpicLevelForToeic(toeicScoreNum) : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-indigo-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <label className="mb-4 flex flex-col gap-1 text-sm">
        Direction
        <select
          className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-indigo-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
        >
          <option value="opicToToeic">OPIc → TOEIC</option>
          <option value="toeicToOpic">TOEIC → OPIc</option>
        </select>
      </label>

      {mode === "opicToToeic" ? (
        <label className="flex flex-col gap-1 text-sm">
          OPIc level
          <select
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-indigo-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={opicLevel}
            onChange={(e) => setOpicLevel(e.target.value as OpicLevel)}
          >
            {OPIC_TO_TOEIC_TABLE.map((row) => (
              <option key={row.opicLevel} value={row.opicLevel}>
                {row.opicLevel}
              </option>
            ))}
          </select>
        </label>
      ) : (
        <label className="flex flex-col gap-1 text-sm">
          TOEIC score
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-indigo-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={toeicScore}
            onChange={(e) => setToeicScore(e.target.value)}
            min={0}
            max={990}
          />
        </label>
      )}

      {blockingErrors.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-red-600 dark:text-red-400">
          {blockingErrors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      {toeicResult && (
        <div className="mt-6 border-t-2 border-indigo-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">Converted TOEIC score (assigned score)</p>
          <p className="text-3xl font-bold">{toeicResult.toeicAverage}</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Range: {toeicResult.toeicMin}–{toeicResult.toeicMax}
          </p>
        </div>
      )}

      {mode === "toeicToOpic" && blockingErrors.length === 0 && (
        <div className="mt-6 border-t-2 border-indigo-100 pt-6 dark:border-white/10">
          {opicResult ? (
            <>
              <p className="text-sm text-zinc-500">Converted OPIc level</p>
              <p className="text-3xl font-bold">{opicResult}</p>
            </>
          ) : (
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              This score doesn&rsquo;t fall neatly into a range on the official table (below IM1,
              or in a gap between ranges).
            </p>
          )}
        </div>
      )}
    </div>
  );
}
