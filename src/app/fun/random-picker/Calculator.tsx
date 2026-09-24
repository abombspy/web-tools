"use client";

import { useState } from "react";
import ResultShareCard from "@/components/ResultShareCard";
import { pickRandom, randomMatch, shuffle } from "@/lib/calculators/random-picker";

type Mode = "pick" | "shuffle" | "match";

function parseList(text: string): string[] {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line !== "");
}

export default function Calculator() {
  const [mode, setMode] = useState<Mode>("pick");
  const [itemsText, setItemsText] = useState("피자\n치킨\n족발\n초밥\n마라탕");
  const [outcomesText, setOutcomesText] = useState("1번\n2번\n3번");
  const [result, setResult] = useState<string | null>(null);
  const [matchResult, setMatchResult] = useState<[string, string][] | null>(null);
  const [error, setError] = useState<string | null>(null);

  function run() {
    setError(null);
    setResult(null);
    setMatchResult(null);

    try {
      const items = parseList(itemsText);
      if (mode === "pick") {
        setResult(pickRandom(items));
      } else if (mode === "shuffle") {
        setResult(shuffle(items).join(" → "));
      } else {
        const outcomes = parseList(outcomesText);
        setMatchResult(randomMatch(items, outcomes));
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "실행할 수 없습니다.");
    }
  }

  return (
    <div className="mt-8 rounded-2xl border-2 border-violet-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <label className="mb-4 flex flex-col gap-1 text-sm">
        모드
        <select
          className="w-56 rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-violet-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={mode}
          onChange={(e) => {
            setMode(e.target.value as Mode);
            setResult(null);
            setMatchResult(null);
          }}
        >
          <option value="pick">하나 뽑기 (룰렛/제비뽑기)</option>
          <option value="shuffle">순서 섞기</option>
          <option value="match">참가자-결과 무작위 매칭 (사다리타기)</option>
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm">
        {mode === "match" ? "참가자 목록 (한 줄에 하나씩)" : "항목 목록 (한 줄에 하나씩)"}
        <textarea
          className="h-32 rounded-xl border-2 border-zinc-200 p-3 text-sm focus:border-violet-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={itemsText}
          onChange={(e) => setItemsText(e.target.value)}
        />
      </label>

      {mode === "match" && (
        <label className="mt-4 flex flex-col gap-1 text-sm">
          결과 목록 (참가자와 같은 줄 수)
          <textarea
            className="h-32 rounded-xl border-2 border-zinc-200 p-3 text-sm focus:border-violet-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={outcomesText}
            onChange={(e) => setOutcomesText(e.target.value)}
          />
        </label>
      )}

      <button
        type="button"
        onClick={run}
        className="mt-4 rounded-full bg-violet-400 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-violet-500"
      >
        실행
      </button>

      {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {result && (
        <div className="mt-6 border-t-2 border-violet-100 pt-6 text-center dark:border-white/10">
          <p className="text-3xl font-bold text-violet-600 dark:text-violet-400">{result}</p>
          <div className="mt-4 flex justify-center">
            <ResultShareCard toolName="랜덤 추첨기·사다리타기·룰렛" headline={result} accentColor="#8b5cf6" />
          </div>
        </div>
      )}

      {matchResult && (
        <ul className="mt-6 space-y-1 border-t-2 border-violet-100 pt-6 dark:border-white/10">
          {matchResult.map(([participant, outcome], i) => (
            <li key={i} className="text-sm">
              <span className="font-medium">{participant}</span> → {outcome}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
