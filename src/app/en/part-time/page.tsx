import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { CATEGORIES } from "@/lib/site-config";

const category = CATEGORIES.find((c) => c.slug === "part-time")!;

export const metadata: Metadata = {
  title: category.nameEn,
  description: category.descriptionEn,
};

export default function PartTimeCategoryPageEn() {
  return <CategoryPage category={category} locale="en" />;
}
