import { BriefcaseBusiness } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  /** Official university logo, when present in /public. */
  universityLogoSrc: string | null;
  className?: string;
}

export function BrandLogo({ universityLogoSrc, className }: BrandLogoProps) {
  return (
    <Link
      href="/#inicio"
      className={cn(
        "flex items-center gap-3 rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50 md:gap-4",
        className,
      )}
    >
      {universityLogoSrc ? (
        <>
          <Image
            src={universityLogoSrc}
            alt="Universidad Nacional del Oeste"
            width={44}
            height={44}
            priority
            className="size-10 md:size-11"
          />
          <span aria-hidden="true" className="h-7 w-px bg-border" />
        </>
      ) : (
        <span
          aria-hidden="true"
          className="grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground"
        >
          <BriefcaseBusiness className="size-[18px]" />
        </span>
      )}
      <span className="text-lg font-semibold tracking-tight text-foreground">
        {siteConfig.name}
      </span>
    </Link>
  );
}
