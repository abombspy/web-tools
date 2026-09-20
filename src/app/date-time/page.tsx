import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { CATEGORIES } from "@/lib/site-config";

const category = CATEGORIES.find((c) => c.slug === "date-time")!;

export const metadata: Metadata = {
  title: category.name,
  description: category.description,
};

export default function DateTimeCategoryPage() {
  return <CategoryPage category={category} />;
}
