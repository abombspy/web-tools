import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/parenting-health/baby-growth-percentile.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "아기 개월수·성장 백분위 계산기",
  description: "아기의 개월수를 계산하고 WHO 참고 자료 기준 평균 체중·키와 비교합니다.",
};

export default function BabyGrowthPercentilePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">📏 아기 개월수·성장 백분위 계산기</h1>
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
