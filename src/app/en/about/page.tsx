import type { Metadata } from "next";
import { SITE_NAME_EN } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">About</h1>

      <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
        <p>
          {SITE_NAME_EN} is a free collection of everyday calculators. Instead of just showing a
          number, each tool explains <strong>why</strong> it comes out that way (the formula, the
          source, the conditions), so you can understand and double-check the result yourself.
        </p>
        <p>
          All calculations run entirely in your browser — nothing you type is sent to or stored
          on a server. See the (Korean-only){" "}
          <a href="/privacy-policy">Privacy Policy</a> for details.
        </p>
        <p>
          Results are for reference only and don&rsquo;t replace advice from a licensed
          professional or an official government process. See the (Korean-only){" "}
          <a href="/terms">Terms of Service</a> for details.
        </p>
        <p className="text-sm text-zinc-500">
          Note: this English section covers tools that don&rsquo;t depend on Korean statutes
          (housing/bills, parenting/health, date/time, student, text/file, and fun tools). Korean
          labor-law and tax calculators (part-time wages, freelancer taxes, etc.) are Korean-only,
          since translating legal citations accurately is a separate, higher-stakes task we
          haven&rsquo;t done yet.
        </p>
      </div>
    </div>
  );
}
