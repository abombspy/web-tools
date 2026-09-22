import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "BMI & Calorie Calculator",
  description: "Calculate BMI, basal metabolic rate (BMR), and a daily calorie target for your goal.",
};

export default function BmiCaloriePageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">⚖️ BMI & Calorie Calculator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <h2>BMI thresholds (Korean Society for the Study of Obesity, 2022 guideline)</h2>
        <p>
          The Korean (Asian) thresholds are lower than the WHO&rsquo;s international standard,
          because Asian populations tend to have higher body fat at the same BMI, and health risks
          like diabetes and hypertension rise starting at a lower BMI.
        </p>
        <ul>
          <li>Underweight: below 18.5</li>
          <li>Normal: 18.5–22.9</li>
          <li>Pre-obese (overweight): 23–24.9</li>
          <li>Obese stage 1: 25–29.9</li>
          <li>Obese stage 2 (severe): 30–34.9</li>
          <li>Obese stage 3 (extreme): 35 and above</li>
        </ul>

        <h2>BMR and calorie target</h2>
        <p>
          Basal metabolic rate (BMR) is calculated with the <strong>Mifflin-St Jeor equation</strong>.
          Multiplying by an activity-level factor gives your total daily energy expenditure (TDEE);
          we then suggest a calorie target by subtracting 500 kcal/day for weight loss or adding 500
          kcal/day for weight gain (a common rule of thumb for roughly 0.5kg/week of change).
        </p>

        <p className="rounded-2xl bg-amber-50 p-4 text-sm not-prose dark:bg-amber-950/40">
          This result is for reference only. If you have a medical condition or are pregnant,
          different targets may apply — please consult a healthcare professional.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/parenting-health" className="font-medium text-emerald-600 dark:text-emerald-400">
            Parenting & Health
          </Link>
        </p>
      </section>
    </div>
  );
}
