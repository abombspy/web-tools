"use client";

import { useState } from "react";
import { calculateCharacterCount } from "@/lib/calculators/character-count";

export default function Calculator() {
  const [text, setText] = useState("");
  const result = calculateCharacterCount(text);

  return (
    <div className="mt-8 rounded-2xl border-2 border-teal-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <textarea
        className="h-64 w-full resize-y rounded-xl border-2 border-zinc-200 p-3 text-sm focus:border-teal-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type or paste your text here"
      />

      <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div>
          <p className="text-xs text-zinc-500">With spaces</p>
          <p className="text-xl font-bold">{result.totalChars.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">No spaces</p>
          <p className="text-xl font-bold">{result.charsNoSpace.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">Words</p>
          <p className="text-xl font-bold">{result.words.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">Lines</p>
          <p className="text-xl font-bold">{result.lines.toLocaleString()}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-500">Bytes (UTF-8)</p>
          <p className="text-xl font-bold">{result.bytes.toLocaleString()}B</p>
        </div>
      </div>
    </div>
  );
}
