import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Nickname Generator",
  description: "One click generates a fun adjective + animal nickname.",
};

export default function NicknameGeneratorPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🐣 Nickname Generator</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <p>Need a game handle or a username? Hit the button for a random combo.</p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/fun" className="font-medium text-violet-600 dark:text-violet-400">
            Fun & Viral
          </Link>
        </p>
      </section>
    </div>
  );
}
