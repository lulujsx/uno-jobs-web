export const JOB_CATEGORIES = [
  "desarrollo",
  "datos",
  "qa",
  "diseno",
  "infraestructura",
  "producto",
  "soporte-it",
] as const;
export type JobCategory = (typeof JOB_CATEGORIES)[number];

export const SENIORITIES = ["pasantia", "trainee", "junior", "semi-senior"] as const;
export type Seniority = (typeof SENIORITIES)[number];

export const MODALITIES = ["remoto", "hibrido", "presencial"] as const;
export type Modality = (typeof MODALITIES)[number];

/** Where the listing was collected from. */
export type JobSource = "telegram" | "manual";

/**
 * A job listing as consumed by the UI.
 *
 * Listings will eventually be parsed from Telegram messages, so most fields
 * are nullable: the UI must render gracefully with whatever is available.
 */
export interface Job {
  id: string;
  title: string;
  company: string | null;
  /** Absolute URL or path under /public. */
  companyLogo: string | null;
  category: JobCategory | null;
  seniority: Seniority | null;
  modality: Modality | null;
  /** Free-form location as published, e.g. "CABA" or "Argentina". */
  location: string | null;
  technologies: string[];
  /** ISO 8601 timestamp. */
  publishedAt: string;
  source: JobSource;
  /** Original listing. May be missing or malformed in source messages. */
  externalUrl: string | null;
  /** Marks fictional listings used for demonstration. */
  isDemo?: boolean;
}
