"use client";

import { useState } from "react";
import { calculateGpa, GRADE_POINTS_4_5, type LetterGrade } from "@/lib/calculators/gpa";

type Row = { id: string; credit: string; grade: LetterGrade };

function newRow(): Row {
  return { id: Math.random().toString(36).slice(2), credit: "3", grade: "A0" };
}

const GRADES = Object.keys(GRADE_POINTS_4_5) as LetterGrade[];

export default function Calculator() {
  const [rows, setRows] = useState<Row[]>([newRow(), newRow(), newRow()]);

  function updateRow(id: string, patch: Partial<Row>) {
    setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));
  }

  function addRow() {
    setRows((prev) => [...prev, newRow()]);
  }

  function removeRow(id: string) {
    setRows((prev) => (prev.length > 1 ? prev.filter((r) => r.id !== id) : prev));
  }

  const blockingErrors: string[] = [];
  const courses = rows.map((r) => ({ credit: Number(r.credit), grade: r.grade }));
  if (courses.some((c) => !Number.isFinite(c.credit) || c.credit < 0)) {
    blockingErrors.push("학점은 0 이상의 숫자로 입력해 주세요.");
  }

  const result = blockingErrors.length === 0 ? calculateGpa(courses) : null;

  return (
    <div className="mt-8 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="space-y-3">
        {rows.map((row, idx) => (
          <div key={row.id} className="flex items-center gap-3">
            <span className="w-14 shrink-0 text-sm text-zinc-500">과목 {idx + 1}</span>
            <input
              type="number"
              inputMode="numeric"
              className="w-20 rounded-xl border-2 border-zinc-200 px-2 py-1.5 text-sm focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
              value={row.credit}
              onChange={(e) => updateRow(row.id, { credit: e.target.value })}
              min={0}
              placeholder="학점"
            />
            <select
              className="rounded-xl border-2 border-zinc-200 px-2 py-1.5 text-sm focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
              value={row.grade}
              onChange={(e) => updateRow(row.id, { grade: e.target.value as LetterGrade })}
            >
              {GRADES.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
            {rows.length > 1 && (
              <button
                type="button"
                onClick={() => removeRow(row.id)}
                className="text-sm text-red-600 hover:underline dark:text-red-400"
              >
                삭제
              </button>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addRow}
        className="mt-3 text-sm font-medium text-orange-600 hover:underline dark:text-orange-400"
      >
        + 과목 추가
      </button>

      {blockingErrors.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-red-600 dark:text-red-400">
          {blockingErrors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      {result && (
        <div className="mt-6 grid grid-cols-3 gap-4 border-t-2 border-orange-100 pt-6 dark:border-white/10">
          <div>
            <p className="text-sm text-zinc-500">4.5 만점</p>
            <p className="text-2xl font-bold">{result.gpa45}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">4.3 만점 환산</p>
            <p className="text-2xl font-bold">{result.gpa43}</p>
          </div>
          <div>
            <p className="text-sm text-zinc-500">총 이수학점</p>
            <p className="text-2xl font-bold">{result.totalCredits}</p>
          </div>
        </div>
      )}
    </div>
  );
}
