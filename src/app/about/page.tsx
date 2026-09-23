import type { Metadata } from "next";
import content from "@content/pages/ko/about.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import { SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "소개",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">소개</h1>

      <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content), { siteName: SITE_NAME })}
      </div>
    </div>
  );
}
