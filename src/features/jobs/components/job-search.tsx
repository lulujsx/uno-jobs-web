"use client";

import { Search, X } from "lucide-react";

import { cn } from "@/lib/utils";

export const JOB_SEARCH_INPUT_ID = "buscar-ofertas";

interface JobSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function JobSearch({ value, onChange, className }: JobSearchProps) {
  return (
    <div role="search" className={cn("relative", className)}>
      <label htmlFor={JOB_SEARCH_INPUT_ID} className="sr-only">
        Buscar ofertas por puesto, empresa o tecnología
      </label>
      <Search
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-muted-foreground"
      />
      <input
        id={JOB_SEARCH_INPUT_ID}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape" && value) {
            event.preventDefault();
            onChange("");
          }
        }}
        placeholder="Buscar por puesto, empresa o tecnología..."
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="search"
        className={cn(
          "h-14 w-full rounded-full border bg-card pr-12 pl-13 text-[15px] text-foreground shadow-float outline-none transition-[border-color,box-shadow]",
          "placeholder:text-muted-foreground/90 focus-visible:border-primary/50 focus-visible:ring-4 focus-visible:ring-ring/15",
          "[&::-webkit-search-cancel-button]:appearance-none",
        )}
      />
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Borrar búsqueda"
          className="absolute top-1/2 right-3 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <X className="size-4" />
        </button>
      )}
    </div>
  );
}
