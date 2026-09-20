import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { CATEGORIES } from "@/lib/site-config";

const category = CATEGORIES.find((c) => c.slug === "text-file")!;

export const metadata: Metadata = {
  title: category.name,
  description: category.description,
};

export default function TextFileCategoryPage() {
  return <CategoryPage category={category} />;
}
