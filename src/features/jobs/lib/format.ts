import { MODALITY_LABELS, NEW_LISTING_WINDOW_MS } from "../constants";
import type { Job } from "../types";

const relativeFormatter = new Intl.RelativeTimeFormat("es-AR", { numeric: "auto" });
const absoluteFormatter = new Intl.DateTimeFormat("es-AR", { dateStyle: "long" });

const UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
  ["year", 365 * 24 * 60 * 60 * 1000],
  ["month", 30 * 24 * 60 * 60 * 1000],
  ["week", 7 * 24 * 60 * 60 * 1000],
  ["day", 24 * 60 * 60 * 1000],
  ["hour", 60 * 60 * 1000],
  ["minute", 60 * 1000],
];

function capitalize(value: string): string {
  return value.charAt(0).toLocaleUpperCase("es-AR") + value.slice(1);
}

/** "Hace 2 horas", "Ayer", "Hace 3 semanas"… */
export function formatRelativeDate(iso: string, now: number = Date.now()): string {
  const elapsed = now - Date.parse(iso);
  for (const [unit, ms] of UNITS) {
    if (Math.abs(elapsed) >= ms) {
      return capitalize(relativeFormatter.format(-Math.floor(elapsed / ms), unit));
    }
  }
  return "Recién publicada";
}

export function formatAbsoluteDate(iso: string): string {
  return absoluteFormatter.format(new Date(iso));
}

export function isNewListing(iso: string, now: number = Date.now()): boolean {
  const elapsed = now - Date.parse(iso);
  return elapsed >= 0 && elapsed < NEW_LISTING_WINDOW_MS;
}

/** "Remoto (Argentina)", "Híbrido", "CABA", or null when nothing is known. */
export function formatWorkplace(job: Pick<Job, "modality" | "location">): string | null {
  const modality = job.modality ? MODALITY_LABELS[job.modality] : null;
  if (modality && job.location) return `${modality} (${job.location})`;
  return modality ?? job.location;
}

/** Only http(s) URLs are opened; anything else is treated as unavailable. */
export function getSafeExternalUrl(value: string | null): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:" ? url.href : null;
  } catch {
    return null;
  }
}

export function getInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter((word) => /\p{L}/u.test(word.charAt(0)))
    .slice(0, 2)
    .map((word) => word.charAt(0).toLocaleUpperCase("es-AR"))
    .join("");
}
