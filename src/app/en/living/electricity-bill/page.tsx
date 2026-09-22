import type { Metadata } from "next";
import Link from "next/link";
import { getElectricityBillRates } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Electricity Bill Calculator",
  description: "Estimate a Korean residential electricity bill, including the progressive rate tiers.",
};

export default function ElectricityBillPageEn() {
  const rates = getElectricityBillRates();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">💡 Electricity Bill Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>What is the progressive rate system?</h2>
        <p>
          Korean residential (low-voltage) electricity billing uses a{" "}
          <strong>3-tier progressive rate</strong>: as usage increases, each tier is billed at a
          higher unit price. The basic (base) fee is also set by whichever tier your total usage
          reaches.
        </p>
        <p>
          In <strong>summer (July–August)</strong>, the tier thresholds are relaxed to account for
          higher air-conditioner use (tier 1: 200→300kWh, tier 2: 400→450kWh).
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          The rates used here are a reference compiled from cross-checked sources — for the exact
          current rate, check KEPCO&rsquo;s official site (Han-jeon ON). VAT (10%) and the
          Electric Power Industry Fund levy (3.7%) are added as estimates, and this doesn&rsquo;t
          replicate your actual bill&rsquo;s rounding-to-the-nearest-10-won rule.
        </p>
      </section>

      <Calculator rates={rates} vatRate={rates.vatRate} fundRate={rates.fundRate} />

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
