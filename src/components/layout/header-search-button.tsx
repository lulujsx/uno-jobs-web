"use client";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { JOB_SEARCH_INPUT_ID } from "@/features/jobs/components/job-search";

export function HeaderSearchButton() {
  const focusSearch = () => {
    const input = document.getElementById(JOB_SEARCH_INPUT_ID);
    if (!input) return;
    input.scrollIntoView({ block: "center" });
    input.focus({ preventScroll: true });
  };

  return (
    <Button
      variant="secondary"
      size="icon"
      className="hidden size-10 rounded-full md:inline-flex"
      onClick={focusSearch}
      aria-label="Buscar ofertas"
    >
      <Search className="size-[18px]" />
    </Button>
  );
}
