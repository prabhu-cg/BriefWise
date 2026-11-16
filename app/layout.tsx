import type { Metadata } from "next";
import { DM_Sans, Newsreader } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { FeedbackWidget } from "@/components/FeedbackWidget";
import "./globals.css";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  display: "swap",
});

// Applies the saved theme before first paint. Light is the default; there is no "system" option.
const themeScript = `try{if(localStorage.getItem("briefwise.theme")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;

export const metadata: Metadata = {
  title: {
    default: "BriefWise — Turn vague briefs into clear direction",
    template: "%s · BriefWise",
  },
  description:
    "BriefWise turns messy stakeholder requests into structured UX briefs, helping you separate the problem from assumptions and identify what still needs answering.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" suppressHydrationWarning className={`${dmSans.variable} ${newsreader.variable} h-full`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-full flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-brand focus:px-5 focus:py-2.5 focus:font-semibold focus:text-on-brand"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
        <FeedbackWidget />
      </body>
    </html>
  );
}
