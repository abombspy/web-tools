import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Military Discharge Date Calculator",
  description: "Calculate discharge date and service progress from enlistment date and branch.",
};

export default function MilitaryDischargeDatePageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🪖 Military Discharge Date Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>Service length (as of 2026)</h2>
        <ul>
          <li>Army / Marine Corps: 18 months</li>
          <li>Navy: 20 months</li>
          <li>Air Force: 21 months</li>
          <li>Alternative social service: 21 months</li>
        </ul>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          Service length can change with amendments to the Military Service Act, and your actual
          discharge date can shift due to leave, disciplinary action, etc. For the exact date,
          check the Military Manpower Administration&rsquo;s portal or your unit.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/date-time" className="font-medium text-amber-600 dark:text-amber-400">
            Date & Time
          </Link>
        </p>
      </section>
    </div>
  );
}
