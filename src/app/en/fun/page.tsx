import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { getCategory } from "@/lib/content/catalog";

const category = getCategory("en", "fun")!;

export const metadata: Metadata = {
  title: category.name,
  description: category.description,
};

export default function FunCategoryPageEn() {
  return <CategoryPage category={category} locale="en" />;
}
