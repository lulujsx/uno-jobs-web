import { MOCK_JOBS } from "../data/mock-jobs";
import type { Job } from "../types";

/**
 * Data access boundary for job listings. The UI depends only on this
 * interface, so the mock can be swapped for the Laravel REST API without
 * touching components.
 */
export interface JobRepository {
  list(): Promise<Job[]>;
}

const HOUR_MS = 60 * 60 * 1000;

export const mockJobRepository: JobRepository = {
  async list() {
    const now = Date.now();
    return MOCK_JOBS.map(({ hoursAgo, ...job }) => ({
      ...job,
      publishedAt: new Date(now - hoursAgo * HOUR_MS).toISOString(),
      isDemo: true,
    }));
  },
};

/*
 * Future implementation sketch:
 *
 * export const apiJobRepository: JobRepository = {
 *   async list() {
 *     const res = await fetch(`${process.env.JOBS_API_URL}/api/jobs`);
 *     if (!res.ok) throw new Error("No se pudieron cargar las ofertas");
 *     return (await res.json()).data as Job[];
 *   },
 * };
 */
export const jobRepository: JobRepository = mockJobRepository;
