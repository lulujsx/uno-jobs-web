import { Search } from "lucide-react";

import { Skeleton } from "@/components/ui/skeleton";

import { JobListSkeleton } from "./job-list";

const CHIP_WIDTHS = ["w-24", "w-32", "w-24", "w-20", "w-28", "w-40", "w-28", "w-32"];

/** Mirrors JobExplorer's layout so the page doesn't shift once it hydrates. */
export function JobExplorerSkeleton() {
  return (
    <div role="status" aria-label="Cargando ofertas">
      <div className="relative z-10 mx-auto max-w-[1200px] px-4 md:px-8">
        <div className="flex items-center gap-2 lg:w-[94%]">
          <div className="flex h-14 flex-1 items-center gap-3 rounded-full border bg-card pl-5 text-[15px] text-muted-foreground shadow-float">
            <Search className="size-5" aria-hidden="true" />
            <span className="truncate">Buscar por puesto, empresa o tecnología...</span>
          </div>
          <Skeleton className="size-14 shrink-0 rounded-full lg:hidden" />
        </div>
        <div className="mt-5 flex gap-2 overflow-hidden py-1 md:mt-6 md:gap-2.5">
          {CHIP_WIDTHS.map((width, index) => (
            <Skeleton key={index} className={`h-9 shrink-0 rounded-full md:h-10 ${width}`} />
          ))}
        </div>
      </div>

      <div className="mt-5 border-t bg-surface md:mt-7">
        <div className="mx-auto grid max-w-[1200px] gap-6 px-4 pt-5 pb-12 md:px-8 md:pt-6 md:pb-16 lg:grid-cols-[minmax(0,1fr)_260px] xl:grid-cols-[minmax(0,1fr)_280px]">
          <div className="lg:rounded-2xl lg:border lg:bg-card lg:p-4 lg:shadow-soft">
            <div className="mb-4 flex h-7 items-center justify-between lg:px-1">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-5 w-28" />
            </div>
            <JobListSkeleton />
          </div>
          <div className="hidden lg:block">
            <div className="space-y-4 rounded-2xl border bg-card p-5 shadow-soft">
              <Skeleton className="h-5 w-20" />
              {Array.from({ length: 10 }, (_, index) => (
                <Skeleton key={index} className="h-4 w-3/4" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <span className="sr-only">Cargando ofertas…</span>
    </div>
  );
}
