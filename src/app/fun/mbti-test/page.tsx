import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "MBTI 성격 유형 테스트",
  description: "28개 질문에 답하면 성격 유형과 특징을 알려주는 참고용 테스트입니다.",
};

export default function MbtiTestPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">MBTI 성격 유형 테스트</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <p>
          28개의 질문에 둘 중 더 나에게 가까운 답을 골라주세요. 외향-내향(E/I),
          감각-직관(S/N), 사고-감정(T/F), 판단-인식(J/P) 네 개 축에서 더 많이 선택된 쪽을
          모아 성격 유형을 알려드립니다.
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          이 테스트는 정식 MBTI(마이어스-브릭스 유형 지표) 검사가 아니라, 그 개념을 참고해
          만든 <strong>참고용 성격 유형 테스트</strong>입니다. 심리검사로서 타당성이
          검증되지 않았으니 재미로만 봐주세요. 정식 검사는 전문기관을 통해 받으실 수
          있습니다.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          함께 보면 좋은 도구:{" "}
          <Link href="/fun/name-compatibility" className="font-medium text-orange-600 dark:text-orange-400">
            MBTI 궁합 테스트
          </Link>{" "}
          ·{" "}
          <Link href="/fun" className="font-medium text-orange-600 dark:text-orange-400">
            재미·바이럴 도구 모음
          </Link>
        </p>
      </section>
    </div>
  );
}
