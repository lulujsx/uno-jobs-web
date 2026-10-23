"use client";

import { AnimatePresence, motion } from "motion/react";

import { Skeleton } from "@/components/ui/skeleton";

import type { Job } from "../types";
import { JobCard } from "./job-card";

export function JobList({ jobs, now }: { jobs: Job[]; now: number }) {
  return (
    <ul className="flex flex-col gap-2.5">
      <AnimatePresence initial={false} mode="popLayout">
        {jobs.map((job) => (
          <motion.li
            key={job.id}
            layout="position"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { duration: 0.12 } }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <JobCard job={job} now={now} />
          </motion.li>
        ))}
      </AnimatePresence>
    </ul>
  );
}

export function JobCardSkeleton() {
  return (
    <div className="flex gap-3.5 rounded-xl border bg-card p-3.5 md:gap-5 md:p-4">
      <Skeleton className="size-13 shrink-0 rounded-xl md:size-[76px]" />
      <div className="flex-1 space-y-2.5 py-1">
        <Skeleton className="h-4 w-3/5 md:h-5" />
        <Skeleton className="h-3.5 w-1/4" />
        <div className="flex flex-wrap gap-2 pt-1.5">
          <Skeleton className="h-5 w-28 md:h-6" />
          <Skeleton className="h-5 w-16 md:h-6" />
          <Skeleton className="h-5 w-20 md:h-6" />
        </div>
      </div>
    </div>
  );
}

export function JobListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="flex flex-col gap-2.5" aria-hidden="true">
      {Array.from({ length: count }, (_, index) => (
        <JobCardSkeleton key={index} />
      ))}
    </div>
  );
}
