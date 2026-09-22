import type { Metadata } from "next";
import Link from "next/link";
import { getRealEstateAgentFeeRates } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Real Estate Agent Fee Calculator",
  description: "Calculate the maximum brokerage fee for a sale, jeonse, or monthly-rent transaction in Korea.",
};

export default function RealEstateAgentFeePageEn() {
  const rates = getRealEstateAgentFeeRates();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🤝 Real Estate Agent Fee Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>How it&rsquo;s calculated</h2>
        <p>
          Under the <strong>Enforcement Rules of the Licensed Real Estate Agents Act</strong> and
          local ordinances, maximum fee rates and caps are set by transaction-amount bracket. The
          actual brokerage fee is negotiated with the agent within this maximum.
        </p>
        <p>
          For lease (jeonse/monthly rent) transactions, the deposit and monthly rent are combined
          into a <strong>converted deposit</strong>: deposit + (monthly rent × 100) — or deposit +
          (monthly rent × 70) if that total is under ₩50M.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          The rate table in this calculator is based on official Seoul city data. Most local
          governments use the same standard table, but rates can vary by region, so check your
          local ordinance or a licensed agent for the exact figure. The amount shown is the
          maximum, and VAT is separate. This English page is a translation of the original
          Korean tool.
        </p>
      </section>

      <Calculator rates={rates} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link
            href="/en/living/jeonse-to-monthly-rent"
            className="font-medium text-sky-600 dark:text-sky-400"
          >
            Jeonse-to-Monthly-Rent Conversion Calculator
          </Link>{" "}
          ·{" "}
          <Link href="/en/living" className="font-medium text-sky-600 dark:text-sky-400">
            Housing & Bills
          </Link>
        </p>
      </section>
    </div>
  );
}
