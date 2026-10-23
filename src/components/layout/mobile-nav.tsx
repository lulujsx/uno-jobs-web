"use client";

import { ChevronRight, Menu } from "lucide-react";
import Link from "next/link";

import { GitHubIcon, TelegramIcon } from "@/components/icons";
import { useMobileUi } from "@/components/providers";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";

import { ThemeToggle } from "./theme-toggle";

export function MobileMenuButton() {
  const { setMenuOpen } = useMobileUi();

  return (
    <Button
      variant="secondary"
      size="icon"
      className="size-10 rounded-full md:hidden"
      onClick={() => setMenuOpen(true)}
      aria-label="Abrir menú"
    >
      <Menu className="size-5" />
    </Button>
  );
}

/** Mobile menu sheet, opened from the header button or the tab bar. */
export function MobileNav() {
  const { menuOpen, setMenuOpen } = useMobileUi();
  const close = () => setMenuOpen(false);

  return (
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetContent side="right" className="w-[86%] gap-0 sm:max-w-sm">
        <SheetHeader className="border-b px-5 py-4">
          <SheetTitle className="text-base font-semibold">{siteConfig.name}</SheetTitle>
          <SheetDescription>Pasantías y empleos junior en tecnología.</SheetDescription>
        </SheetHeader>

        <nav aria-label="Principal (móvil)" className="px-3 py-3">
          <ul className="flex flex-col">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={close}
                  className="flex items-center justify-between rounded-lg px-3 py-3 text-[15px] font-medium outline-none hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50"
                >
                  {item.label}
                  <ChevronRight className="size-4 text-muted-foreground" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto border-t px-5 py-4">
          <ul className="flex flex-col gap-1 text-sm">
            <li>
              <a
                href={siteConfig.links.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg py-2 text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <TelegramIcon className="size-4" />
                Grupo de Telegram
              </a>
            </li>
            <li>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg py-2 text-muted-foreground outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <GitHubIcon className="size-4" />
                Código en GitHub
              </a>
            </li>
          </ul>
          <div className="mt-3 flex items-center justify-between border-t pt-3 text-sm text-muted-foreground">
            Apariencia
            <ThemeToggle />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
