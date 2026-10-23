import { CATEGORY_LABELS, SENIORITY_LABELS, type SortOption } from "../constants";
import type { Job } from "../types";
import type { FacetKey, JobQuery } from "./query";

/** Lowercase and strip accents so "diseno" matches "Diseño". */
export function normalizeText(value: string): string {
  return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim();
}

function searchableText(job: Job): string {
  return normalizeText(
    [
      job.title,
      job.company,
      job.location,
      job.category ? CATEGORY_LABELS[job.category] : null,
      job.seniority ? SENIORITY_LABELS[job.seniority] : null,
      ...job.technologies,
    ]
      .filter(Boolean)
      .join(" "),
  );
}

function matchesSearch(job: Job, search: string): boolean {
  const terms = normalizeText(search).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = searchableText(job);
  return terms.every((term) => haystack.includes(term));
}

/** An empty selection means "any value". Listings missing the field are excluded once a value is selected. */
function matchesAny(value: string | null, selected: string[]): boolean {
  return selected.length === 0 || (value !== null && selected.includes(value));
}

function matchesFacet(job: Job, query: JobQuery, facet: FacetKey): boolean {
  switch (facet) {
    case "seniority":
      return matchesAny(job.seniority, query.seniority);
    case "modality":
      return matchesAny(job.modality, query.modality);
    case "location":
      return matchesAny(job.location, query.location);
    case "technology":
      return (
        query.technology.length === 0 ||
        query.technology.some((tech) => job.technologies.includes(tech))
      );
  }
}

const FACETS: FacetKey[] = ["seniority", "modality", "location", "technology"];

function matchesQuery(job: Job, query: JobQuery, ignoreFacet?: FacetKey): boolean {
  return (
    matchesSearch(job, query.search) &&
    (query.category === null || job.category === query.category) &&
    FACETS.every((facet) => facet === ignoreFacet || matchesFacet(job, query, facet))
  );
}

const collator = new Intl.Collator("es-AR", { sensitivity: "base" });

export function sortJobs(jobs: Job[], sort: SortOption): Job[] {
  const sorted = [...jobs];
  switch (sort) {
    case "recientes":
      return sorted.sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt));
    case "antiguos":
      return sorted.sort((a, b) => Date.parse(a.publishedAt) - Date.parse(b.publishedAt));
    case "alfabetico":
      return sorted.sort((a, b) => collator.compare(a.title, b.title));
  }
}

export function filterJobs(jobs: Job[], query: JobQuery): Job[] {
  return sortJobs(
    jobs.filter((job) => matchesQuery(job, query)),
    query.sort,
  );
}

function facetValues(job: Job, facet: FacetKey): string[] {
  switch (facet) {
    case "seniority":
      return job.seniority ? [job.seniority] : [];
    case "modality":
      return job.modality ? [job.modality] : [];
    case "location":
      return job.location ? [job.location] : [];
    case "technology":
      return job.technologies;
  }
}

/**
 * Counts per facet value, computed against every other active filter so the
 * numbers reflect what selecting that option would add.
 */
export function countFacet(jobs: Job[], query: JobQuery, facet: FacetKey): Map<string, number> {
  const counts = new Map<string, number>();
  for (const job of jobs) {
    if (!matchesQuery(job, query, facet)) continue;
    for (const value of facetValues(job, facet)) {
      counts.set(value, (counts.get(value) ?? 0) + 1);
    }
  }
  return counts;
}

/** Distinct values of a free-form facet across all listings, most common first. */
export function collectFacetOptions(jobs: Job[], facet: "location" | "technology"): string[] {
  const totals = new Map<string, number>();
  for (const job of jobs) {
    for (const value of facetValues(job, facet)) {
      totals.set(value, (totals.get(value) ?? 0) + 1);
    }
  }
  return [...totals.entries()]
    .sort(([a, countA], [b, countB]) => countB - countA || collator.compare(a, b))
    .map(([value]) => value);
}
