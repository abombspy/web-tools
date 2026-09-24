"use client";

import { useState } from "react";
import ResultShareCard from "@/components/ResultShareCard";
import { pickRandom } from "@/lib/calculators/random-picker";

// 한국어판(nickname-generator.ts)과 별개로 영문 형용사/명사 데이터셋을 둔다(무작위
// 추첨 로직만 pickRandom 재사용).
const ADJECTIVES = [
  "Brave", "Quiet", "Sparkly", "Chill", "Quirky", "Bold", "Cozy", "Fresh",
  "Swift", "Sturdy", "Fluffy", "Sassy", "Cheerful", "Gentle", "Confident", "Cute",
];

const NOUNS = [
  "Cat", "Tiger", "Potato", "Fox", "Penguin", "Raccoon", "Squirrel", "Whale",
  "Koala", "Owl", "Otter", "Deer", "Rabbit", "Panda", "Badger", "Seal",
];

function generateNicknameEn(): string {
  return `${pickRandom(ADJECTIVES)} ${pickRandom(NOUNS)}`;
}

export default function Calculator() {
  const [nickname, setNickname] = useState<string | null>(null);

  return (
    <div className="mt-8 rounded-2xl border-2 border-violet-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <button
        type="button"
        onClick={() => setNickname(generateNicknameEn())}
        className="rounded-full bg-violet-400 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-violet-500"
      >
        Generate nickname
      </button>

      {nickname && (
        <div className="mt-6 border-t-2 border-violet-100 pt-6 text-center dark:border-white/10">
          <p className="text-4xl font-bold text-violet-600 dark:text-violet-400">{nickname}</p>
          <div className="mt-4 flex justify-center">
            <ResultShareCard toolName="Nickname Generator" headline={nickname} accentColor="#8b5cf6" />
          </div>
        </div>
      )}
    </div>
  );
}
