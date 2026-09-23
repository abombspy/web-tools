import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/en/fun/name-compatibility.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Name & MBTI Compatibility Test",
  description: "Enter two names or two MBTI types for a just-for-fun compatibility score.",
};

export default function NameCompatibilityPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">💘 Name & MBTI Compatibility Test</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
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
