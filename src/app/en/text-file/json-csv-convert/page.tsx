import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "JSON ⇄ CSV Converter",
  description: "Convert between JSON arrays and CSV. Handles quoted fields with commas, newlines, and escaped quotes correctly (RFC 4180).",
};

export default function JsonCsvConvertPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🔄 JSON ⇄ CSV Converter</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <p>
          Convert a JSON array (or a single object) to CSV, or CSV back to a JSON array. Follows
          the RFC 4180 standard, so commas, newlines, and escaped quotes inside quoted fields are
          handled correctly. Everything runs in your browser — nothing is sent to a server.
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
