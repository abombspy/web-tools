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

      <div className="space-y-10">
        {CATEGORIES.map((category) => (
          <section key={category.slug}>
            <div className="mb-1 flex items-center gap-2">
              {category.hasPage ? (
                <Link href={`/${category.slug}`} className="text-lg font-semibold hover:underline">
                  {category.name}
                </Link>
              ) : (
                <h2 className="text-lg font-semibold">{category.name}</h2>
              )}
              {!category.hasPage && (
                <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                  준비 중
                </span>
              )}
            </div>
            <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">{category.description}</p>
            {category.hasPage && (
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {category.tools
                  ?.filter((tool) => tool.available)
                  .map((tool) => (
                    <li key={tool.slug}>
                      <Link
                        href={`/${category.slug}/${tool.slug}`}
                        className="block rounded-lg border border-black/10 p-4 text-sm font-medium text-blue-600 hover:border-blue-400 dark:border-white/10 dark:text-blue-400"
                      >
                        {tool.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
          </section>
        ))}
      </div>
    </div>
  );
}
