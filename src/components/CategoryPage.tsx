import Link from "next/link";
import type { CalculatorCategory } from "@/lib/site-config";

export default function CategoryPage({ category }: { category: CalculatorCategory }) {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16">
      <h1 className="text-2xl font-bold">{category.name}</h1>
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">{category.description}</p>

      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {category.tools?.map((tool) =>
          tool.available ? (
            <li key={tool.slug}>
              <Link
                href={`/${category.slug}/${tool.slug}`}
                className="block rounded-lg border border-black/10 p-4 text-sm font-medium text-blue-600 hover:border-blue-400 dark:border-white/10 dark:text-blue-400"
              >
                {tool.name}
              </Link>
            </li>
          ) : (
            <li
              key={tool.slug}
              className="rounded-lg border border-black/10 p-4 text-sm text-zinc-500 dark:border-white/10 dark:text-zinc-400"
            >
              {tool.name} <span className="text-xs">(준비 중)</span>
            </li>
          ),
        )}
      </ul>
    </div>
  );
}
