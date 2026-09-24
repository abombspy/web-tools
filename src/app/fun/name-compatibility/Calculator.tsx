"use client";

import { useState } from "react";
import ResultShareCard from "@/components/ResultShareCard";
import { calculateCompatibilityScore, getCompatibilityComment } from "@/lib/calculators/compatibility-score";

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
          placeholder="이름 1"
        />
        <input
          type="text"
          className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-violet-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={nameB}
          onChange={(e) => setNameB(e.target.value)}
          placeholder="이름 2"
        />
      </div>

      {score !== null && (
        <div className="mt-6 space-y-2 border-t-2 border-violet-100 pt-6 text-center dark:border-white/10">
          <p className="text-5xl font-bold text-violet-600 dark:text-violet-400">{score}점</p>
          <p className="text-lg">{getCompatibilityComment(score)}</p>
          <div className="flex justify-center pt-2">
            <ResultShareCard
              toolName="이름 궁합 테스트"
              headline={`${score}점`}
              lines={[getCompatibilityComment(score)]}
              accentColor="#8b5cf6"
            />
          </div>
        </div>
      )}
    </div>
  );
}
