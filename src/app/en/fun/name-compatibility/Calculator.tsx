"use client";

import { useState } from "react";
import ResultShareCard from "@/components/ResultShareCard";
import { calculateCompatibilityScore } from "@/lib/calculators/compatibility-score";

// getCompatibilityComment()는 한국어 문구를 반환하므로, 영문판 전용 코멘트를 여기 둔다
// (점수 계산 로직 자체는 calculateCompatibilityScore를 그대로 재사용).
function getCompatibilityCommentEn(score: number): string {
  if (score >= 90) return "A match made in heaven!";
  if (score >= 70) return "You two get along really well";
  if (score >= 50) return "A perfectly decent match";
  if (score >= 30) return "Might take a little extra effort";
  return "You bring very different energies";
}

export default function Calculator() {
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");

  const a = nameA.trim();
  const b = nameB.trim();
  const ready = a !== "" && b !== "";

  const score = ready ? calculateCompatibilityScore(a, b) : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-violet-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-violet-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={nameA}
          onChange={(e) => setNameA(e.target.value)}
          placeholder="Name 1"
        />
        <input
          type="text"
          className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-violet-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={nameB}
          onChange={(e) => setNameB(e.target.value)}
          placeholder="Name 2"
        />
      </div>

      {score !== null && (
        <div className="mt-6 space-y-2 border-t-2 border-violet-100 pt-6 text-center dark:border-white/10">
          <p className="text-5xl font-bold text-violet-600 dark:text-violet-400">{score}</p>
          <p className="text-lg">{getCompatibilityCommentEn(score)}</p>
          <div className="flex justify-center pt-2">
            <ResultShareCard
              toolName="Name Compatibility Test"
              headline={`${score} / 100`}
              lines={[getCompatibilityCommentEn(score)]}
              accentColor="#8b5cf6"
            />
          </div>
        </div>
      )}
    </div>
  );
}
