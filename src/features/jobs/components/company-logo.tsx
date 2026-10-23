"use client";

import { Building2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";

import { getInitials } from "../lib/format";

interface CompanyLogoProps {
  company: string | null;
  src: string | null;
  className?: string;
}

/** Company logo with graceful fallbacks: initials, then a generic building icon. */
export function CompanyLogo({ company, src, className }: CompanyLogoProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const showImage = src !== null && src !== failedSrc;
  const initials = company ? getInitials(company) : "";

  return (
    <div
      className={cn(
        "relative grid shrink-0 place-items-center overflow-hidden rounded-xl border bg-card",
        // Logos are designed for light backgrounds; keep them legible in dark mode.
        showImage && "dark:bg-white",
        className,
      )}
    >
      {showImage ? (
        <Image
          src={src}
          alt=""
          fill
          unoptimized
          sizes="80px"
          className="object-contain p-2"
          onError={() => setFailedSrc(src)}
        />
      ) : initials ? (
        <span
          aria-hidden="true"
          className="grid size-full place-items-center bg-tag text-[15px] font-semibold tracking-tight text-tag-foreground md:text-lg"
        >
          {initials}
        </span>
      ) : (
        <Building2 className="size-6 text-muted-foreground" aria-hidden="true" />
      )}
    </div>
  );
}
