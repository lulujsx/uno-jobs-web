import { BriefcaseBusiness, Info } from "lucide-react";
import Link from "next/link";

import { GitHubIcon, TelegramIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

const linkClassName =
  "inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground outline-none transition-colors hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50";

export function SiteFooter() {
  return (
    <footer className="border-t bg-surface pb-20 md:pb-0">
      <div className="mx-auto max-w-[1200px] px-4 py-12 md:px-8 md:py-14">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <p className="flex items-center gap-2.5 text-base font-semibold tracking-tight">
              <span
                aria-hidden="true"
                className="grid size-7 place-items-center rounded-lg bg-primary text-primary-foreground"
              >
                <BriefcaseBusiness className="size-4" />
              </span>
              {siteConfig.name}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Una cartelera de pasantías y empleos junior y trainee en tecnología, reunidos a partir
              de lo que comparte la comunidad de estudiantes.
            </p>
          </div>

          <nav aria-label="Enlaces del pie de página">
            <ul className="flex flex-col gap-3 sm:flex-row sm:gap-8">
              <li>
                <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" className={linkClassName}>
                  <GitHubIcon className="size-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a href={siteConfig.links.telegram} target="_blank" rel="noopener noreferrer" className={linkClassName}>
                  <TelegramIcon className="size-4" />
                  Telegram
                </a>
              </li>
              <li>
                <Link href="/#sobre-el-proyecto" className={linkClassName}>
                  <Info className="size-4" aria-hidden="true" />
                  Sobre el proyecto
                </Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className="mt-10 border-t pt-6 text-[13px] leading-relaxed text-muted-foreground md:max-w-3xl">
          UNO Jobs es un proyecto independiente, creado para facilitar el acceso a oportunidades
          laborales en tecnología. No está afiliado ni representa oficialmente a la Universidad
          Nacional del Oeste.
        </p>
      </div>
    </footer>
  );
}
