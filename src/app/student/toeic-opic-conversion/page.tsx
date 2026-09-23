import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/student/toeic-opic-conversion.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "토익·오픽 점수 환산표",
  description: "공공기관 채용 공고에서 쓰이는 공식 기준표로 TOEIC과 OPIc 점수를 서로 환산합니다.",
};

export default function ToeicOpicConversionPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🗣️ 토익·오픽 점수 환산표</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 계산기:{" "}
          <Link href="/student" className="font-medium text-indigo-600 dark:text-indigo-400">
            학생·수험생 계산기 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
