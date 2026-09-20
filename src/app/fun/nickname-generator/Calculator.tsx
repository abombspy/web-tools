"use client";

import { useState } from "react";
import { generateNickname } from "@/lib/calculators/nickname-generator";

export default function Calculator() {
  const [nickname, setNickname] = useState<string | null>(null);

  return (
    <div className="mt-8 rounded-lg border border-black/10 p-6 dark:border-white/10">
      <button
        type="button"
        onClick={() => setNickname(generateNickname())}
        className="rounded border border-black/20 px-4 py-2 text-sm font-medium hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
      >
        닉네임 생성
      </button>

      {nickname && (
        <div className="mt-6 border-t border-black/10 pt-6 text-center dark:border-white/10">
          <p className="text-4xl font-bold text-blue-600 dark:text-blue-400">{nickname}</p>
        </div>
      )}
    </div>
  );
}
