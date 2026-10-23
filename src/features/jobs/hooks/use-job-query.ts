"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

import { parseJobQuery, serializeJobQuery, type JobQuery } from "../lib/query";

/**
 * Job query state backed by the URL, so any search can be shared as a link.
 * Uses the native History API, which Next.js syncs with `useSearchParams`
 * without triggering a server round-trip.
 */
export function useJobQuery() {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const query = useMemo(
    () => parseJobQuery(new URLSearchParams(searchParams.toString())),
    [searchParams],
  );

  const setQuery = useCallback(
    (update: Partial<JobQuery> | ((current: JobQuery) => JobQuery)) => {
      // Read the live URL rather than `query` so rapid successive updates compose.
      const current = parseJobQuery(new URLSearchParams(window.location.search));
      const next = typeof update === "function" ? update(current) : { ...current, ...update };
      const search = serializeJobQuery(next).toString();
      const url = `${pathname}${search ? `?${search}` : ""}${window.location.hash}`;
      const currentUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      if (url === currentUrl) return;
      window.history.replaceState(null, "", url);
    },
    [pathname],
  );

  return { query, setQuery };
}
