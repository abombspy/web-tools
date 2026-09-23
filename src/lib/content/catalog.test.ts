import { describe, expect, it } from "vitest";
import categoriesEn from "@content/catalog/categories.en.json";
import categoriesKo from "@content/catalog/categories.ko.json";
import { CATEGORIES } from "@/lib/site-config";
import { getCategories, getCategory } from "./catalog";

describe("catalog content integrity", () => {
  it("has a Korean catalog entry for every category and every tool", () => {
    for (const category of CATEGORIES) {
      expect(
        categoriesKo.categories[category.slug as keyof typeof categoriesKo.categories],
        `missing KO category text for "${category.slug}"`,
      ).toBeDefined();
      for (const tool of category.tools ?? []) {
        const toolsForCategory = categoriesKo.tools[category.slug as keyof typeof categoriesKo.tools] as
          | Record<string, unknown>
          | undefined;
        expect(toolsForCategory?.[tool.slug], `missing KO tool text for "${category.slug}/${tool.slug}"`).toBeDefined();
      }
    }
  });

  it("hasPageEn flags match EN catalog presence exactly (both directions)", () => {
    for (const category of CATEGORIES) {
      const enCategoryText =
        categoriesEn.categories[category.slug as keyof typeof categoriesEn.categories];
      expect(!!category.hasPageEn, `category "${category.slug}" hasPageEn`).toBe(!!enCategoryText);

      if (!category.hasPageEn) continue;

      for (const tool of category.tools ?? []) {
        const toolsForCategory = categoriesEn.tools[category.slug as keyof typeof categoriesEn.tools] as
          | Record<string, unknown>
          | undefined;
        const enToolText = toolsForCategory?.[tool.slug];
        expect(!!tool.hasPageEn, `tool "${category.slug}/${tool.slug}" hasPageEn`).toBe(!!enToolText);
      }
    }
  });

  it("getCategories('ko') resolves every category/tool without throwing", () => {
    const categories = getCategories("ko");
    expect(categories.length).toBe(CATEGORIES.filter((c) => c.hasPage).length);
    for (const c of categories) {
      expect(c.name).toBeTruthy();
      expect(c.description).toBeTruthy();
      for (const t of c.tools ?? []) {
        expect(t.name).toBeTruthy();
        expect(t.tagline).toBeTruthy();
      }
    }
  });

  it("getCategories('en') resolves every hasPageEn category/tool without throwing", () => {
    const categories = getCategories("en");
    for (const c of categories) {
      expect(c.name).toBeTruthy();
      expect(c.description).toBeTruthy();
      for (const t of c.tools ?? []) {
        expect(t.hasPageEn).toBe(true);
        expect(t.name).toBeTruthy();
        expect(t.tagline).toBeTruthy();
      }
    }
  });

  it("excludes text-cleanup from the English text-file category (no English page)", () => {
    const textFileEn = getCategory("en", "text-file");
    expect(textFileEn?.tools?.some((t) => t.slug === "text-cleanup")).toBe(false);
    const textFileKo = getCategory("ko", "text-file");
    expect(textFileKo?.tools?.some((t) => t.slug === "text-cleanup")).toBe(true);
  });
});
