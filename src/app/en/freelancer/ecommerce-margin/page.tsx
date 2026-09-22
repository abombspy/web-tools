import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "E-Commerce Margin Calculator",
  description: "Calculate net profit and margin after seller commission, payment fees, and shipping — or work backward from a target margin to the price you need.",
};

export default function EcommerceMarginPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🛍️ E-Commerce Margin Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>How it&rsquo;s calculated</h2>
        <p>Net profit = sale price − cost − seller commission − payment fee − shipping cost</p>
        <p>
          Or work backward: set a target margin and see what price you&rsquo;d need to charge to
          hit it.
        </p>

        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          Marketplace seller commissions (Naver Smart Store, Coupang, etc.) vary by category and
          change often. Instead of hardcoding a rate table, this calculator asks you to{" "}
          <strong>enter the commission rate you confirmed in your seller dashboard</strong>.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This is a reference-only calculation. This English page is a translation of the
          original Korean tool; it doesn&rsquo;t include promotional discounts, VAT, or
          return/exchange costs.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/freelancer/vat" className="font-medium text-rose-600 dark:text-rose-400">
            VAT Calculator
          </Link>{" "}
          ·{" "}
          <Link href="/en/freelancer" className="font-medium text-rose-600 dark:text-rose-400">
            Freelancer & Self-Employed
          </Link>
        </p>
      </section>
    </div>
  );
}
