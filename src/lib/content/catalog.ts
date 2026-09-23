import categoriesEn from "@content/catalog/categories.en.json";
import categoriesKo from "@content/catalog/categories.ko.json";
import {
  CATEGORIES_WITH_PAGES,
  CATEGORIES_WITH_PAGES_EN,
  type CalculatorCategory,
  type CalculatorTool,
} from "@/lib/site-config";

export type Locale = "ko" | "en";

export type LocalizedTool = CalculatorTool & { name: string; tagline: string };
export type LocalizedCategory = Omit<CalculatorCategory, "tools"> & {
  name: string;
  description: string;
  tools?: LocalizedTool[];
};

type CategoryCatalog = typeof categoriesKo;

function getCatalog(locale: Locale): CategoryCatalog {
  return locale === "en" ? (categoriesEn as CategoryCatalog) : categoriesKo;
}

function requireCategoryText(catalog: CategoryCatalog, locale: Locale, slug: string) {
  const text = (catalog.categories as Record<string, { name: string; description: string }>)[slug];
  if (!text) {
    throw new Error(
      `[content/catalog] categories.${locale}.json is missing an entry for category "${slug}"`,
    );
  }
  return text;
}

function requireToolText(catalog: CategoryCatalog, locale: Locale, categorySlug: string, toolSlug: string) {
  const text = (catalog.tools as Record<string, Record<string, { name: string; tagline: string }>>)[
    categorySlug
  ]?.[toolSlug];
  if (!text) {
    throw new Error(
      `[content/catalog] categories.${locale}.json is missing tool "${categorySlug}/${toolSlug}"`,
    );
  }
  return text;
}

/**
 * 구조 정보(site-config.ts의 CATEGORIES_WITH_PAGES[_EN])와 언어별 표시 텍스트
 * (content/catalog/categories.{locale}.json)를 병합해, 예전에 site-config.ts가
 * 직접 갖고 있던 것과 동일한 모양(name/description/tagline이 채워진 객체)으로 돌려준다.
 * 영문판은 tool.hasPageEn이 true인 도구만 포함(예: text-cleanup 제외).
 */
export function getCategories(locale: Locale): LocalizedCategory[] {
  const catalog = getCatalog(locale);
  const source = locale === "en" ? CATEGORIES_WITH_PAGES_EN : CATEGORIES_WITH_PAGES;

  return source.map((category) => {
    const categoryText = requireCategoryText(catalog, locale, category.slug);
    return {
      ...category,
      name: categoryText.name,
      description: categoryText.description,
      tools: category.tools
        ?.filter((tool) => locale === "ko" || tool.hasPageEn)
        .map((tool) => {
          const toolText = requireToolText(catalog, locale, category.slug, tool.slug);
          return { ...tool, name: toolText.name, tagline: toolText.tagline };
        }),
    };
  });
}

export function getCategory(locale: Locale, slug: string): LocalizedCategory | undefined {
  return getCategories(locale).find((c) => c.slug === slug);
}
