"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCategories } from "@/lib/content/catalog";
import { getChrome } from "@/lib/content/chrome";
import { SITE_NAME, SITE_NAME_EN, getLanguageSwitchHref } from "@/lib/site-config";

// Header는 루트 레이아웃에 있어 페이지 이동 시 다시 마운트되지 않으므로,
// <details>의 열림 상태(open)가 이전 페이지에서 그대로 남아있는 문제가 있었다.
// pathname이 바뀔 때마다 key를 바꿔서 이 서브트리를 통째로 리마운트시켜
// 모든 드롭다운을 닫힌 상태로 되돌린다(커스텀 상태 관리 없이 해결). 모바일 메뉴
// 열림 상태(mobileOpen)도 같은 이유로 pathname이 바뀌면 명시적으로 닫는다.
//
// /en 정적 내보내기(output: export)라 서버에서 요청 경로를 알 수 없어, 언어별로
// 완전히 다른 레이아웃 트리(route group)를 만드는 대신 이 컴포넌트를 클라이언트
// 컴포넌트로 만들어 usePathname()으로 /en 여부를 판단한다.
//
// 데스크톱(md 이상)에서는 카테고리 8개를 <details> 드롭다운으로 한 줄에 펼치고,
// 모바일에서는 그 8개가 줄바꿈되며 지저분해지는 문제가 있어 햄버거 버튼 + 아코디언
// 패널로 된 별도의 모바일 전용 메뉴로 대체한다(md 미만에서만 렌더링).
export default function Header() {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lastPathname, setLastPathname] = useState(pathname);
  const isEnglish = pathname.startsWith("/en");
  const categories = getCategories(isEnglish ? "en" : "ko");
  const chrome = getChrome(isEnglish ? "en" : "ko");
  const homeHref = isEnglish ? "/en" : "/";

  // 페이지 이동 시 모바일 메뉴를 닫는다. 렌더 도중 상태를 갱신하는 방식(React의
  // "prop이 바뀌면 상태를 조정" 패턴)을 써서, effect 안에서 setState를 호출할 때
  // 생기는 불필요한 추가 렌더링을 피한다.
  if (pathname !== lastPathname) {
    setLastPathname(pathname);
    setMobileOpen(false);
  }

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!navRef.current || navRef.current.contains(event.target as Node)) return;
      navRef.current.querySelectorAll("details[open]").forEach((el) => {
        (el as HTMLDetailsElement).open = false;
      });
    }
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-zinc-900/90">
      <div className="mx-auto flex max-w-5xl flex-nowrap items-center justify-between gap-3 px-4 py-4">
        <div className="flex shrink-0 items-center gap-3">
          <Link
            href={homeHref}
            className="flex items-center gap-2 text-xl font-extrabold text-orange-500"
          >
            <span className="text-2xl">🧮</span> {isEnglish ? SITE_NAME_EN : SITE_NAME}
          </Link>
          <Link
            href={getLanguageSwitchHref(pathname)}
            className="shrink-0 rounded-full border border-zinc-200 px-2 py-1 text-xs font-semibold text-zinc-500 hover:border-orange-300 hover:text-orange-500 dark:border-white/10"
          >
            {chrome.languageSwitchLabel}
          </Link>
        </div>

        <nav
          key={pathname}
          ref={navRef}
          className="hidden min-w-0 flex-1 flex-wrap items-center justify-end gap-x-3 gap-y-2 text-sm text-zinc-600 md:flex dark:text-zinc-400"
        >
          {categories.map((c) => (
            <details key={c.slug} name="header-nav" className="group relative">
              <summary className="cursor-pointer list-none rounded px-1 py-1 font-medium hover:text-orange-500">
                {c.name}
              </summary>
              <div className="absolute right-0 z-10 mt-2 w-64 rounded-2xl border border-zinc-100 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-zinc-900">
                <Link
                  href={isEnglish ? `/en/${c.slug}` : `/${c.slug}`}
                  className="block rounded-xl px-3 py-2 text-xs font-semibold text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-white/10"
                >
                  {chrome.categoryViewAllTemplate.replace("{name}", c.name)}
                </Link>
                {c.tools
                  ?.filter((tool) => tool.available)
                  .map((tool) => (
                    <Link
                      key={tool.slug}
                      href={isEnglish ? `/en/${c.slug}/${tool.slug}` : `/${c.slug}/${tool.slug}`}
                      className="block rounded-xl px-3 py-2 text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-white/10"
                    >
                      {tool.icon} {tool.name}
                    </Link>
                  ))}
              </div>
            </details>
          ))}
        </nav>

        <button
          type="button"
          className="flex shrink-0 items-center justify-center rounded-full border border-zinc-200 p-2 text-lg text-zinc-600 md:hidden dark:border-white/10 dark:text-zinc-400"
          aria-label={mobileOpen ? chrome.menuCloseLabel : chrome.menuOpenLabel}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <nav className="max-h-[calc(100vh-4rem)] overflow-y-auto border-t border-zinc-100 text-sm text-zinc-600 md:hidden dark:border-white/10 dark:text-zinc-400">
          {categories.map((c) => (
            <details key={c.slug} className="group border-b border-zinc-100 dark:border-white/10">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 font-medium hover:text-orange-500">
                {c.name}
                <span className="text-xs text-zinc-400 group-open:rotate-180">▾</span>
              </summary>
              <div className="bg-zinc-50 pb-2 dark:bg-white/5">
                <Link
                  href={isEnglish ? `/en/${c.slug}` : `/${c.slug}`}
                  className="block px-6 py-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400"
                >
                  {chrome.categoryViewAllTemplate.replace("{name}", c.name)}
                </Link>
                {c.tools
                  ?.filter((tool) => tool.available)
                  .map((tool) => (
                    <Link
                      key={tool.slug}
                      href={isEnglish ? `/en/${c.slug}/${tool.slug}` : `/${c.slug}/${tool.slug}`}
                      className="block px-6 py-2 text-zinc-700 dark:text-zinc-300"
                    >
                      {tool.icon} {tool.name}
                    </Link>
                  ))}
              </div>
            </details>
          ))}
        </nav>
      )}
    </header>
  );
}
