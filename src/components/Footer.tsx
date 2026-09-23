"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getChrome } from "@/lib/content/chrome";
import { SITE_NAME, SITE_NAME_EN } from "@/lib/site-config";

export default function Footer() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");
  const chrome = getChrome(isEnglish ? "en" : "ko");

  return (
    <footer className="border-t border-orange-100 bg-orange-50 dark:border-white/10 dark:bg-zinc-900">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-8 text-sm text-zinc-500 dark:text-zinc-400">
        <p className="leading-relaxed">{chrome.footer.disclaimer}</p>
        <nav className="flex flex-wrap gap-4 font-semibold text-zinc-600 dark:text-zinc-300">
          <Link href={isEnglish ? "/en/about" : "/about"} className="hover:text-orange-500">
            {chrome.footer.about}
          </Link>
          <Link href={isEnglish ? "/en/contact" : "/contact"} className="hover:text-orange-500">
            {chrome.footer.contact}
          </Link>
          <Link href={isEnglish ? "/en/privacy-policy" : "/privacy-policy"} className="hover:text-orange-500">
            {chrome.footer.privacyPolicy}
          </Link>
          <Link href={isEnglish ? "/en/terms" : "/terms"} className="hover:text-orange-500">
            {chrome.footer.terms}
          </Link>
        </nav>
        <p>
          © {new Date().getFullYear()} {isEnglish ? SITE_NAME_EN : SITE_NAME} 🧮
        </p>
      </div>
    </footer>
  );
}
