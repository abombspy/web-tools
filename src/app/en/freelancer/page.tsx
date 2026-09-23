import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { getCategory } from "@/lib/content/catalog";

const category = getCategory("en", "freelancer")!;

export const metadata: Metadata = {
  title: category.name,
  description: category.description,
};

export default function FreelancerCategoryPageEn() {
  return <CategoryPage category={category} locale="en" />;
}
