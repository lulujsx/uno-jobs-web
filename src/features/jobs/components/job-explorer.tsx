"use client";

import { Info, SearchX, SlidersHorizontal } from "lucide-react";
import { use, useDeferredValue, useEffect, useMemo, useState } from "react";

import { useMobileUi } from "@/components/providers";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { useJobQuery } from "../hooks/use-job-query";
import { filterJobs } from "../lib/filter-jobs";
import { countActiveFacets, EMPTY_QUERY, type FacetKey, type JobQuery } from "../lib/query";
import type { Job } from "../types";
import { ActiveFilters } from "./active-filters";
import { CategoryFilters } from "./category-filters";
import { EmptyState } from "./empty-state";
import { JobFilters } from "./job-filters";
import { JobList } from "./job-list";
import { JobSearch } from "./job-search";
import { JobSort } from "./job-sort";

const SEARCH_URL_DEBOUNCE_MS = 250;

function toggleValue<T extends string>(values: T[], value: T): T[] {
  return values.includes(value) ? values.filter((v) => v !== value) : [...values, value];
}

function formatResultCount(count: number) {
  return count === 1 ? "1 oferta" : `${count.toLocaleString("es-AR")} ofertas`;
}

export function JobExplorer({ jobsPromise }: { jobsPromise: Promise<Job[]> }) {
  const jobs = use(jobsPromise);
  const { query: urlQuery, setQuery } = useJobQuery();
  const { filtersOpen, setFiltersOpen } = useMobileUi();
  const [now] = useState(() => Date.now());

  // The input updates instantly; results follow via a deferred value and the
  // URL is updated after a short pause so typing stays smooth.
  const [searchInput, setSearchInput] = useState(urlQuery.search);
  const deferredSearch = useDeferredValue(searchInput);

  useEffect(() => {
    const timeout = setTimeout(() => setQuery({ search: searchInput }), SEARCH_URL_DEBOUNCE_MS);
    return () => clearTimeout(timeout);
  }, [searchInput, setQuery]);

  const query: JobQuery = useMemo(
    () => ({ ...urlQuery, search: deferredSearch }),
    [urlQuery, deferredSearch],
  );
  const results = useMemo(() => filterJobs(jobs, query), [jobs, query]);
  const activeFacetCount = countActiveFacets(query);
  const hasDemoData = jobs.some((job) => job.isDemo);

  const toggleFacet = (facet: FacetKey, value: string) =>
    setQuery((current) => ({ ...current, [facet]: toggleValue<string>(current[facet], value) }));

  const clearFacets = () =>
    setQuery((current) => ({ ...current, seniority: [], modality: [], location: [], technology: [] }));

  const clearAll = () => {
    setSearchInput("");
    setQuery({ ...EMPTY_QUERY, sort: urlQuery.sort });
  };

  const filters = <JobFilters jobs={jobs} query={query} onToggle={toggleFacet} />;

  return (
    <>
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="flex items-center gap-2 lg:w-[94%]">
          <JobSearch value={searchInput} onChange={setSearchInput} className="flex-1" />
          <button
            type="button"
            onClick={() => setFiltersOpen(true)}
            aria-label={
              activeFacetCount > 0 ? `Abrir filtros (${activeFacetCount} activos)` : "Abrir filtros"
            }
            className="relative grid size-14 shrink-0 place-items-center rounded-full border bg-card text-foreground shadow-float outline-none transition-colors hover:bg-accent focus-visible:ring-3 focus-visible:ring-ring/50 lg:hidden"
          >
            <SlidersHorizontal className="size-5" aria-hidden="true" />
            {activeFacetCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 grid size-5 place-items-center rounded-full bg-primary text-[11px] font-semibold text-primary-foreground">
                {activeFacetCount}
              </span>
            )}
          </button>
        </div>
        <div className="mt-5 md:mt-6">
          <CategoryFilters
            value={query.category}
            onChange={(category) => setQuery({ category })}
          />
        </div>
      </div>

      <div className="mt-5 border-t bg-surface md:mt-7">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-4 pt-5 pb-12 md:px-8 md:pt-6 md:pb-16 lg:grid-cols-[minmax(0,1fr)_260px] xl:grid-cols-[minmax(0,1fr)_280px]">
          <section aria-labelledby="results-heading" className="min-w-0 lg:rounded-2xl lg:border lg:bg-card lg:p-4 lg:shadow-soft">
            <div className="flex items-center justify-between gap-4 lg:px-1">
              <h2
                id="results-heading"
                aria-live="polite"
                aria-atomic="true"
                className="text-base font-semibold tracking-[-0.01em] md:text-lg"
              >
                {formatResultCount(results.length)}
                <span className="hidden sm:inline"> {results.length === 1 ? "encontrada" : "encontradas"}</span>
              </h2>
              <JobSort value={query.sort} onChange={(sort) => setQuery({ sort })} />
            </div>

            <div className="mt-3 flex flex-col gap-3 empty:hidden lg:px-1">
              <ActiveFilters
                query={query}
                onRemove={toggleFacet}
                onClearSearch={() => setSearchInput("")}
                onClearAll={clearAll}
              />
            </div>

            {hasDemoData && (
              <p className="mt-1 mb-3 flex items-center gap-1.5 text-xs text-muted-foreground lg:px-1">
                <Info className="size-3.5 shrink-0" aria-hidden="true" />
                Datos de demostración: empresas ficticias, no son ofertas reales.
              </p>
            )}

            {results.length > 0 ? (
              <JobList jobs={results} now={now} />
            ) : (
              <EmptyState
                icon={SearchX}
                title="No encontramos ofertas con esos criterios"
                description="Probá con otras palabras clave, otra categoría o quitá algunos filtros."
                action={
                  <Button variant="outline" onClick={clearAll} className="rounded-full px-4">
                    Limpiar búsqueda y filtros
                  </Button>
                }
              />
            )}
          </section>

          <aside aria-labelledby="filters-heading" className="hidden lg:block">
            <div className="sticky top-24 rounded-2xl border bg-card p-5 shadow-soft">
              <div className="mb-4 flex items-center justify-between">
                <h2 id="filters-heading" className="text-base font-semibold">
                  Filtros
                </h2>
                <button
                  type="button"
                  onClick={clearFacets}
                  disabled={activeFacetCount === 0}
                  className="rounded-md text-sm font-medium text-primary outline-none hover:underline focus-visible:ring-3 focus-visible:ring-ring/50 disabled:cursor-default disabled:text-muted-foreground disabled:no-underline"
                >
                  Limpiar
                </button>
              </div>
              {filters}
            </div>
          </aside>
        </div>
      </div>

      <Sheet open={filtersOpen} onOpenChange={setFiltersOpen}>
        <SheetContent side="bottom" className="max-h-[88dvh] gap-0 rounded-t-3xl lg:hidden">
          <SheetHeader className="border-b px-5 py-4">
            <SheetTitle className="text-base font-semibold">Filtros</SheetTitle>
            <SheetDescription>Combiná varias opciones para afinar los resultados.</SheetDescription>
          </SheetHeader>
          <div className="overflow-y-auto px-5 py-4">{filters}</div>
          <SheetFooter className="flex-row gap-2 border-t px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <Button
              variant="outline"
              className="h-11 flex-1 rounded-full"
              onClick={clearFacets}
              disabled={activeFacetCount === 0}
            >
              Limpiar
            </Button>
            <Button className="h-11 flex-[2] rounded-full" onClick={() => setFiltersOpen(false)}>
              Ver {formatResultCount(results.length)}
            </Button>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  );
}
