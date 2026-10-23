const POINTS = [
  {
    title: "Hecho por la comunidad",
    description:
      "Las ofertas se recopilan a partir de lo que comparten estudiantes en el grupo de Telegram.",
  },
  {
    title: "Enfocado en tu primer empleo",
    description: "Priorizamos pasantías y puestos trainee y junior en tecnología.",
  },
  {
    title: "Directo a la fuente",
    description: "Cada publicación te lleva a la oferta original para que postules desde ahí.",
  },
];

export function AboutSection() {
  return (
    <section
      id="sobre-el-proyecto"
      aria-labelledby="about-title"
      className="border-t bg-background"
    >
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-16 md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] md:gap-16 md:px-8 md:py-20">
        <div>
          <p className="text-xs font-medium tracking-[0.14em] text-muted-foreground">
            SOBRE EL PROYECTO
          </p>
          <h2
            id="about-title"
            className="mt-3 text-2xl leading-tight font-semibold tracking-[-0.02em] text-balance md:text-[2rem]"
          >
            Un solo lugar para no perderte ninguna oportunidad.
          </h2>
        </div>
        <dl className="grid gap-6 sm:grid-cols-3 md:gap-8">
          {POINTS.map((point) => (
            <div key={point.title} className="border-t border-primary/30 pt-4">
              <dt className="text-[15px] font-semibold">{point.title}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {point.description}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
