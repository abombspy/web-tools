import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/en/part-time/parental-leave-pay.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import { getParentalLeavePay } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Parental Leave Pay Calculator",
  description: "Estimate your monthly parental leave pay and total payout by number of months.",
};

export default function ParentalLeavePayPageEn() {
  const rates = getParentalLeavePay();

  const tierList = (
    <ul>
      {rates.tiers.map((tier, idx) => {
        const prevMax = idx === 0 ? 0 : rates.tiers[idx - 1].maxMonth;
        return (
          <li key={tier.maxMonth}>
            Months {prevMax + 1}–{tier.maxMonth}: {Math.round(tier.rate * 100)}% of ordinary
            wage (cap ₩{tier.cap.toLocaleString()})
          </li>
        );
      })}
      <li>Floor: ₩{rates.floor.toLocaleString()}/month</li>
    </ul>
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🍼 Parental Leave Pay Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content), { tierList })}
      </section>

      <Calculator rates={rates} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/part-time" className="font-medium text-orange-600 dark:text-orange-400">
            Work & Pay
          </Link>
        </p>
      </section>
    </div>
  );
}
