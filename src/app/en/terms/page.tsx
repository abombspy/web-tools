import type { Metadata } from "next";
import content from "@content/pages/en/terms.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
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
        {renderBlocks(asBlocks(content), { siteName: SITE_NAME_EN })}
      </div>
    </div>
  );
}
