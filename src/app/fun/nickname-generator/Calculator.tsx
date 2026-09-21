"use client";

import { useState } from "react";
import { generateNickname } from "@/lib/calculators/nickname-generator";

export default function Calculator() {
  const [nickname, setNickname] = useState<string | null>(null);

  return (
    <div className="mt-8 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <button
        type="button"
        onClick={() => setNickname(generateNickname())}
        className="rounded-full bg-orange-400 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-orange-500"
      >
        닉네임 생성
      </button>

      {nickname && (
        <div className="mt-6 border-t-2 border-orange-100 pt-6 text-center dark:border-white/10">
          <p className="text-4xl font-bold text-orange-600 dark:text-orange-400">{nickname}</p>
        </div>
      )}
    </div>
  );
}
