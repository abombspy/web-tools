import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "이름 궁합·MBTI 궁합 테스트",
  description: "이름이나 MBTI 두 개를 입력하면 재미로 보는 궁합 점수를 알려줍니다.",
};

export default function NameCompatibilityPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">이름 궁합·MBTI 궁합 테스트</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          이 테스트는 과학적 근거가 없는 <strong>순수 재미용 콘텐츠</strong>입니다. 같은
          이름/MBTI 조합을 넣으면 항상 같은 점수가 나오도록(순서를 바꿔도 동일) 설계했을
          뿐, 실제 궁합이나 성격 상성을 분석하지 않습니다.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 도구:{" "}
          <Link href="/fun" className="font-medium text-orange-600 dark:text-orange-400">
            재미·바이럴 도구 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
