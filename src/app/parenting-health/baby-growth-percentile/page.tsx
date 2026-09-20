import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "아기 개월수·성장 백분위 계산기",
  description: "아기의 개월수를 계산하고 WHO 참고 자료 기준 평균 체중·키와 비교합니다.",
};

export default function BabyGrowthPercentilePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">아기 개월수·성장 백분위 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>이 계산기가 하는 일</h2>
        <p>
          생년월일로 아기의 만 개월수를 계산하고, 입력한 체중·키를 같은 개월수의{" "}
          <strong>참고 평균값</strong>과 비교합니다.
        </p>

        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          <strong>정확한 &ldquo;백분위(percentile)&rdquo;는 계산하지 않습니다.</strong> 진짜
          WHO 성장 백분위는 방대한 통계 파라미터표(LMS)를 써서 계산하는데, 이를 신뢰할 수
          있게 재현할 방법이 없어 이 계산기에는 넣지 않았습니다. 대신 여러 자료에 공통으로
          나오는 &ldquo;3~97백분위 범위&rdquo;의 중간값을 참고 평균으로 써서 &ldquo;평균보다
          몇 % 많거나 적은지&rdquo;만 보여줍니다. 지원 범위는 0~24개월입니다.
        </p>

        <p className="rounded-md bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          정확한 성장 백분위와 발달 평가는 영유아 건강검진에서 소아과 전문의에게 확인하세요.
          이 계산기의 결과만으로 성장 상태를 판단하지 마세요.
        </p>
      </section>

      {/* TODO: 애드센스 승인 후 이 위치에 광고 슬롯 삽입 (plan.md §2.3) */}

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/parenting-health" className="font-medium text-blue-600 dark:text-blue-400">
            육아·건강 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
