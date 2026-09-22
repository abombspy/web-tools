import type { Metadata } from "next";
import Link from "next/link";
import Calculator from "./Calculator";

export const metadata: Metadata = {
  title: "Image Resize & Compress",
  description: "Resize, compress, and convert images between JPEG/PNG/WebP, entirely in your browser.",
};

export default function ImageToolPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">🖼️ Image Resize & Compress</h1>

      <section className="prose prose-zinc mt-6 max-w-none dark:prose-invert">
        <p>
          Set a maximum width/height and a compression quality, and this tool shrinks your image
          while keeping the original aspect ratio, then converts it to JPEG, PNG, or WebP.
        </p>
        <p className="rounded-2xl bg-blue-50 p-4 text-sm not-prose dark:bg-blue-950/40">
          Your image is <strong>never uploaded — it&rsquo;s processed entirely in your browser</strong>.
          Selecting a file doesn&rsquo;t send it anywhere.
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
