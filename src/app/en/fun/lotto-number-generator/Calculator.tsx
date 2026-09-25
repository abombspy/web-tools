"use client";

import { useState } from "react";
import ResultShareCard from "@/components/ResultShareCard";
import { generateLottoGames } from "@/lib/calculators/lotto-number-generator";
import { getLottoFrequency } from "@/lib/rates";

// 동행복권 공식 로또 볼 색상 구성(1~10 노랑, 11~20 파랑, 21~30 빨강, 31~40 회색,
// 41~45 초록)을 그대로 재현 — 상표가 아니라 널리 알려진 배색 구성이라 재현에 문제없음.
function ballColorClass(n: number): string {
  if (n <= 10) return "bg-yellow-400 text-black";
  if (n <= 20) return "bg-blue-500 text-white";
  if (n <= 30) return "bg-red-500 text-white";
  if (n <= 40) return "bg-zinc-500 text-white";
  return "bg-green-500 text-white";
}

function Ball({ n }: { n: number }) {
  return (
    <span
      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm ${ballColorClass(n)}`}
    >
      {n}
    </span>
  );
}

const frequency = getLottoFrequency();

export default function Calculator() {
  const [gameCount, setGameCount] = useState(1);
  const [games, setGames] = useState<number[][] | null>(null);

  const mostFrequent = Object.entries(frequency.mainNumberFrequency.value)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);
  const leastFrequent = Object.entries(frequency.mainNumberFrequency.value)
    .sort((a, b) => a[1] - b[1])
    .slice(0, 5);

  return (
    <div className="mt-8 rounded-2xl border-2 border-violet-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <label className="flex flex-col gap-1 text-sm">
        Number of games
        <select
          className="w-40 rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-violet-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={gameCount}
          onChange={(e) => setGameCount(Number(e.target.value))}
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              {n} game{n > 1 ? "s" : ""}
            </option>
          ))}
        </select>
      </label>

      <button
        type="button"
        onClick={() => setGames(generateLottoGames(gameCount))}
        className="mt-4 rounded-full bg-violet-400 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-violet-500"
      >
        Generate numbers
      </button>

      {games && (
        <div className="mt-6 space-y-3 border-t-2 border-violet-100 pt-6 dark:border-white/10">
          {games.map((game, i) => (
            <div key={i} className="flex flex-wrap items-center gap-2">
              {games.length > 1 && (
                <span className="w-6 shrink-0 text-xs font-semibold text-zinc-400">{i + 1}</span>
              )}
              {game.map((n) => (
                <Ball key={n} n={n} />
              ))}
            </div>
          ))}
          <div className="flex justify-center pt-2">
            <ResultShareCard
              toolName="Lotto Number Generator"
              headline={games[0].join(" · ")}
              lines={games.length > 1 ? [`+ ${games.length - 1} more game(s) generated`] : []}
              accentColor="#8b5cf6"
            />
          </div>
        </div>
      )}

      <div className="mt-6 border-t-2 border-violet-100 pt-6 dark:border-white/10">
        <p className="text-sm font-medium">
          Number frequency (draws 1–{frequency.asOfDrawNo}, as of {frequency.asOfDrawDate})
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          For curiosity only — unrelated to predicting the next draw. See the explanation above.
        </p>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold text-zinc-500">Top 5 most frequent</p>
            <ul className="mt-2 space-y-1">
              {mostFrequent.map(([n, count]) => (
                <li key={n} className="flex items-center gap-2 text-sm">
                  <Ball n={Number(n)} />
                  <span className="text-zinc-600 dark:text-zinc-400">{count}x</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-zinc-500">Top 5 least frequent</p>
            <ul className="mt-2 space-y-1">
              {leastFrequent.map(([n, count]) => (
                <li key={n} className="flex items-center gap-2 text-sm">
                  <Ball n={Number(n)} />
                  <span className="text-zinc-600 dark:text-zinc-400">{count}x</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
