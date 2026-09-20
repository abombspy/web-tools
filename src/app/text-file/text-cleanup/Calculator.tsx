"use client";

import { useState } from "react";
import { cleanupText } from "@/lib/calculators/text-cleanup";

export default function Calculator() {
  const [text, setText] = useState("");
  const result = cleanupText(text);

  return (
    <div className="mt-8 rounded-lg border border-black/10 p-6 dark:border-white/10">
      <p className="mb-1 text-xs text-zinc-500">입력</p>
      <textarea
        className="h-48 w-full resize-y rounded border border-black/20 p-3 text-sm dark:border-white/20 dark:bg-transparent"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="정리할 텍스트를 입력하세요"
      />

      <p className="mt-4 mb-1 text-xs text-zinc-500">
        정리 결과 {result.typoFixCount > 0 && `(오타 ${result.typoFixCount}건 교정)`}
      </p>
      <textarea
        readOnly
        className="h-48 w-full resize-y rounded border border-black/20 bg-zinc-50 p-3 text-sm dark:border-white/20 dark:bg-zinc-900"
        value={result.cleaned}
      />
    </div>
  );
}
