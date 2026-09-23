import Link from "next/link";
import { getCategories } from "@/lib/content/catalog";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site-config";

export default function Home() {
  const categories = getCategories("ko");

  return (
    <div className="mx-auto w-full max-w-5xl px-4">
      <section className="py-14 text-center sm:py-16">
        <div className="mb-4 text-6xl">🧮💛</div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          복잡한 계산, <span className="text-orange-500">{SITE_NAME}</span>가 대신 해드릴게요!
        </h1>
        <p className="mt-4 text-base text-zinc-500 sm:text-lg">{SITE_DESCRIPTION}</p>
      </section>

      <div className="space-y-12 pb-20">
        {categories.map((category) => (
          <section key={category.slug}>
            <div className="mb-4 flex items-center gap-3">
              <span
                className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-2xl ${category.theme.badgeBg}`}
              >
                {category.icon}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <Link href={`/${category.slug}`} className="text-lg font-extrabold hover:underline">
                    {category.name}
                  </Link>
                </div>
                <p className="text-sm text-zinc-500">{category.description}</p>
              </div>
            </div>
            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {category.tools
                ?.filter((tool) => tool.available)
                .map((tool) => (
                  <li key={tool.slug}>
                    <Link
                      href={`/${category.slug}/${tool.slug}`}
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
                ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
