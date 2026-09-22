import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Loan Repayment Calculator",
  description: "Compare equal-payment and equal-principal loan repayment: monthly payment and total interest.",
};

export default function LoanRepaymentPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🏦 Loan Repayment Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>Equal payment vs. equal principal</h2>
        <ul>
          <li>
            <strong>Equal payment (amortizing)</strong>: your total monthly payment (principal +
            interest) stays the same throughout. Early payments are interest-heavy, later ones are
            principal-heavy. Easier to budget for.
          </li>
          <li>
            <strong>Equal principal</strong>: the principal portion you pay each month stays the
            same, and interest shrinks as the remaining balance drops. Higher payments early on,
            but less total interest than equal payment.
          </li>
        </ul>
        <p>
          Monthly payment (equal payment) = principal × monthly rate × (1+monthly rate)<sup>months</sup> ÷
          ((1+monthly rate)<sup>months</sup> − 1)
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This is a reference calculation using standard financial formulas. Actual loan products
          may differ due to early-repayment fees, preferential rate conditions, first-payment-date
          rules, and similar terms.
        </p>
      </section>

      <Calculator />

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
