import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">Contact</h1>

      <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
        <p>
          Found a calculation error, have a tool idea, or want to talk advertising/partnership?
          Email us below.
        </p>
        <p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </div>
    </div>
  );
}
