import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/part-time/parental-leave-pay.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import { getParentalLeavePay } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "육아휴직 급여 계산기",
  description: "육아휴직 개월수별 예상 급여와 총 수령액을 계산합니다.",
};

export default function ParentalLeavePayPage() {
  const rates = getParentalLeavePay();

  const tierList = (
    <ul>
      {rates.tiers.map((tier, idx) => {
        const prevMax = idx === 0 ? 0 : rates.tiers[idx - 1].maxMonth;
        return (
          <li key={tier.maxMonth}>
            {prevMax + 1}~{tier.maxMonth}개월차: 통상임금의 {Math.round(tier.rate * 100)}%
            (상한 {tier.cap.toLocaleString()}원)
          </li>
        );
      })}
      <li>하한액: 월 {rates.floor.toLocaleString()}원</li>
    </ul>
  );

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🍼 육아휴직 급여 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content), { tierList })}
      </section>

      <Calculator rates={rates} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/part-time" className="font-medium text-orange-600 dark:text-orange-400">
            알바·직장인 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
