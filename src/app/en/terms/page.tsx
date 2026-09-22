import type { Metadata } from "next";
import { SITE_NAME_EN } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">Terms of Service</h1>
      <p className="mt-2 text-sm text-zinc-500">Effective date: 2026-09-01</p>

      <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
        <h2>Article 1 (Purpose)</h2>
        <p>
          These terms set out the rights, obligations, and responsibilities between{" "}
          {SITE_NAME_EN} (the &ldquo;Site&rdquo;) and users of its calculator services.
        </p>

        <h2>Article 2 (Description of service)</h2>
        <p>
          The Site provides free calculators for tax, pay, and everyday-life questions, along
          with content explaining the formula and basis behind each calculation.
        </p>

        <h2>Article 3 (Disclaimer)</h2>
        <ol>
          <li>
            All results provided by the Site are <strong>reference estimates only</strong> and
            do not replace individual advice from a licensed professional (accountant, labor
            attorney, lawyer, etc.) or an official calculation or review by a government agency.
          </li>
          <li>
            The rates, statutes, and reference values behind these calculations can change
            over time. The Site makes a good-faith effort to keep them current but does not
            guarantee their accuracy or completeness.
          </li>
          <li>
            The Site is not liable for damages arising from actions taken in reliance on a
            calculation result, except where caused by the Site&rsquo;s intentional misconduct
            or gross negligence.
          </li>
        </ol>

        <h2>Article 4 (User obligations)</h2>
        <p>
          Users must use the Site in accordance with applicable law and these terms, and must
          not interfere with the Site&rsquo;s normal operation.
        </p>

        <h2>Article 5 (Intellectual property)</h2>
        <p>
          Content created by the Site (explanations, design, code, etc.) is protected by
          copyright and may not be copied or distributed without prior consent.
        </p>

        <h2>Article 6 (Changes to these terms)</h2>
        <p>
          The Site may revise these terms as needed, within the limits of applicable law.
          Changes will be posted on this page.
        </p>

        <h2>Article 7 (Governing law and jurisdiction)</h2>
        <p>
          These terms are governed by the laws of the Republic of Korea, and any disputes are
          subject to the jurisdiction of the competent court under applicable law.
        </p>
      </div>
    </div>
  );
}
