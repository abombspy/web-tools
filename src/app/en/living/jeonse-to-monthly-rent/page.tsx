import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Jeonse-to-Monthly-Rent Conversion Calculator",
  description: "Calculate the legal maximum conversion rate and monthly rent when converting a jeonse deposit to monthly rent.",
};

export default function JeonseToMonthlyRentPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🏘️ Jeonse-to-Monthly-Rent Conversion Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>Background</h2>
        <p>
          <strong>Jeonse</strong> is a Korea-specific lease type where the tenant pays a large
          lump-sum deposit (often 50–80% of the home&rsquo;s value) instead of monthly rent, and
          gets the deposit back in full at the end of the lease. Landlords sometimes offer to
          convert part of that deposit into monthly rent instead — this calculator figures out
          what rent that conversion works out to, and the legal cap on the rate used.
        </p>

        <h2>How it&rsquo;s calculated</h2>
        <p>
          Monthly rent = (original jeonse deposit − deposit after conversion) × conversion rate ÷ 12
        </p>
        <p>
          Under <strong>Article 7-2 of the Housing Lease Protection Act and Article 9 of its
          Enforcement Decree</strong>, the legal maximum conversion rate is whichever is{" "}
          <strong>lower</strong> of <strong>the Bank of Korea base rate + 2 percentage
          points</strong> and <strong>10% per year</strong>. If the base rate rises, the cap
          rises with it, but it never exceeds 10% annually.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          The Bank of Korea&rsquo;s Monetary Policy Board adjusts the base rate periodically, so
          check the current rate on the{" "}
          <a href="https://www.bok.or.kr/portal/singl/baseRate/list.do" target="_blank" rel="noopener noreferrer">
            Bank of Korea website
          </a>{" "}
          before entering it here. This calculator only computes the legal cap that applies to
          both new and renewal leases, and doesn&rsquo;t account for special conditions in
          individual contracts. This English page is a translation of the original Korean tool.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/living" className="font-medium text-sky-600 dark:text-sky-400">
            Housing & Bills
          </Link>
        </p>
      </section>
    </div>
  );
}
