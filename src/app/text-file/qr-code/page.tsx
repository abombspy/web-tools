import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "QR코드 생성기",
  description: "URL이나 텍스트로 QR코드를 즉시 생성하고 PNG로 다운로드합니다.",
};

export default function QrCodePage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">QR코드 생성기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <p>
          ISO/IEC 18004 표준을 따르는 QR코드를 입력한 텍스트로 즉시 생성합니다. 모든 처리는
          브라우저 안에서 이루어지며, 입력한 내용은 서버로 전송되지 않습니다.
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
