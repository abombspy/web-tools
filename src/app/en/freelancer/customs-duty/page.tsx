import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/en/freelancer/customs-duty.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import { getCustomsDuty } from "@/lib/rates";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Overseas Purchase Customs Duty Calculator",
  description: "Calculate the duty-free limit, customs duty, and VAT for overseas direct purchases into Korea.",
};

export default function CustomsDutyPageEn() {
  const rates = getCustomsDuty();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">✈️ Overseas Purchase Customs Duty Calculator</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content), {
          generalLimitUsd: rates.generalLimitUsd,
          usOriginLimitUsd: rates.usOriginLimitUsd,
          vatRatePercent: (rates.vatRate * 100).toFixed(0),
        })}
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
