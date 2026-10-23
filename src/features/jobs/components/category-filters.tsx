"use client";

import {
  ChartColumn,
  CodeXml,
  Database,
  Headset,
  LayoutGrid,
  Package,
  Palette,
  SearchCheck,
  type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

import { CATEGORY_LABELS } from "../constants";
import { JOB_CATEGORIES, type JobCategory } from "../types";

const CATEGORY_ICONS: Record<JobCategory, LucideIcon> = {
  desarrollo: CodeXml,
  datos: ChartColumn,
  qa: SearchCheck,
  diseno: Palette,
  infraestructura: Database,
  producto: Package,
  "soporte-it": Headset,
};

const OPTIONS: Array<{ value: JobCategory | null; label: string; icon: LucideIcon }> = [
  { value: null, label: "Todos", icon: LayoutGrid },
  ...JOB_CATEGORIES.map((value) => ({
    value,
    label: CATEGORY_LABELS[value],
    icon: CATEGORY_ICONS[value],
  })),
];

interface CategoryFiltersProps {
  value: JobCategory | null;
  onChange: (value: JobCategory | null) => void;
}

export function CategoryFilters({ value, onChange }: CategoryFiltersProps) {
  return (
    <div
      role="group"
      aria-label="Categorías"
      className="scrollbar-none -mx-4 flex gap-2 overflow-x-auto px-4 py-1 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 md:gap-2.5"
    >
      {OPTIONS.map(({ value: option, label, icon: Icon }) => {
        const selected = option === value;
        return (
          <button
            key={label}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(selected ? null : option)}
            className={cn(
              "inline-flex h-9 shrink-0 items-center gap-2 rounded-full border px-3.5 text-[13px] font-medium whitespace-nowrap outline-none transition-colors md:h-10 md:px-4 md:text-sm",
              "focus-visible:ring-3 focus-visible:ring-ring/40",
              selected
                ? "border-primary bg-primary text-primary-foreground shadow-soft"
                : "bg-card text-foreground hover:border-primary/30 hover:bg-accent",
            )}
          >
            <Icon className="size-4" aria-hidden="true" />
            {label}
          </button>
        );
      })}
    </div>
  );
}
