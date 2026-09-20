import type { Metadata } from "next";
import Link from "next/link";
import { getMinimumWage, getUnemploymentBenefit } from "@/lib/rates";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "실업급여 모의 계산기",
  description: "예상 구직급여(실업급여) 수령액과 지급 기간을 계산합니다.",
};

export default function UnemploymentBenefitPage() {
  const rates = getUnemploymentBenefit();
  const minimumWage = getMinimumWage();

  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">실업급여 모의 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>무엇을 계산하나요?</h2>
        <p>
          <strong>고용보험법</strong>에 따른 구직급여(실업급여) 예상 수령액을 계산합니다.
          구직급여일액 = 이직 전 평균임금(1일)의 60%이며, 상한액과 하한액 범위 안에서
          정해집니다. 총 수령액은 구직급여일액 × 소정급여일수입니다.
        </p>

        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          이 계산기는 <strong>수급 자격이 있다고 가정했을 때 받을 금액</strong>만 계산합니다.
          실업급여는 원칙적으로 <strong>비자발적 이직</strong>(권고사직, 계약만료, 회사 사정
          등)인 경우에 받을 수 있고, 단순 자발적 퇴사는 원칙적으로 대상이 아닙니다(예외
          사유 있음). 수급 자격 여부는 고용센터에서 확인하세요.
        </p>

        <h2>상한액·하한액·소정급여일수</h2>
        <ul>
          <li>
            2026년 1일 상한액: <strong>{rates.dailyCap.toLocaleString()}원</strong>
          </li>
          <li>
            1일 하한액: 이직 당시 최저시급 × 8시간 × 80% ={" "}
            <strong>
              {Math.round(
                minimumWage.hourly * rates.dailyFloorFormula.hoursPerDay * rates.dailyFloorFormula.minWageRatio,
              ).toLocaleString()}
              원
            </strong>
          </li>
          <li>
            소정급여일수는 <strong>이직일 기준 나이</strong>와{" "}
            <strong>고용보험 가입기간</strong>에 따라 120일~270일 사이로 정해집니다(50세 이상은
            같은 가입기간이라도 더 깁니다).
          </li>
        </ul>

        <p className="rounded-md bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 계산기의 결과는 참고용 모의 계산입니다. 평균임금은 최근 3개월 급여가 동일했다고
          가정한 근사치이며, 실제 지급액은 고용센터의 심사와 정확한 평균임금 산정에 따라
          달라질 수 있습니다.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator rates={rates} minimumHourlyWage={minimumWage.hourly} />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link
            href="/part-time/resignation-date-comparison"
            className="font-medium text-blue-600 dark:text-blue-400"
          >
            퇴사 시점 비교 계산기
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
