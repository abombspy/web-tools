import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Character Counter",
  description: "Count characters (with/without spaces), words, and bytes in real time.",
};

export default function CharacterCountPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🔤 Character Counter</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <p>
          Writing something with a character limit — a cover letter, an essay, a bio? Check your
          character count (with and without spaces) and word count in real time. Your text never
          leaves your browser; nothing is sent to a server.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/text-file" className="font-medium text-teal-600 dark:text-teal-400">
            Text & File Tools
          </Link>
        </p>
      </section>
    </div>
  );
}
