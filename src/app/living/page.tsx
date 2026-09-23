import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { getCategory } from "@/lib/content/catalog";

const category = getCategory("ko", "living")!;

export const metadata: Metadata = {
  title: category.name,
  description: category.description,
};

export default function LivingCategoryPage() {
  return <CategoryPage category={category} />;
}
