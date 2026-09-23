import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/part-time/annual-leave-pay.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "연차수당 계산기",
  description: "입사일 기준 발생한 연차 개수와 미사용 연차수당을 계산합니다.",
};

export default function AnnualLeavePayPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🌴 연차수당 계산기</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link
            href="/part-time/resignation-date-comparison"
            className="font-medium text-orange-600 dark:text-orange-400"
          >
            퇴사 시점 비교 계산기
          </Link>{" "}
          ·{" "}
          <Link href="/part-time" className="font-medium text-orange-600 dark:text-orange-400">
            알바·직장인 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
