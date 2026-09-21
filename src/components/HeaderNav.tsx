"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CalculatorCategory } from "@/lib/site-config";

// Header는 루트 레이아웃에 있어 페이지 이동 시 다시 마운트되지 않으므로,
// <details>의 열림 상태(open)가 이전 페이지에서 그대로 남아있는 문제가 있었다.
// pathname이 바뀔 때마다 key를 바꿔서 이 서브트리를 통째로 리마운트시켜
// 모든 드롭다운을 닫힌 상태로 되돌린다(커스텀 상태 관리 없이 해결).
export default function HeaderNav({ categories }: { categories: CalculatorCategory[] }) {
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);

  // <details>는 바깥 클릭 시 자동으로 안 닫히므로, nav 바깥 클릭을 감지해서
  // 열려 있는 드롭다운을 전부 닫는다.
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
    <nav
      key={pathname}
      ref={navRef}
      className="flex flex-wrap items-center gap-4 text-sm text-zinc-600 dark:text-zinc-400"
    >
      {categories.map((c) => (
        <details key={c.slug} name="header-nav" className="group relative">
          <summary className="cursor-pointer list-none rounded px-1 py-1 font-medium hover:text-orange-500">
            {c.name}
          </summary>
          <div className="absolute left-0 z-10 mt-2 w-64 rounded-2xl border border-zinc-100 bg-white p-2 shadow-xl dark:border-white/10 dark:bg-zinc-900">
            <Link
              href={`/${c.slug}`}
              className="block rounded-xl px-3 py-2 text-xs font-semibold text-zinc-500 hover:bg-zinc-50 dark:text-zinc-400 dark:hover:bg-white/10"
            >
              {c.name} 전체 보기
            </Link>
            {c.tools
              ?.filter((tool) => tool.available)
              .map((tool) => (
                <Link
                  key={tool.slug}
                  href={`/${c.slug}/${tool.slug}`}
                  className="block rounded-xl px-3 py-2 text-zinc-700 hover:bg-zinc-50 dark:text-zinc-300 dark:hover:bg-white/10"
                >
                  {tool.icon} {tool.name}
                </Link>
              ))}
          </div>
        </details>
      ))}
      <Link href="/about" className="rounded px-1 py-1 font-medium hover:text-orange-500">
        소개
      </Link>
      <Link href="/contact" className="rounded px-1 py-1 font-medium hover:text-orange-500">
        문의
      </Link>
    </nav>
  );
}
