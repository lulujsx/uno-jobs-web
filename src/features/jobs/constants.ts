import type { JobCategory, Modality, Seniority } from "./types";

export const CATEGORY_LABELS: Record<JobCategory, string> = {
  desarrollo: "Desarrollo",
  datos: "Datos",
  qa: "QA",
  diseno: "Diseño",
  infraestructura: "Infraestructura",
  producto: "Producto",
  "soporte-it": "Soporte IT",
};

export const SENIORITY_LABELS: Record<Seniority, string> = {
  pasantia: "Pasantía",
  trainee: "Trainee",
  junior: "Junior",
  "semi-senior": "Semi Senior",
};

export const MODALITY_LABELS: Record<Modality, string> = {
  remoto: "Remoto",
  hibrido: "Híbrido",
  presencial: "Presencial",
};

export const SORT_OPTIONS = ["recientes", "antiguos", "alfabetico"] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

export const SORT_LABELS: Record<SortOption, string> = {
  recientes: "Más recientes",
  antiguos: "Más antiguos",
  alfabetico: "Orden alfabético",
};

/** Listings published within this window get the "Nuevo" badge. */
export const NEW_LISTING_WINDOW_MS = 48 * 60 * 60 * 1000;
