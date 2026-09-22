import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "PDF Merge & Split",
  description: "Combine multiple PDFs into one, or extract a page range from a PDF.",
};

export default function PdfToolPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">📑 PDF Merge & Split</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <p>
          Merge several PDF files into one, in the order you pick them, or pull out a specific
          page range from a PDF and save it as a new file.
        </p>
        <p className="rounded-2xl bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          Your PDF is <strong>never uploaded — it&rsquo;s processed entirely in your browser</strong>.
        </p>
      </section>

      <Calculator />

      <section className="mt-10 text-sm text-zinc-600 dark:text-zinc-400">
        <p>
          More tools:{" "}
          <Link href="/en/text-file" className="font-medium text-teal-600 dark:text-teal-400">
            Text & Files
          </Link>
        </p>
      </section>
    </div>
  );
}
