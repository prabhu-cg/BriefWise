import Link from "next/link";
import { Logo } from "./Logo";

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
        <ul className="flex gap-6 text-sm font-semibold">
          <li>
            <Link href="/refiner" className="hover:text-brand-strong">
              Refiner
            </Link>
          </li>
          <li>
            <Link href="/about" className="hover:text-brand-strong">
              About
            </Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}
