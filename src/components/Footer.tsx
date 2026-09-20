import Link from "next/link";
import { SITE_NAME } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          본 사이트의 모든 계산 결과는 참고용 모의 계산이며, 세무사·노무사 등 전문가의 개별 상담을
          대체하지 않습니다. 계산 근거가 되는 법령·요율은 매년 바뀔 수 있으니 실제 신고·청구 전
          공식 기관(국세청, 고용노동부, 고용보험 등)에서 다시 확인하세요.
        </p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/about">소개</Link>
          <Link href="/contact">문의</Link>
          <Link href="/privacy-policy">개인정보처리방침</Link>
          <Link href="/terms">이용약관</Link>
        </nav>
        <p>
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  );
}
