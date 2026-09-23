import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { getCategory } from "@/lib/content/catalog";

const category = getCategory("en", "parenting-health")!;

export const metadata: Metadata = {
  title: category.name,
  description: category.description,
};

export default function ParentingHealthCategoryPageEn() {
  return <CategoryPage category={category} locale="en" />;
}
