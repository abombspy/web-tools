import Link from "next/link";
import { CATEGORIES_WITH_PAGES, SITE_NAME } from "@/lib/site-config";
import HeaderNav from "./HeaderNav";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-100 bg-white/90 backdrop-blur dark:border-white/10 dark:bg-zinc-900/90">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-orange-500">
          <span className="text-2xl">🧮</span> {SITE_NAME}
        </Link>
        <HeaderNav categories={CATEGORIES_WITH_PAGES} />
      </div>
    </header>
  );
}
