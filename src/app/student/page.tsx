import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { CATEGORIES } from "@/lib/site-config";

const category = CATEGORIES.find((c) => c.slug === "student")!;

export const metadata: Metadata = {
  title: category.name,
  description: category.description,
};

export default function StudentCategoryPage() {
  return <CategoryPage category={category} />;
}
