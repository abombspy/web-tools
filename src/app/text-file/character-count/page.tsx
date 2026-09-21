import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "글자수 세기",
  description: "공백 포함/제외 글자수, 단어 수, 바이트 수를 실시간으로 계산합니다.",
};

export default function CharacterCountPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">글자수 세기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <p>
          자기소개서·에세이 등 글자수 제한이 있는 글을 쓸 때, 공백 포함/제외 글자수와 단어
          수를 실시간으로 확인하세요. 입력한 텍스트는 서버로 전송되지 않고 브라우저 안에서만
          계산됩니다.
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
