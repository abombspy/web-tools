import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/fun/mbti-test.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "MBTI 성격 유형 테스트",
  description: "28개 질문에 답하면 성격 유형과 특징을 알려주는 참고용 테스트입니다.",
};

export default function MbtiTestPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🔮 MBTI 성격 유형 테스트</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 도구:{" "}
          <Link href="/fun/mbti-compatibility" className="font-medium text-violet-600 dark:text-violet-400">
            MBTI 궁합 테스트
          </Link>{" "}
          ·{" "}
          <Link href="/fun" className="font-medium text-violet-600 dark:text-violet-400">
            재미·바이럴 도구 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
