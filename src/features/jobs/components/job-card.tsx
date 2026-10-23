import { BriefcaseBusiness, ChevronRight, Clock, Link2Off, MapPin } from "lucide-react";

import { cn } from "@/lib/utils";

import { SENIORITY_LABELS } from "../constants";
import {
  formatAbsoluteDate,
  formatRelativeDate,
  formatWorkplace,
  getSafeExternalUrl,
  isNewListing,
} from "../lib/format";
import type { Job } from "../types";
import { CompanyLogo } from "./company-logo";

const MAX_VISIBLE_TECHNOLOGIES = 3;

export function JobCard({ job, now }: { job: Job; now: number }) {
  const href = getSafeExternalUrl(job.externalUrl);
  const workplace = formatWorkplace(job);
  const isNew = isNewListing(job.publishedAt, now);
  const visibleTechnologies = job.technologies.slice(0, MAX_VISIBLE_TECHNOLOGIES);
  const hiddenTechnologies = job.technologies.slice(MAX_VISIBLE_TECHNOLOGIES);

  return (
    <article
      className={cn(
        "group relative flex gap-3.5 rounded-xl border bg-card p-3.5 transition-[border-color,box-shadow] md:gap-5 md:p-4",
        href && "hover:border-primary/30 hover:shadow-soft has-[a:focus-visible]:border-primary/50",
      )}
    >
      <CompanyLogo
        company={job.company}
        src={job.companyLogo}
        className="size-13 md:size-[76px]"
      />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h3 className="text-[15px] leading-snug font-semibold tracking-[-0.01em] md:text-[17px]">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-3 focus-visible:after:ring-ring/40"
              >
                {job.title}
                <span className="sr-only"> — ver oferta original (se abre en una pestaña nueva)</span>
              </a>
            ) : (
              job.title
            )}
          </h3>
          {isNew && (
            <span className="rounded-md bg-tag px-1.5 py-0.5 text-[11px] leading-none font-medium text-tag-foreground md:text-xs">
              Nuevo
            </span>
          )}
        </div>
        {job.company && (
          <p className="mt-0.5 truncate text-[13px] text-muted-foreground md:text-sm">{job.company}</p>
        )}

        <div className="mt-2 flex flex-col gap-2 md:mt-3 md:flex-row md:flex-wrap md:items-center md:gap-x-6">
          <ul className="order-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground md:order-1 md:text-[13px]">
            {workplace && (
              <li className="inline-flex items-center gap-1.5">
                <MapPin className="size-3.5 md:size-4" aria-hidden="true" />
                <span className="sr-only">Lugar de trabajo: </span>
                {workplace}
              </li>
            )}
            {job.seniority && (
              <li className="hidden items-center gap-1.5 sm:inline-flex">
                <BriefcaseBusiness className="size-3.5 md:size-4" aria-hidden="true" />
                <span className="sr-only">Seniority: </span>
                {SENIORITY_LABELS[job.seniority]}
              </li>
            )}
            <li className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5 md:size-4" aria-hidden="true" />
              <span className="sr-only">Publicada: </span>
              <time
                dateTime={job.publishedAt}
                title={formatAbsoluteDate(job.publishedAt)}
                suppressHydrationWarning
              >
                {formatRelativeDate(job.publishedAt, now)}
              </time>
            </li>
          </ul>

          {visibleTechnologies.length > 0 && (
            <ul aria-label="Tecnologías" className="order-1 flex flex-wrap gap-1.5 md:order-2">
              {visibleTechnologies.map((tech) => (
                <li
                  key={tech}
                  className="rounded-md bg-tag px-2 py-0.5 text-xs font-medium text-tag-foreground md:px-2.5 md:py-1 md:text-[13px]"
                >
                  {tech}
                </li>
              ))}
              {hiddenTechnologies.length > 0 && (
                <li
                  title={hiddenTechnologies.join(", ")}
                  className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground md:py-1 md:text-[13px]"
                >
                  <span aria-hidden="true">+{hiddenTechnologies.length}</span>
                  <span className="sr-only">y también {hiddenTechnologies.join(", ")}</span>
                </li>
              )}
            </ul>
          )}
        </div>

        {!href && (
          <p className="mt-2.5 inline-flex items-center gap-1.5 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
            <Link2Off className="size-3.5" aria-hidden="true" />
            Enlace no disponible
          </p>
        )}
      </div>

      {href && (
        <ChevronRight
          aria-hidden="true"
          className="hidden size-5 shrink-0 self-center text-muted-foreground transition-transform group-hover:translate-x-0.5 sm:block"
        />
      )}
    </article>
  );
}
