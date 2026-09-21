import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "PDF 병합·분할",
  description: "여러 PDF를 하나로 합치거나, PDF에서 원하는 페이지 범위만 추출합니다.",
};

export default function PdfToolPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">📑 PDF 병합·분할</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <p>
          여러 PDF 파일을 선택한 순서대로 하나로 합치거나, PDF에서 원하는 페이지 범위만
          뽑아 새 파일로 저장할 수 있습니다.
        </p>
        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          PDF는 <strong>서버에 업로드되지 않고 브라우저 안에서만 처리</strong>됩니다.
        </p>
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
