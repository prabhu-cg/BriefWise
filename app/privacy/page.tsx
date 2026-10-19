import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How BriefWise collects, uses and protects information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="19 October 2026">
      <h2>The short version</h2>
      <p>
        BriefWise has no accounts and stores nothing about you on a server. Your
        draft and working brief stay in your browser. Your text leaves your
        device only when you choose to refine it, and it is sent to an AI
        service for that one request. We don’t sell personal information and we
        don’t run ad trackers.
      </p>

      <h2>What we handle</h2>
      <ul>
        <li>
          The text you submit to the Refiner, and the brief generated from it.
        </li>
        <li>
          Your IP address, which is read to apply a short-lived usage limit to
          the refine request.
        </li>
        <li>
          Basic technical information, such as request timestamps and error
          categories, needed to operate and secure the service.
        </li>
      </ul>

      <h2>What stays in your browser</h2>
      <p>
        So you don’t lose your work, BriefWise saves your draft and working
        brief in this browser’s local storage. It is never sent to us unless you
        refine it. You can remove it at any time with Start a new brief, or by
        clearing your site data.
      </p>

      <h2>How your text is used</h2>
      <p>
        When you refine, your text is sent from our server to a third-party AI
        provider, which returns the structured brief. We use it only to produce
        that result. BriefWise does not log or store the text you submit or the
        brief returned. When a failure occurs we record only its category, never
        your content. We do not use your content to train models or to
        advertise to you. Please avoid submitting sensitive personal data or
        material you aren’t permitted to share.
      </p>

      <h2>Feedback</h2>
      <p>
        If you send feedback, the message you write is posted as an issue in
        BriefWise’s public GitHub repository and is visible to anyone. We don’t
        collect your name or email with it. Please don’t include personal or
        confidential details.
      </p>

      <h2>Cookies and tracking</h2>
      <p>
        BriefWise sets no cookies of its own and uses no advertising pixels,
        third-party trackers or session-recording scripts.
      </p>

      <h2>Subprocessors</h2>
      <p>
        BriefWise is hosted on Vercel, feedback is stored on GitHub, and the AI provider that processes your
        text for a refine request is configured by the operator, for example via
        the Vercel AI Gateway or Groq. These providers handle data on our behalf
        and are bound by their own data processing terms and retention
        practices.
      </p>

      <h2>Retention and your rights</h2>
      <p>
        Because BriefWise keeps no account data or copy of your briefs on its
        servers, there is nothing for us to export or delete on your behalf.
        Your saved work is under your control in your browser. The IP-based
        usage counter is held in memory only and expires within minutes.
      </p>

      <h2>Children</h2>
      <p>
        BriefWise is a professional tool and isn’t directed at children. We
        don’t knowingly collect information from anyone under 16.
      </p>

      <h2>Changes</h2>
      <p>
        If this policy changes, the date at the top of this page will be
        updated. Use of the service is also covered by the{" "}
        <a href="/terms">Terms of Service</a>.
      </p>
    </LegalPage>
  );
}
