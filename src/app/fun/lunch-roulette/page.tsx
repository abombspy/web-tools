import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "점심 메뉴 추천 룰렛",
  description: "오늘 뭐 먹을지 고민될 때 카테고리를 고르고 무작위로 메뉴를 뽑아보세요.",
};

export default function LunchRoulettePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🍱 점심 메뉴 추천 룰렛</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <p>원하는 음식 카테고리를 고르고 버튼을 누르면 그 안에서 무작위로 메뉴를 뽑아줍니다.</p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 도구:{" "}
          <Link href="/fun" className="font-medium text-violet-600 dark:text-violet-400">
            재미·바이럴 도구 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
