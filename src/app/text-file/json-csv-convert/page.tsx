import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "JSON·CSV 변환기",
  description: "JSON 배열과 CSV를 서로 변환합니다. 따옴표·쉼표·줄바꿈이 섞인 필드도 정확히 처리합니다.",
};

export default function JsonCsvConvertPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">JSON·CSV 변환기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <p>
          JSON 배열(객체들의 배열, 또는 객체 하나)을 CSV로, 또는 CSV를 JSON 배열로 변환합니다.
          RFC 4180 표준에 따라 따옴표로 감싼 필드 안의 쉼표·줄바꿈·이스케이프된 따옴표도
          정확히 처리합니다. 모든 변환은 브라우저 안에서만 이루어지며 서버로 전송되지
          않습니다.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 도구:{" "}
          <Link href="/text-file" className="font-medium text-orange-600 dark:text-orange-400">
            텍스트·파일 도구 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
