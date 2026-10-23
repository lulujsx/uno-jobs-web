# UNO Jobs — Frontend MVP

Cartelera pública de pasantías y empleos trainee/junior en tecnología para la comunidad de estudiantes de la Universidad Nacional del Oeste.

> Proyecto independiente. No está afiliado ni representa oficialmente a la UNO.

## Stack

Next.js 16 (App Router, Cache Components) · React 19 · TypeScript (strict) · Tailwind CSS 4 · shadcn/ui (Radix) · lucide-react · Motion · next-themes

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build
```

## Estructura

```
src/
  app/                     layout, página principal, tokens de diseño (globals.css)
  config/site.ts           navegación, enlaces externos, rutas de assets
  components/
    layout/                SiteHeader, MobileNav, MobileTabBar, ThemeToggle, SiteFooter
    home/                  HeroSection, AboutSection
    ui/                    componentes shadcn/ui
  features/jobs/
    types.ts               tipo Job (campos opcionales/nullable)
    constants.ts           etiquetas en español, orden, ventana de "Nuevo"
    data/mock-jobs.ts      datos de demostración (empresas ficticias)
    services/              JobRepository + implementación mock, getJobs() cacheado
    lib/                   parseo de URL, filtrado/orden/facetas, formato
    hooks/use-job-query.ts estado sincronizado con la URL
    components/            JobExplorer, JobSearch, CategoryFilters, JobFilters, JobSort, JobCard, JobList, EmptyState…
```

## Estado en la URL

Las búsquedas se pueden compartir: `/?q=react&categoria=desarrollo&seniority=junior,trainee&modalidad=remoto&ubicacion=CABA&tecnologia=TypeScript&orden=alfabetico`

## Conectar la API de Laravel

La UI solo depende de `JobRepository` (`src/features/jobs/services/job-repository.ts`). Implementá `list()` contra la API y reasigná `jobRepository`; hay un esbozo comentado en ese archivo.

## Pendientes

- Reemplazar los enlaces de GitHub y Telegram en `src/config/site.ts`.
- Opcional: `telegramMemberCount` en el mismo archivo para mostrar la cantidad de miembros en el hero.
