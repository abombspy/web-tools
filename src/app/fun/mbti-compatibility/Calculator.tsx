"use client";

import { useState } from "react";
import content from "@content/tools/ko/fun/mbti-compatibility.json";
import ResultShareCard from "@/components/ResultShareCard";
import { calculateMbtiCompatibility, MBTI_TYPES, type MbtiType } from "@/lib/calculators/mbti-compatibility";

export default function Calculator() {
  const [mbtiA, setMbtiA] = useState<MbtiType>(MBTI_TYPES[0]);
  const [mbtiB, setMbtiB] = useState<MbtiType>(MBTI_TYPES[1]);

  const { band, score } = calculateMbtiCompatibility(mbtiA, mbtiB);
  const bandInfo = content.bands[band];

  return (
    <div className="mt-8 rounded-2xl border-2 border-violet-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <select
          className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-violet-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={mbtiA}
          onChange={(e) => setMbtiA(e.target.value as MbtiType)}
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
          onChange={(e) => setMbtiB(e.target.value as MbtiType)}
        >
          {MBTI_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 space-y-2 border-t-2 border-violet-100 pt-6 text-center dark:border-white/10">
        <p className="text-5xl font-bold text-violet-600 dark:text-violet-400">{score}점</p>
        <p className="text-lg font-semibold">{bandInfo.name}</p>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{bandInfo.description}</p>
        <div className="flex justify-center pt-2">
          <ResultShareCard
            toolName="MBTI 궁합 테스트"
            headline={`${score}점`}
            lines={[`${mbtiA} × ${mbtiB}`, bandInfo.name]}
            accentColor="#8b5cf6"
          />
        </div>
      </div>
    </div>
  );
}
