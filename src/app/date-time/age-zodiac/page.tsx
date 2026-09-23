import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/date-time/age-zodiac.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "만 나이·띠·별자리 계산기",
  description: "생년월일로 만 나이, 띠, 별자리를 계산합니다.",
};

export default function AgeZodiacPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🐉 만 나이·띠·별자리 계산기</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/date-time" className="font-medium text-amber-600 dark:text-amber-400">
            날짜·시간 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
