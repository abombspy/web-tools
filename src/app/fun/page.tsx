import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { CATEGORIES } from "@/lib/site-config";

const category = CATEGORIES.find((c) => c.slug === "fun")!;

export const metadata: Metadata = {
  title: category.name,
  description: category.description,
};

export default function FunCategoryPage() {
  return <CategoryPage category={category} />;
}
