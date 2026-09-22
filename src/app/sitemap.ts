import type { MetadataRoute } from "next";
import { CATEGORIES_WITH_PAGES, CATEGORIES_WITH_PAGES_EN, SITE_URL } from "@/lib/site-config";

// GitLab Pages 등 정적 호스트 배포(output: "export")에는 요청 시점 렌더링이
// 없으므로, 빌드 시점에 한 번만 생성하도록 명시해야 한다.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/about", "/contact", "/privacy-policy", "/terms"];

  const categoryPaths = CATEGORIES_WITH_PAGES.map((c) => `/${c.slug}`);

  const toolPaths = CATEGORIES_WITH_PAGES.flatMap((c) =>
    (c.tools ?? []).filter((t) => t.available).map((t) => `/${c.slug}/${t.slug}`),
  );

  // 영문판(/en): 법률/세금 카테고리 제외, hasPageEn인 카테고리·nameEn 있는 도구만.
  const enStaticPaths = ["/en", "/en/about", "/en/contact"];

  const enCategoryPaths = CATEGORIES_WITH_PAGES_EN.map((c) => `/en/${c.slug}`);

  const enToolPaths = CATEGORIES_WITH_PAGES_EN.flatMap((c) =>
    (c.tools ?? []).filter((t) => t.available && t.nameEn).map((t) => `/en/${c.slug}/${t.slug}`),
  );

  const allPaths = [
    ...staticPaths,
    ...categoryPaths,
    ...toolPaths,
    ...enStaticPaths,
    ...enCategoryPaths,
    ...enToolPaths,
  ];

  return allPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
