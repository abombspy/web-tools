import type { Metadata } from "next";
import Link from "next/link";
import { getRealEstateAgentFeeRates } from "@/lib/rates";
import content from "@content/tools/en/living/real-estate-agent-fee.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Real Estate Agent Fee Calculator",
  description: "Calculate the maximum brokerage fee for a sale, jeonse, or monthly-rent transaction in Korea.",
};

export default function RealEstateAgentFeePageEn() {
  const rates = getRealEstateAgentFeeRates();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🤝 Real Estate Agent Fee Calculator</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
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
