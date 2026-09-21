import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "맞춤법 체크용 텍스트 정리 도구",
  description: "공백·줄바꿈을 정리하고 흔한 오타를 교정합니다.",
};

export default function TextCleanupPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">맞춤법 체크용 텍스트 정리 도구</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>이 도구가 하는 일</h2>
        <ul>
          <li>연속된 공백을 한 칸으로, 문장부호 앞의 불필요한 공백을 정리합니다.</li>
          <li>빈 줄이 3개 이상 이어지면 2개로 줄입니다.</li>
          <li>
            &ldquo;됬다→됐다&rdquo;, &ldquo;웬지→왠지&rdquo;, &ldquo;몇일→며칠&rdquo;처럼{" "}
            <strong>문맥과 무관하게 항상 틀린 것으로 볼 수 있는 흔한 오타</strong>만
            교정합니다.
          </li>
        </ul>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 도구는 <strong>진짜 맞춤법·문법 검사기가 아닙니다.</strong> 띄어쓰기 교정이나
          &ldquo;되/돼&rdquo;, &ldquo;안/않&rdquo;처럼 문맥에 따라 맞고 틀림이 갈리는 표현은
          다루지 않습니다(신뢰할 수 있는 공식 API가 없어 의도적으로 제외했습니다). 정확한
          맞춤법 검사는 국립국어원 누리집 등을 이용하세요.
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
