"use client";

import { useState } from "react";
import { compareCivilServiceScore } from "@/lib/calculators/civil-service-passing-score";

type Row = { id: string; year: string; score: string };

function newRow(): Row {
  return { id: Math.random().toString(36).slice(2), year: "", score: "" };
}

export default function Calculator() {
  const [myScore, setMyScore] = useState("90");
  const [rows, setRows] = useState<Row[]>([newRow(), newRow(), newRow()]);

  function updateRow(id: string, patch: Partial<Row>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function addRow() {
    setRows((prev) => [...prev, newRow()]);
  }

  function removeRow(id: string) {
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  }

  const myScoreNum = Number(myScore);
  const filledRows = rows.filter((r) => r.year.trim() !== "" && r.score.trim() !== "");
  const cutoffs = filledRows.map((r) => ({ year: r.year, score: Number(r.score) }));

  const blockingErrors: string[] = [];
  if (!Number.isFinite(myScoreNum) || myScoreNum < 0) {
    blockingErrors.push("본인 예상 점수는 0 이상의 숫자로 입력해 주세요.");
  }
  if (cutoffs.some((c) => !Number.isFinite(c.score))) {
    blockingErrors.push("합격선 점수는 숫자로 입력해 주세요.");
  }
  if (cutoffs.length === 0) {
    blockingErrors.push("과거 합격선을 1개 이상 입력해 주세요(연도, 점수).");
  }

  const result = blockingErrors.length === 0 ? compareCivilServiceScore(myScoreNum, cutoffs) : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-indigo-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <label className="flex flex-col gap-1 text-sm">
        본인 예상 점수
        <input
          type="number"
          inputMode="decimal"
          className="w-40 rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-indigo-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={myScore}
          onChange={(e) => setMyScore(e.target.value)}
          min={0}
        />
      </label>

      <div className="mt-4 space-y-3">
        <p className="text-sm font-medium">과거 합격선 (본인이 조사한 값을 입력)</p>
        {rows.map((row) => (
          <div key={row.id} className="flex items-center gap-3">
            <input
              type="text"
              className="w-24 rounded-xl border-2 border-zinc-200 px-2 py-1.5 text-sm focus:border-indigo-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
              value={row.year}
              onChange={(e) => updateRow(row.id, { year: e.target.value })}
              placeholder="연도 (예: 2025)"
            />
            <input
              type="number"
              inputMode="decimal"
              className="w-28 rounded-xl border-2 border-zinc-200 px-2 py-1.5 text-sm focus:border-indigo-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
              value={row.score}
              onChange={(e) => updateRow(row.id, { score: e.target.value })}
              placeholder="합격선 점수"
            />
            {rows.length > 1 && (
              <button
                type="button"
                onClick={() => removeRow(row.id)}
                className="text-sm text-red-600 hover:underline dark:text-red-400"
              >
                삭제
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={addRow}
          className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
        >
          + 연도 추가
        </button>
      </div>

      {blockingErrors.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-red-600 dark:text-red-400">
          {blockingErrors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      {result && (
        <div className="mt-6 space-y-3 border-t-2 border-indigo-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">과거 합격선 평균 대비 격차</p>
          <p className="text-3xl font-bold">
            {result.gapFromAverage >= 0 ? "+" : ""}
            {result.gapFromAverage}점
          </p>
          <ul className="mt-2 space-y-0.5 text-sm text-zinc-600 dark:text-zinc-400">
            <li>
              입력한 합격선: 평균 {result.averageCutoff}점 (최고 {result.maxCutoff}점 / 최저{" "}
              {result.minCutoff}점)
            </li>
            <li>
              최고 합격선 대비: {result.gapFromMax >= 0 ? "+" : ""}
              {result.gapFromMax}점
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
