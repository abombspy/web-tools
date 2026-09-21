import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "만 나이·띠·별자리 계산기",
  description: "생년월일로 만 나이, 띠, 별자리를 계산합니다.",
};

export default function AgeZodiacPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🐉 만 나이·띠·별자리 계산기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>만 나이</h2>
        <p>
          2023년 6월 28일 시행된 <strong>&ldquo;만 나이 통일법&rdquo;</strong>(행정기본법 등)
          기준으로, 생일이 지나야 나이가 한 살 늘어나는 방식으로 계산합니다.
        </p>

        <h2>띠 — 계산 기준에 대한 안내</h2>
        <p>
          이 계산기는 널리 쓰이는 <strong>양력 1월 1일 기준 간이 계산법</strong>을 씁니다.
          하지만 전통적으로 띠는 <strong>음력 설날(또는 입춘)</strong>을 기준으로 바뀌므로,
          양력 1월~2월 초에 태어난 경우 실제 사주명리학적 띠와 이 계산기의 결과가{" "}
          <strong>다를 수 있습니다</strong>. 정확한 띠가 필요하다면 음력 변환기로 생일을
          확인하세요.
        </p>

        <h2>별자리</h2>
        <p>태어난 날짜(월/일)를 서양 별자리의 표준 날짜 구간에 대응시켜 계산합니다.</p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/date-time" className="font-medium text-amber-600 dark:text-amber-400">
            날짜·시간 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
