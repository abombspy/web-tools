import type { Metadata } from "next";
import Link from "next/link";
import { getParentalLeavePay } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "육아휴직 급여 계산기",
  description: "육아휴직 개월수별 예상 급여와 총 수령액을 계산합니다.",
};

export default function ParentalLeavePayPage() {
  const rates = getParentalLeavePay();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">육아휴직 급여 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>무엇을 계산하나요?</h2>
        <p>
          육아휴직 기간 동안 월별로 받는 육아휴직급여를 계산합니다. 2026년 기준 구간별
          지급률과 상한액은 다음과 같습니다.
        </p>
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
        <p>
          2025년 1월부터 &ldquo;사후지급금&rdquo;(복직 6개월 후 지급하던 25%) 제도가 폐지되어,
          위 금액을 <strong>매달 전액</strong> 바로 받습니다.
        </p>

        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          부모가 함께 육아휴직을 사용할 때 적용되는 <strong>&ldquo;6+6 부모육아휴직제&rdquo;
          특례</strong>(상한액이 단계적으로 올라가는 별도 제도)는 이 계산기에서 다루지
          않습니다.
        </p>

        <p className="rounded-md bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 계산기의 결과는 참고용 모의 계산입니다. 실제 지급액은 고용센터 심사와 통상임금
          산정 방식에 따라 달라질 수 있습니다.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator rates={rates} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/part-time" className="font-medium text-blue-600 dark:text-blue-400">
            알바·직장인 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
