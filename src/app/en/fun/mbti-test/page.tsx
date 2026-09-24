import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/en/fun/mbti-test.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "MBTI Personality Test",
  description: "Answer 28 quick questions to get a reference personality type and a short description.",
};

export default function MbtiTestPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🔮 MBTI Personality Test</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/fun/mbti-compatibility" className="font-medium text-violet-600 dark:text-violet-400">
            MBTI Compatibility Test
          </Link>{" "}
          ·{" "}
          <Link href="/en/fun" className="font-medium text-violet-600 dark:text-violet-400">
            Fun & Viral
          </Link>
        </p>
      </section>
    </div>
  );
}
