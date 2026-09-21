import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "대출 이자·상환 계산기",
  description: "원리금균등상환과 원금균등상환의 월 상환액과 총 이자를 비교합니다.",
};

export default function LoanRepaymentPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">대출 이자·상환 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>원리금균등상환 vs 원금균등상환</h2>
        <ul>
          <li>
            <strong>원리금균등상환</strong>: 매달 갚는 총액(원금+이자)이 항상 같습니다. 초반에는
            이자 비중이 크고 후반에는 원금 비중이 커집니다. 월 상환 계획을 세우기 편합니다.
          </li>
          <li>
            <strong>원금균등상환</strong>: 매달 갚는 원금은 항상 같고, 이자는 남은 대출금이
            줄어들수록 함께 줄어듭니다. 초반 상환 부담이 크지만, 총 이자는 원리금균등보다
            적습니다.
          </li>
        </ul>
        <p>
          월 상환액(원리금균등) = 대출금 × 월이자율 × (1+월이자율)<sup>개월수</sup> ÷
          ((1+월이자율)<sup>개월수</sup> − 1)
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 계산기는 표준 금융 공식에 따른 참고용 계산입니다. 실제 대출 상품은 중도상환수수료,
          우대금리 조건, 첫 상환일 기준 등에 따라 결과가 다를 수 있습니다.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/living" className="font-medium text-orange-600 dark:text-orange-400">
            생활·주거 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
