"use client";

import Link from "next/link";

import { siteConfig } from "@/config/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/utils";

const SECTION_IDS = siteConfig.nav.map((item) => item.section);

export function useActiveNavSection() {
  return useActiveSection(SECTION_IDS);
}

export function DesktopNav() {
  const active = useActiveNavSection();

  return (
    <nav aria-label="Principal" className="hidden h-full md:block">
      <ul className="flex h-full items-center gap-1">
        {siteConfig.nav.map((item) => {
          const isActive = item.section === active;
          return (
            <li key={item.href} className="h-full">
              <Link
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative flex h-full items-center px-3 text-sm font-medium text-muted-foreground transition-colors outline-none hover:text-foreground",
                  "after:absolute after:inset-x-3 after:bottom-0 after:h-0.5 after:rounded-full after:bg-primary after:opacity-0 after:transition-opacity",
                  "focus-visible:text-foreground focus-visible:underline focus-visible:underline-offset-4",
                  isActive && "text-primary after:opacity-100 hover:text-primary",
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
