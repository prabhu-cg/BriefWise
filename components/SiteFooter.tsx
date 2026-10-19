import Link from "next/link";
import { Logo } from "./Logo";

const LINKS = [
  { href: "/refiner", label: "Refiner" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div>
          <Logo />
          <p className="mt-2 text-sm text-ink-muted">
            Turn vague briefs into clear direction.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
            {LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand-strong">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
