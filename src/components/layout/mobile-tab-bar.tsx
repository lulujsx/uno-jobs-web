"use client";

import { Ellipsis, House, Search, SlidersHorizontal, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

import { useMobileUi } from "@/components/providers";
import { cn } from "@/lib/utils";

import { useActiveNavSection } from "./site-nav";

function TabContent({ icon: Icon, label, active }: { icon: LucideIcon; label: string; active?: boolean }) {
  return (
    <>
      <Icon className="size-[22px]" strokeWidth={active ? 2.25 : 1.75} aria-hidden="true" />
      <span>{label}</span>
    </>
  );
}

function tabClassName(active = false) {
  return cn(
    "flex h-full w-full flex-col items-center justify-center gap-1 rounded-xl text-[11px] font-medium outline-none transition-colors focus-visible:ring-3 focus-visible:ring-ring/50",
    active ? "text-primary" : "text-muted-foreground hover:text-foreground",
  );
}

function Tab({ children }: { children: ReactNode }) {
  return <li className="flex-1">{children}</li>;
}

/** App-style bottom navigation for small screens, as in the mobile mockup. */
export function MobileTabBar() {
  const { setFiltersOpen, setMenuOpen } = useMobileUi();
  const active = useActiveNavSection();

  return (
    <nav
      aria-label="Accesos rápidos"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border/70 bg-background/90 pb-[env(safe-area-inset-bottom)] backdrop-blur-md md:hidden"
    >
      <ul className="mx-auto flex h-16 max-w-md items-stretch px-2 py-1.5">
        <Tab>
          <Link
            href="/#inicio"
            aria-current={active === "inicio" ? "location" : undefined}
            className={tabClassName(active === "inicio")}
          >
            <TabContent icon={House} label="Inicio" active={active === "inicio"} />
          </Link>
        </Tab>
        <Tab>
          <Link
            href="/#ofertas"
            aria-current={active === "ofertas" ? "location" : undefined}
            className={tabClassName(active === "ofertas")}
          >
            <TabContent icon={Search} label="Ofertas" active={active === "ofertas"} />
          </Link>
        </Tab>
        <Tab>
          <button type="button" onClick={() => setFiltersOpen(true)} className={tabClassName()}>
            <TabContent icon={SlidersHorizontal} label="Filtros" />
          </button>
        </Tab>
        <Tab>
          <button type="button" onClick={() => setMenuOpen(true)} className={tabClassName()}>
            <TabContent icon={Ellipsis} label="Más" />
          </button>
        </Tab>
      </ul>
    </nav>
  );
}
