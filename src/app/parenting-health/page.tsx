import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { getCategory } from "@/lib/content/catalog";

const category = getCategory("ko", "parenting-health")!;

export const metadata: Metadata = {
  title: category.name,
  description: category.description,
};

export default function ParentingHealthCategoryPage() {
  return <CategoryPage category={category} />;
}
