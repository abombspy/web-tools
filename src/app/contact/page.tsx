import type { Metadata } from "next";
import { CONTACT_EMAIL } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "문의",
};

export default function ContactPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-bold">문의</h1>

      <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
        <p>계산 오류 제보, 새로운 계산기 제안, 광고/제휴 문의는 아래 이메일로 보내주세요.</p>
        <p>
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
        {/* TODO: 문의용 이메일 주소 확정 후 위 mailto 링크 갱신 (site-config.ts의 CONTACT_EMAIL) */}
      </div>
    </div>
  );
}
