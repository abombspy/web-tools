import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/fun/random-picker.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "랜덤 추첨기·사다리타기·룰렛",
  description: "목록에서 하나를 무작위로 뽑거나, 순서를 섞거나, 참가자를 결과에 무작위로 매칭합니다.",
};

export default function RandomPickerPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🎲 랜덤 추첨기·사다리타기·룰렛</h1>

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
