import Link from "next/link";
import type { LocalizedCategory } from "@/lib/content/catalog";

export default function CategoryPage({
  category,
  locale = "ko",
}: {
  category: LocalizedCategory;
  locale?: "ko" | "en";
}) {
  const isEnglish = locale === "en";
  const basePath = isEnglish ? `/en/${category.slug}` : `/${category.slug}`;

  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16">
      <div className="mb-2 flex items-center gap-3">
        <span
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-2xl ${category.theme.badgeBg}`}
        >
          {category.icon}
        </span>
        <h1 className="text-2xl font-extrabold">{category.name}</h1>
      </div>
      <p className="mt-2 text-zinc-500">{category.description}</p>

      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {category.tools?.map((tool) =>
          tool.available ? (
            <li key={tool.slug}>
              <Link
                href={`${basePath}/${tool.slug}`}
                className={`flex items-center gap-3 rounded-2xl p-4 transition-transform duration-200 hover:-translate-y-0.5 hover:scale-[1.02] ${category.theme.cardBg}`}
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-2xl">
                  {tool.icon}
                </div>
                <div className="min-w-0 text-left">
                  <div className={`truncate font-bold ${category.theme.titleText}`}>{tool.name}</div>
                  <p className={`truncate text-xs ${category.theme.descText}`}>{tool.tagline}</p>
                </div>
              </Link>
            </li>
          ) : (
            <li
              key={tool.slug}
              className="flex items-center gap-3 rounded-2xl border border-zinc-100 p-4 text-zinc-400 dark:border-white/10"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-zinc-50 text-2xl grayscale dark:bg-zinc-800">
                {tool.icon}
              </div>
              <div className="min-w-0 text-left text-sm">
                {tool.name} <span className="text-xs">{isEnglish ? "(coming soon)" : "(준비 중)"}</span>
              </div>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
