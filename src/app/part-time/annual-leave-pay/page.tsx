import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "연차수당 계산기",
  description: "입사일 기준 발생한 연차 개수와 미사용 연차수당을 계산합니다.",
};

export default function AnnualLeavePayPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🌴 연차수당 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>연차는 몇 일 발생하나요?</h2>
        <p>
          <strong>근로기준법 제60조</strong>에 따라 계속근로기간 <strong>1년 미만</strong>은 1개월
          개근할 때마다 1일(최대 11일), <strong>1년 이상</strong>(80% 이상 출근 가정)은 15일이
          발생하고, 3년차부터 2년마다 1일씩 가산되어 <strong>최대 25일</strong>까지 늘어납니다.
        </p>

        <h2>연차수당 계산 방법</h2>
        <p>
          연차수당 = (발생 연차 − 이미 사용한 연차) × 1일 통상임금
        </p>
        <p>
          1일 통상임금은 <strong>월 통상임금 ÷ 209시간 × 8시간</strong>으로 계산합니다. 209시간은
          주 40시간 근무 + 유급주휴 8시간을 기준으로 한 월 평균 소정근로시간입니다
          ((40+8)시간 × 52주 ÷ 12개월).
        </p>

        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          이 계산기는 <strong>주 40시간 근무 정규직 기준</strong>입니다. 단시간근로자(파트타임)는
          소정근로시간 비율로 연차 일수가 별도로 조정되며, 이 계산기는 그 경우를 다루지
          않습니다.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 계산기의 결과는 참고용 모의 계산입니다. 실제 연차 발생·사용 내역은 회사 취업규칙,
          결근·휴직 여부에 따라 달라질 수 있으니 정확한 값은 회사 인사팀에 확인하세요.
        </p>
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
