"use client";

import { useState } from "react";
import { csvToJson, jsonToCsv } from "@/lib/calculators/json-csv-convert";

type Mode = "jsonToCsv" | "csvToJson";

const SAMPLE_JSON = '[\n  { "name": "Alex", "age": 28 },\n  { "name": "Jordan", "age": 32 }\n]';
const SAMPLE_CSV = "name,age\nAlex,28\nJordan,32";

export default function Calculator() {
  const [mode, setMode] = useState<Mode>("jsonToCsv");
  const [input, setInput] = useState(SAMPLE_JSON);

  let output = "";
  let error: string | null = null;

  try {
    output = mode === "jsonToCsv" ? jsonToCsv(input) : csvToJson(input);
  } catch (e) {
    error = e instanceof Error ? e.message : "Couldn't convert this input.";
  }

  function switchMode(next: Mode) {
    setMode(next);
    setInput(next === "jsonToCsv" ? SAMPLE_JSON : SAMPLE_CSV);
  }

  function downloadOutput() {
    const ext = mode === "jsonToCsv" ? "csv" : "json";
    const mime = mode === "jsonToCsv" ? "text/csv" : "application/json";
    const blob = new Blob([output], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `converted.${ext}`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="mt-8 rounded-2xl border-2 border-teal-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <label className="mb-4 flex flex-col gap-1 text-sm">
        Direction
        <select
          className="w-56 rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-teal-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
          value={mode}
          onChange={(e) => switchMode(e.target.value as Mode)}
        >
          <option value="jsonToCsv">JSON → CSV</option>
          <option value="csvToJson">CSV → JSON</option>
        </select>
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <p className="mb-1 text-xs text-zinc-500">Input</p>
          <textarea
            className="h-64 w-full resize-y rounded-xl border-2 border-zinc-200 p-3 font-mono text-xs focus:border-teal-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div>
          <p className="mb-1 text-xs text-zinc-500">Output</p>
          <textarea
            readOnly
            className="h-64 w-full resize-y rounded-xl border-2 border-zinc-200 bg-zinc-50 p-3 font-mono text-xs dark:border-white/20 dark:bg-zinc-900"
            value={error ? "" : output}
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600 dark:text-red-400">{error}</p>}

      {!error && output && (
        <button
          type="button"
          onClick={downloadOutput}
          className="mt-4 rounded-full bg-teal-400 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-teal-500"
        >
          Download result
        </button>
      )}
    </div>
  );
}
