"use client";

import { useState } from "react";
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
    <div className="mt-8 rounded-lg border border-black/10 p-6 dark:border-white/10">
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
        className="mt-4 rounded border border-black/20 px-4 py-2 text-sm font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
      >
        오늘의 점심 뽑기
      </button>

      {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {result && (
        <div className="mt-6 border-t border-black/10 pt-6 text-center dark:border-white/10">
          <p className="text-sm text-zinc-500">오늘의 점심은</p>
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{result}</p>
        </div>
      )}
    </div>
  );
}
