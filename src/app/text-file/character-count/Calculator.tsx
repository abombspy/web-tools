"use client";

import { useState } from "react";
import { calculateCharacterCount } from "@/lib/calculators/character-count";

export default function Calculator() {
  const [text, setText] = useState("");
  const result = calculateCharacterCount(text);

  return (
    <div className="mt-8 rounded-lg border border-black/10 p-6 dark:border-white/10">
      <textarea
        className="h-64 w-full resize-y rounded border border-black/20 p-3 text-sm dark:border-white/20 dark:bg-transparent"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="여기에 텍스트를 입력하거나 붙여넣으세요"
      />

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div>
          <p className="text-xs text-zinc-500">공백 포함</p>
          <p className="text-xl font-bold">{result.totalChars.toLocaleString()}자</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">공백 제외</p>
          <p className="text-xl font-bold">{result.charsNoSpace.toLocaleString()}자</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">단어 수</p>
          <p className="text-xl font-bold">{result.words.toLocaleString()}개</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">줄 수</p>
          <p className="text-xl font-bold">{result.lines.toLocaleString()}줄</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">바이트(UTF-8)</p>
          <p className="text-xl font-bold">{result.bytes.toLocaleString()}B</p>
        </div>
      </div>
    </div>
  );
}
