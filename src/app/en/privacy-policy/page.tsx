import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME_EN } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicyPageEn() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16">
      <h1 className="text-2xl font-extrabold">Privacy Policy</h1>
      <p className="mt-2 text-sm text-zinc-500">Effective date: 2026-09-01</p>

      <div className="prose prose-zinc mt-8 max-w-none dark:prose-invert">
        <p>
          {SITE_NAME_EN} (the &ldquo;Site&rdquo;) takes your privacy seriously and follows
          applicable data-protection laws, including Korea&rsquo;s Personal Information
          Protection Act. This policy applies whenever you use the calculators on the Site.
        </p>

        <h2>1. Information we collect</h2>
        <p>
          The Site&rsquo;s calculators process the values you enter (hours worked, income
          amounts, etc.) <strong>entirely in your browser</strong> — nothing is sent to or
          stored on a server. The Site does not require sign-up and does not directly collect
          personal identifiers such as your name or email address.
        </p>

        <h2>2. Cookies, advertising, and analytics</h2>
        <p>
          The Site may use cookies for ad serving (Google AdSense) and usage analytics.
          Google and other third-party ad providers may use cookies to serve ads based on your
          interests; you can opt out of personalized ads at{" "}
          <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
            Google Ads Settings
          </a>
          .
        </p>

        <h2>3. Retention</h2>
        <p>
          Since the Site does not store the values you enter, there is no personal information
          to separately retain or use. Any information collected by advertising or analytics
          tools follows that provider&rsquo;s own policy.
        </p>

        <h2>4. Third-party processing</h2>
        <p>
          The Site shares ad-related data with Google AdSense for ad serving purposes.
        </p>

        <h2>5. Your rights</h2>
        <p>
          Because the Site does not store personal information itself, there is no personal
          data to request access to, correct, or delete. To exercise rights related to ad
          personalization, please use the Google Ads Settings page linked above.
        </p>

        <h2>6. Contact</h2>
        <p>
          For questions, please reach out at the email below.
          <br />
          Email: {CONTACT_EMAIL}
        </p>

        <h2>7. Changes</h2>
        <p>
          This policy may be updated to reflect changes in law, policy, or the Site&rsquo;s
          services. Updates will be posted on this page.
        </p>
      </div>
    </div>
  );
}
