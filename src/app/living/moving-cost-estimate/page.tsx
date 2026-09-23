import type { Metadata } from "next";
import Link from "next/link";
import { getMovingCostEstimateRates } from "@/lib/rates";
import content from "@content/tools/ko/living/moving-cost-estimate.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "이사 비용 견적 계산기",
  description: "평수, 이사 방식, 사다리차 여부를 반영한 대략적인 이사 비용 범위를 추정합니다.",
};

export default function MovingCostEstimatePage() {
  const rates = getMovingCostEstimateRates();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🚚 이사 비용 견적 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator rates={rates} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/living" className="font-medium text-sky-600 dark:text-sky-400">
            생활·주거 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
