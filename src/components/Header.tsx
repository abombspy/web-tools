import Link from "next/link";
import { CATEGORIES_WITH_PAGES, SITE_NAME } from "@/lib/site-config";

// TODO: 카테고리(및 하위 계산기)가 더 늘어나면 메가메뉴/아코디언 내비게이션으로 교체
// (plan.md §2.3, §7.3).

export default function Header() {
  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="text-lg font-semibold">
          {SITE_NAME}
        </Link>
        <nav className="flex flex-wrap gap-4 text-sm text-zinc-600 dark:text-zinc-400">
          {CATEGORIES_WITH_PAGES.map((c) => (
            <Link key={c.slug} href={`/${c.slug}`}>
              {c.name}
            </Link>
          ))}
          <Link href="/about">소개</Link>
          <Link href="/contact">문의</Link>
        </nav>
      </div>
    </header>
  );
}
