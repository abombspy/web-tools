import type { Metadata } from "next";
import Link from "next/link";
import { getCustomsDuty } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Overseas Purchase Customs Duty Calculator",
  description: "Calculate the duty-free limit, customs duty, and VAT for overseas direct purchases into Korea.",
};

export default function CustomsDutyPageEn() {
  const rates = getCustomsDuty();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">✈️ Overseas Purchase Customs Duty Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>Duty-free limit</h2>
        <ul>
          <li>General: duty-free if item price + shipping totals ${rates.generalLimitUsd} or less</li>
          <li>
            From the US (Korea–US FTA) + eligible for list clearance: duty-free up to $
            {rates.usOriginLimitUsd} (health supplements, cosmetics, alcohol, etc. still use the
            ${rates.generalLimitUsd} limit even from the US)
          </li>
        </ul>
        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          <strong>Going over the limit taxes the entire amount, not just the excess.</strong> For
          example, a $151 item gets duty and VAT applied to the full $151, just for being $1 over
          the $150 threshold.
        </p>

        <h2>How taxable amounts are calculated</h2>
        <p>
          Taxable value = (item price + international shipping) × exchange rate. Duty = taxable
          value × duty rate. VAT = (taxable value + duty) × {(rates.vatRate * 100).toFixed(0)}%.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          Duty rates vary by item (thousands of HS codes), so this calculator doesn&rsquo;t fill
          one in automatically. Look up your item&rsquo;s duty rate on the Korea Customs Service
          website and enter it directly. The exchange rate is also manually entered, not
          live-linked. High-value items subject to individual consumption tax and some other
          categories are outside this calculator&rsquo;s scope. This English page is a
          translation of the original Korean tool.
        </p>
      </section>

      <Calculator rates={rates} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/freelancer" className="font-medium text-rose-600 dark:text-rose-400">
            Freelance & Tax
          </Link>
        </p>
      </section>
    </div>
  );
}
