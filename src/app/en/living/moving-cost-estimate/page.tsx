import type { Metadata } from "next";
import Link from "next/link";
import { getMovingCostEstimateRates } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Moving Cost Estimator",
  description: "Estimate a rough moving-cost range in Korea based on home size, service type, and ladder truck needs.",
};

export default function MovingCostEstimatePageEn() {
  const rates = getMovingCostEstimateRates();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🚚 Moving Cost Estimator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>Why a range, not a single number?</h2>
        <p>
          Unlike customs duty or electricity rates, there&rsquo;s <strong>no official government
          price table</strong> for moving costs in Korea. Each company prices freely, and even for
          the same size home, the price swings a lot based on how much stuff you have, distance,
          and the moving date — demand spikes on &ldquo;lucky moving days&rdquo; (son-eomneun-nal,
          traditional auspicious dates) and during peak season.
        </p>
        <p>
          This estimate is built from publicly available rates and comparison-platform data from
          several moving companies: a per-pyeong (about 3.3m² / 35.6 sq ft, the standard Korean
          area unit) rate by service type, plus a ladder-truck fee, shown as a <strong>±20–30%
          range</strong>.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This is a rough reference only. <strong>Always get 2–3 real quotes</strong> before you
          move. During peak season (March–April, auspicious dates) actual prices can run well above
          this range.
        </p>
      </section>

      <Calculator rates={rates} />

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
