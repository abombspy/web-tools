import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "공무원 시험 합격선 비교 도구",
  description: "본인이 조사한 과거 합격선과 예상 점수를 비교합니다.",
};

export default function CivilServicePassingScorePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">공무원 시험 합격선 비교 도구</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>왜 &ldquo;예측기&rdquo;가 아니라 &ldquo;비교 도구&rdquo;인가요?</h2>
        <p>
          아직 치르지 않은 시험의 &ldquo;예상 커트라인&rdquo;을 검색해보면 학원·블로그의{" "}
          <strong>추측치</strong>만 나옵니다. 공식 합격선 통계는 시험이 끝나고 사이버국가고시
          센터·인사혁신처가 발표해야 나오기 때문에, 근거 없는 숫자를 이 계산기에 미리 넣어
          &ldquo;예측&rdquo;처럼 보여주는 건 오히려 잘못된 확신을 줄 수 있다고 판단했습니다.
        </p>
        <p>
          그래서 이 도구는 특정 합격선 숫자를 제공하지 않습니다. 대신 사용자가{" "}
          <strong>직접 조사한 과거 합격선</strong>(사이버국가고시센터, 지방자치단체 발표
          등)을 입력하면, 본인의 예상 점수와 비교해 평균·최고·최저 대비 얼마나 차이 나는지
          계산해 줍니다.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          합격선은 매년 시험 난이도, 지원자 수, 정원에 따라 크게 달라집니다. 과거 데이터와의
          단순 비교가 미래 합격 여부를 보장하지 않습니다.
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
