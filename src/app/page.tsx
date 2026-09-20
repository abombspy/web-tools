import Link from "next/link";
import { CATEGORIES, SITE_DESCRIPTION, SITE_NAME } from "@/lib/site-config";

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16">
      <section className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight">{SITE_NAME}</h1>
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          {SITE_DESCRIPTION}
        </p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold">카테고리</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {CATEGORIES.map((category) => (
            <div
              key={category.slug}
              className="rounded-lg border border-black/10 p-5 dark:border-white/10"
            >
              <div className="mb-1 flex items-center justify-between">
                <h3 className="font-semibold">{category.name}</h3>
                {!category.hasPage && (
                  <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                    준비 중
                  </span>
                )}
              </div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {category.description}
              </p>
              {category.hasPage && (
                <Link
                  href={`/${category.slug}`}
                  className="mt-3 inline-block text-sm font-medium text-blue-600 dark:text-blue-400"
                >
                  둘러보기 →
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
