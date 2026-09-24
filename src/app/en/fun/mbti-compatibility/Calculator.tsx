"use client";

import { useState } from "react";
import ResultShareCard from "@/components/ResultShareCard";
import { calculateCompatibilityScore } from "@/lib/calculators/compatibility-score";

const MBTI_TYPES = [
  "ISTJ", "ISFJ", "INFJ", "INTJ",
  "ISTP", "ISFP", "INFP", "INTP",
  "ESTP", "ESFP", "ENFP", "ENTP",
  "ESTJ", "ESFJ", "ENFJ", "ENTJ",
];

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
  const [mbtiA, setMbtiA] = useState(MBTI_TYPES[0]);
  const [mbtiB, setMbtiB] = useState(MBTI_TYPES[1]);

  const score = calculateCompatibilityScore(mbtiA, mbtiB);

  return (
    <div className="mt-8 rounded-2xl border-2 border-violet-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <select
          className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-violet-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={mbtiA}
          onChange={(e) => setMbtiA(e.target.value)}
        >
          {MBTI_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        <select
          className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-violet-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={mbtiB}
          onChange={(e) => setMbtiB(e.target.value)}
        >
          {MBTI_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 space-y-2 border-t-2 border-violet-100 pt-6 text-center dark:border-white/10">
        <p className="text-5xl font-bold text-violet-600 dark:text-violet-400">{score}</p>
        <p className="text-lg">{getCompatibilityCommentEn(score)}</p>
        <div className="flex justify-center pt-2">
          <ResultShareCard
            toolName="MBTI Compatibility Test"
            headline={`${score} / 100`}
            lines={[`${mbtiA} × ${mbtiB}`, getCompatibilityCommentEn(score)]}
            accentColor="#8b5cf6"
          />
        </div>
      </div>
    </div>
  );
}
