import type { Metadata } from "next";
import content from "@content/pages/ko/privacy-policy.json";
import { renderBlocks } from "@/lib/content/renderBlocks";
import { asBlocks } from "@/lib/content/types";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "개인정보처리방침",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">개인정보처리방침</h1>
      <p className="mt-2 text-sm text-zinc-500">시행일: 2026-09-01</p>

      <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
        {renderBlocks(asBlocks(content), { siteName: SITE_NAME, email: CONTACT_EMAIL })}
      </div>
    </div>
  );
}
