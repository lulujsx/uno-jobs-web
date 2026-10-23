import { cacheLife } from "next/cache";

import { jobRepository } from "./job-repository";

/** Cached server-side entry point for listings. */
export async function getJobs() {
  "use cache";
  cacheLife("hours");
  return jobRepository.list();
}
