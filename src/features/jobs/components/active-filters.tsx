"use client";

import { X } from "lucide-react";

import { MODALITY_LABELS, SENIORITY_LABELS } from "../constants";
import type { FacetKey, JobQuery } from "../lib/query";

interface ActiveFiltersProps {
  query: JobQuery;
  onRemove: (facet: FacetKey, value: string) => void;
  onClearSearch: () => void;
  onClearAll: () => void;
}

export function ActiveFilters({ query, onRemove, onClearSearch, onClearAll }: ActiveFiltersProps) {
  const chips: Array<{ key: string; label: string; onRemove: () => void }> = [];
  const search = query.search.trim();

  if (search) chips.push({ key: "search", label: `“${search}”`, onRemove: onClearSearch });
  for (const value of query.seniority) {
    chips.push({ key: `s-${value}`, label: SENIORITY_LABELS[value], onRemove: () => onRemove("seniority", value) });
  }
  for (const value of query.modality) {
    chips.push({ key: `m-${value}`, label: MODALITY_LABELS[value], onRemove: () => onRemove("modality", value) });
  }
  for (const value of query.location) {
    chips.push({ key: `l-${value}`, label: value, onRemove: () => onRemove("location", value) });
  }
  for (const value of query.technology) {
    chips.push({ key: `t-${value}`, label: value, onRemove: () => onRemove("technology", value) });
  }

  if (chips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <span className="sr-only">Filtros activos:</span>
      {chips.map((chip) => (
        <button
          key={chip.key}
          type="button"
          onClick={chip.onRemove}
          aria-label={`Quitar filtro ${chip.label}`}
          className="inline-flex h-7 items-center gap-1 rounded-full border border-primary/25 bg-tag pr-1.5 pl-2.5 text-xs font-medium text-tag-foreground outline-none transition-colors hover:border-primary/50 focus-visible:ring-3 focus-visible:ring-ring/40"
        >
          {chip.label}
          <X className="size-3.5" aria-hidden="true" />
        </button>
      ))}
      <button
        type="button"
        onClick={onClearAll}
        className="ml-1 rounded-md px-1 text-xs font-medium text-muted-foreground underline-offset-4 outline-none hover:text-foreground hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
      >
        Limpiar todo
      </button>
    </div>
  );
}
