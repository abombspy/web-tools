import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/ko/text-file/json-csv-convert.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import Calculator from "./Calculator";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "JSON·CSV 변환기",
  description: "JSON 배열과 CSV를 서로 변환합니다. 따옴표·쉼표·줄바꿈이 섞인 필드도 정확히 처리합니다.",
};

export default function JsonCsvConvertPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🔄 JSON·CSV 변환기</h1>
      <ShareButtons />

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content))}
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 도구:{" "}
          <Link href="/text-file" className="font-medium text-teal-600 dark:text-teal-400">
            텍스트·파일 도구 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
