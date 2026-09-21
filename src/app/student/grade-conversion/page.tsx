import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "내신·수능 등급 환산 계산기",
  description: "석차백분율 또는 백분위를 등급으로 환산합니다.",
};

export default function GradeConversionPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">내신·수능 등급 환산 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>2026년은 내신 등급제 전환기입니다</h2>
        <p>
          교육부의 2028 대입제도 개편에 따라 고교 내신이 기존 <strong>9등급제</strong>에서{" "}
          <strong>5등급제</strong>로 바뀌고 있습니다. 2026년 기준으로는{" "}
          <strong>고3(마지막 9등급제 세대)</strong>와 <strong>고1·고2(5등급제 적용)</strong>가
          서로 다른 기준을 씁니다. 본인 학년에 맞는 등급제를 선택하세요.
        </p>
        <ul>
          <li>5등급제 누적 비율: 1등급 10% / 2등급 34% / 3등급 66% / 4등급 90% / 5등급 100%</li>
          <li>
            9등급제(내신·수능 공통) 누적 비율: 1등급 4% / 2등급 11% / 3등급 23% / 4등급 40% /
            5등급 60% / 6등급 77% / 7등급 89% / 8등급 96% / 9등급 100%
          </li>
        </ul>

        <h2>내신 석차백분율 계산</h2>
        <p>
          석차백분율 = 석차 ÷ 전체 재적수 × 100으로 간단히 계산합니다. 실제 학교 나이스
          시스템은 동점자를 별도로 보정하는 공식을 쓰기 때문에, 동점자가 있으면 이 계산기의
          결과와 실제 성적표가 약간 다를 수 있습니다.
        </p>

        <h2>수능은 왜 표준점수를 입력받지 않나요?</h2>
        <p>
          수능 표준점수는 그 해 시험의 난이도에 따라 분포가 달라져서, 표준점수만으로는 정확한
          등급을 알 수 없습니다. 정확한 등급컷은 채점 후 평가원 공식 발표를 확인해야 하므로,
          이 계산기는 <strong>백분위를 직접 입력</strong>하는 방식만 제공합니다.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 계산기의 결과는 참고용입니다. 정확한 등급과 내신 산출 방식은 학교 성적표나
          평가원 발표를 확인하세요.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/student" className="font-medium text-orange-600 dark:text-orange-400">
            학생·수험생 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
