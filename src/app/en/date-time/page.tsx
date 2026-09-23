import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { getCategory } from "@/lib/content/catalog";

const category = getCategory("en", "date-time")!;

export const metadata: Metadata = {
  title: category.name,
  description: category.description,
};

export default function DateTimeCategoryPageEn() {
  return <CategoryPage category={category} locale="en" />;
}
