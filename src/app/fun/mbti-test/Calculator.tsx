"use client";

import { useState } from "react";
import {
  calculateMbtiType,
  getMbtiTypeInfo,
  MBTI_QUESTIONS,
  type Letter,
} from "@/lib/calculators/mbti-test";

export default function Calculator() {
  const [answers, setAnswers] = useState<Letter[]>([]);

  const currentIndex = answers.length;
  const isDone = currentIndex >= MBTI_QUESTIONS.length;
  const currentQuestion = MBTI_QUESTIONS[currentIndex];

  function answer(letter: Letter) {
    setAnswers((prev) => [...prev, letter]);
  }

  function restart() {
    setAnswers([]);
  }

  if (isDone) {
    const type = calculateMbtiType(answers);
    const info = getMbtiTypeInfo(type);

    return (
      <div className="mt-8 rounded-2xl border-2 border-violet-100 bg-white p-6 text-center shadow-sm dark:border-white/10 dark:bg-zinc-900">
        <p className="text-sm text-zinc-500">당신의 유형은</p>
        <p className="text-5xl font-bold text-violet-600 dark:text-violet-400">{type}</p>
        {info && (
          <>
            <p className="mt-2 text-lg font-semibold">{info.nickname}</p>
            <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{info.summary}</p>
            <div className="mt-4 grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
              <div>
                <p className="text-sm font-medium">강점</p>
                <ul className="mt-1 list-disc pl-5 text-sm text-zinc-600 dark:text-zinc-400">
                  {info.strengths.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-sm font-medium">주의할 점</p>
                <ul className="mt-1 list-disc pl-5 text-sm text-zinc-600 dark:text-zinc-400">
                  {info.weaknesses.map((w) => (
                    <li key={w}>{w}</li>
                  ))}
                </ul>
              </div>
            </div>
          </>
        )}
        <button
          type="button"
          onClick={restart}
          className="mt-6 rounded-full bg-violet-400 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-violet-500"
        >
          다시 하기
        </button>
      </div>
    );
  }

  return (
    <div className="mt-8 rounded-2xl border-2 border-violet-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
        <div
          className="h-full bg-blue-600 dark:bg-blue-400"
          style={{ width: `${(currentIndex / MBTI_QUESTIONS.length) * 100}%` }}
        />
      </div>
      <p className="mb-4 text-sm text-zinc-500">
        {currentIndex + 1} / {MBTI_QUESTIONS.length}
      </p>

      <div className="flex flex-col gap-3">
        <button
          type="button"
          onClick={() => answer(currentQuestion.optionA.letter)}
          className="rounded-2xl border-2 border-violet-100 bg-white px-4 py-3 text-left text-sm shadow-sm transition hover:border-violet-300 hover:bg-violet-50 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-white/5"
        >
          {currentQuestion.optionA.text}
        </button>
        <button
          type="button"
          onClick={() => answer(currentQuestion.optionB.letter)}
          className="rounded-2xl border-2 border-violet-100 bg-white px-4 py-3 text-left text-sm shadow-sm transition hover:border-violet-300 hover:bg-violet-50 dark:border-white/10 dark:bg-zinc-900 dark:hover:bg-white/5"
        >
          {currentQuestion.optionB.text}
        </button>
      </div>
    </div>
  );
}
