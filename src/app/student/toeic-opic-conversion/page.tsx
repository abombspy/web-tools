import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "토익·오픽 점수 환산표",
  description: "공공기관 채용 공고에서 쓰이는 공식 기준표로 TOEIC과 OPIc 점수를 서로 환산합니다.",
};

export default function ToeicOpicConversionPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">토익·오픽 점수 환산표</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>환산 기준</h2>
        <p>
          여러 공공기관·공기업 채용 공고에 첨부되는 <strong>&ldquo;어학성적 환산
          기준표&rdquo;</strong>를 기준으로 합니다. OPIc 레벨마다 대응하는 TOEIC 점수 구간과
          부여점수(평균)가 정해져 있습니다.
        </p>
        <ul>
          <li>IM1: 470~715점 (평균 593점)</li>
          <li>IM2: 720~815점 (평균 765점)</li>
          <li>IM3: 815~915점 (평균 860점)</li>
          <li>IH: 915~955점 (평균 935점)</li>
          <li>AL: 955~990점 (평균 980점)</li>
        </ul>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 표는 IM1 미만(IM, IL, NH 등)은 다루지 않으며, 실제로 지원하는 기관마다 자체
          환산표를 별도로 쓸 수 있으니 채용 공고의 공식 기준을 반드시 확인하세요.
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
