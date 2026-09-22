"use client";

import { useState } from "react";
import { pickRandom } from "@/lib/calculators/random-picker";

// 한국어판(lunch-menu.ts)과 카테고리 표기가 달라(한식/중식 등) 별도 영문 데이터셋을
// 이 파일 안에 둔다 — 메뉴 이름 자체는 번역 가능한 일반 콘텐츠라 lunch-menu.ts를
// 건드리지 않고 병행 유지(무작위 추첨 로직만 pickRandom 재사용).
type Category = "Korean" | "Chinese" | "Japanese" | "Western" | "Snacks" | "Fast Food";

const MENUS: { name: string; category: Category }[] = [
  { name: "Kimchi Stew", category: "Korean" },
  { name: "Doenjang Stew", category: "Korean" },
  { name: "Stir-fried Pork", category: "Korean" },
  { name: "Bibimbap", category: "Korean" },
  { name: "Soft Tofu Stew", category: "Korean" },
  { name: "Galbitang (Rib Soup)", category: "Korean" },
  { name: "Jjajangmyeon", category: "Chinese" },
  { name: "Jjamppong", category: "Chinese" },
  { name: "Sweet & Sour Pork", category: "Chinese" },
  { name: "Mala Tang", category: "Chinese" },
  { name: "Tonkatsu", category: "Japanese" },
  { name: "Sushi", category: "Japanese" },
  { name: "Ramen", category: "Japanese" },
  { name: "Udon", category: "Japanese" },
  { name: "Pasta", category: "Western" },
  { name: "Steak", category: "Western" },
  { name: "Risotto", category: "Western" },
  { name: "Tteokbokki", category: "Snacks" },
  { name: "Gimbap", category: "Snacks" },
  { name: "Instant Noodles", category: "Snacks" },
  { name: "Burger", category: "Fast Food" },
  { name: "Sandwich", category: "Fast Food" },
];

const CATEGORIES: Category[] = ["Korean", "Chinese", "Japanese", "Western", "Snacks", "Fast Food"];

export default function Calculator() {
  const [selectedCategories, setSelectedCategories] = useState<Set<Category>>(new Set(CATEGORIES));
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  function toggleCategory(category: Category) {
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
    const candidates = MENUS.filter((m) => selectedCategories.has(m.category));
    if (candidates.length === 0) {
      setError("Please select at least one category.");
      setResult(null);
      return;
    }
    setResult(pickRandom(candidates).name);
  }

  return (
    <div className="mt-8 rounded-2xl border-2 border-violet-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <p className="mb-2 text-sm font-medium">Choose categories</p>
      <div className="flex flex-wrap gap-3">
        {CATEGORIES.map((category) => (
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
        Spin for lunch
      </button>

      {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {result && (
        <div className="mt-6 border-t-2 border-violet-100 pt-6 text-center dark:border-white/10">
          <p className="text-sm text-zinc-500">Today&rsquo;s lunch is</p>
          <p className="text-4xl font-bold text-violet-600 dark:text-violet-400">{result}</p>
        </div>
      )}
    </div>
  );
}
