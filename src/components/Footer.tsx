"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_NAME, SITE_NAME_EN } from "@/lib/site-config";

export default function Footer() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");

  return (
    <footer className="border-t border-orange-100 bg-orange-50 dark:border-white/10 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 text-sm text-zinc-500 dark:text-zinc-400">
        <p className="leading-relaxed">
          {isEnglish
            ? "🙏 Every result on this site is a reference-only mock calculation. It doesn't replace individual advice from a licensed professional (accountant, labor attorney, etc.) — please double-check with the relevant official agency before filing or claiming anything."
            : "🙏 이 사이트의 모든 계산 결과는 참고용 모의 계산이에요. 세무사·노무사 등 전문가의 개별 상담을 대체하지 않으니, 정확한 신고·청구 전에는 꼭 공식 기관(국세청, 고용노동부, 고용보험 등)에서 다시 확인해주세요."}
        </p>
        <nav className="flex flex-wrap gap-4 font-semibold text-zinc-600 dark:text-zinc-300">
          <Link href={isEnglish ? "/en/about" : "/about"} className="hover:text-orange-500">
            {isEnglish ? "About" : "소개"}
          </Link>
          <Link href={isEnglish ? "/en/contact" : "/contact"} className="hover:text-orange-500">
            {isEnglish ? "Contact" : "문의"}
          </Link>
          <Link href={isEnglish ? "/en/privacy-policy" : "/privacy-policy"} className="hover:text-orange-500">
            {isEnglish ? "Privacy Policy" : "개인정보처리방침"}
          </Link>
          <Link href={isEnglish ? "/en/terms" : "/terms"} className="hover:text-orange-500">
            {isEnglish ? "Terms of Service" : "이용약관"}
          </Link>
        </nav>
        <p>
          © {new Date().getFullYear()} {isEnglish ? SITE_NAME_EN : SITE_NAME} 🧮
        </p>
      </div>
    </footer>
  );
}
