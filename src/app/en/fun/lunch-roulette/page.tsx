import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Lunch Menu Roulette",
  description: "Can't decide what to eat? Pick your categories and spin for a random suggestion.",
};

export default function LunchRoulettePageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🍱 Lunch Menu Roulette</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <p>Pick the food categories you&rsquo;re open to, hit the button, and get a random pick.</p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/fun" className="font-medium text-violet-600 dark:text-violet-400">
            Fun & Viral
          </Link>
        </p>
      </section>
    </div>
  );
}
