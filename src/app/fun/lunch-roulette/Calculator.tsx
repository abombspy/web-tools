"use client";

import { useState } from "react";
import ResultShareCard from "@/components/ResultShareCard";
import { pickRandom } from "@/lib/calculators/random-picker";
import { LUNCH_CATEGORIES, LUNCH_MENUS, type LunchCategory } from "@/lib/calculators/lunch-menu";

export default function Calculator() {
  const [selectedCategories, setSelectedCategories] = useState<Set<LunchCategory>>(
    new Set(LUNCH_CATEGORIES),
  );
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function toggleCategory(category: LunchCategory) {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(category)) {
        next.delete(category);
      } else {
        next.add(category);
      }
      return next;
    });
  }

  function spin() {
    setError(null);
    const candidates = LUNCH_MENUS.filter((m) => selectedCategories.has(m.category));
    if (candidates.length === 0) {
      setError("카테고리를 1개 이상 선택해 주세요.");
      setResult(null);
      return;
    }
    setResult(pickRandom(candidates).name);
  }

  return (
    <div className="mt-8 rounded-2xl border-2 border-violet-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <p className="mb-2 text-sm font-medium">카테고리 선택</p>
      <div className="flex flex-wrap gap-3">
        {LUNCH_CATEGORIES.map((category) => (
          <label key={category} className="flex items-center gap-1.5 text-sm">
            <input
              type="checkbox"
              checked={selectedCategories.has(category)}
              onChange={() => toggleCategory(category)}
            />
            {category}
          </label>
        ))}
      </div>

      <button
        type="button"
        onClick={spin}
        className="mt-4 rounded-full bg-violet-400 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-violet-500"
      >
        오늘의 점심 뽑기
      </button>

      {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {result && (
        <div className="mt-6 border-t-2 border-violet-100 pt-6 text-center dark:border-white/10">
          <p className="text-sm text-zinc-500">오늘의 점심은</p>
          <p className="text-4xl font-bold text-violet-600 dark:text-violet-400">{result}</p>
          <div className="mt-4 flex justify-center">
            <ResultShareCard toolName="점심 메뉴 추천 룰렛" headline={result} accentColor="#8b5cf6" />
          </div>
        </div>
      )}
    </div>
  );
}
