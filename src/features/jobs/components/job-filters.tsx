"use client";

import { ChevronDown, Search } from "lucide-react";
import { useId, useMemo, useState } from "react";

import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

import { MODALITY_LABELS, SENIORITY_LABELS } from "../constants";
import { collectFacetOptions, countFacet, normalizeText } from "../lib/filter-jobs";
import type { FacetKey, JobQuery } from "../lib/query";
import { MODALITIES, SENIORITIES, type Job } from "../types";

interface FacetOption {
  value: string;
  label: string;
  count: number;
}

interface FacetGroupProps {
  title: string;
  options: FacetOption[];
  selected: string[];
  onToggle: (value: string) => void;
  /** Collapse long lists behind "Mostrar más". */
  initialVisible?: number;
  searchable?: boolean;
}

function FacetGroup({ title, options, selected, onToggle, initialVisible, searchable }: FacetGroupProps) {
  const id = useId();
  const [expanded, setExpanded] = useState(false);
  const [filter, setFilter] = useState("");

  const matching = useMemo(() => {
    const term = normalizeText(filter);
    return term ? options.filter((option) => normalizeText(option.label).includes(term)) : options;
  }, [options, filter]);

  // Selected options always stay visible, even when the list is collapsed.
  const visible =
    expanded || filter || initialVisible === undefined
      ? matching
      : matching.filter((option, index) => index < initialVisible || selected.includes(option.value));
  const hiddenCount = matching.length - visible.length;

  return (
    <Collapsible defaultOpen className="border-t py-4 first:border-t-0 first:pt-0">
      <h3>
        <CollapsibleTrigger className="group/trigger flex w-full items-center justify-between rounded-md text-sm font-semibold outline-none focus-visible:ring-3 focus-visible:ring-ring/50">
          {title}
          {selected.length > 0 && (
            <span className="mr-auto ml-2 rounded-full bg-primary px-1.5 text-[11px] leading-[18px] font-medium text-primary-foreground">
              {selected.length}
              <span className="sr-only"> seleccionados</span>
            </span>
          )}
          <ChevronDown
            aria-hidden="true"
            className="size-4 text-muted-foreground transition-transform group-data-[state=open]/trigger:rotate-180"
          />
        </CollapsibleTrigger>
      </h3>
      <CollapsibleContent>
        <fieldset className="mt-3">
          <legend className="sr-only">{title}</legend>
          {searchable && (
            <div className="relative mb-2.5">
              <label htmlFor={`${id}-search`} className="sr-only">
                Buscar en {title.toLowerCase()}
              </label>
              <Search
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground"
              />
              <input
                id={`${id}-search`}
                type="search"
                value={filter}
                onChange={(event) => setFilter(event.target.value)}
                placeholder="Buscar tecnología..."
                autoComplete="off"
                className="h-8 w-full rounded-lg border bg-background pr-2 pl-8 text-[13px] outline-none placeholder:text-muted-foreground focus-visible:border-primary/50 focus-visible:ring-3 focus-visible:ring-ring/15"
              />
            </div>
          )}
          <ul className="flex flex-col gap-0.5">
            {visible.map((option) => {
              const checked = selected.includes(option.value);
              const disabled = option.count === 0 && !checked;
              const inputId = `${id}-${option.value}`;
              return (
                <li key={option.value} className="flex items-center gap-2.5 py-1">
                  <Checkbox
                    id={inputId}
                    checked={checked}
                    disabled={disabled}
                    onCheckedChange={() => onToggle(option.value)}
                  />
                  <label
                    htmlFor={inputId}
                    className={cn(
                      "flex-1 cursor-pointer text-[13px] text-foreground/85 select-none",
                      checked && "font-medium text-foreground",
                      disabled && "cursor-not-allowed text-muted-foreground/70",
                    )}
                  >
                    {option.label}{" "}
                    <span className="text-muted-foreground tabular-nums">({option.count})</span>
                  </label>
                </li>
              );
            })}
            {visible.length === 0 && (
              <li className="py-1 text-[13px] text-muted-foreground">Sin coincidencias.</li>
            )}
          </ul>
          {!filter && initialVisible !== undefined && (expanded || hiddenCount > 0) && (
            <button
              type="button"
              onClick={() => setExpanded((value) => !value)}
              aria-expanded={expanded}
              className="mt-2 rounded-md text-[13px] font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {expanded ? "Mostrar menos" : `Mostrar más (${hiddenCount})`}
            </button>
          )}
        </fieldset>
      </CollapsibleContent>
    </Collapsible>
  );
}

interface JobFiltersProps {
  jobs: Job[];
  query: JobQuery;
  onToggle: (facet: FacetKey, value: string) => void;
}

/** Facet checkboxes. Shared by the desktop sidebar and the mobile sheet. */
export function JobFilters({ jobs, query, onToggle }: JobFiltersProps) {
  const groups = useMemo(() => {
    const toOptions = (facet: FacetKey, entries: Array<[value: string, label: string]>) => {
      const counts = countFacet(jobs, query, facet);
      return entries.map(([value, label]) => ({ value, label, count: counts.get(value) ?? 0 }));
    };
    const identity = (values: string[]) => values.map((value): [string, string] => [value, value]);
    return {
      seniority: toOptions("seniority", SENIORITIES.map((v) => [v, SENIORITY_LABELS[v]])),
      modality: toOptions("modality", MODALITIES.map((v) => [v, MODALITY_LABELS[v]])),
      location: toOptions("location", identity(collectFacetOptions(jobs, "location"))),
      technology: toOptions("technology", identity(collectFacetOptions(jobs, "technology"))),
    };
  }, [jobs, query]);

  return (
    <div>
      <FacetGroup
        title="Seniority"
        options={groups.seniority}
        selected={query.seniority}
        onToggle={(value) => onToggle("seniority", value)}
      />
      <FacetGroup
        title="Modalidad"
        options={groups.modality}
        selected={query.modality}
        onToggle={(value) => onToggle("modality", value)}
      />
      <FacetGroup
        title="Ubicación"
        options={groups.location}
        selected={query.location}
        onToggle={(value) => onToggle("location", value)}
        initialVisible={5}
      />
      <FacetGroup
        title="Tecnologías"
        options={groups.technology}
        selected={query.technology}
        onToggle={(value) => onToggle("technology", value)}
        initialVisible={6}
        searchable
      />
    </div>
  );
}
