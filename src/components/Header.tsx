import Link from "next/link";
import { CATEGORIES_WITH_PAGES, SITE_NAME } from "@/lib/site-config";

// 카테고리별 드롭다운 메뉴. 커스텀 JS 상태 관리 대신 <details>/<summary>(브라우저
// 네이티브 디스클로저 위젯)를 사용 — 자바스크립트 없이 동작하고 접근성이 기본
// 제공되며 정적 내보내기와도 완전히 호환된다. name 속성을 공유시켜 한 번에 하나의
// 드롭다운만 열리도록 함(plan.md §2.3, §7.3, .docs/ui-plan.md 참고).

export default function Header() {
  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="text-lg font-semibold">
          {SITE_NAME}
        </Link>
        <nav className="flex flex-wrap items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
          {CATEGORIES_WITH_PAGES.map((c) => (
            <details key={c.slug} name="header-nav" className="group relative">
              <summary className="cursor-pointer list-none rounded px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10">
                {c.name}
              </summary>
              <div className="absolute left-0 z-10 mt-1 w-56 rounded-lg border border-black/10 bg-white p-2 shadow-lg dark:border-white/10 dark:bg-zinc-900">
                <Link
                  href={`/${c.slug}`}
                  className="block rounded px-2 py-1.5 text-xs font-semibold text-zinc-500 hover:bg-black/5 dark:text-zinc-400 dark:hover:bg-white/10"
                >
                  {c.name} 전체 보기
                </Link>
                {c.tools
                  ?.filter((tool) => tool.available)
                  .map((tool) => (
                    <Link
                      key={tool.slug}
                      href={`/${c.slug}/${tool.slug}`}
                      className="block rounded px-2 py-1.5 hover:bg-black/5 dark:hover:bg-white/10"
                    >
                      {tool.name}
                    </Link>
                  ))}
              </div>
            </details>
          ))}
          <Link href="/about" className="rounded px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10">
            소개
          </Link>
          <Link href="/contact" className="rounded px-2 py-1 hover:bg-black/5 dark:hover:bg-white/10">
            문의
          </Link>
        </nav>
      </div>
    </header>
  );
}
