import { siteConfig } from "@/config/site";
import { findPublicAsset } from "@/lib/public-assets";

import { BrandLogo } from "./brand-logo";
import { HeaderSearchButton } from "./header-search-button";
import { MobileMenuButton, MobileNav } from "./mobile-nav";
import { DesktopNav } from "./site-nav";
import { ThemeToggle } from "./theme-toggle";

export function SiteHeader() {
  const universityLogoSrc = findPublicAsset(siteConfig.assets.universityLogo);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/85 backdrop-blur-md supports-backdrop-filter:bg-background/75">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center gap-6 px-4 md:h-[72px] md:px-8">
        <BrandLogo universityLogoSrc={universityLogoSrc} />
        <div className="ml-4 hidden h-full md:block">
          <DesktopNav />
        </div>
        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle className="hidden md:inline-flex" />
          <HeaderSearchButton />
          <MobileMenuButton />
        </div>
      </div>
      <MobileNav />
    </header>
  );
}
