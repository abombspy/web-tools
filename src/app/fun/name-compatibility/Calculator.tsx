"use client";

import { useState } from "react";
import { calculateCompatibilityScore, getCompatibilityComment } from "@/lib/calculators/compatibility-score";

const MBTI_TYPES = [
  "ISTJ", "ISFJ", "INFJ", "INTJ",
  "ISTP", "ISFP", "INFP", "INTP",
  "ESTP", "ESFP", "ENFP", "ENTP",
  "ESTJ", "ESFJ", "ENFJ", "ENTJ",
];

type Mode = "name" | "mbti";

export default function Calculator() {
  const [mode, setMode] = useState<Mode>("name");
  const [nameA, setNameA] = useState("");
  const [nameB, setNameB] = useState("");
  const [mbtiA, setMbtiA] = useState(MBTI_TYPES[0]);
  const [mbtiB, setMbtiB] = useState(MBTI_TYPES[1]);

  const a = mode === "name" ? nameA.trim() : mbtiA;
  const b = mode === "name" ? nameB.trim() : mbtiB;
  const ready = mode === "mbti" || (a !== "" && b !== "");

  const score = ready ? calculateCompatibilityScore(a, b) : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-violet-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <label className="mb-4 flex flex-col gap-1 text-sm">
        모드
        <select
          className="w-40 rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-violet-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={mode}
          onChange={(e) => setMode(e.target.value as Mode)}
        >
          <option value="name">이름 궁합</option>
          <option value="mbti">MBTI 궁합</option>
        </select>
      </label>

      {mode === "name" ? (
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
      ) : (
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
      )}

      {score !== null && (
        <div className="mt-6 space-y-2 border-t-2 border-violet-100 pt-6 text-center dark:border-white/10">
          <p className="text-5xl font-bold text-violet-600 dark:text-violet-400">{score}점</p>
          <p className="text-lg">{getCompatibilityComment(score)}</p>
        </div>
      )}
    </div>
  );
}
