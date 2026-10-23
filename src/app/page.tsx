import { Suspense } from "react";

import { AboutSection } from "@/components/home/about-section";
import { HeroSection } from "@/components/home/hero-section";
import { MobileTabBar } from "@/components/layout/mobile-tab-bar";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JobExplorer } from "@/features/jobs/components/job-explorer";
import { JobExplorerSkeleton } from "@/features/jobs/components/job-explorer-skeleton";
import { getJobs } from "@/features/jobs/services/get-jobs";

export default function HomePage() {
  // Not awaited: the explorer unwraps it, so the shell renders immediately and
  // the skeleton covers any wait once listings come from the API.
  const jobsPromise = getJobs();

  return (
    <>
      <a
        href="#ofertas"
        className="sr-only z-50 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
      >
        Saltar a las ofertas
      </a>
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <section id="ofertas" aria-label="Ofertas" className="scroll-mt-20">
          <Suspense fallback={<JobExplorerSkeleton />}>
            <JobExplorer jobsPromise={jobsPromise} />
          </Suspense>
        </section>
        <AboutSection />
      </main>
      <SiteFooter />
      <MobileTabBar />
    </>
  );
}
