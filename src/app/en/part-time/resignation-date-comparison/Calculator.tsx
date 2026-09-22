"use client";

import { useId, useState } from "react";
import { calculateResignationScenario } from "@/lib/calculators/resignation-comparison";

type Candidate = { id: string; date: string };

function newCandidate(): Candidate {
  return { id: Math.random().toString(36).slice(2), date: "" };
}

export default function Calculator() {
  const formId = useId();
  const [hireDate, setHireDate] = useState("");
  const [monthlyWage, setMonthlyWage] = useState("2500000");
  const [candidates, setCandidates] = useState<Candidate[]>([
    newCandidate(),
    newCandidate(),
  ]);

  const monthlyWageNum = Number(monthlyWage);
  const hire = hireDate ? new Date(hireDate) : null;

  const blockingErrors: string[] = [];
  if (!hireDate || !hire || Number.isNaN(hire.getTime())) {
    blockingErrors.push("Please enter your hire date.");
  }
  if (!Number.isFinite(monthlyWageNum) || monthlyWageNum <= 0) {
    blockingErrors.push("Please enter a monthly wage greater than 0.");
  }

  function updateCandidateDate(id: string, date: string) {
    setCandidates((prev) => prev.map((c) => (c.id === id ? { ...c, date } : c)));
  }

  function addCandidate() {
    setCandidates((prev) => [...prev, newCandidate()]);
  }

  function removeCandidate(id: string) {
    setCandidates((prev) => (prev.length > 1 ? prev.filter((c) => c.id !== id) : prev));
  }

  const rows =
    blockingErrors.length === 0
      ? candidates.map((c) => {
          if (!c.date) {
            return { candidate: c, error: null, result: null };
          }
          const resignation = new Date(c.date);
          if (Number.isNaN(resignation.getTime())) {
            return { candidate: c, error: "Invalid date format.", result: null };
          }
          if (hire && resignation.getTime() < hire.getTime()) {
            return { candidate: c, error: "Resignation date is before the hire date.", result: null };
          }
          return {
            candidate: c,
            error: null,
            result: calculateResignationScenario({
              hireDate,
              resignationDate: c.date,
              monthlyWage: monthlyWageNum,
            }),
          };
        })
      : [];

  return (
    <div className="mt-8 rounded-2xl border-2 border-orange-100 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-zinc-900">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm">
          Hire date
          <input
            type="date"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={hireDate}
            onChange={(e) => setHireDate(e.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1 text-sm">
          Monthly wage (before tax, ₩)
          <input
            type="number"
            inputMode="numeric"
            className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
            value={monthlyWage}
            onChange={(e) => setMonthlyWage(e.target.value)}
            min={0}
          />
          <span className="text-xs text-zinc-500">
            Assumes the same wage for the last 3 months. Doesn&rsquo;t include irregular income
            like bonuses.
          </span>
        </label>
      </div>

      {blockingErrors.length > 0 && (
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm text-red-600 dark:text-red-400">
          {blockingErrors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      <div className="mt-6 border-t-2 border-orange-100 pt-6 dark:border-white/10">
        <p className="mb-3 text-sm font-medium">Resignation dates to compare</p>
        <div className="space-y-3">
          {rows.length === 0 && blockingErrors.length === 0 && (
            <p className="text-sm text-zinc-500">Enter your hire date and wage above first.</p>
          )}
          {candidates.map((c, idx) => {
            const row = rows.find((r) => r.candidate.id === c.id);
            return (
              <div
                key={c.id}
                className="rounded-md border border-black/10 p-4 dark:border-white/10"
              >
                <div className="flex items-center gap-3">
                  <label className="flex flex-1 flex-col gap-1 text-sm" htmlFor={`${formId}-${idx}`}>
                    Resignation date {idx + 1}
                    <input
                      id={`${formId}-${idx}`}
                      type="date"
                      className="rounded-xl border-2 border-zinc-200 px-3 py-2 focus:border-orange-400 focus:outline-none dark:border-white/20 dark:bg-transparent"
                      value={c.date}
                      onChange={(e) => updateCandidateDate(c.id, e.target.value)}
                    />
                  </label>
                  {candidates.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeCandidate(c.id)}
                      className="mt-5 shrink-0 text-sm text-red-600 hover:underline dark:text-red-400"
                    >
                      Remove
                    </button>
                  )}
                </div>

                {row?.error && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400">{row.error}</p>
                )}

                {row?.result && (
                  <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-sm sm:grid-cols-4">
                    <div>
                      <dt className="text-zinc-500">Service days</dt>
                      <dd className="font-medium">{row.result.continuousServiceDays.toLocaleString()} days</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Severance eligible</dt>
                      <dd className="font-medium">
                        {row.result.severancePayEligible ? "Yes (1yr+)" : "No (<1yr)"}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Est. severance pay</dt>
                      <dd className="font-medium">₩{row.result.severancePay.toLocaleString()}</dd>
                    </div>
                    <div>
                      <dt className="text-zinc-500">Accrued leave</dt>
                      <dd className="font-medium">{row.result.annualLeaveDays} days</dd>
                    </div>
                  </dl>
                )}
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={addCandidate}
          className="mt-3 text-sm font-medium text-orange-600 hover:underline dark:text-orange-400"
        >
          + Add another date
        </button>
      </div>
    </div>
  );
}
