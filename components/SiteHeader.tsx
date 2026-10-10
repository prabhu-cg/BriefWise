"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";

const NAV = [
  { href: "/refiner", label: "Refiner" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" aria-label="BriefWise home" className="rounded-md">
          <Logo />
        </Link>
        <nav aria-label="Main">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => {
              const current = pathname === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={current ? "page" : undefined}
                    className={`inline-block rounded-lg px-3.5 py-2 text-sm font-semibold transition-colors hover:bg-surface ${
                      current ? "bg-surface text-ink-strong" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
