import { SORT_OPTIONS, type SortOption } from "../constants";
import {
  JOB_CATEGORIES,
  MODALITIES,
  SENIORITIES,
  type JobCategory,
  type Modality,
  type Seniority,
} from "../types";

export interface JobQuery {
  search: string;
  category: JobCategory | null;
  seniority: Seniority[];
  modality: Modality[];
  location: string[];
  technology: string[];
  sort: SortOption;
}

/** Multi-select facets shown in the filter sidebar. */
export type FacetKey = "seniority" | "modality" | "location" | "technology";

export const DEFAULT_SORT: SortOption = "recientes";

export const EMPTY_QUERY: JobQuery = {
  search: "",
  category: null,
  seniority: [],
  modality: [],
  location: [],
  technology: [],
  sort: DEFAULT_SORT,
};

/** Spanish URL parameter names, so shared links stay readable. */
const PARAM = {
  search: "q",
  category: "categoria",
  seniority: "seniority",
  modality: "modalidad",
  location: "ubicacion",
  technology: "tecnologia",
  sort: "orden",
} as const;

const LIST_SEPARATOR = ",";

function isOneOf<T extends string>(options: readonly T[], value: string): value is T {
  return (options as readonly string[]).includes(value);
}

function readList(params: URLSearchParams, key: string): string[] {
  const raw = params.get(key);
  if (!raw) return [];
  const values = raw
    .split(LIST_SEPARATOR)
    .map((value) => value.trim())
    .filter(Boolean);
  return [...new Set(values)];
}

export function parseJobQuery(params: URLSearchParams): JobQuery {
  const category = params.get(PARAM.category) ?? "";
  const sort = params.get(PARAM.sort) ?? "";

  return {
    search: params.get(PARAM.search) ?? "",
    category: isOneOf(JOB_CATEGORIES, category) ? category : null,
    seniority: readList(params, PARAM.seniority).filter((v) => isOneOf(SENIORITIES, v)),
    modality: readList(params, PARAM.modality).filter((v) => isOneOf(MODALITIES, v)),
    location: readList(params, PARAM.location),
    technology: readList(params, PARAM.technology),
    sort: isOneOf(SORT_OPTIONS, sort) ? sort : DEFAULT_SORT,
  };
}

export function serializeJobQuery(query: JobQuery): URLSearchParams {
  const params = new URLSearchParams();
  const search = query.search.trim();

  if (search) params.set(PARAM.search, search);
  if (query.category) params.set(PARAM.category, query.category);

  const lists: Array<[string, string[]]> = [
    [PARAM.seniority, query.seniority],
    [PARAM.modality, query.modality],
    [PARAM.location, query.location],
    [PARAM.technology, query.technology],
  ];
  for (const [key, values] of lists) {
    if (values.length > 0) params.set(key, values.join(LIST_SEPARATOR));
  }

  if (query.sort !== DEFAULT_SORT) params.set(PARAM.sort, query.sort);
  return params;
}

export function countActiveFacets(query: JobQuery): number {
  return (
    query.seniority.length +
    query.modality.length +
    query.location.length +
    query.technology.length
  );
}
