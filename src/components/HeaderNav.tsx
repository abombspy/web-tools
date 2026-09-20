"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { CalculatorCategory } from "@/lib/site-config";

// Header는 루트 레이아웃에 있어 페이지 이동 시 다시 마운트되지 않으므로,
// <details>의 열림 상태(open)가 이전 페이지에서 그대로 남아있는 문제가 있었다.
// pathname이 바뀔 때마다 key를 바꿔서 이 서브트리를 통째로 리마운트시켜
// 모든 드롭다운을 닫힌 상태로 되돌린다(커스텀 상태 관리 없이 해결).
export default function HeaderNav({ categories }: { categories: CalculatorCategory[] }) {
  const pathname = usePathname();

  return (
    <nav key={pathname} className="flex flex-wrap items-center gap-1 text-sm text-zinc-600 dark:text-zinc-400">
      {categories.map((c) => (
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
  );
}
