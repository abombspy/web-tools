import type { MetadataRoute } from "next";
import { CATEGORIES_WITH_PAGES, SITE_URL } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ["", "/about", "/contact", "/privacy-policy", "/terms"];

  const categoryPaths = CATEGORIES_WITH_PAGES.map((c) => `/${c.slug}`);

  const toolPaths = CATEGORIES_WITH_PAGES.flatMap((c) =>
    (c.tools ?? []).filter((t) => t.available).map((t) => `/${c.slug}/${t.slug}`),
  );

  const allPaths = [...staticPaths, ...categoryPaths, ...toolPaths];

  return allPaths.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
  }));
}
