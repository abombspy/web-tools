import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/parenting-health/alcohol-detox-time.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "음주 후 해독 시간 추정기",
  description: "위드마크 공식을 이용해 음주 후 혈중알코올농도와 해독 시간을 추정합니다.",
};

export default function AlcoholDetoxTimePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🍺 음주 후 해독 시간 추정기</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/parenting-health" className="font-medium text-emerald-600 dark:text-emerald-400">
            육아·건강 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
