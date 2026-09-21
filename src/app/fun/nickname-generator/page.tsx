import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "닉네임 생성기",
  description: "버튼 하나로 형용사+명사 조합의 재미있는 닉네임을 만들어 줍니다.",
};

export default function NicknameGeneratorPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🐣 닉네임 생성기</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <p>게임 닉네임, 커뮤니티 아이디 등이 필요할 때 버튼을 눌러 조합을 뽑아보세요.</p>
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
