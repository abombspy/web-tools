import type { Metadata } from "next";
import content from "@content/pages/en/about.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import { SITE_NAME_EN } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">About</h1>

      <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content), { siteName: SITE_NAME_EN })}
      </div>
    </div>
  );
}
