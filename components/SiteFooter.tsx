import Link from "next/link";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "https://github.com/prabhu-cg/BriefWise", label: "GitHub", external: true },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-paper">
      <div className="site-container flex flex-col gap-6 py-10 md:flex-row md:items-center md:justify-between">
        <Link href="/" aria-label="BriefWise home" className="rounded-full">
          <Logo />
        </Link>
        <p className="text-sm text-ink-muted">© 2026 BriefWise. Turn vague briefs into clear direction.</p>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-ink">
            {LINKS.map((link) => (
              <li key={link.href}>
                {link.external ? (
                  <a href={link.href} rel="noopener" className="hover:text-ink-strong hover:underline underline-offset-4">
                    {link.label}
                  </a>
                ) : (
                  <Link href={link.href} className="hover:text-ink-strong hover:underline underline-offset-4">
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
