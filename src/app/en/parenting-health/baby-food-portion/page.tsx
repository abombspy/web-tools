import type { Metadata } from "next";
import Link from "next/link";
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
        <h2>4 stages of weaning food</h2>
        <ul>
          <li><strong>Early (4–6 months)</strong>: thin rice porridge, once a day, 5–80ml</li>
          <li><strong>Mid (7–8 months)</strong>: thicker porridge, twice a day, 50–100g per meal</li>
          <li><strong>Late (9–11 months)</strong>: introducing chunky food, 3x a day, 90–120g per meal</li>
          <li><strong>Final stage (12–15 months)</strong>: soft rice & side dishes, 3x a day + snacks, 100–130g per meal</li>
        </ul>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This table isn&rsquo;t an official government standard — it&rsquo;s a{" "}
          <strong>general guideline</strong> drawn from pediatric and parenting resources. Every
          baby develops at a different pace, so actual needs can vary; talk to a pediatrician about
          allergies or anything unusual.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/parenting-health" className="font-medium text-emerald-600 dark:text-emerald-400">
            Parenting & Health
          </Link>
        </p>
      </section>
    </div>
  );
}
