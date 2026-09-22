import type { Metadata } from "next";
import Link from "next/link";
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
          on a server. See the{" "}
          <Link href="/en/privacy-policy">Privacy Policy</Link> for details.
        </p>
        <p>
          Results are for reference only and don&rsquo;t replace advice from a licensed
          professional or an official government process. See the{" "}
          <Link href="/en/terms">Terms of Service</Link> for details.
        </p>
        <p className="text-sm text-zinc-500">
          Note: some calculators (part-time/employee wages, freelancer taxes, and a couple of
          housing tools) are built around Korean statutes — labor law, tax law, and housing law.
          This English section is a translation of the original Korean tool, including the legal
          citations; it&rsquo;s meant as a reference for foreign residents, not a substitute for
          advice from a licensed professional or an official government source.
        </p>
      </div>
    </div>
  );
}
