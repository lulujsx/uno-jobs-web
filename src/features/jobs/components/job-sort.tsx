"use client";

import { ArrowUpDown, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { SORT_LABELS, SORT_OPTIONS, type SortOption } from "../constants";

interface JobSortProps {
  value: SortOption;
  onChange: (value: SortOption) => void;
}

export function JobSort({ value, onChange }: JobSortProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        aria-label={`Ordenar ofertas: ${SORT_LABELS[value]}`}
        className="inline-flex h-9 items-center gap-2 rounded-lg px-2.5 text-[13px] font-medium text-foreground outline-none transition-colors hover:bg-muted focus-visible:ring-3 focus-visible:ring-ring/50 data-[state=open]:bg-muted md:text-sm"
      >
        <ArrowUpDown className="size-4 text-muted-foreground" aria-hidden="true" />
        {SORT_LABELS[value]}
        <ChevronDown className="size-4 text-muted-foreground" aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-48">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(next) => onChange(next as SortOption)}
        >
          {SORT_OPTIONS.map((option) => (
            <DropdownMenuRadioItem key={option} value={option}>
              {SORT_LABELS[option]}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
