import Link from "next/link";
import { CATEGORIES_WITH_PAGES, SITE_NAME } from "@/lib/site-config";
import HeaderNav from "./HeaderNav";

export default function Header() {
  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-4">
        <Link href="/" className="text-lg font-semibold">
          {SITE_NAME}
        </Link>
        <HeaderNav categories={CATEGORIES_WITH_PAGES} />
      </div>
    </header>
  );
}
