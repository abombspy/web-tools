import type { Metadata } from "next";
import Link from "next/link";
import content from "@content/tools/en/text-file/image-tool.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
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
        {renderBlocks(asBlocks(content))}
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
