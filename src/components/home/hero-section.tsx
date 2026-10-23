import { UsersRound } from "lucide-react";
import Image from "next/image";

import { siteConfig } from "@/config/site";
import { findPublicAsset } from "@/lib/public-assets";

/**
 * Neutral architectural composition used until a real campus photo is added
 * at one of `siteConfig.assets.campusImage`. Intentionally abstract: it should
 * not read as a photo of the university.
 */
function CampusPlaceholder() {
  return (
    <svg
      viewBox="0 0 640 320"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="size-full"
    >
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" className="[stop-color:var(--tag)]" />
          <stop offset="1" className="[stop-color:var(--surface)]" />
        </linearGradient>
        <pattern id="hero-windows" width="22" height="26" patternUnits="userSpaceOnUse">
          <rect x="3" y="4" width="14" height="18" rx="1.5" className="fill-primary/14" />
        </pattern>
        <pattern id="hero-panels" width="80" height="34" patternUnits="userSpaceOnUse">
          <path d="M0 33.5H80M79.5 0V34" className="stroke-foreground/6" fill="none" />
        </pattern>
      </defs>
      <rect width="640" height="320" fill="url(#hero-sky)" />
      {/* Side volume with window grid */}
      <path d="M150 118 L330 64 V320 H150 Z" className="fill-primary/8" />
      <path d="M150 118 L330 64 V320 H150 Z" fill="url(#hero-windows)" />
      {/* Front volume, plain concrete panels */}
      <path d="M330 64 L640 92 V320 H330 Z" className="fill-foreground/7" />
      <path d="M330 64 L640 92 V320 H330 Z" fill="url(#hero-panels)" />
      <path d="M330 64 V320" className="stroke-foreground/10" strokeWidth="1.5" />
      {/* Canopy and ground */}
      <circle cx="120" cy="268" r="58" className="fill-primary/10" />
      <circle cx="176" cy="292" r="40" className="fill-primary/12" />
      <rect y="300" width="640" height="20" className="fill-foreground/5" />
    </svg>
  );
}

export function HeroSection() {
  const campusImage = findPublicAsset(siteConfig.assets.campusImage);
  const memberCount = siteConfig.telegramMemberCount;

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative">
      <div className="mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="relative">
          <div className="pointer-events-none absolute top-0 right-0 -bottom-7 hidden w-[52%] lg:block">
            <div className="absolute inset-0 overflow-hidden rounded-b-[1.75rem] mask-[linear-gradient(to_right,transparent,black_30%)]">
              {campusImage ? (
                <Image
                  src={campusImage}
                  alt="Edificio de la Universidad Nacional del Oeste"
                  fill
                  priority
                  sizes="(min-width: 1024px) 640px, 0px"
                  className="object-cover object-[50%_55%]"
                />
              ) : (
                <CampusPlaceholder />
              )}
            </div>
            <a
              href={siteConfig.links.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="pointer-events-auto absolute top-5 right-5 flex items-center gap-3 rounded-2xl border border-white/60 bg-background/85 px-4 py-3 shadow-float backdrop-blur-md outline-none transition-colors hover:bg-background focus-visible:ring-3 focus-visible:ring-ring/50 dark:border-border"
            >
              <UsersRound className="size-5 text-foreground" aria-hidden="true" />
              <span className="flex flex-col text-[13px] leading-tight">
                <span className="font-medium text-foreground">
                  {memberCount ? `${memberCount.toLocaleString("es-AR")} miembros` : "Comunidad UNO"}
                </span>
                <span className="text-muted-foreground">en el grupo de Telegram</span>
              </span>
            </a>
          </div>

          <div className="relative max-w-[600px] pt-8 pb-6 md:pt-14 md:pb-8 lg:pt-12 lg:pb-12">
            <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground">
              TU CARRERA EMPIEZA ACÁ
            </p>
            <h1
              id="hero-title"
              className="mt-3 text-[2rem] leading-[1.08] font-semibold tracking-[-0.03em] text-balance sm:text-[2.5rem] lg:mt-4 lg:text-[2.875rem] lg:text-wrap"
            >
              Oportunidades reales para estudiantes de la UNO.
            </h1>
            <p className="mt-4 max-w-[30rem] text-[15px] leading-relaxed text-muted-foreground md:text-[17px]">
              Pasantías y empleos junior y trainee en tecnología, compartidos por la comunidad en un
              solo lugar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
