import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/en/parenting-health/baby-food-portion.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Baby Food Portion Guide",
  description: "Find the right weaning-food stage and portion size for your baby's age.",
};

export default function BabyFoodPortionPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🥣 Baby Food Portion Guide</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/parenting-health" className="font-medium text-emerald-600 dark:text-emerald-400">
            Family & Health
          </Link>
        </p>
      </section>
    </div>
  );
}
