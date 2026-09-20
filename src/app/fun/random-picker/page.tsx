import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "랜덤 추첨기·사다리타기·룰렛",
  description: "목록에서 하나를 무작위로 뽑거나, 순서를 섞거나, 참가자를 결과에 무작위로 매칭합니다.",
};

export default function RandomPickerPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">랜덤 추첨기·사다리타기·룰렛</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <p>
          모임·회식에서 메뉴를 정하거나 순서를 정할 때 사용하세요. 일반적인{" "}
          <code>Math.random()</code> 대신 브라우저의 암호학적 난수 생성기(
          <code>crypto.getRandomValues</code>)를 써서 공정성을 높였습니다.
        </p>
        <p>
          &ldquo;참가자-결과 무작위 매칭&rdquo;은 실제 사다리 그림을 그리지는 않지만,
          사다리타기와 동일하게 각 참가자를 결과 하나에 무작위로 1:1 배정합니다.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 도구:{" "}
          <Link href="/fun" className="font-medium text-blue-600 dark:text-blue-400">
            재미·바이럴 도구 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
