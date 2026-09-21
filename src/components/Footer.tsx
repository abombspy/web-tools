import Link from "next/link";
import { SITE_NAME } from "@/lib/site-config";

export default function Footer() {
  return (
    <footer className="border-t border-orange-100 bg-orange-50 dark:border-white/10 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 text-sm text-zinc-500 dark:text-zinc-400">
        <p className="leading-relaxed">
          🙏 이 사이트의 모든 계산 결과는 참고용 모의 계산이에요. 세무사·노무사 등 전문가의 개별
          상담을 대체하지 않으니, 정확한 신고·청구 전에는 꼭 공식 기관(국세청, 고용노동부, 고용보험
          등)에서 다시 확인해주세요.
        </p>
        <nav className="flex flex-wrap gap-4 font-semibold text-zinc-600 dark:text-zinc-300">
          <Link href="/about" className="hover:text-orange-500">
            소개
          </Link>
          <Link href="/contact" className="hover:text-orange-500">
            문의
          </Link>
          <Link href="/privacy-policy" className="hover:text-orange-500">
            개인정보처리방침
          </Link>
          <Link href="/terms" className="hover:text-orange-500">
            이용약관
          </Link>
        </nav>
        <p>
          © {new Date().getFullYear()} {SITE_NAME} 🧮
        </p>
      </div>
    </footer>
  );
}
