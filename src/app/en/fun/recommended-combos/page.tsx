import type { Metadata } from "next";
import Link from "next/link";
import ShareButtons from "@/components/ShareButtons";

export const metadata: Metadata = {
  title: "Recommended Combos",
  description: "Tool combos that go well together for common situations.",
};

const COMBOS = [
  {
    title: "Just moved (or moving) in Korea",
    description: "Sort out your new place with these three.",
    links: [
      { name: "Moving Cost Estimator", href: "/en/living/moving-cost-estimate" },
      { name: "Electricity Bill Calculator", href: "/en/living/electricity-bill" },
      { name: "Loan Repayment Calculator", href: "/en/living/loan-repayment" },
    ],
  },
  {
    title: "Baby on the way",
    description: "From due date to feeding schedule.",
    links: [
      { name: "Due Date Calculator", href: "/en/parenting-health/due-date" },
      { name: "Baby Growth Percentile Calculator", href: "/en/parenting-health/baby-growth-percentile" },
      { name: "Baby Food Portion Guide", href: "/en/parenting-health/baby-food-portion" },
    ],
  },
  {
    title: "Studying in Korea",
    description: "Grades, GPA, and score conversions in one place.",
    links: [
      { name: "Korean School Grade Converter", href: "/en/student/grade-conversion" },
      { name: "GPA Calculator", href: "/en/student/gpa" },
      { name: "TOEIC/OPIc Score Conversion Table", href: "/en/student/toeic-opic-conversion" },
    ],
  },
  {
    title: "Handy file tools",
    description: "For everyday text, image, and document tasks.",
    links: [
      { name: "Character Counter", href: "/en/text-file/character-count" },
      { name: "Image Resize & Compress", href: "/en/text-file/image-tool" },
      { name: "PDF Merge & Split", href: "/en/text-file/pdf-tool" },
      { name: "QR Code Generator", href: "/en/text-file/qr-code" },
    ],
  },
  {
    title: "Just for fun with friends",
    description: "Icebreakers and games for a group hangout.",
    links: [
      { name: "MBTI Personality Test", href: "/en/fun/mbti-test" },
      { name: "Name & MBTI Compatibility Test", href: "/en/fun/name-compatibility" },
      { name: "Lunch Menu Roulette", href: "/en/fun/lunch-roulette" },
      { name: "Random Picker & Ladder Game", href: "/en/fun/random-picker" },
    ],
  },
];

export default function RecommendedCombosPageEn() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">✨ Recommended Combos</h1>
      <ShareButtons />
      <p className="mt-2 text-zinc-600 dark:text-zinc-400">
        Tool combos that go well together for common situations.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {COMBOS.map((combo) => (
          <div
            key={combo.title}
            className="rounded-2xl border-2 border-violet-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-zinc-900"
          >
            <h2 className="font-semibold">{combo.title}</h2>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">{combo.description}</p>
            <ul className="mt-3 space-y-1">
              {combo.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-violet-600 hover:underline dark:text-violet-400"
                  >
                    {link.name} →
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          Browse everything by category on the{" "}
          <Link href="/en" className="font-medium text-violet-600 dark:text-violet-400">
            home page
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
