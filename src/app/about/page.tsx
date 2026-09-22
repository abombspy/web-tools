import type { Metadata } from "next";
import Link from "next/link";
import { SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "소개",
};

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">소개</h1>

      <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
        <p>
          {SITE_NAME}는 세금·급여·생활과 관련해 자주 필요한 계산을 무료로 제공하는 계산기
          모음입니다. 단순히 숫자만 보여주는 대신, <strong>왜 이렇게 계산되는지</strong>(관련
          법령, 공식, 조건)를 함께 설명해 이용자가 결과를 이해하고 스스로 검증할 수 있도록 하는
          것을 목표로 합니다.
        </p>
        <p>
          모든 계산은 이용자의 브라우저 안에서만 이루어지며, 입력한 값을 서버로 전송하거나
          저장하지 않습니다. 자세한 내용은{" "}
          <Link href="/privacy-policy">개인정보처리방침</Link>을 참고해 주세요.
        </p>
        <p>
          다만 사이트가 제공하는 계산 결과는 참고용이며, 세무사·노무사 등 전문가의 상담이나
          국가기관의 공식 절차를 대체하지 않습니다. 자세한 내용은{" "}
          <Link href="/terms">이용약관</Link>을 참고해 주세요.
        </p>
        {/* TODO: 서비스가 실제로 오픈되면 팀/운영자 소개, 개발 배경 등을 추가 */}
      </div>
    </div>
  );
}
