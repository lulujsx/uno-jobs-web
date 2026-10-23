export const siteConfig = {
  name: "UNO Jobs",
  description:
    "Pasantías y empleos junior y trainee en tecnología, compartidos por la comunidad de estudiantes de la UNO en un solo lugar.",
  nav: [
    { label: "Inicio", href: "/#inicio", section: "inicio" },
    { label: "Ofertas", href: "/#ofertas", section: "ofertas" },
    { label: "Sobre el proyecto", href: "/#sobre-el-proyecto", section: "sobre-el-proyecto" },
  ],
  // TODO: replace with the project's real repository and Telegram group.
  links: {
    github: "https://github.com",
    telegram: "https://telegram.org",
  },
  /** Shown in the hero badge when known. Leave null rather than guessing. */
  telegramMemberCount: null as number | null,
  /**
   * Official assets. Drop the files at these paths under /public and they are
   * picked up automatically; until then a neutral text fallback is rendered.
   */
  assets: {
    universityLogo: ["/brand/logo-uno.png"],
    campusImage: ["/brand/hero.jpg"],
  },
} as const;

export type NavSection = (typeof siteConfig.nav)[number]["section"];
