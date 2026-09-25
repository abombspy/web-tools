import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/fun/lotto-number-generator.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "로또 번호 생성기",
  description: "암호학적으로 안전한 난수로 편향 없는 로또 6/45 번호를 생성합니다.",
};

export default function LottoNumberGeneratorPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🎰 로또 번호 생성기</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
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
