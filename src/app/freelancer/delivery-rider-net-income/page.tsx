import type { Metadata } from "next";
import Link from "next/link";
import { getWithholdingTax } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "배달 라이더 순수익 계산기",
  description: "배달료, 플랫폼 수수료, 유류비, 세금을 반영한 예상 월 순수익을 계산합니다.",
};

export default function DeliveryRiderNetIncomePage() {
  const withholdingRates = getWithholdingTax();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">배달 라이더 순수익 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>계산 방법</h2>
        <p>
          순수익 = (건당 배달료 × 배달 건수) − 플랫폼 수수료 − 사업소득세 원천징수(3.3%) −
          고정비용(유류비·소모품비 등)
        </p>

        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          배달 플랫폼별 수수료율은 배달의민족·쿠팡이츠·요기요 등 플랫폼마다, 그리고 계약
          조건마다 다르고 자주 바뀝니다. 그래서 특정 플랫폼의 수수료율을 미리 넣어두는 대신
          <strong>본인이 실제로 확인한 수수료율을 직접 입력</strong>하도록 만들었습니다.
        </p>

        <p className="rounded-md bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 계산기의 결과는 참고용입니다. 보험료(유상운송보험 등), 4대보험 가입 여부에 따른
          공제는 반영하지 않습니다.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator withholdingRates={withholdingRates} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link
            href="/freelancer/withholding-tax-3-3"
            className="font-medium text-blue-600 dark:text-blue-400"
          >
            3.3% 원천징수 역산 계산기
          </Link>{" "}
          ·{" "}
          <Link href="/freelancer" className="font-medium text-blue-600 dark:text-blue-400">
            프리랜서·사업자 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
