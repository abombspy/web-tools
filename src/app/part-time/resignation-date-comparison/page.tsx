import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "퇴사 시점 비교 계산기",
  description: "입사일과 월급을 입력하고 여러 퇴사 예정일을 비교해 퇴직금과 연차 발생 일수 차이를 확인합니다.",
};

export default function ResignationDateComparisonPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">퇴사 시점 비교 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>무엇을 계산하나요?</h2>
        <p>
          퇴사일을 며칠만 늦추거나 당기면 <strong>퇴직금</strong>이나 <strong>연차 발생
          일수</strong>가 크게 달라질 수 있습니다. 특히 근속 <strong>1년</strong>을 채우는지
          여부는 퇴직금 지급 자체를 가르는 기준입니다. 입사일과 월급을 입력하고 여러 퇴사
          예정일을 나란히 비교해 보세요.
        </p>

        <h2>퇴직금 계산 방법</h2>
        <p>
          <strong>근로자퇴직급여보장법 제8조</strong>에 따라, 퇴직금 = 1일 평균임금 × 30일 ×
          (계속근로일수 ÷ 365)로 계산합니다. 계속근로기간이 <strong>1년(365일) 미만</strong>이면
          퇴직금이 발생하지 않습니다 — 364일 근무로는 지급 대상이 아닙니다.
        </p>
        <p>
          평균임금은 원칙적으로 퇴직일 이전 3개월간 지급된 임금총액을 그 3개월의 역일수(달력
          일수)로 나눈 값입니다. 이 계산기는 <strong>최근 3개월간 월급이 동일했다고 가정</strong>하고
          입력한 월급으로 근사치를 계산합니다. 상여금이나 미사용 연차수당처럼 비정기적으로
          지급된 금액은 반영하지 않으므로, 실제 평균임금과 차이가 날 수 있습니다.
        </p>

        <h2>연차 발생 일수</h2>
        <p>
          근로기준법 제60조에 따라 입사 후 1년 미만은 매달 개근 시 1일(최대 11일), 1년 이상은
          15일이 발생하고 3년차부터 2년마다 1일씩 가산됩니다(최대 25일). 이 계산기는 발생
          일수만 보여주며, 미사용 연차를 금액으로 환산한 수당까지는{" "}
          <span className="italic">연차수당 계산기(준비 중)</span>에서 계산해 주세요.
        </p>

        <p className="rounded-md bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 계산기의 결과는 참고용 모의 계산입니다. 실제 평균임금·근속기간 산정은 급여
          지급 내역, 결근·휴직 여부 등에 따라 달라질 수 있으니 정확한 금액은 회사 인사팀이나
          노무사에게 확인하세요.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/part-time/weekly-holiday-pay" className="font-medium text-blue-600 dark:text-blue-400">
            주휴수당 계산기
          </Link>{" "}
          ·{" "}
          <Link href="/part-time" className="font-medium text-blue-600 dark:text-blue-400">
            알바·직장인 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
