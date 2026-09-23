import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { getCategory } from "@/lib/content/catalog";

const category = getCategory("ko", "fun")!;

export const metadata: Metadata = {
  title: category.name,
  description: category.description,
};

export default function FunCategoryPage() {
  return <CategoryPage category={category} />;
}
