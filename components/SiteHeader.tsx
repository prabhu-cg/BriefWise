"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { buttonPrimary } from "./ui";

export function SiteHeader() {
  const pathname = usePathname();
  const onRefiner = pathname === "/refiner";
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-paper">
      <div className="site-container flex h-16 items-center justify-between">
        <Link href="/" aria-label="BriefWise home" className="rounded-full">
          <Logo />
        </Link>
        <nav aria-label="Main" className="flex items-center gap-2">
          {!onRefiner && (
            <Link href="/refiner" className={`${buttonPrimary} !h-9 !px-5`}>
              Refine a brief
            </Link>
          )}
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
