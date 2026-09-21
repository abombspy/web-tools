import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "D-day·기념일 계산기",
  description: "목표 날짜까지 남은 일수 또는 지난 일수를 계산합니다.",
};

export default function DDayPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">D-day·기념일 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>계산 방법</h2>
        <p>
          목표 날짜와 기준일(오늘)의 날짜 차이를 계산합니다. 100일, 200일, 1주년 같은
          기념일이나 시험일까지 남은 날을 확인할 때 사용하세요.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/date-time" className="font-medium text-orange-600 dark:text-orange-400">
            날짜·시간 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
