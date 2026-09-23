import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/part-time/resignation-date-comparison.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "퇴사 시점 비교 계산기",
  description: "입사일과 월급을 입력하고 여러 퇴사 예정일을 비교해 퇴직금과 연차 발생 일수 차이를 확인합니다.",
};

export default function ResignationDateComparisonPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">📦 퇴사 시점 비교 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/part-time/weekly-holiday-pay" className="font-medium text-orange-600 dark:text-orange-400">
            주휴수당 계산기
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
