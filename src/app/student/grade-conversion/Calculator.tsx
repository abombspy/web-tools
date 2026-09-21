"use client";

import { useState } from "react";
import {
  calculateCsatGrade,
  calculateSchoolGrade,
  type GradeSystem,
} from "@/lib/calculators/grade-conversion";

type Mode = "school" | "csat";

export default function Calculator() {
  const [mode, setMode] = useState<Mode>("school");
  const [system, setSystem] = useState<GradeSystem>("5-tier");
  const [rank, setRank] = useState("5");
  const [totalStudents, setTotalStudents] = useState("100");
  const [percentile, setPercentile] = useState("10");

  const rankNum = Number(rank);
  const totalStudentsNum = Number(totalStudents);
  const percentileNum = Number(percentile);

  const blockingErrors: string[] = [];
  if (mode === "school") {
    if (!Number.isFinite(rankNum) || rankNum <= 0) {
      blockingErrors.push("석차는 0보다 큰 숫자로 입력해 주세요.");
    }
    if (!Number.isFinite(totalStudentsNum) || totalStudentsNum <= 0) {
      blockingErrors.push("전체 재적수는 0보다 큰 숫자로 입력해 주세요.");
    }
    if (rankNum > totalStudentsNum) {
      blockingErrors.push("석차가 전체 재적수보다 클 수 없습니다.");
    }
  } else {
    if (!Number.isFinite(percentileNum) || percentileNum <= 0 || percentileNum > 100) {
      blockingErrors.push("백분위는 0 초과 100 이하의 숫자로 입력해 주세요.");
    }
  }

  const schoolResult =
    mode === "school" && blockingErrors.length === 0
      ? calculateSchoolGrade(rankNum, totalStudentsNum, system)
      : null;
  const csatGrade = mode === "csat" && blockingErrors.length === 0 ? calculateCsatGrade(percentileNum) : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-indigo-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <label className="mb-4 flex flex-col gap-1 text-sm">
        구분
        <select
          className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-indigo-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
        >
          <option value="school">내신 (석차 기준)</option>
          <option value="csat">수능 (백분위 기준)</option>
        </select>
      </label>

      {mode === "school" ? (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-1 text-sm">
            등급제
            <select
              className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-indigo-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
              value={system}
              onChange={(e) => setSystem(e.target.value as GradeSystem)}
            >
              <option value="5-tier">5등급제(2026년 고1·고2)</option>
              <option value="9-tier">9등급제(2026년 고3)</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm">
            본인 석차
            <input
              type="number"
              inputMode="numeric"
              className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-indigo-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
              value={rank}
              onChange={(e) => setRank(e.target.value)}
              min={0}
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            전체 재적수(수강인원)
            <input
              type="number"
              inputMode="numeric"
              className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-indigo-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
              value={totalStudents}
              onChange={(e) => setTotalStudents(e.target.value)}
              min={0}
            />
          </label>
        </div>
      ) : (
        <label className="flex flex-col gap-1 text-sm">
          백분위 (%, 상위 몇 %인지)
          <input
            type="number"
            inputMode="decimal"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-indigo-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={percentile}
            onChange={(e) => setPercentile(e.target.value)}
            min={0}
            max={100}
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

      {schoolResult && (
        <div className="mt-6 space-y-2 border-t-2 border-indigo-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">등급</p>
          <p className="text-3xl font-bold">{schoolResult.grade}등급</p>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            석차백분율: 상위 {schoolResult.percentile}%
          </p>
        </div>
      )}

      {csatGrade !== null && (
        <div className="mt-6 space-y-2 border-t-2 border-indigo-100 pt-6 dark:border-white/10">
          <p className="text-sm text-zinc-500">등급</p>
          <p className="text-3xl font-bold">{csatGrade}등급</p>
        </div>
      )}
    </div>
  );
}
