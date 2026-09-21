import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "이미지 압축·리사이즈·포맷 변환",
  description: "이미지를 브라우저 안에서 압축·리사이즈하고 JPEG/PNG/WebP로 변환합니다.",
};

export default function ImageToolPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🖼️ 이미지 압축·리사이즈·포맷 변환</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <p>
          최대 가로·세로 크기와 압축 품질을 정하면 원본 비율을 유지한 채 이미지 크기를
          줄이고, JPEG·PNG·WebP 중 원하는 포맷으로 변환합니다.
        </p>
        <p className="rounded-md bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          이미지는 <strong>서버에 업로드되지 않고 브라우저 안에서만 처리</strong>됩니다.
          파일을 선택해도 어디로도 전송되지 않으니 안심하고 사용하세요.
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
