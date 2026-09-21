import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "학점 평균(GPA) 계산기",
  description: "과목별 학점과 등급으로 평균 학점(GPA)을 4.5/4.3 만점으로 계산합니다.",
};

export default function GpaPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">학점 평균(GPA) 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>계산 방법</h2>
        <p>
          한국 대학의 표준 4.5 만점 척도(A+ 4.5 ~ F 0.0)를 기준으로, 과목별{" "}
          <strong>학점 × 등급 점수</strong>를 모두 더한 뒤 총 이수학점으로 나눈{" "}
          <strong>가중평균</strong>입니다.
        </p>
        <p>
          4.3 만점 환산은 일부 대학원·해외 지원 시 요구하는 방식으로, 4.5 만점 GPA에
          4.3/4.5를 곱한 값입니다.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          학교마다 등급 점수 배점(A+ 4.5 또는 4.3 등)이나 P/F 과목 처리 방식이 다를 수 있으니,
          정확한 값은 학교 성적표를 확인하세요.
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
